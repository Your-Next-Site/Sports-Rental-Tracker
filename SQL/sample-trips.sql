-- Active: 1746404521261@@ep-raspy-sky-a6wtkpjb-pooler.us-west-2.aws.neon.tech@5432@neondb
-- Example insertion into rafts_on_water
INSERT INTO rafts_on_water (raft_type_id, unit_number, guest_name, checked_out_by, departure_time)
VALUES
    (1, 101, 'John Smith', 1, '2025-05-07 09:00:00'),  
    (2, 102, 'Jane Doe', 1, '2025-05-07 09:30:00'),  
    (3, 103, 'Mike Wilson', 1, '2025-05-07 10:00:00');  

-- Select all records to view the trips
SELECT * FROM rafts_on_water;
