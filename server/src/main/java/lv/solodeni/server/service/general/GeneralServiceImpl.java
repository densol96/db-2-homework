package lv.solodeni.server.service.general;

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lv.solodeni.server.exception.GeneralException;
import lv.solodeni.server.exception.InvalidInputException;
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
    public LinkedHashMap<String, Object> getAll(String tableName, Integer page, Integer rowsPerPage) {
        System.out.println("I RUN");
        final int DEFAULT_ROWS_PER_PAGE = 5;

        List<String> tableNames = repo.getAllTableNames();

        if (!tableNames.contains(tableName))
            throw new InvalidTableNameException("There is no table with the name of " + tableName);
        int totalResults = repo.countRows(tableName);

        LinkedHashMap<String, Object> json = new LinkedHashMap<>();

        if (totalResults == 0) {
            json.put("pagesTotal", 0);
            json.put("resultsTotal", 0);
            json.put("result", new ArrayList<>());
            return json;
        }

        rowsPerPage = (rowsPerPage != null ? rowsPerPage : DEFAULT_ROWS_PER_PAGE);
        int pagesTotal = (int) Math.ceil(totalResults / (double) rowsPerPage);

        if (page != null && (page < 1 || page > pagesTotal))
            throw new InvalidInputException(
                    "Ivalid page namber of " + page + " (total pages: %%)".replace("%%", "" + pagesTotal));

        json.put("pagesTotal", pagesTotal);
        json.put("resultsTotal", totalResults);
        json.put("result", (page == null
                ? repo.getAll(tableName)
                : repo.getByPage(tableName, (page - 1) * rowsPerPage, rowsPerPage))
                .stream().map((jsonData) -> (Map<String, Object>) jsonData).toList());
        return json;
    }

    @Override
    public Map<String, Object> deleteById(String tableName, Integer id) {
        if (id == null || id < 0)
            throw new InvalidInputException("Invalid id of " + id);
        if (!repo.getAllTableNames().contains(tableName))
            throw new InvalidTableNameException("There is table with the name of " + tableName);
        int rowsAffected = repo.deleteById(tableName, id);
        var json = new LinkedHashMap<String, Object>();
        json.put("status", rowsAffected == 1 ? "success" : "error");
        json.put("rowsAffected", rowsAffected);
        return json;
    }

    @Override
    public Map<String, Object> insertNew(String tableName, Map<String, Object> entity) {
        int rowsAffected = repo.createNew(tableName, entity);
        var json = new LinkedHashMap<String, Object>();
        json.put("status", rowsAffected == 1 ? "success" : "error");
        json.put("rowsAffected", rowsAffected);
        return json;
    }

    @Override
    public Map<String, Object> getAndExecuteQuery(Integer queryNum) {
        if (queryNum < 1 || queryNum > 10)
            throw new InvalidInputException("Invalid query number. Only 1-10 are available for query.");
        String fileName = queryNum + ".sql";
        try {
            String script = Files
                    .readString(Paths.get(ClassLoader.getSystemResource("db/queries/" + fileName).toURI()));
            List<LinkedHashMap<String, Object>> result = repo.runQuery(script);
            Map<String, Object> json = new LinkedHashMap<>();
            json.put("script", script);
            json.put("result", result);
            return json;
        } catch (Exception e) {
            // error logging will happen in global handler and general message sent to
            // client
            throw new GeneralException(e.getMessage());
        }
    }

    @Override
    public Map<String, Object> getTriggerInfo(Integer triggerNum) {
        if (triggerNum < 1 || triggerNum > 3)
            throw new InvalidInputException("Invalid trigger number. Only 1-3 are available.");

        String fileName = triggerNum + ".sql";
        try {
            String script = Files
                    .readString(Paths.get(ClassLoader.getSystemResource("db/triggers/" + fileName).toURI()));
            Map<String, Object> json = new LinkedHashMap<>();
            json.put("script", script);
            json.put("info", getTriggerDescription(triggerNum));
            return json;
        } catch (IOException | URISyntaxException e) {
            // error logging will happen in global handler and general message sent to
            // client
            throw new GeneralException(e.getMessage());
        }
    }

    @Override
    public Map<String, Object> getProcedure(Integer procedureNum) {
        if (procedureNum < 1 || procedureNum > 3)
            throw new InvalidInputException("Invalid procedure number. Only 1-3 are available.");
        String fileName = procedureNum + ".sql";
        try {
            String script = Files
                    .readString(Paths.get(ClassLoader.getSystemResource("db/procedures/" + fileName).toURI()));
            Map<String, Object> json = new LinkedHashMap<>();
            var result = repo.callProcedure(1);
            System.out.println(result);
            json.put("script", script);
            json.put("info", getProcedureDescription(procedureNum));
            return json;
        } catch (IOException | URISyntaxException e) {
            // error logging will happen in global handler and general message sent to
            // client
            throw new GeneralException(e.getMessage());
        }
    }

    private String getTriggerDescription(Integer triggerNum) {
        switch (triggerNum) {
            case 1:
                return "Šis triggers tiek izveidots, lai pēc ieraksta dzēšanas no users tabulas automātiski ierakstītu dzēsto lietotāju datus users_backup tabulā.";
            case 2:
                return "Šis triggers tiek izveidots, lai pirms jauna lietotāja ieraksta pievienošanas users tabulā pārbaudītu, vai role vērtība ir derīga. Ja loma ir admin vai editor, tiek automātiski iestatīts email_is_confirmed uz TRUE, citādi uz FALSE.";
            case 3:
                return "Šis triggers tiek izveidots, lai pēc jauna ieraksta pievienošanas users_articles_ratings tabulā automātiski aprēķinātu un atjauninātu raksta vidējo vērtējumu articles tabulā. Pēc katras jaunas atsauksmes tiek aprēķināts visu atsauksmju skaits un to vērtējumu summa, lai iegūtu jaunu vidējo vērtējumu rakstam.";
            default:
                throw new InvalidInputException("Invalid trigger number. Only 1-3 are available.");
        }
    }

    private String getProcedureDescription(Integer procedureNum) {
        switch (procedureNum) {
            case 1:
                return "Šis triggers tiek izveidots, lai pēc ieraksta dzēšanas no users tabulas automātiski ierakstītu dzēsto lietotāju datus users_backup tabulā.";
            case 2:
                return "Šis triggers tiek izveidots, lai pirms jauna lietotāja ieraksta pievienošanas users tabulā pārbaudītu, vai role vērtība ir derīga. Ja loma ir admin vai editor, tiek automātiski iestatīts email_is_confirmed uz TRUE, citādi uz FALSE.";
            case 3:
                return "Šis triggers tiek izveidots, lai pēc jauna ieraksta pievienošanas users_articles_ratings tabulā automātiski aprēķinātu un atjauninātu raksta vidējo vērtējumu articles tabulā. Pēc katras jaunas atsauksmes tiek aprēķināts visu atsauksmju skaits un to vērtējumu summa, lai iegūtu jaunu vidējo vērtējumu rakstam.";
            default:
                throw new InvalidInputException("Invalid trigger number. Only 1-3 are available.");
        }
    }

}