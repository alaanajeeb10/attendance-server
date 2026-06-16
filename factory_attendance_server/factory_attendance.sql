CREATE DATABASE IF NOT EXISTS factory_attendance;
USE factory_attendance;

CREATE TABLE IF NOT EXISTS workers_log (
    id int AUTO_INCREMENT NOT NULL UNIQUE,
    worker_id varchar(20) NOT NULL,
    full_name varchar(100) NOT NULL,
    action_type varchar(10) NOT NULL,
    action_date date NOT NULL,
    action_time time NOT NULL,
    note varchar(255),
    PRIMARY KEY (id)
);

INSERT INTO workers_log (worker_id, full_name, action_type, action_date, action_time, note) VALUES
('216622415','יאמן עלא אלדין','IN','2026-01-05','08:00:00','כניסה רגילה'),
('216622415','יאמן עלא אלדין','OUT','2026-01-05','16:00:00','יציאה רגילה');
-- Attendance Export File