package lv.solodeni.server.repository;

import java.util.LinkedHashMap;
import java.util.List;

import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class UserRepo {
    private final NamedParameterJdbcTemplate template;

    public List<LinkedHashMap<String, Object>> getAll() {
        String sql = "SELECT * FROM users";
        return template.query(sql, (rs, rowNum) -> {
            LinkedHashMap<String, Object> userModel = new LinkedHashMap<String, Object>();
            userModel.put("email", rs.getString("email"));

            return userModel;
        });
    }
}
