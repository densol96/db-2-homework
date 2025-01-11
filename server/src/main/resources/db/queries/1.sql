SELECT title, post_datetime AS `Posted on`, 'bob' AS 'Posted by' FROM articles
WHERE author_id = (
    SELECT id FROM users
    WHERE username = 'bob'
)
ORDER BY title ASC, post_datetime ASC;