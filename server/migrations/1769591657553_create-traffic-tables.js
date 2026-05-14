/** @param {import('node-pg-migrate').MigrationBuilder} pgm */
export const up = (pgm) => {
  pgm.createTable('intersections', {
    id: 'id',
    name: { type: 'varchar(120)', notNull: true },
    location: { type: 'varchar(180)', notNull: true },
    congestion_level: { type: 'integer', notNull: true, default: 0 },
    average_speed: { type: 'integer', notNull: true, default: 0 },
    vehicle_count: { type: 'integer', notNull: true, default: 0 },
    status: { type: 'varchar(40)', notNull: true, default: 'normal' },
    created_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
    updated_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') }
  });

  pgm.createTable('incidents', {
    id: 'id',
    title: { type: 'varchar(160)', notNull: true },
    location: { type: 'varchar(180)', notNull: true },
    severity: { type: 'varchar(30)', notNull: true, default: 'medium' },
    status: { type: 'varchar(30)', notNull: true, default: 'active' },
    created_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') }
  });

  pgm.createTable('sitting_sessions', {
    id: 'id',
    user_name: { type: 'varchar(120)', notNull: true },
    road_context: { type: 'text', notNull: true },
    destination: { type: 'varchar(180)' },
    ai_suggestion: { type: 'text' },
    created_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') }
  });

  pgm.sql(`
    INSERT INTO intersections (name, location, congestion_level, average_speed, vehicle_count, status) VALUES
    ('Central Junction', 'Jl. Sudirman - Jl. Thamrin', 82, 18, 1260, 'heavy'),
    ('North Gate', 'Jl. Diponegoro', 64, 31, 840, 'moderate'),
    ('Smart Cross 07', 'Jl. Ahmad Yani', 45, 42, 520, 'normal'),
    ('East Ring Road', 'Jl. Soekarno Hatta', 71, 24, 990, 'heavy');

    INSERT INTO incidents (title, location, severity, status) VALUES
    ('Vehicle breakdown detected', 'Central Junction', 'high', 'active'),
    ('Slow traffic near school zone', 'North Gate', 'medium', 'active'),
    ('Signal maintenance completed', 'Smart Cross 07', 'low', 'resolved');

    INSERT INTO sitting_sessions (user_name, road_context, destination, ai_suggestion) VALUES
    ('Traffic Operator', 'Morning rush hour monitoring', 'City Center', 'Prioritize green light duration in Central Junction.'),
    ('Field Agent', 'Accident report verification', 'North Gate', 'Send patrol unit and suggest route diversion.');
  `);
};

/** @param {import('node-pg-migrate').MigrationBuilder} pgm */
export const down = (pgm) => {
  pgm.dropTable('sitting_sessions');
  pgm.dropTable('incidents');
  pgm.dropTable('intersections');
};
