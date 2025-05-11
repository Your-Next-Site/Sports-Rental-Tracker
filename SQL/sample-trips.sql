-- Example insertion into rafts_on_water
INSERT INTO
    rafts_on_water (
        raft_type_id,
        unit_number,
        guest_name,
        checked_out_by,
        departure_time,
        arrival_time
    )
VALUES (
        1,
        101,
        'John Smith',
        1,
        '2025-05-11 09:00:00',
        '2025-05-11 12:30:00'
    ),
    (
        2,
        102,
        'Jane Doe',
        1,
        '2025-05-11 11:30:00',
        '2025-05-11 13:45:00'
    ),
    (
        3,
        103,
        'Mike Wilson',
        1,
        '2025-05-08 10:00:00',
        '2025-05-11 1:30:00'
    );

-- Example insertion into rafts_on_water
INSERT INTO
    rafts_on_water (
        raft_type_id,
        unit_number,
        guest_name,
        checked_out_by,
        departure_time
    )
VALUES (
        1,
        101,
        'Bob Smith',
        1,
        '2025-05-11 16:00:00'
    ),
    (
        2,
        102,
        'Jake Doe',
        1,
        '2025-05-11 17:30:00'
    ),
    (
        1,
        101,
        'James Smith',
        1,
        '2025-05-11 16:30:00'
    );