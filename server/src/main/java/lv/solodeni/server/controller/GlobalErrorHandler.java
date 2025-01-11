package lv.solodeni.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lv.solodeni.server.dto.ErrorDto;
import lv.solodeni.server.exception.InvalidPageNumException;
import lv.solodeni.server.exception.InvalidTableNameException;

@RestControllerAdvice
public class GlobalErrorHandler {

    @ExceptionHandler({ InvalidTableNameException.class, InvalidPageNumException.class })
    public ResponseEntity<ErrorDto> badSqlInput(Exception e) {
        return new ResponseEntity<>(new ErrorDto(e.getMessage()), HttpStatus.BAD_REQUEST);
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