DROP TRIGGER IF EXISTS special_register;

DELIMITER $$
CREATE TRIGGER special_register
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
    IF NEW.role IS NOT NULL AND NEW.role NOT IN ('admin', 'editor', 'user') THEN
        SET @err_msg = CONCAT('Invalid role value: ', NEW.role);
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = @err_msg;
    END IF;

    IF NEW.role = 'admin' OR NEW.role = 'editor' THEN
        SET NEW.email_is_confirmed = TRUE;
    ELSE
        SET NEW.email_is_confirmed = FALSE;
    END IF;
    CALL log_trigger('special_register', TRUE);
END$$
DELIMITER ;