package lv.solodeni.server.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lv.solodeni.server.service.general.IGeneralService;

import org.springframework.web.bind.annotation.GetMapping;

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

}
