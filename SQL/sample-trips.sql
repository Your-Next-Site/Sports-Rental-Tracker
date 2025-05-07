
-- Example insertion into rafts_on_water
INSERT INTO rafts_on_water (raft_id, checked_out_by, departure_time)
VALUES
    (1, 1, '2025-05-07 09:00:00'),  -- John using single-kayak
    (2, 1, '2025-05-07 09:30:00'),  -- Jane using double-kayak
    (3, 1, '2025-05-07 10:00:00');  -- Mike using small-raft

SELECT * FROM rafts_on_water;