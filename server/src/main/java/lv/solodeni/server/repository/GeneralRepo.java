package lv.solodeni.server.repository;

import java.util.List;

import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import lv.solodeni.server.exception.InvalidTableNameException;

@Repository
@RequiredArgsConstructor
public class GeneralRepo {

    private final NamedParameterJdbcTemplate template;

    public List<String> getAllTableNames() {
        String sql = """
                SELECT table_name
                FROM information_schema.tables
                WHERE table_type = 'BASE TABLE' AND TABLE_SCHEMA = 'db';
                """;
        return template.query(sql, (rs, rowNum) -> rs.getString("table_name"));
    }

    public String getCreateTableScript(String tableName) {
        String sql = "SHOW CREATE TABLE " + tableName;
        String test;
        try {
            test = template.query(sql, (rs, rowNum) -> rs.getString("Create Table")).get(0);
        } catch (BadSqlGrammarException e) {
            throw new InvalidTableNameException("There is table with the name of " + tableName);
        }
        return test;
    }
}
