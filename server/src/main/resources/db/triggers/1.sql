DROP TRIGGER IF EXISTS like_delete_user;

DELIMITER $$
CREATE TRIGGER like_delete_user
AFTER DELETE ON users
FOR EACH ROW
BEGIN
    INSERT INTO users_backup (
        id, email, username, password, role,
        email_is_confirmed, join_date, last_online
    )
    VALUES (
        OLD.id, OLD.email, OLD.username, OLD.password, OLD.role,
        OLD.email_is_confirmed, OLD.join_date, OLD.last_online
    );
END$$

DELIMITER ;
