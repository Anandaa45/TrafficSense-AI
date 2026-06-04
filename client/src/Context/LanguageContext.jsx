import React, { createContext, useContext, useEffect, useState } from 'react';

const translations = {
  id: {
    nav: {
      dashboard:  'Dasbor',
      monitor:    'Monitor Lalu Lintas',
      analytics:  'Analitik',
      reports:    'Laporan',
      settings:   'Pengaturan',
    },

    subtitle: {
      '/dashboard': ['Dashboard', 'Overview sistem deteksi lalu lintas real-time'],
      '/monitor':   ['Traffic Monitor', 'Pemantauan live feed kamera CCTV'],
      '/analytics': ['Analytics', 'Analisis mendalam data kepadatan lalu lintas'],
      '/reports':   ['Reports', 'Laporan historis dan ringkasan deteksi'],
      '/settings':  ['Pengaturan', 'Konfigurasi sistem dan model AI'],
      '/profile':   ['Profil Pengguna', 'Kelola informasi akun dan akses perangkat Anda'],
    },

    live: 'LIVE',
    searchPlaceholder: 'Cari lokasi...',
    adminAccess: 'ADMIN ACCESS',
    aiEngine: 'AI Engine Aktif',

    tabs: ['Akun', 'Model AI', 'Kamera', 'Notifikasi', 'Sistem', 'Database'],

    akun: {
      sectionTitle: 'Tampilan & Preferensi',
      temaLabel: 'Tema Aplikasi',
      dark: 'Dark',
      darkSub: 'Mode gelap',
      light: 'Light',
      lightSub: 'Mode terang',
      system: 'System',
      systemSub: 'Otomatis',
      systemInfo: 'Mode System: Tema otomatis mengikuti waktu.',
      systemActive: 'Tema aktif sekarang:',
      bahasa: 'Bahasa',
      timezone: 'Zona Waktu',
      dateFormat: 'Format Tanggal',
      privacyTitle: 'Privasi & Data',
      telemetri: 'Telemetri & Analitik',
      telemetriSub: 'Kirim data penggunaan anonim untuk membantu pengembangan AI.',
      downloadData: 'Unduh Data Akun',
      downloadSub: 'Minta arsip data yang terhubung ke akun Anda.',
      downloadBtn: 'Minta Data',
    },

    modelAI: {
      sectionTitle: 'Konfigurasi Model AI',
      architecture: 'Arsitektur Model',
      device: 'Perangkat Inferensi',
      confidence: 'Ambang Kepercayaan',
      iou: 'Ambang IOU',
      fps: 'Target FPS',
      batchSize: 'Ukuran Batch',
      autoRetrain: 'Auto-Pelatihan Ulang',
      autoRetrainSub: 'Model otomatis dilatih ulang setiap minggu',
      deteksiTitle: 'Kelas Deteksi',
    },

    kamera: {
      sectionTitle: 'Pengaturan Kamera',
      edit: 'Edit',
      test: 'Tes',
    },

    notifikasi: {
      sectionTitle: 'Pengaturan Notifikasi',
      alert: 'Alert Kemacetan',
      alertSub: 'Notifikasi saat terdeteksi kemacetan',
      email: 'Notifikasi Email',
      emailSub: 'Kirim laporan via email',
      sms: 'Notifikasi SMS',
      smsSub: 'Kirim alert via SMS',
    },

    sistem: {
      sectionTitle: 'Pengaturan Sistem',
      fields: ['Versi Sistem', 'OS', 'GPU', 'CPU', 'RAM', 'Uptime'],
    },

    database: {
      sectionTitle: 'Pengaturan Database',
      fields: ['Database', 'Host', 'Storage Digunakan', 'Backup Terakhir', 'Retention Policy', 'Koneksi Aktif'],
    },

    save: 'Simpan Perubahan',
    reset: 'Reset Default',

    systemLabel1: 'Sistem Deteksi Kepadatan',
    systemLabel2: 'Lalu Lintas',

    dashboardPage: {
      trafficTrendTitle: 'Tren Kepadatan Lalu Lintas',
      trafficTrendSub: '24 jam terakhir — semua lokasi',
      dataset: 'Dataset',
      smooth: 'Lancar',
      dense: 'Padat',
      jammed: 'Macet',
      statusDistribution: 'Distribusi Status',
      currentAllPoints: 'Saat ini — semua titik',
    },

    trafficMonitorPage: {
      uploadMedia: 'Upload Media',
      uploadMediaSub: 'Upload foto atau video lalu jalankan analisis kepadatan lalu lintas.',
      chooseMedia: 'Pilih Foto / Video',
      supportedFiles: 'JPG, PNG, MP4, MOV',
      deleteMedia: 'Hapus Media',
      uploadResult: 'Hasil Upload',
      noHistory: 'Belum ada riwayat analisis',
      previewMedia: 'Preview Media',
      previewMediaSub: 'Media yang di-upload akan tampil di sini sebelum dianalisis.',
      noMediaSelected: 'Belum ada media dipilih',
      noMediaSub: 'Upload foto atau video dari panel kiri untuk mulai analisis.',
      analyzing: 'Menganalisis...',
      analyzingMedia: 'AI sedang menganalisis media...',
      analyzeAI: 'Analisis AI',
      analysisResult: 'Hasil Analisis',
      noResult: 'Belum ada hasil. Upload media lalu klik tombol Analisis AI.',
      car: 'Mobil',
      motor: 'Motor',
      bus: 'Bus',
      truck: 'Truk',
      totalVehicles: 'Total Kendaraan',
      confidence: 'Confidence',
      status: 'Status',
      analyzedAt: 'Dianalisis pada',
      deleteAnalysis: 'Hapus Hasil Analisis',
      vehicles: 'kendaraan',
      deleteConfirm: 'Hapus hasil analisis ini?',
      saveError: 'Gagal menyimpan hasil analisis media.',
      deleteError: 'Gagal menghapus hasil analisis.',
    },

    analyticsPage: {
      analysisHistory: 'Riwayat Analisis',
      analysisHistorySub: 'Semua hasil analisis foto dan video yang pernah di-upload.',
      totalData: 'Total Data',
      date: 'Tanggal',
      file: 'File',
      type: 'Tipe',
      total: 'Total',
      confidence: 'Confidence',
      status: 'Status',
      preview: 'Preview',
      photo: 'Foto',
      video: 'Video',
      noHistory: 'Belum ada riwayat analisis. Upload media dari halaman Traffic Monitor.',
      detailTitle: 'Detail Hasil Analisis',
      totalVehicles: 'Total Kendaraan',
      trafficStatus: 'Status Lalu Lintas',
      car: 'Mobil',
      motor: 'Motor',
      bus: 'Bus',
      truck: 'Truk',
      close: 'Tutup',
      previewUnavailable: 'Preview file belum tersedia. Silakan analisis ulang media dari Traffic Monitor.',
    },
  },

  en: {
    nav: {
      dashboard:  'Dashboard',
      monitor:    'Traffic Monitor',
      analytics:  'Analytics',
      reports:    'Reports',
      settings:   'Settings',
    },

    subtitle: {
      '/dashboard': ['Dashboard', 'Real-time traffic detection system overview'],
      '/monitor':   ['Traffic Monitor', 'Live CCTV camera feed monitoring'],
      '/analytics': ['Analytics', 'In-depth traffic density data analysis'],
      '/reports':   ['Reports', 'Historical reports and detection summaries'],
      '/settings':  ['Settings', 'System and AI model configuration'],
      '/profile':   ['User Profile', 'Manage your account information and device access'],
    },

    live: 'LIVE',
    searchPlaceholder: 'Search location...',
    adminAccess: 'ADMIN ACCESS',
    aiEngine: 'AI Engine Active',

    tabs: ['Account', 'AI Model', 'Camera', 'Notifications', 'System', 'Database'],

    akun: {
      sectionTitle: 'Display & Preferences',
      temaLabel: 'Application Theme',
      dark: 'Dark',
      darkSub: 'Dark mode',
      light: 'Light',
      lightSub: 'Light mode',
      system: 'System',
      systemSub: 'Automatic',
      systemInfo: 'System Mode: Theme changes automatically based on time.',
      systemActive: 'Active theme right now:',
      bahasa: 'Language',
      timezone: 'Timezone',
      dateFormat: 'Date Format',
      privacyTitle: 'Privacy & Data',
      telemetri: 'Telemetry & Analytics',
      telemetriSub: 'Send anonymous usage data to help improve AI development.',
      downloadData: 'Download Account Data',
      downloadSub: 'Request an archive of data linked to your account.',
      downloadBtn: 'Request Data',
    },

    modelAI: {
      sectionTitle: 'AI Model Configuration',
      architecture: 'Model Architecture',
      device: 'Inference Device',
      confidence: 'Confidence Threshold',
      iou: 'IOU Threshold',
      fps: 'Target FPS',
      batchSize: 'Batch Size',
      autoRetrain: 'Auto-Retraining',
      autoRetrainSub: 'Model is automatically retrained every week',
      deteksiTitle: 'Detection Classes',
    },

    kamera: {
      sectionTitle: 'Camera Settings',
      edit: 'Edit',
      test: 'Test',
    },

    notifikasi: {
      sectionTitle: 'Notification Settings',
      alert: 'Congestion Alert',
      alertSub: 'Notification when congestion is detected',
      email: 'Email Notification',
      emailSub: 'Send reports via email',
      sms: 'SMS Notification',
      smsSub: 'Send alerts via SMS',
    },

    sistem: {
      sectionTitle: 'System Settings',
      fields: ['System Version', 'OS', 'GPU', 'CPU', 'RAM', 'Uptime'],
    },

    database: {
      sectionTitle: 'Database Settings',
      fields: ['Database', 'Host', 'Storage Used', 'Last Backup', 'Retention Policy', 'Active Connections'],
    },

    save: 'Save Changes',
    reset: 'Reset to Default',

    systemLabel1: 'Traffic Density',
    systemLabel2: 'Detection System',

    dashboardPage: {
      trafficTrendTitle: 'Traffic Density Trend',
      trafficTrendSub: 'Last 24 hours — all locations',
      dataset: 'Dataset',
      smooth: 'Smooth',
      dense: 'Dense',
      jammed: 'Congested',
      statusDistribution: 'Status Distribution',
      currentAllPoints: 'Current — all points',
    },

    trafficMonitorPage: {
      uploadMedia: 'Upload Media',
      uploadMediaSub: 'Upload a photo or video and run traffic density analysis.',
      chooseMedia: 'Choose Photo / Video',
      supportedFiles: 'JPG, PNG, MP4, MOV',
      deleteMedia: 'Delete Media',
      uploadResult: 'Upload Results',
      noHistory: 'No analysis history yet',
      previewMedia: 'Media Preview',
      previewMediaSub: 'Uploaded media will appear here before analysis.',
      noMediaSelected: 'No media selected',
      noMediaSub: 'Upload a photo or video from the left panel to start analysis.',
      analyzing: 'Analyzing...',
      analyzingMedia: 'AI is analyzing the media...',
      analyzeAI: 'Analyze AI',
      analysisResult: 'Analysis Result',
      noResult: 'No result yet. Upload media then click Analyze AI.',
      car: 'Car',
      motor: 'Motorcycle',
      bus: 'Bus',
      truck: 'Truck',
      totalVehicles: 'Total Vehicles',
      confidence: 'Confidence',
      status: 'Status',
      analyzedAt: 'Analyzed at',
      deleteAnalysis: 'Delete Analysis Result',
      vehicles: 'vehicles',
      deleteConfirm: 'Delete this analysis result?',
      saveError: 'Failed to save media analysis result.',
      deleteError: 'Failed to delete analysis result.',
    },

    analyticsPage: {
      analysisHistory: 'Analysis History',
      analysisHistorySub: 'All analysis results from uploaded photos and videos.',
      totalData: 'Total Data',
      date: 'Date',
      file: 'File',
      type: 'Type',
      total: 'Total',
      confidence: 'Confidence',
      networkStatus: 'Network Status',
      chooseCamera: 'Choose a camera from the list',
      officialCctvAvailable: 'Live CCTV is available from the official source',
      openOfficialCctvHint: 'Click the button below to open the camera.',
      openOfficialCctv: 'Open Official CCTV',
      done: 'Done',
    },
  },

  // ── English (UK) ──────────────────────────────────────────────────────────
  'en-uk': {
    nav: {
      dashboard:  'Dashboard',
      monitor:    'Traffic Monitor',
      analytics:  'Analytics',
      reports:    'Reports',
      settings:   'Settings',
    },
    subtitle: {
      '/dashboard': ['Dashboard', 'Real-time traffic detection system overview'],
      '/monitor':   ['Traffic Monitor', 'Live CCTV camera feed monitoring'],
      '/analytics': ['Analytics', 'In-depth traffic density data analysis'],
      '/reports':   ['Reports', 'Historical reports and detection summaries'],
      '/settings':  ['Settings', 'System and AI model configuration'],
      '/profile':   ['User Profile', 'Manage your account information and device access'],
    },
    live:        'LIVE',
    searchPlaceholder: 'Search location...',
    adminAccess: 'ADMIN ACCESS',
    aiEngine:    'AI Engine Active',
    tabs: ['Account', 'AI Model', 'Camera', 'Notifications', 'System', 'Database'],
    akun: {
      sectionTitle:  'Display & Preferences',
      temaLabel:     'Application Theme',
      dark:          'Dark', darkSub:   'Dark mode',
      light:         'Light', lightSub: 'Light mode',
      system:        'System', systemSub:'Automatic',
      systemInfo:    'System Mode: Theme changes automatically based on time.',
      systemActive:  'Active theme right now:',
      bahasa:        'Language',
      timezone:      'Time Zone',
      dateFormat:    'Date Format',
      privacyTitle:  'Privacy & Data',
      telemetri:     'Telemetry & Analytics',
      telemetriSub:  'Send anonymous usage data to help improve AI development.',
      downloadData:  'Download Account Data',
      downloadSub:   'Request an archive of data linked to your account.',
      downloadBtn:   'Request Data',
    },
    modelAI: {
      sectionTitle:  'AI Model Configuration',
      architecture:  'Model Architecture',
      device:        'Inference Device',
      confidence:    'Confidence Threshold',
      iou:           'IOU Threshold',
      fps:           'Target FPS',
      batchSize:     'Batch Size',
      autoRetrain:   'Auto-Retraining',
      autoRetrainSub:'Model is automatically retrained every week',
      deteksiTitle:  'Detection Classes',
    },
    kamera: {
      sectionTitle: 'Camera Settings',
      edit:         'Edit',
      test:         'Test',
    },
    notifikasi: {
      sectionTitle: 'Notification Settings',
      alert:        'Congestion Alert',
      alertSub:     'Notification when congestion is detected',
      email:        'Email Notification',
      emailSub:     'Send reports via email',
      sms:          'SMS Notification',
      smsSub:       'Send alerts via SMS',
    },
    sistem: {
      sectionTitle: 'System Settings',
      fields: ['System Version','OS','GPU','CPU','RAM','Uptime'],
    },
    database: {
      sectionTitle: 'Database Settings',
      fields: ['Database','Host','Storage Used','Last Backup','Retention Policy','Active Connections'],
    },
    save:  'Save Changes',
    reset: 'Reset to Default',

    systemLabel1: 'Traffic Density',
    systemLabel2: 'Detection System',
    
    dashboardPage: {
      trafficTrendTitle: 'Traffic Density Trend',
      trafficTrendSub: 'Last 24 hours — all locations',
      dataset: 'Dataset',
      smooth: 'Smooth',
      dense: 'Dense',
      jammed: 'Congested',
      statusDistribution: 'Status Distribution',
      currentAllPoints: 'Current — all points',
    },
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('trafficSense_lang') || 'id';
  });

  useEffect(() => {
    localStorage.setItem('trafficSense_lang', lang);
  }, [lang]);

  const safeLang = translations[lang] ? lang : 'id';
  const t = translations[safeLang];

  return (
    <LanguageContext.Provider value={{ lang: safeLang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);

  if (!ctx) {
    throw new Error('useLanguage must be used inside <LanguageProvider>');
  }

  return ctx;
}
