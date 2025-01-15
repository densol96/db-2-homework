package lv.solodeni.server.helper;

import java.util.LinkedHashMap;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

@Service
public class DataMapper {

    public RowMapper<LinkedHashMap<String, Object>> dynamicMapper() {
        return (rs, rowNum) -> {
            int columnCount = rs.getMetaData().getColumnCount();
            LinkedHashMap<String, Object> row = new LinkedHashMap<>();
            for (int i = 1; i <= columnCount; i++) {
                String columnName = rs.getMetaData().getColumnLabel(i);
                Object columnValue = rs.getObject(i);
                row.put(columnName, columnValue);
            }
            return row;
        };
    }

    public RowMapper<LinkedHashMap<String, Object>> getModel(String tableName) {
        switch (tableName) {
            case "users":
                return mapDataToUser();
            case "users_backup":
                return mapDataToUser();
            case "articles":
                return mapDataToArticle();
            case "tags":
                return mapDataToTag();
            case "articles_tags":
                return mapDataToArticleTag();
            case "users_articles_ratings":
                return mapDataToUserArticleRating();
            case "comments":
                return mapDataToComment();
            case "likes_per_comment":
                return mapDataToLikePerComment();
            default:
                return dynamicMapper();
        }
    }

    // "users"
    private RowMapper<LinkedHashMap<String, Object>> mapDataToUser() {
        return (rs, rowNum) -> {
            LinkedHashMap<String, Object> jsonData = new LinkedHashMap<String, Object>();
            jsonData.put("id", rs.getInt("id"));
            jsonData.put("email", rs.getString("email"));
            jsonData.put("username", rs.getString("username"));
            jsonData.put("role", rs.getString("role"));
            jsonData.put("emailIsConfirmed", rs.getString("email_is_confirmed"));
            jsonData.put("joinDate", rs.getString("join_date"));
            jsonData.put("lastOnline", rs.getString("last_online"));
            return jsonData;
        };
    }

    // "articles"
    private RowMapper<LinkedHashMap<String, Object>> mapDataToArticle() {
        return (rs, rowNum) -> {
            LinkedHashMap<String, Object> jsonData = new LinkedHashMap<>();
            jsonData.put("id", rs.getInt("id"));
            jsonData.put("title", rs.getString("title"));
            jsonData.put("text", rs.getString("text"));
            jsonData.put("headerImage", rs.getString("header_image"));
            jsonData.put("postDatetime", rs.getTimestamp("post_datetime"));
            jsonData.put("authorId", rs.getInt("author_id"));
            return jsonData;
        };
    }

    // "tags"
    private RowMapper<LinkedHashMap<String, Object>> mapDataToTag() {
        return (rs, rowNum) -> {
            LinkedHashMap<String, Object> jsonData = new LinkedHashMap<>();
            jsonData.put("id", rs.getInt("id"));
            jsonData.put("name", rs.getString("name"));
            return jsonData;
        };
    }

    // "articles_tags mapper"
    private RowMapper<LinkedHashMap<String, Object>> mapDataToArticleTag() {
        return (rs, rowNum) -> {
            LinkedHashMap<String, Object> jsonData = new LinkedHashMap<>();
            jsonData.put("id", rs.getInt("id"));
            jsonData.put("articleId", rs.getInt("article_id"));
            jsonData.put("tagId", rs.getInt("tag_id"));
            return jsonData;
        };
    }

    // "users_articles_ratings"
    private RowMapper<LinkedHashMap<String, Object>> mapDataToUserArticleRating() {
        return (rs, rowNum) -> {
            LinkedHashMap<String, Object> jsonData = new LinkedHashMap<>();
            jsonData.put("id", rs.getInt("id"));
            jsonData.put("articleId", rs.getInt("article_id"));
            jsonData.put("userId", rs.getInt("user_id"));
            jsonData.put("rating", rs.getInt("rating"));
            return jsonData;
        };
    }

    // "comments"
    private RowMapper<LinkedHashMap<String, Object>> mapDataToComment() {
        return (rs, rowNum) -> {
            LinkedHashMap<String, Object> jsonData = new LinkedHashMap<>();
            jsonData.put("id", rs.getInt("id"));
            jsonData.put("userId", rs.getInt("user_id"));
            jsonData.put("articleId", rs.getInt("article_id"));
            jsonData.put("parentCommentId", rs.getObject("parent_comment_id")); // Nullable
            jsonData.put("content", rs.getString("content"));
            jsonData.put("commentedOn", rs.getTimestamp("commented_on"));
            return jsonData;
        };
    }

    // "likes_per_comment"
    private RowMapper<LinkedHashMap<String, Object>> mapDataToLikePerComment() {
        return (rs, rowNum) -> {
            LinkedHashMap<String, Object> jsonData = new LinkedHashMap<>();
            jsonData.put("id", rs.getInt("id"));
            jsonData.put("commentId", rs.getInt("comment_id"));
            jsonData.put("userId", rs.getInt("user_id"));
            return jsonData;
        };
    }
}
