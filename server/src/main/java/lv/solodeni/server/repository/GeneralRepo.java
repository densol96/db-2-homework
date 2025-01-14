package lv.solodeni.server.repository;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.sql.Types;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.jdbc.core.PreparedStatementCallback;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lv.solodeni.server.exception.InvalidInputException;
import lv.solodeni.server.exception.InvalidTableNameException;
import lv.solodeni.server.helper.DataMapper;

@Repository
@RequiredArgsConstructor
public class GeneralRepo {

    private final NamedParameterJdbcTemplate template;
    private final DataMapper dataMapper;

    @Value("${spring.datasource.url}")
    private String dataSourceUrl;

    public List<String> getAllTableNames() {
        String dbName = dataSourceUrl.replace("jdbc:mysql://localhost:3307/", "")
                .replace("?createDatabaseIfNotExist=true", "");

        String sql = """
                SELECT table_name
                FROM information_schema.tables
                WHERE table_type = 'BASE TABLE' AND TABLE_SCHEMA = '%db_name%';
                """.replace("%db_name%", dbName);

        return template.query(sql, (rs, rowNum) -> rs.getString("table_name"));
    }

    public String getCreateTableScript(String tableName) {
        String sql = "SHOW CREATE TABLE " + tableName;
        return template.query(sql, (rs, rowNum) -> rs.getString("Create Table")).get(0);
    }

    public List<LinkedHashMap<String, Object>> getAll(String tableName) {
        String sql = "SELECT * FROM " + tableName;
        return template.query(sql, dataMapper.getModel(tableName));
    }

    public List<LinkedHashMap<String, Object>> getByPage(String tableName, Integer offset, Integer limit) {
        String sql = "SELECT * FROM " + tableName + " LIMIT " + limit + " OFFSET " + offset;
        return template.query(sql, dataMapper.getModel(tableName));
    }

    public Integer countRows(String tableName) {
        String sql = "SELECT COUNT(*) AS total FROM " + tableName;
        return template.query(sql, (rs, intRow) -> rs.getInt("total")).get(0);
    }

    public Integer deleteById(String tableName, Integer id) {
        String sql = "DELETE FROM `" + tableName + "` WHERE id = " + id;
        return template.update(sql, new HashMap<>());
    }

    public Integer createNew(String tableName, Map<String, Object> params) {
        String sql = selectInsertQuery(tableName);
        while (true) {
            try {
                return template.update(sql, params);
            } catch (InvalidDataAccessApiUsageException e) {
                String missingFieldName = e.getMessage().split(":")[1].split("'")[1];
                params.put(missingFieldName, null);
                System.out.println(e);
            }
        }
    }

    public List<LinkedHashMap<String, Object>> runQuery(String sql) {
        return template.query(sql, dataMapper.dynamicMapper());
    }

    @Transactional
    public String callProcedure(Integer procedureNum) {
        template.execute("CALL get_article_rating(1, @result)", (ps) -> ps.execute());
        template.query("SELECT @result AS result", (rs, intRow) -> {
            System.out.println(rs.getDouble("result"));
            return "testing";
        });
        return "in testing";
    }

    private String getProcedureScript(Integer procedureNum) {
        switch (procedureNum) {
            case 1:
                return "CALL get_article_rating(:articleId, :result)";
            case 2:
                return "CALL get_article_rating(:articleId, :result)";
            case 3:
                return "CALL get_article_rating(:articleId, :result)";
            default:
                throw new InvalidInputException("Invalid trigger number. Only 1-3 are available.");

        }
    }

    private String selectInsertQuery(String tableName) {
        switch (tableName) {
            case "users":
                return "INSERT INTO `users` (`email`, `username`, `password`, `role`) VALUES (:email, :username, :password, :role)";
            case "articles":
                return "INSERT INTO `articles` (`title`, `text`, `header_image`, `author_id`) VALUES (:title, :text, :header_image, :author_id)";
            case "tags":
                return "INSERT INTO `tags` (`name`) VALUES (:name)";
            case "articles_tags":
                return "INSERT INTO `articles_tags` (`article_id`, `tag_id`) VALUES (:article_id, :tag_id)";
            case "users_articles_ratings":
                return "INSERT INTO `users_articles_ratings` (`article_id`, `user_id`, `rating`) VALUES (:article_id, :user_id, :rating)";
            case "comments":
                return "INSERT INTO `comments` (`user_id`, `article_id`, `parent_comment_id`, `content`) VALUES (:user_id, :article_id, :parent_comment_id, :content)";
            case "likes_per_comment":
                return "INSERT INTO `likes_per_comment` (`comment_id`, `user_id`) VALUES (:comment_id, :user_id)";
            default:
                throw new InvalidTableNameException("Unknown table name of " + tableName);
        }
    }

}