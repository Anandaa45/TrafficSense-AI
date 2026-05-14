import { Router } from 'express';
import { pool } from '../db/pool.js';

const router = Router();

router.get('/health', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT NOW() AS server_time');
    res.json({ status: 'ok', server_time: result.rows[0].server_time });
  } catch (error) {
    next(error);
  }
});

router.post('/auth/register', async (req, res, next) => {
  try {
    const { username, email, role, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'username, email, dan password wajib diisi.' });
    }

    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rowCount > 0) {
      return res.status(409).json({ message: 'Email sudah terdaftar.' });
    }

    const result = await pool.query(
      `INSERT INTO users (username, email, role, password)
       VALUES ($1, $2, $3, $4)
       RETURNING id, username, email, role`,
      [username, email, role || 'Operator Lalu Lintas', password]
    );

    res.status(201).json({ message: 'Registrasi berhasil.', user: result.rows[0] });
  } catch (error) {
    next(error);
  }
});

router.post('/auth/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'email dan password wajib diisi.' });
    }

    const result = await pool.query(
      'SELECT id, username, email, role, password FROM users WHERE email = $1 LIMIT 1',
      [email]
    );

    if (result.rowCount === 0 || result.rows[0].password !== password) {
      return res.status(401).json({ message: 'Email atau password salah.' });
    }

    const { password: hidden, ...user } = result.rows[0];
    res.json({ message: 'Login berhasil.', token: 'demo-token', user });
  } catch (error) {
    next(error);
  }
});

router.get('/overview', async (req, res, next) => {
  try {
    const [cameraStats, reportStats] = await Promise.all([
      pool.query(`
        SELECT
          COUNT(*)::int AS total_cameras,
          COUNT(*) FILTER (WHERE network_status = 'Online')::int AS online_cameras,
          COUNT(*) FILTER (WHERE network_status <> 'Online')::int AS offline_cameras,
          COUNT(*) FILTER (WHERE status = 'macet')::int AS active_jams,
          COALESCE(SUM(vehicles_detected), 0)::int AS vehicles_today,
          ROUND(AVG(confidence)::numeric, 1) AS ai_accuracy
        FROM cameras
      `),
      pool.query(`SELECT COUNT(*) FILTER (WHERE type = 'Bulanan')::int AS monthly_reports FROM reports`),
    ]);

    res.json({
      ...cameraStats.rows[0],
      monthly_reports: reportStats.rows[0].monthly_reports,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/monitor/cameras', async (req, res, next) => {
  try {
    const camerasResult = await pool.query('SELECT * FROM cameras ORDER BY id ASC');
    const boxesResult = await pool.query('SELECT * FROM camera_boxes ORDER BY camera_id ASC, id ASC');

    const boxesByCameraId = boxesResult.rows.reduce((acc, box) => {
      acc[box.camera_id] ||= [];
      acc[box.camera_id].push({
        x: Number(box.x),
        y: Number(box.y),
        w: Number(box.width),
        h: Number(box.height),
        score: box.score,
      });
      return acc;
    }, {});

    res.json(camerasResult.rows.map((camera) => ({
      ...camera,
      boxes: boxesByCameraId[camera.id] || [],
    })));
  } catch (error) {
    next(error);
  }
});

router.get('/analytics', async (req, res) => {
  res.json({
    weekly: [
      { day: 'Sen', lancar: 58, padat: 28, macet: 14 },
      { day: 'Sel', lancar: 52, padat: 32, macet: 16 },
      { day: 'Rab', lancar: 61, padat: 25, macet: 14 },
      { day: 'Kam', lancar: 48, padat: 35, macet: 17 },
      { day: 'Jum', lancar: 44, padat: 38, macet: 18 },
      { day: 'Sab', lancar: 71, padat: 22, macet: 8 },
      { day: 'Min', lancar: 76, padat: 18, macet: 7 },
    ],
    monthly: [
      { month: 'Jan', total: 280 },
      { month: 'Feb', total: 315 },
      { month: 'Mar', total: 300 },
      { month: 'Apr', total: 345 },
      { month: 'Mei', total: 385 },
      { month: 'Jun', total: 398 },
      { month: 'Jul', total: 420 },
      { month: 'Agu', total: 392 },
      { month: 'Sep', total: 438 },
      { month: 'Okt', total: 454 },
      { month: 'Nov', total: 441 },
      { month: 'Des', total: 470 },
    ],
    vehicleTypes: [
      { name: 'Motor', value: 48 },
      { name: 'Mobil', value: 34 },
      { name: 'Bus', value: 8 },
      { name: 'Truk', value: 10 },
    ],
    peakHours: [
      { location: 'Jl. Sudirman', hour: '07:00 - 08:00', count: 2480 },
      { location: 'Bundaran HI', hour: '17:00 - 18:00', count: 2310 },
      { location: 'Jl. Thamrin', hour: '08:00 - 09:00', count: 2245 },
    ],
  });
});

router.get('/reports', async (req, res, next) => {
  try {
    const itemsResult = await pool.query('SELECT * FROM reports ORDER BY report_date DESC');
    const summaryResult = await pool.query(`
      SELECT
        COUNT(*)::int AS total_reports,
        COUNT(*) FILTER (WHERE date_part('month', report_date) = date_part('month', CURRENT_DATE))::int AS monthly_reports,
        COALESCE(SUM(incidents) FILTER (WHERE type = 'Harian'), 0)::int AS active_incidents,
        85::int AS resolved_incidents
      FROM reports
    `);

    const summary = summaryResult.rows[0];

    res.json({
      summary: {
        totalReports: summary.total_reports,
        monthlyReports: summary.monthly_reports,
        activeIncidents: summary.active_incidents,
        resolvedIncidents: summary.resolved_incidents,
      },
      items: itemsResult.rows.map((item) => ({
        id: item.report_code,
        title: item.title,
        type: item.type,
        locations: item.locations,
        vehicles: item.vehicles,
        incidents: item.incidents,
        date: item.display_date,
        size: item.file_size,
      })),
    });
  } catch (error) {
    next(error);
  }
});

router.get('/settings', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT theme, language, timezone FROM app_settings ORDER BY id ASC LIMIT 1');
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.get('/profile', async (req, res, next) => {
  try {
    const [userResult, activitiesResult] = await Promise.all([
      pool.query('SELECT * FROM users ORDER BY id ASC LIMIT 1'),
      pool.query('SELECT title, time_text, ip_address FROM activities ORDER BY position ASC'),
    ]);

    const user = userResult.rows[0];

    res.json({
      name: 'Lokas Project',
      username: user.username,
      email: user.email,
      role: user.role,
      country: user.country,
      organization: user.organization,
      joined_at: user.joined_label,
      activities: activitiesResult.rows.map((item) => ({
        title: item.title,
        time: item.time_text,
        ip: item.ip_address,
      })),
      device: {
        id: 'dev_1778756738152_vt...',
        ip: '192.168.1.45',
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
