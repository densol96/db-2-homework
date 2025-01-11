package lv.solodeni.server.service.general;

import java.nio.file.Files;
import java.nio.file.Paths;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lv.solodeni.server.exception.InvalidIdException;
import lv.solodeni.server.exception.InvalidPageNumException;
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
    public List<Map<String, Object>> getAll(String tableName, Integer page, Integer rowsPerPage) {

        final int DEFAULT_ROWS_PER_PAGE = 5;

        List<String> tableNames = repo.getAllTableNames();
        if (!tableNames.contains(tableName))
            throw new InvalidTableNameException("There is table with the name of " + tableName);

        int totalResults = repo.countRows(tableName);
        rowsPerPage = (rowsPerPage != null ? rowsPerPage : DEFAULT_ROWS_PER_PAGE);
        int pagesTotal = (int) Math.ceil(totalResults / (double) rowsPerPage);

        if (page != null && (page < 1 || page > pagesTotal))
            throw new InvalidPageNumException(
                    "Ivalid page namber of " + page + " (total pages: %%)".replace("%%", "" + pagesTotal));

        return (page == null
                ? repo.getAll(tableName)
                : repo.getByPage(tableName, (page - 1) * rowsPerPage, rowsPerPage))
                .stream().map((jsonData) -> (Map<String, Object>) jsonData).toList();
    }

    @Override
    public Map<String, Object> deleteById(String tableName, Integer id) {
        if (id == null || id < 0)
            throw new InvalidIdException("Invalid id of " + id);
        if (!repo.getAllTableNames().contains(tableName))
            throw new InvalidTableNameException("There is table with the name of " + tableName);
        int rowsAffected = repo.deleteById(tableName, id);
        var json = new LinkedHashMap<String, Object>();
        json.put("status", rowsAffected == 1 ? "success" : "error");
        json.put("rowsAffected", rowsAffected);
        return json;
    }

}
