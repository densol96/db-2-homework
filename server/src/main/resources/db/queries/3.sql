SELECT u.username AS `User with no written articles`
FROM users u LEFT JOIN articles a ON u.id = a.author_id
WHERE a.id IS NULL;