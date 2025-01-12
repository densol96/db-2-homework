DROP TRIGGER IF EXISTS update_article_rating_avg;

DELIMITER $$
CREATE TRIGGER update_article_rating_avg
AFTER INSERT ON users_articles_ratings
FOR EACH ROW
BEGIN
    DECLARE total INT DEFAULT 0;
    DECLARE sum INT DEFAULT 0;

    SELECT COUNT(*) INTO total
    FROM users_articles_ratings
    WHERE article_id = NEW.article_id;

    SELECT SUM(rating) INTO sum
    FROM users_articles_ratings
    WHERE article_id = NEW.article_id;

    IF total > 0 THEN
        UPDATE articles
        SET rating_average = sum / total
        WHERE id = NEW.article_id;
    END IF;
END$$

DELIMITER ;