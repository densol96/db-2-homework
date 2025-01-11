SELECT title FROM articles
WHERE id IN (
    SELECT article_id FROM articles_tags
    WHERE tag_id = (
        SELECT id from tags
        WHERE name = "Database"
    )
);