SELECT title, `Average rating`, `Reviews total` FROM (
    SELECT article_id, ROUND(AVG(rating), 2) AS 'Average rating', COUNT(rating) AS 'Reviews total'
    FROM users_articles_ratings
    GROUP BY article_id) AS rating_per_article JOIN articles ON rating_per_article.article_id = articles.id
ORDER BY  `Average rating` DESC, `Reviews total` DESC, title ASC;