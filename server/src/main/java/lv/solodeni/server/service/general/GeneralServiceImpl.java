package lv.solodeni.server.service.general;

import java.util.LinkedHashMap;
import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lv.solodeni.server.repository.GeneralRepo;

@Service
@RequiredArgsConstructor
public class GeneralServiceImpl implements IGeneralService {

    private final GeneralRepo repo;

    @Override
    public LinkedHashMap<String, Object> getAllTableNames() {
        List<String> results = repo.getAllTableNames();
        LinkedHashMap<String, Object> json = new LinkedHashMap<>();
        json.put("tableNames", results);
        json.put("tablesTotal", repo.getAllTableNames().size());
        return json;
    }

    @Override
    public LinkedHashMap<String, Object> showCreateTableScript(String tableName) {
        String result = repo.getCreateTableScript(tableName);
        LinkedHashMap<String, Object> json = new LinkedHashMap<>();
        json.put("script", result);
        return json;
    }

    @Override
    public LinkedHashMap<String, Object> showInsertTableScript(String tableName) throws Exception {
        String result = repo.getInsertTableScript(tableName);
        LinkedHashMap<String, Object> json = new LinkedHashMap<>();
        json.put("script", result);
        return json;
    }

}
