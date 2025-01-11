SELECT u.username, COUNT(*) AS `Total articles written` FROM
users u JOIN articles a ON u.id = a.author_id
GROUP BY u.id
ORDER BY `Total articles written` DESC;