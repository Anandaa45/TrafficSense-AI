import React, { createContext, useContext, useState } from 'react';

// ─── Kamus Terjemahan ──────────────────────────────────────────────────────
const translations = {
  id: {
    // AppLayout – Sidebar nav
    nav: {
      dashboard:  'Dashboard',
      monitor:    'Traffic Monitor',
      analytics:  'Analytics',
      reports:    'Reports',
      settings:   'Pengaturan',
    },
    // AppLayout – Header subtitles
    subtitle: {
      '/dashboard': ['Dashboard', 'Overview sistem deteksi lalu lintas real-time'],
      '/monitor':   ['Traffic Monitor', 'Pemantauan live feed kamera CCTV'],
      '/analytics': ['Analytics', 'Analisis mendalam data kepadatan lalu lintas'],
      '/reports':   ['Reports', 'Laporan historis dan ringkasan deteksi'],
      '/settings':  ['Pengaturan', 'Konfigurasi sistem dan model AI'],
      '/profile':   ['Profil Pengguna', 'Kelola informasi akun dan akses perangkat Anda'],
    },
    // AppLayout – misc
    live:        'LIVE',
    searchPlaceholder: 'Cari lokasi...',
    adminAccess: 'ADMIN ACCESS',
    aiEngine:    'AI Engine Aktif',
    // Settings – Tabs
    tabs: ['Akun', 'Model AI', 'Kamera', 'Notifikasi', 'Sistem', 'Database'],
    // Settings – Akun tab
    akun: {
      sectionTitle:  'Tampilan & Preferensi',
      temaLabel:     'Tema Aplikasi',
      dark:          'Dark', darkSub:   'Mode gelap',
      light:         'Light', lightSub: 'Mode terang',
      system:        'System', systemSub:'Otomatis',
      systemInfo:    'Mode System: Tema otomatis mengikuti waktu.',
      systemActive:  'Tema aktif sekarang:',
      bahasa:        'Bahasa (Language)',
      timezone:      'Zona Waktu (Timezone)',
      dateFormat:    'Format Tanggal',
      privacyTitle:  'Privasi & Data',
      telemetri:     'Telemetri & Analitik',
      telemetriSub:  'Kirim data penggunaan anonim untuk membantu pengembangan AI.',
      downloadData:  'Unduh Data Akun',
      downloadSub:   'Minta arsip data yang terhubung ke akun Anda.',
      downloadBtn:   'Minta Data',
    },
    // Settings – Model AI
    modelAI: {
      sectionTitle:  'Konfigurasi Model AI',
      architecture:  'Arsitektur Model',
      device:        'Perangkat Inferensi',
      confidence:    'Ambang Kepercayaan',
      iou:           'Ambang IOU',
      fps:           'Target FPS',
      batchSize:     'Ukuran Batch',
      autoRetrain:   'Auto-Pelatihan Ulang',
      autoRetrainSub:'Model otomatis dilatih ulang setiap minggu',
      deteksiTitle:  'Kelas Deteksi',
    },
    // Settings – Kamera
    kamera: {
      sectionTitle: 'Pengaturan Kamera',
      edit:         'Edit',
      test:         'Tes',
    },
    // Settings – Notifikasi
    notifikasi: {
      sectionTitle: 'Pengaturan Notifikasi',
      alert:        'Alert Kemacetan',
      alertSub:     'Notifikasi saat terdeteksi kemacetan',
      email:        'Notifikasi Email',
      emailSub:     'Kirim laporan via email',
      sms:          'Notifikasi SMS',
      smsSub:       'Kirim alert via SMS',
    },
    // Settings – Sistem
    sistem: {
      sectionTitle: 'Pengaturan Sistem',
      fields: ['Versi Sistem','OS','GPU','CPU','RAM','Uptime'],
    },
    // Settings – Database
    database: {
      sectionTitle: 'Pengaturan Database',
      fields: ['Database','Host','Storage Digunakan','Backup Terakhir','Retention Policy','Koneksi Aktif'],
    },
    // Buttons
    save:  'Simpan Perubahan',
    reset: 'Reset Default',
  },

  // ── English (US) ──────────────────────────────────────────────────────────
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
      timezone:      'Timezone',
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
  },
};

// ─── Context ───────────────────────────────────────────────────────────────
const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('id'); // default: Bahasa Indonesia
  const t = translations[lang] ?? translations['id'];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}