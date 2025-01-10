package lv.solodeni.server.service.general;

import java.util.LinkedHashMap;

public interface IGeneralService {
    LinkedHashMap<String, Object> getAllTableNames();

    LinkedHashMap<String, Object> showCreateTableScript(String tableName);

    LinkedHashMap<String, Object> showInsertTableScript(String tableName) throws Exception;
}