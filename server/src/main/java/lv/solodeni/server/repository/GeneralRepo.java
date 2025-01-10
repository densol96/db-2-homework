package lv.solodeni.server.repository;

import java.nio.file.Files;
import java.nio.file.Paths;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import lv.solodeni.server.exception.InvalidTableNameException;

@Repository
@RequiredArgsConstructor
public class GeneralRepo {

    private final NamedParameterJdbcTemplate template;

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
        List<String> tableNames = getAllTableNames();

        if (!tableNames.contains(tableName))
            throw new InvalidTableNameException("There is table with the name of " + tableName);

        String sql = "SHOW CREATE TABLE " + tableName;
        return template.query(sql, (rs, rowNum) -> rs.getString("Create Table")).get(0);
    }

    public String getInsertTableScript(String tableName) throws Exception {
        List<String> tableNames = getAllTableNames();

        if (!tableNames.contains(tableName))
            throw new InvalidTableNameException("There is table with the name of " + tableName);

        List<String> lines = Files.readAllLines(Paths.get(ClassLoader.getSystemResource("db/init/data.sql").toURI()))
                .stream().map(line -> line + "{{ END OF LINE }}").toList();

        String insertQuery = "";
        boolean addFromNowOn = false;
        for (String line : lines) {
            if (line.contains(tableName))
                addFromNowOn = true;

            if (addFromNowOn)
                insertQuery += line.replace("{{ END OF LINE }}", "");

            if (addFromNowOn && line.contains(";{{ END OF LINE }}"))
                break;

        }
        return insertQuery;
    }
}