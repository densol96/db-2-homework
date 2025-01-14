package lv.solodeni.server.service.general;

import java.util.Map;

public interface IGeneralService {
    Map<String, Object> getAllTableNames();

    Map<String, Object> showCreateTableScript(String tableName);

    Map<String, Object> showInsertTableScript(String tableName) throws Exception;

    Map<String, Object> getAll(String tableName, Integer page, Integer rowsPerPage);

    Map<String, Object> deleteById(String tableName, Integer id);

    Map<String, Object> insertNew(String tableName, Map<String, Object> entity);

    Map<String, Object> getAndExecuteQuery(Integer queryNum);

    Map<String, Object> getTriggerInfo(Integer triggerNum);

    Map<String, Object> getProcedure(Integer procedureNum);
}