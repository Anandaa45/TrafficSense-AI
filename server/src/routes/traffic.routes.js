import { Router } from 'express';
import { pool } from '../db/pool.js';

const router = Router();

router.get('/health', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT NOW() AS time');
    res.json({ status: 'ok', database_time: result.rows[0].time });
  } catch (error) {
    next(error);
  }
});

router.get('/metrics', async (req, res, next) => {
  try {
    const [intersections, incidents, sessions] = await Promise.all([
      pool.query('SELECT COUNT(*)::int AS count, AVG(congestion_level)::numeric(10,1) AS avg_congestion FROM intersections'),
      pool.query("SELECT COUNT(*)::int AS total, COUNT(*) FILTER (WHERE status = 'active')::int AS active FROM incidents"),
      pool.query('SELECT COUNT(*)::int AS total FROM sitting_sessions')
    ]);

    const avgCongestion = Number(intersections.rows[0].avg_congestion || 0);

    res.json({
      monitored_intersections: intersections.rows[0].count,
      active_incidents: incidents.rows[0].active,
      total_incidents: incidents.rows[0].total,
      avg_congestion: avgCongestion,
      ai_accuracy: avgCongestion > 70 ? 88 : 94,
      saved_minutes: Math.max(12, Math.round(100 - avgCongestion)),
      sitting_sessions: sessions.rows[0].total
    });
  } catch (error) {
    next(error);
  }
});

router.get('/intersections', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM intersections ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

router.get('/incidents', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM incidents ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

router.post('/incidents', async (req, res, next) => {
  try {
    const { title, location, severity = 'medium', status = 'active' } = req.body;

    if (!title || !location) {
      return res.status(400).json({ message: 'title dan location wajib diisi' });
    }

    const result = await pool.query(
      `INSERT INTO incidents (title, location, severity, status)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, location, severity, status]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.get('/ai/recommendations', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM intersections ORDER BY congestion_level DESC');

    const recommendations = result.rows.map((item) => {
      let action = 'Maintain current signal pattern';
      let priority = 'low';

      if (item.congestion_level >= 80) {
        action = 'Increase green light duration and reroute traffic to alternative roads';
        priority = 'high';
      } else if (item.congestion_level >= 60) {
        action = 'Optimize signal timing and monitor vehicle queue';
        priority = 'medium';
      }

      return {
        intersection_id: item.id,
        intersection: item.name,
        congestion_level: item.congestion_level,
        priority,
        recommendation: action
      };
    });

    res.json(recommendations);
  } catch (error) {
    next(error);
  }
});

router.get('/sessions', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM sitting_sessions ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

router.post('/sessions', async (req, res, next) => {
  try {
    const { user_name, road_context, destination, ai_suggestion } = req.body;

    if (!user_name || !road_context) {
      return res.status(400).json({ message: 'user_name dan road_context wajib diisi' });
    }

    const result = await pool.query(
      `INSERT INTO sitting_sessions (user_name, road_context, destination, ai_suggestion)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [user_name, road_context, destination || null, ai_suggestion || 'AI will suggest the safest and fastest route.']
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

export default router;
