package lv.solodeni.server.dto;

import java.util.List;

public record ResultsDto<T>(
        String status,
        List<T> results,
        String message) {
}
