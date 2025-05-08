-- Example insertion into rafts_on_water
INSERT INTO rafts_on_water (raft_type_id, unit_number, guest_name, checked_out_by, departure_time)
VALUES
    (1, 101, 'John Smith', 1, '2025-05-07 09:00:00'),  -- John using single-kayak (raft_type_id = 1, unit_number = 101)
    (2, 102, 'Jane Doe', 1, '2025-05-07 09:30:00'),  -- Jane using double-kayak (raft_type_id = 2, unit_number = 102)
    (3, 103, 'Mike Wilson', 1, '2025-05-07 10:00:00');  -- Mike using small-raft (raft_type_id = 3, unit_number = 103)

-- Select all records to view the trips
SELECT * FROM rafts_on_water;
