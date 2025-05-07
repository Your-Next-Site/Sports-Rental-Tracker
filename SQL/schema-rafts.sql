-- Drop tables if they exist, in the correct dependency order

DROP TABLE IF EXISTS rafts_on_water CASCADE;
DROP TABLE IF EXISTS rafts CASCADE;
DROP TABLE IF EXISTS raft_types CASCADE;

-- Raft types
CREATE TABLE raft_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Insert raft types first
INSERT INTO raft_types (name)
VALUES
    ('single-kayak'),
    ('double-kayak'),
    ('small-raft'),
    ('Round-raft'),
    ('medium-raft'),
    ('large-raft');

-- Rafts (individual raft units)
CREATE TABLE rafts (
    id SERIAL PRIMARY KEY,
    raft_type_id INTEGER NOT NULL,
    unit_number INTEGER UNIQUE NOT NULL,
    FOREIGN KEY (raft_type_id) REFERENCES raft_types(id) ON DELETE RESTRICT
);

-- Insert rafts, referring to the raft types by their ID
INSERT INTO rafts (raft_type_id, unit_number)
VALUES
    (1, 101),  -- single-kayak
    (2, 102),  -- double-kayak
    (3, 103),  -- small-raft
    (4, 104),  -- Round-raft
    (5, 105),  -- medium-raft
    (6, 106);  -- large-raft

-- Rafts on Water (track which user is using which raft)
CREATE TABLE rafts_on_water (
    id SERIAL PRIMARY KEY,
    raft_id INTEGER NOT NULL,               -- Raft being used
    checked_out_by INTEGER NOT NULL,        -- Staff user who checked out the trip
    departure_time TIMESTAMPTZ NOT NULL,     -- Time raft departed
    arrival_time TIMESTAMPTZ,               -- Optional return time
    is_active BOOLEAN DEFAULT true,         -- Whether the trip is still active
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP, -- Creation timestamp
    
    FOREIGN KEY (checked_out_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (raft_id) REFERENCES rafts(id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX idx_rafts_on_water_checked_out_by ON rafts_on_water (checked_out_by);  -- Corrected index for checked_out_by
CREATE INDEX idx_rafts_on_water_active ON rafts_on_water (is_active);
CREATE INDEX idx_rafts_unit_number ON rafts (unit_number);