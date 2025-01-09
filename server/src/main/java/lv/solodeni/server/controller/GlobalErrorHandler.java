package lv.solodeni.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lv.solodeni.server.dto.ErrorDto;
import lv.solodeni.server.exception.InvalidTableNameException;

@RestControllerAdvice
public class GlobalErrorHandler {

    @ExceptionHandler(InvalidTableNameException.class)
    public ResponseEntity<ErrorDto> badSqlInput(InvalidTableNameException e) {
        return new ResponseEntity<>(new ErrorDto(e.getMessage()), HttpStatus.BAD_REQUEST);
    }
}
