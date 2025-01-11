SELECT c.id, c.content, COUNT(*) AS `Total likes`
FROM comments c JOIN likes_per_comment lpc ON c.id = lpc.comment_id
GROUP BY c.id
ORDER BY `Total likes` DESC
LIMIT 10;