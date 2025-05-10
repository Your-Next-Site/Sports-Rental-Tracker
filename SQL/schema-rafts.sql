-- Drop tables if they exist, in the correct dependency order
DROP TABLE IF EXISTS rafts_on_water CASCADE;

DROP TABLE IF EXISTS raft_types CASCADE;

-- Raft types
CREATE TABLE raft_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Insert raft types first
INSERT INTO
    raft_types (name)
VALUES ('single-kayak'),
    ('double-kayak'),
    ('small-raft'),
    ('round-raft'),
    ('medium-raft'),
    ('large-raft');

-- Rafts on Water (track which user is using which raft type and unit number)
CREATE TABLE rafts_on_water (
    id SERIAL PRIMARY KEY,
    guest_name VARCHAR(150) NOT NULL,
    raft_type_id INTEGER NOT NULL, -- Raft type being used
    unit_number INTEGER NOT NULL, -- Specific unit number for the raft
    checked_out_by INTEGER NOT NULL, -- Staff user who checked out the trip
    departure_time TIMESTAMP NOT NULL, -- Time raft departed
    arrival_time TIMESTAMP, -- Optional return time
    checked_in_by INTEGER,
    FOREIGN KEY (checked_out_by) REFERENCES users (id) ON DELETE SET NULL,
    FOREIGN KEY (checked_in_by) REFERENCES users (id) ON DELETE SET NULL,
    FOREIGN KEY (raft_type_id) REFERENCES raft_types (id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX idx_rafts_on_water_checked_out_by ON rafts_on_water (checked_out_by);
-- Index for checked_out_by
CREATE INDEX idx_rafts_on_water_raft_type_id ON rafts_on_water (raft_type_id);
-- Index for raft_type_id
CREATE INDEX idx_rafts_on_water_unit_number ON rafts_on_water (unit_number);
-- New index for unit_number