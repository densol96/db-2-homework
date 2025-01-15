package lv.solodeni.server.controller;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.UncategorizedSQLException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import lv.solodeni.server.dto.ErrorDto;
import lv.solodeni.server.exception.InvalidInputException;
import lv.solodeni.server.exception.InvalidTableNameException;

@RestControllerAdvice
public class GlobalErrorHandler {

    @ExceptionHandler({ InvalidTableNameException.class, InvalidInputException.class })
    public ResponseEntity<ErrorDto> badSqlInput(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>(new ErrorDto(e.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, String>> badFkConstraintViolationqlInput(Exception e) {
        String message = e.getMessage();

        System.out.println("===========================================");
        System.out.println(message);
        System.out.println("===========================================");

        String[] arr = message.split(";");
        String reason = arr[arr.length - 1].trim();

        Map<String, String> response = new LinkedHashMap<>();
        response.put("isDataViolation", "true");
        response.put("message",
                "Failure due to a foreign key constraint");
        response.put("reason", reason);

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidDataAccessApiUsageException.class)
    public ResponseEntity<ErrorDto> missingFields(Exception e) {
        // e.getMessage(): "No value supplied for the SQL parameter 'role': No value
        // registered for key 'role'"
        String missingFieldName = e.getMessage().split(":")[1].split("'")[1];
        return new ResponseEntity<>(new ErrorDto("No value supplied for the field: " + missingFieldName),
                HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({ MethodArgumentTypeMismatchException.class, NoResourceFoundException.class })
    public ResponseEntity<ErrorDto> invalidUrlPath(Exception e) {
        return new ResponseEntity<>(new ErrorDto("Invalid URL path. Re-check and try again!"),
                HttpStatus.SERVICE_UNAVAILABLE);
    }

    @ExceptionHandler(UncategorizedSQLException.class)
    public ResponseEntity<ErrorDto> invalidDataFormat(UncategorizedSQLException e) {
        return new ResponseEntity<>(new ErrorDto("Invalid data format"),
                HttpStatus.SERVICE_UNAVAILABLE);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDto> unexpected(Exception e) {
        System.out.println("===========================================");
        System.out.println("UNEXPECTED EXCEPTION:");
        System.out.println(e.getMessage());
        e.printStackTrace();
        System.out.println("===========================================");
        return new ResponseEntity<>(new ErrorDto("Service is currently unavailable"), HttpStatus.SERVICE_UNAVAILABLE);
    }
}