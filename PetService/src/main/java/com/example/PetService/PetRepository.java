/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.PetService;

import com.example.PetService.Pet;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Kokila
 */
@Repository
public interface PetRepository extends JpaRepository<Pet, Integer> {
    @Query("select c from Pet c where c.pet_name = ?1")
    List<Pet> getPetByName(String name);
    
    @Query("select c from Pet c where c.id = ?1")
    List<Pet> findByPetById(int id);
    
}
