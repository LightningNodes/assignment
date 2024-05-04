import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class Pi42CryptoTrackerApplication {

    public static void main(String[] args) {
        SpringApplication.run(Pi42CryptoTrackerApplication.class, args);
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hello from Pi42 Crypto Tracker!";
    }
}
