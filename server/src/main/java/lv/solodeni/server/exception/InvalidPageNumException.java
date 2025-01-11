package lv.solodeni.server.exception;

public class InvalidPageNumException extends RuntimeException {
    public InvalidPageNumException(String message) {
        super(message);
    }
}
