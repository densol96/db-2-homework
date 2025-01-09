package lv.solodeni.server.service.general;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

public interface IGeneralService {
    HashMap<String, Object> getAllTableNames();

    LinkedHashMap<String, Object> showCreateTableScript(String tableName);
}