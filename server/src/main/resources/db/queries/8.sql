SELECT a.title, COUNT(*) AS `H.m.t Alice commented on each article?`
FROM articles a JOIN comments c ON a.id = c.article_id
WHERE c.user_id = (
    SELECT id FROM users WHERE username = 'alice'
)
GROUP BY a.id
ORDER BY COUNT(*) DESC;