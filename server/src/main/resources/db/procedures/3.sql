DROP PROCEDURE IF EXISTS update_all_article_ratings;

DELIMITER $$
CREATE PROCEDURE update_all_article_ratings()
BEGIN
    DECLARE done BOOLEAN DEFAULT FALSE;
    DECLARE article_id_from_cursor INT;

    DECLARE article_cursor CURSOR FOR SELECT id FROM articles;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN article_cursor;

    my_loop: LOOP
        FETCH article_cursor INTO article_id_from_cursor; 

        IF done THEN
            LEAVE my_loop;
        END IF;

        UPDATE articles
        SET rating_average = (
            SELECT AVG(rating)
            FROM users_articles_ratings
            WHERE article_id = article_id_from_cursor
        )
        WHERE id = article_id_from_cursor;
    END LOOP;

    CLOSE article_cursor;
END$$
DELIMITER ;