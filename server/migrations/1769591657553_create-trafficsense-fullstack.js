/** @param {import('node-pg-migrate').MigrationBuilder} pgm */
export const up = (pgm) => {
  pgm.createTable('users', {
    id: 'id',
    username: { type: 'varchar(120)', notNull: true },
    email: { type: 'varchar(180)', notNull: true, unique: true },
    role: { type: 'varchar(120)', notNull: true, default: 'Operator Lalu Lintas' },
    password: { type: 'varchar(120)', notNull: true },
    country: { type: 'varchar(100)', notNull: true, default: 'Indonesia' },
    organization: { type: 'varchar(160)', notNull: true, default: 'TrafficSense Platform' },
    joined_label: { type: 'varchar(80)', notNull: true, default: '14 Mei 2026' },
    created_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
  });

  pgm.createTable('cameras', {
    id: 'id',
    name: { type: 'varchar(160)', notNull: true },
    location: { type: 'varchar(160)', notNull: true },
    camera_code: { type: 'varchar(60)', notNull: true },
    status: { type: 'varchar(30)', notNull: true },
    time: { type: 'varchar(20)', notNull: true },
    vehicles_detected: { type: 'integer', notNull: true, default: 0 },
    confidence: { type: 'numeric(5,2)', notNull: true, default: 0 },
    network_status: { type: 'varchar(30)', notNull: true, default: 'Online' },
    image_url: { type: 'text', notNull: true },
  });

  pgm.createTable('camera_boxes', {
    id: 'id',
    camera_id: { type: 'integer', references: 'cameras', notNull: true, onDelete: 'cascade' },
    x: { type: 'numeric(5,2)', notNull: true },
    y: { type: 'numeric(5,2)', notNull: true },
    width: { type: 'numeric(5,2)', notNull: true },
    height: { type: 'numeric(5,2)', notNull: true },
    score: { type: 'varchar(20)', notNull: true },
  });

  pgm.createTable('reports', {
    id: 'id',
    report_code: { type: 'varchar(80)', notNull: true },
    title: { type: 'varchar(220)', notNull: true },
    type: { type: 'varchar(30)', notNull: true },
    locations: { type: 'integer', notNull: true },
    vehicles: { type: 'integer', notNull: true },
    incidents: { type: 'integer', notNull: true },
    report_date: { type: 'date', notNull: true },
    display_date: { type: 'varchar(80)', notNull: true },
    file_size: { type: 'varchar(20)', notNull: true },
  });

  pgm.createTable('activities', {
    id: 'id',
    user_id: { type: 'integer', references: 'users', notNull: true, onDelete: 'cascade' },
    title: { type: 'varchar(240)', notNull: true },
    time_text: { type: 'varchar(100)', notNull: true },
    ip_address: { type: 'varchar(60)', notNull: true },
    position: { type: 'integer', notNull: true },
  });

  pgm.createTable('app_settings', {
    id: 'id',
    theme: { type: 'varchar(20)', notNull: true, default: 'System' },
    language: { type: 'varchar(60)', notNull: true, default: 'Bahasa Indonesia' },
    timezone: { type: 'varchar(80)', notNull: true, default: 'WIB (Asia/Jakarta) UTC+7' },
  });

  pgm.sql(`
    INSERT INTO users (username, email, role, password, country, organization, joined_label)
    VALUES ('Lokas Project', 'admin@gmail.com', 'Pers', 'admin12345', 'Indonesia', 'TrafficSense Platform', '14 Mei 2026');

    INSERT INTO cameras (name, location, camera_code, status, time, vehicles_detected, confidence, network_status, image_url) VALUES
    ('Jl. Sudirman Km 2', 'Jakarta Pusat', 'CAM-001', 'macet', '18.06.00', 48, 97.20, 'Online', 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80'),
    ('Bundaran HI', 'Jakarta Pusat', 'CAM-002', 'padat', '18.05.40', 36, 95.80, 'Online', 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80'),
    ('Jl. Thamrin', 'Jakarta Pusat', 'CAM-003', 'lancar', '18.05.15', 24, 96.90, 'Online', 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1200&q=80'),
    ('Flyover Semanggi', 'Jakarta Selatan', 'CAM-004', 'lancar', '18.04.50', 21, 95.40, 'Online', 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1200&q=80'),
    ('Tol Dalam Kota', 'Jakarta Barat', 'CAM-005', 'macet', '18.04.20', 57, 96.00, 'Online', 'https://images.unsplash.com/photo-1473445361085-b9a07f55608b?auto=format&fit=crop&w=1200&q=80'),
    ('Kelapa Gading', 'Jakarta Utara', 'CAM-006', 'lancar', '18.03.40', 15, 93.50, 'Offline', 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80');

    INSERT INTO camera_boxes (camera_id, x, y, width, height, score) VALUES
    (1, 20, 33, 10, 14, '0.94'),
    (1, 35, 36, 7, 12, '0.92'),
    (1, 50, 40, 9, 12, '0.98'),
    (1, 66, 35, 7, 11, '0.91'),
    (1, 80, 42, 8, 14, '0.97');

    INSERT INTO reports (report_code, title, type, locations, vehicles, incidents, report_date, display_date, file_size) VALUES
    ('RPT-2025-0518-001', 'Laporan Harian — 18 Mei 2025', 'Harian', 24, 12847, 3, '2025-05-18', '18/05/2025 23:59', '2.4 MB'),
    ('RPT-2025-0517-001', 'Laporan Harian — 17 Mei 2025', 'Harian', 24, 13124, 5, '2025-05-17', '17/05/2025 23:59', '2.6 MB'),
    ('RPT-2025-W20', 'Laporan Mingguan — Minggu ke-20', 'Mingguan', 24, 88924, 21, '2025-05-12', '12/05/2025', '8.2 MB'),
    ('RPT-2025-04', 'Laporan Bulanan — April 2025', 'Bulanan', 24, 432000, 87, '2025-04-30', '30/04/2025', '24.8 MB'),
    ('RPT-2025-0516-001', 'Laporan Harian — 16 Mei 2025', 'Harian', 22, 11985, 2, '2025-05-16', '16/05/2025 23:59', '2.1 MB');

    INSERT INTO activities (user_id, title, time_text, ip_address, position) VALUES
    (1, 'Membuat akun baru di sistem TrafficSense (Admin)', '1 menit yang lalu', '192.168.1.45', 1),
    (1, 'Memperbarui threshold model AI menjadi 0.85', '33 menit yang lalu', '192.168.1.45', 2),
    (1, 'Menambahkan kamera baru (CAM-005)', '1 hari yang lalu', '192.168.1.45', 3);

    INSERT INTO app_settings (theme, language, timezone)
    VALUES ('System', 'Bahasa Indonesia', 'WIB (Asia/Jakarta) UTC+7');
  `);
};

/** @param {import('node-pg-migrate').MigrationBuilder} pgm */
export const down = (pgm) => {
  pgm.dropTable('app_settings');
  pgm.dropTable('activities');
  pgm.dropTable('reports');
  pgm.dropTable('camera_boxes');
  pgm.dropTable('cameras');
  pgm.dropTable('users');
};
