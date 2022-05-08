/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.EventService;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Kokila
 */
@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {
    @Query("select c from Event c where c.name = ?1")
    List<Event> getEventByName(String name);
    
    @Query("select c from Event c where c.id = ?1")
    List<Event> findByItemById(int id);
    
}
