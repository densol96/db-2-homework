SELECT content FROM comments
WHERE id IN (
    SELECT comment_id FROM likes_per_comment
    GROUP BY comment_id
    HAVING COUNT(*) = (
       SELECT MAX(`total_likes`) AS `total_per_best_comment` FROM (
            SELECT COUNT(*) AS `total_likes` FROM likes_per_comment
            GROUP BY comment_id
        ) AS total_likes_per_comment
    )
);