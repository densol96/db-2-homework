package lv.solodeni.server.service.general;

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;

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
    public List<String> getColumnNames(String tableName) {
        List<String> tableNames = repo.getAllTableNames();

        if (!tableNames.contains(tableName))
            throw new InvalidTableNameException("There is no table with the name of " + tableName);

        return repo.getColumnNames(tableName);
    }

    @Override
    public LinkedHashMap<String, Object> showCreateTableScript(String tableName) {

        List<String> tableNames = repo.getAllTableNames();

        if (!tableNames.contains(tableName))
            throw new InvalidTableNameException("There is no table with the name of " + tableName);

        String result = repo.getCreateTableScript(tableName);
        LinkedHashMap<String, Object> json = new LinkedHashMap<>();
        json.put("script", result);
        return json;
    }

    @Override
    public LinkedHashMap<String, Object> showInsertTableScript(String tableName) throws Exception {
        List<String> tableNames = repo.getAllTableNames();

        if (!tableNames.contains(tableName))
            throw new InvalidTableNameException("There is no table with the name of " + tableName);

        List<String> lines = Files.readAllLines(Paths.get(ClassLoader.getSystemResource("db/init/data.sql").toURI()))
                .stream().map(line -> line + "{{ END OF LINE }}").toList();

        String insertQuery = "";
        boolean addFromNowOn = false;
        for (String line : lines) {
            if (line.contains(tableName))
                addFromNowOn = true;

            if (addFromNowOn)
                insertQuery += line.replace("{{ END OF LINE }}", "\n");

            if (addFromNowOn && line.contains(";{{ END OF LINE }}"))
                break;

        }

        LinkedHashMap<String, Object> json = new LinkedHashMap<>();
        json.put("script", insertQuery);
        return json;
    }

    @Override
    public LinkedHashMap<String, Object> getAll(String tableName, Integer page, Integer rowsPerPage) {
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

        if (page != null && page < 1)
            throw new InvalidInputException(
                    "Ivalid page namber of " + page + " (total pages: %%)".replace("%%", "" + pagesTotal));
        if (page > pagesTotal) {
            json.put("pagesTotal", pagesTotal);
            json.put("resultsTotal", totalResults);
            json.put("result", new ArrayList<>());
            return json;
        }

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
            throw new InvalidTableNameException("There is no table with the name of " + tableName);
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
            json.put("description", getQueryDescription(queryNum));
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
            json.put("description", getTriggerDescription(triggerNum));
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
            json.put("script", script);
            json.put("description", getProcedureDescription(procedureNum));
            json.put("isCallable", isProcedureCallable(procedureNum));
            return json;
        } catch (IOException | URISyntaxException e) {
            // error logging will happen in global handler and general message sent to
            // client
            throw new GeneralException(e.getMessage());
        }
    }

    @Override
    public Map<String, Object> callProcedure(Integer procedureNum) {
        return repo.callProcedure(procedureNum);
    }

    private String getQueryDescription(Integer queryNum) {
        switch (queryNum) {
            case 1:
                return "Mērķis — iegūt sarakstu ar rakstiem, kurus uzrakstījis konkrēts autors (bob), sakārtotus pēc nosaukuma un publicēšanas laika.";
            case 2:
                return "Mērķis — parādīt, cik rakstus ir uzrakstījis katrs lietotājs, sakārtojot lietotājus pēc uzrakstīto rakstu skaita dilstošā secībā.";
            case 3:
                return "Mērķis — atrast lietotājus, kuri vēl nav uzrakstījuši nevienu rakstu.";
            case 4:
                return "Mērķis — atrast visus rakstus, kas saistīti ar konkrētu atslēgvārdu (šajā gadījumā \"Database\").";
            case 5:
                return "Mērķis — parādīt rakstus ar to vidējo vērtējumu un atsauksmju kopējo skaitu, sakārtojot tos pēc vidējā vērtējuma dilstošā secībā, pēc atsauksmju skaita un tad pēc nosaukuma.";
            case 6:
                return "Mērķis — atrast komentāru saturu ar vislielāko patīk skaitu (maksimālo \"like\" vērtību).";
            case 7:
                return "Mērķis — atrast 10 populārākos komentārus pēc \"like\" skaita.";
            case 8:
                return "Mērķis — noteikt, cik komentārus lietotājs \"alice\" ir atstājis katrā rakstā, un parādīt rakstus sakārtotus pēc komentāru skaita dilstošā secībā.";
            case 9:
                return "Mērķis — iegūt vērtējumus un to skaitu konkrētam rakstam ar nosaukumu \"Understanding SQL Joins\", sakārtotus pēc balsojumu skaita dilstošā secībā.";
            case 10:
                return "Mērķis — iegūt visus atslēgvārdus (tags), kas saistīti ar rakstu ar nosaukumu \"Understanding SQL Joins\".";
            default:
                throw new InvalidInputException("Invalid trigger number. Only 1-3 are available.");
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
                return "Šī procedūra log_trigger tiek izmantota, lai reģistrētu informāciju par konkrētu triggeri (notikumu), kas tiek izpildīts. Procedūra ievieto datus tabulā trigger_logs, saglabājot informāciju par triggera veidu, nosaukumu un laiku.";
            case 2:
                return "Šī funkcija get_most_popular_article tiek izmantota, lai atrastu un atgrieztu vispopulārāko rakstu, pamatojoties uz tā vidējo vērtējumu, salīdzinot ar visiem citiem rakstiem.";
            case 3:
                return "Šī procedūra update_all_article_ratings tiek izmantota, lai atjauninātu visiem rakstiem (articles) to vidējo vērtējumu (rating_average), balstoties uz vērtējumiem no tabulas users_articles_ratings.";
            default:
                throw new InvalidInputException("Invalid trigger number. Only 1-3 are available.");
        }
    }

    private boolean isProcedureCallable(Integer procedureNum) {
        switch (procedureNum) {
            case 1:
                return false;
            case 2:
                return true;
            case 3:
                return true;
            default:
                return false;
        }

    }

}