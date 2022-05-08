/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.AdoptionService;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author Kokila
 */
public interface AdoptionRepository extends JpaRepository<Adoption, Integer> {
    @Query("select c from Adoption c where c.pet_image = ?1")
    List<Adoption> findByItemByName(String name);
}
