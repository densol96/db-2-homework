package lv.solodeni.server.service.general;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lv.solodeni.server.exception.InvalidTableNameException;
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
        json.put("tablesTotal", results.size());
        return json;
    }

    @Override
    public LinkedHashMap<String, Object> showCreateTableScript(String tableName) {

        List<String> tableNames = repo.getAllTableNames();

        if (!tableNames.contains(tableName))
            throw new InvalidTableNameException("There is table with the name of " + tableName);

        String result = repo.getCreateTableScript(tableName);
        LinkedHashMap<String, Object> json = new LinkedHashMap<>();
        json.put("script", result);
        return json;
    }

    @Override
    public LinkedHashMap<String, Object> showInsertTableScript(String tableName) throws Exception {
        List<String> tableNames = repo.getAllTableNames();

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

        LinkedHashMap<String, Object> json = new LinkedHashMap<>();
        json.put("script", insertQuery);
        return json;
    }

    @Override
    public List<Map<String, Object>> getAll(String tableName) {
        List<String> tableNames = repo.getAllTableNames();

        if (!tableNames.contains(tableName))
            throw new InvalidTableNameException("There is table with the name of " + tableName);

        return repo.getAll(tableName).stream().map((jsonData) -> (Map<String, Object>) jsonData).toList();
    }

}
