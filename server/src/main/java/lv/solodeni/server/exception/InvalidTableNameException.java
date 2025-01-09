package lv.solodeni.server.exception;

public class InvalidTableNameException extends RuntimeException {
    public InvalidTableNameException(String message) {
        super(message);
    }
}
