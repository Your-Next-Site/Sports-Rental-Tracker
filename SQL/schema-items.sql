-- Drop tables if they exist, in the correct dependency order
DROP TABLE IF EXISTS inventory_item CASCADE;

DROP TABLE IF EXISTS items_rented CASCADE;

DROP TABLE IF EXISTS item_types CASCADE;

-- Raft types
CREATE TABLE item_types (
    id SERIAL PRIMARY KEY,
    value VARCHAR(75) UNIQUE NOT NULL,
    label VARCHAR(75) UNIQUE NOT NULL,
    organization_id VARCHAR(75) NOT NULL
);

INSERT INTO
    item_types (value, label, organization_id)
VALUES (
        'single-kayak',
        'Single Kayak',
        'org_2zD3UFiIjDVZxwafVlTY7ZFHBwC'
    ),
    (
        'double-kayak',
        'Double Kayak',
        'org_2zD3UFiIjDVZxwafVlTY7ZFHBwC'
    ),
    (
        'small-raft',
        'Small Raft',
        'org_2zD3UFiIjDVZxwafVlTY7ZFHBwC'
    ),
    (
        'round-raft',
        'Round Raft',
        'org_2zD3UFiIjDVZxwafVlTY7ZFHBwC'
    ),
    (
        'medium-raft',
        'Medium-Raft',
        'org_2zD3UFiIjDVZxwafVlTY7ZFHBwC'
    ),
    (
        'large-raft',
        'Large Raft',
        'org_2zD3UFiIjDVZxwafVlTY7ZFHBwC'
    );

CREATE TABLE items_rented (
    id SERIAL PRIMARY KEY,
    guest_name VARCHAR(150) NOT NULL,
    item_type_id INTEGER NOT NULL, -- Raft type being used
    unit_number INTEGER NOT NULL, -- Specific unit number for the raft
    checked_out_by VARCHAR(175) NOT NULL, -- Staff user who checked out the trip
    organization_id VARCHAR(175) NOT NULL,
    departure_time TIMESTAMP NOT NULL, -- Time raft departed
    arrival_time TIMESTAMP,
    checked_in_by VARCHAR(175),
    FOREIGN KEY (item_type_id) REFERENCES item_types (id) ON DELETE CASCADE
);

CREATE TABLE inventory_item (
    id SERIAL PRIMARY KEY,
    unit_number INTEGER NOT NULL,
    item_type_id INTEGER NOT NULL REFERENCES item_types (id) ON DELETE CASCADE,
    organization_id VARCHAR(175) NOT NULL,
    status BOOLEAN DEFAULT True
);

SELECT * from inventory_item;
-- Indexes for performance
CREATE INDEX idx_items_rented_checked_out_by ON items_rented (checked_out_by);
-- Index for checked_out_by
CREATE INDEX idx_items_rented_item_type_id ON items_rented (item_type_id);
-- Index for raft_type_id
CREATE INDEX idx_items_rented_unit_number ON items_rented (unit_number);
-- New index for unit_number

-- select * from items_rented