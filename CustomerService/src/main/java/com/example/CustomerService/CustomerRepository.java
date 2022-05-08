/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.CustomerService;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Kokila
 */
@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    @Query("select a from Customer a where a.id = ?1")
    List<Customer> findByAdminId(Integer id);

    @Query("SELECT e FROM Customer e WHERE e.email = ?1 AND e.password = ?2")
    Customer loginAdmin(String email, String password);

    @Query("select c from Customer c where c.name = ?1")
    List<Customer> findByItemById(String name);
    
    @Query("select c from Customer c where c.email = ?1")
    List<Customer> findByItemByEmail(String email);
    
}
