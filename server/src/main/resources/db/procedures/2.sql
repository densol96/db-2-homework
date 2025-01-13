DROP FUNCTION IF EXISTS get_most_popular_article;

DELIMITER $$
CREATE FUNCTION get_most_popular_article()
RETURNS JSON
READS SQL DATA
BEGIN
    DECLARE a_id INT;
    DECLARE a_title VARCHAR(255);
    DECLARE a_rating DECIMAL(3,2);
    DECLARE avg_rating_between_all DECIMAL(3,2);

    WITH
    articles_and_rating_each AS (
        SELECT 
            article_id, 
            AVG(rating) AS article_rating
        FROM 
            users_articles_ratings
        GROUP BY 
            article_id
    ),
    avg_rating_among_all AS (
        SELECT 
            AVG(article_rating) AS avg_between_all 
        FROM 
            articles_and_rating_each
    )
    SELECT article_id, title, article_rating, (SELECT avg_between_all FROM avg_rating_among_all)
    INTO a_id, a_title, a_rating, avg_rating_between_all
    FROM
        (SELECT article_id, article_rating 
        FROM articles_and_rating_each
        ORDER BY 
            article_rating DESC LIMIT 1) AS with_best_rating 
        JOIN articles ON with_best_rating.article_id = articles.id;

    RETURN JSON_OBJECT('id', a_id, 'title', a_title, 'rating', a_rating, 'articles_average_rating', avg_rating_between_all);
END$$
DELIMITER ;