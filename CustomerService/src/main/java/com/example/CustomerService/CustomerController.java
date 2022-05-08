package com.example.CustomerService;

import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping("/customers")
    List<Customer> all() {
        return customerRepository.findAll();
    }

    @GetMapping(path = "/customers/{name}")
    public List<Customer> getCustomer(@PathVariable String name) {

        System.out.println(name);
        return customerRepository.findByItemById(name);
    }
    
     @GetMapping(path = "/customers/emails/{email}")
    public List<Customer> getCustomerByEmail(@PathVariable String email) {
        System.out.println(email);
        return customerRepository.findByItemByEmail(email);
    }

    @PostMapping(path = "/customers")
    public Customer createEmployee(@RequestBody Customer customer) {

        System.out.println(customer.getEmail());
        return customerRepository.save(customer);
    }

    @DeleteMapping("/customers/{id}")
    public Integer DeleteCustomer(@PathVariable int id) {
        customerRepository.deleteById(id);
        return id;
    }

    @PutMapping("/customers/{id}")
    Customer replaceCustomer(@RequestBody Customer newCustomer, @PathVariable int id) {

        return customerRepository.findById(id)
                .map(customer -> {
                    customer.setName(newCustomer.getName());
                    customer.setAddress(newCustomer.getAddress());
                    customer.setTel(newCustomer.getTel());
                    customer.setEmail(newCustomer.getEmail());
                    customer.setPassword(newCustomer.getPassword());
                    return customerRepository.save(customer);
                })
                .orElseGet(() -> {
                    return customerRepository.save(newCustomer);
                });
    }

    String Email;
    String status;
    Customer customer;

    @PostMapping(path = "/login")
    public HashMap<String, String> loginEmployee(@RequestParam("email") String email, @RequestParam("password") String password) {

        System.out.println(email);
        System.out.println(password);

        customer = customerRepository.loginAdmin(email, password);

        System.out.println(customer);
        if (customer.getEmail() == null ? email == null : customer.getEmail().equals(email)) {

            status = "success";
            HashMap<String, String> map;
            map = new HashMap<>();

            map.put("message", "successfully ");
            map.put("status", "true");
            map.put("error", "no");
            map.put("id", String.valueOf(customer.getId()));
            map.put("email", customer.getEmail());
            map.put("name", customer.getName());
            map.put("tel", customer.getTel());

            System.out.println(map);

            return map;
        } else {
            System.out.println("Error");
            HashMap<String, String> map2;
            map2 = new HashMap<>();

            map2.put("message", "login Fail.");
            map2.put("status", "false");
            map2.put("error", "no");

            status = "login fail";
            return map2;
        }

    }

}
