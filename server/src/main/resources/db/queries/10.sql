SELECT `name` FROM `tags`
WHERE `id` IN (
    SELECT `tag_id` FROM `articles_tags`
    WHERE `article_id` = (
        SELECT `id` FROM `articles`
        WHERE `title` = 'Understanding SQL Joins'
    )
);
