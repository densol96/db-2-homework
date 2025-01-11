package lv.solodeni.server.service.general;

import java.util.List;
import java.util.Map;

public interface IGeneralService {
    Map<String, Object> getAllTableNames();

    Map<String, Object> showCreateTableScript(String tableName);

    Map<String, Object> showInsertTableScript(String tableName) throws Exception;

    List<Map<String, Object>> getAll(String tableName, Integer page, Integer rowsPerPage);

    Map<String, Object> deleteById(String tableName, Integer id);

    Map<String, Object> insertNew(String tableName, Map<String, Object> entity);
}