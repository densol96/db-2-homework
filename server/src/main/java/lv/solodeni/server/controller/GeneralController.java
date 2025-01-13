package lv.solodeni.server.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import lv.solodeni.server.service.general.IGeneralService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1/")
@CrossOrigin(origins = { "http://localhost:3000", "http://127.0.0.1:3000" })
@RequiredArgsConstructor
public class GeneralController {

    private final IGeneralService service;

    @GetMapping("/tables-names-all")
    public ResponseEntity<Map<String, Object>> getTablesNames() {
        return new ResponseEntity<>(service.getAllTableNames(), HttpStatus.OK);
    }

    @GetMapping("/tables-create-script")
    public ResponseEntity<Map<String, Object>> getCreateScript(
            @RequestParam(value = "name", required = true) String tableName) {
        return new ResponseEntity<>(service.showCreateTableScript(tableName), HttpStatus.OK);
    }

    @GetMapping("/tables-insert-script")
    public ResponseEntity<Map<String, Object>> getInsertScript(
            @RequestParam(value = "name", required = true) String tableName) throws Exception {
        return new ResponseEntity<>(service.showInsertTableScript(tableName), HttpStatus.OK);
    }

    @GetMapping("/tables/{tableName}")
    public ResponseEntity<Object> getTableContent(@PathVariable String tableName,
            @RequestParam(value = "page", required = false) Integer page,
            @RequestParam(value = "rowsPerPage", required = false) Integer rowsPerPage) {
        return new ResponseEntity<>(service.getAll(tableName, page, rowsPerPage), HttpStatus.OK);
    }

    @DeleteMapping("/tables/{tableName}/{id}")
    public ResponseEntity<Map<String, Object>> getTableContent(@PathVariable String tableName,
            @PathVariable Integer id) {
        return new ResponseEntity<>(service.deleteById(tableName, id), HttpStatus.OK);
    }

    @PostMapping("/tables/{tableName}")
    public ResponseEntity<Map<String, Object>> addRow(@PathVariable String tableName,
            @RequestBody Map<String, Object> entity) {
        return new ResponseEntity<>(service.insertNew(tableName, entity), HttpStatus.OK);
    }

    @GetMapping("/queries/{queryNum}")
    public ResponseEntity<Object> getAndExecuteQuery(@PathVariable Integer queryNum) throws Exception {
        return new ResponseEntity<>(service.getAndExecuteQuery(queryNum), HttpStatus.OK);
    }

    @GetMapping("/triggers/{triggerNum}")
    public ResponseEntity<Object> getTriggerScript(@PathVariable Integer triggerNum) throws Exception {
        return new ResponseEntity<>(service.getTriggerInfo(triggerNum), HttpStatus.OK);
    }

    @GetMapping("/procedures/{procedureNum}")
    public ResponseEntity<Object> proceduresController(@PathVariable Integer procedureNum) throws Exception {
        return new ResponseEntity<>(service.getProcedure(procedureNum), HttpStatus.OK);
    }

}
