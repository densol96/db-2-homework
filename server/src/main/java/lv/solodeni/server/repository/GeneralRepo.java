package lv.solodeni.server.repository;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.ResultSet;
import java.util.LinkedHashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
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

}