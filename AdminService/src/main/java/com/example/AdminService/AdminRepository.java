/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.AdminService;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Kokila
 */

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    

      @Query("select a from Admin a where a.id = ?1")
    List<Admin> findByAdminId(Integer id);
    
     @Query("SELECT e FROM Admin e WHERE e.email = ?1 AND e.password = ?2")
    Admin loginAdmin(String email, String password);
    
    
}
