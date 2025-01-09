package lv.solodeni.server.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lv.solodeni.server.service.general.IGeneralService;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin(origins = { "http://localhost:3000", "http://127.0.0.1:3000" })
@RequiredArgsConstructor
public class UserController {

    private final IGeneralService service;

    @GetMapping("/tables-names-all")
    public ResponseEntity<Map<String, Object>> register() {
        return new ResponseEntity<>(service.getAllTableNames(), HttpStatus.OK);
    }
}
