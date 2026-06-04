const DB_NAME = 'trafficSenseMediaDB';
const STORE_NAME = 'analysisMedia';
const HISTORY_KEY = 'trafficSense_analysis_history';
const LATEST_KEY = 'trafficSense_latest_analysis';

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);

    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE_NAME);
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function saveAnalysis(result, file) {
  const db = await openDB();

  await new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put(file, String(result.id));
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });

  const safeResult = {
    ...result,
    mediaUrl: null,
    hasMediaBlob: true,
  };

  const oldHistory = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  const newHistory = [safeResult, ...oldHistory].slice(0, 20);

  localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  localStorage.setItem(LATEST_KEY, JSON.stringify(safeResult));

  return newHistory;
}

export async function getMediaUrl(id) {
  const db = await openDB();

  const blob = await new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const req = tx.objectStore(STORE_NAME).get(String(id));

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });

  if (!blob) return null;

  return URL.createObjectURL(blob);
}

export async function deleteAnalysis(id) {
  const db = await openDB();

  await new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(String(id));
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });

  const oldHistory = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  const newHistory = oldHistory.filter((item) => item.id !== id);

  localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));

  if (newHistory[0]) {
    localStorage.setItem(LATEST_KEY, JSON.stringify(newHistory[0]));
  } else {
    localStorage.removeItem(LATEST_KEY);
  }

  return newHistory;
}

export function getAnalysisHistory() {
  return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
}