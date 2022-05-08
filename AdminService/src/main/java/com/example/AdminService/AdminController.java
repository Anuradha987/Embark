/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.AdminService;

import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Kokila
 */

@CrossOrigin
@RestController
public class AdminController {
    
     @Autowired
    private AdminRepository adminRepository;
    
  @GetMapping("/admins")
  List<Admin> all() {
    return adminRepository.findAll();
  }
  
  
    @GetMapping(path = "/admins/{id}")
    public List<Admin> getAdmin(@PathVariable Integer id) {
        return adminRepository.findByAdminId(id);
    }
    
    String Email;
    String status;
    Admin admin;
    
    
    @PostMapping(path = "/adminlogin")
    public HashMap<String, String> loginEmployee(@RequestParam("email") String email,@RequestParam("password") String password){
    
         System.out.println(email);
         System.out.println(password);
        
        admin = adminRepository.loginAdmin(email, password);
        
        System.out.println(admin.getAddress());
        System.out.println(admin);
    if( admin.getEmail() == null ? email == null : admin.getEmail().equals(email)){
        
        status =  "success";
        HashMap<String, String> map;
             map = new HashMap<>();
        
        map.put("message", "successfully ");
        map.put("status", "true");
        map.put("error", "no");
        map.put("name", admin.getFirstName());
        map.put("address", admin.getAddress());
        map.put("id", String.valueOf(admin.getId()));
        map.put("email", admin.getEmail());
        
        System.out.println(map);
        
    return map;
    }
    
    else {  
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
