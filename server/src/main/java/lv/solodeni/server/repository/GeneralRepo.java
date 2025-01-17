package lv.solodeni.server.repository;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lv.solodeni.server.exception.InvalidInputException;
import lv.solodeni.server.exception.InvalidTableNameException;
import lv.solodeni.server.helper.DataMapper;

enum ProcedureType {
    FUNCTION(2), PROCEDURE(3);

    private final int procedureNum;

    ProcedureType(int procedureNum) {
        this.procedureNum = procedureNum;
    }

    public int getProcedureNum() {
        return procedureNum;
    }
}

@Repository
@RequiredArgsConstructor
public class GeneralRepo {

    private final NamedParameterJdbcTemplate template;
    private final DataMapper dataMapper;

    @Value("${spring.datasource.url}")
    private String dataSourceUrl;

    public List<String> getAllTableNames() {
        String dbName = getDbName();

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
        return template.query(sql, dataMapper.dynamicMapper());
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
    public Map<String, Object> callProcedure(Integer procedureNum) {
        // procedureNum: 1 is not callable, 2 is function, 3 is procedure. so this is
        // sort of hardcoded, but no point to make it more complex when we have only 2
        // options
        LinkedHashMap<String, Object> json = new LinkedHashMap<>();
        if (procedureNum == ProcedureType.FUNCTION.getProcedureNum()) {
            template.query("SELECT get_most_popular_article() as 'result';", (rs, intRow) -> {
                String jsonString = rs.getString("result");
                ObjectMapper objectMapper = new ObjectMapper();
                try {
                    json.put("result", objectMapper.readTree(jsonString));
                } catch (Exception e) {
                    // json.put("result", null);
                    System.out.println("Unable to parse jsonString. An enpty map will be returned to the client.");
                }
                return null;
            });
        } else if (procedureNum == ProcedureType.PROCEDURE.getProcedureNum()) {
            template.execute("CALL update_all_article_ratings()", (ps) -> ps.execute());
            json.put("result", "All articles' ratings were updated and available for display in the table.");
        }

        return json;
    }

    private String getDbName() {
        return dataSourceUrl.replace("jdbc:mysql://localhost:3307/", "")
                .replace("?createDatabaseIfNotExist=true", "");
    }

    public List<String> getColumnNames(String tableName) {
        String sql = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = '%db_name%' AND TABLE_NAME = '%table_name%';"
                .replace("%db_name%", getDbName()).replace("%table_name%", tableName);

        return template.query(sql, (rs, rowNum) -> rs.getString("COLUMN_NAME"));
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