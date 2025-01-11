public class Testik {
    public static void main(String[] args) {
        String str = "No value supplied for the SQL parameter 'role': No value registered for key 'role'";
        var res = str.split(":")[1].split("'")[1];
        System.out.println(res[0]);
        System.out.println(res[1]);
    }
}
