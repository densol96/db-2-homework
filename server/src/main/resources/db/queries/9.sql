SELECT `rating`, COUNT(*) AS `Votes` FROM `users_articles_ratings`
WHERE `article_id` = (
    SELECT `id` FROM `articles`
    WHERE `title` = 'Understanding SQL Joins'
)
GROUP BY `rating`
ORDER BY `Votes` DESC;