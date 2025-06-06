-- Drop tables if they exist, in the correct dependency order
DROP TABLE IF EXISTS items_rented CASCADE;

DROP TABLE IF EXISTS item_types CASCADE;

-- Raft types
CREATE TABLE item_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Insert raft types first
INSERT INTO
    item_types (name)
VALUES ('single-kayak'),
    ('double-kayak'),
    ('small-raft'),
    ('round-raft'),
    ('medium-raft'),
    ('large-raft');

-- Rafts on Water (track which user is using which raft type and unit number)
CREATE TABLE items_rented (
    id SERIAL PRIMARY KEY,
    guest_name VARCHAR(150) NOT NULL,
    item_type_id INTEGER NOT NULL, -- Raft type being used
    unit_number INTEGER NOT NULL, -- Specific unit number for the raft
    checked_out_by INTEGER NOT NULL, -- Staff user who checked out the trip
    departure_time TIMESTAMP NOT NULL, -- Time raft departed
    arrival_time TIMESTAMP,
    checked_in_by INTEGER,
    FOREIGN KEY (checked_out_by) REFERENCES users (id) ON DELETE SET NULL,
    FOREIGN KEY (checked_in_by) REFERENCES users (id) ON DELETE SET NULL,
    FOREIGN KEY (item_type_id) REFERENCES item_types (id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX idx_items_rented_checked_out_by ON items_rented (checked_out_by);
-- Index for checked_out_by
CREATE INDEX idx_items_rented_item_type_id ON items_rented (item_type_id);
-- Index for raft_type_id
CREATE INDEX idx_items_rented_unit_number ON items_rented (unit_number);
-- New index for unit_number