/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.EventService;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Kokila
 */
@CrossOrigin
@RestController
public class EventController {
    
    @Autowired
    private EventRepository eventRepository;

    @GetMapping("/events")
    List<Event> all() {
        return eventRepository.findAll();
    }

    @GetMapping(path = "/events/getEventById/{id}")
    public List<Event> getEvent(@PathVariable int id) {
        System.out.println(id);
        return eventRepository.findByItemById(id);
    }
    
    @GetMapping(path = "/events/getEventByName/{name}")
    public List<Event> getEventByName(@PathVariable String name) {
        System.out.println(name);
        return eventRepository.getEventByName(name);
    }

    @PostMapping(path = "/events")
    public Event createEvent(@RequestBody Event event) {

        System.out.println(event.getName());
        return eventRepository.save(event);
    }

    @DeleteMapping("/events/{id}")
    public Integer DeleteEvent(@PathVariable int id) {
        eventRepository.deleteById(id);
        return id;
    }

    @PutMapping("/events/{id}")
    Event replaceEvent(@RequestBody Event newEvent, @PathVariable int id) {

        return eventRepository.findById(id)
                .map(event -> {
                    event.setName(newEvent.getName());
                    event.setDescription(newEvent.getDescription());
                    event.setDate(newEvent.getDate());
                    event.setTime(newEvent.getTime());
                    event.setTp(newEvent.getTp());
                    event.setLocation(newEvent.getLocation());
                    return eventRepository.save(event);
                })
                .orElseGet(() -> {
                    return eventRepository.save(newEvent);
                });
    }
    
}
