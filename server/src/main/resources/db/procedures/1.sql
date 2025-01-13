DROP PROCEDURE IF EXISTS log_trigger;

DELIMITER $$
CREATE PROCEDURE log_trigger(IN in_trigger_name VARCHAR(255), IN lv_time BOOLEAN)
BEGIN
    INSERT INTO trigger_logs(`when`, `type`, `name`, `datetime`)
    SELECT 
        action_timing AS `when`,
        event_manipulation AS `type`, 
        trigger_name AS `name`,
        CASE 
            WHEN lv_time THEN DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 2 HOUR)
            ELSE CURRENT_TIMESTAMP
        END AS `datetime`
    FROM information_schema.triggers
    WHERE trigger_name = in_trigger_name;
END$$
DELIMITER ;