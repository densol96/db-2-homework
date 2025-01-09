package lv.solodeni.server.repository;

import java.util.List;

import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

// Map<String, Object> params = new HashMap<>();
// params.put("id", id);
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
}
