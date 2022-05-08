/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.AdoptionService;

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
public class AdoptionController {
    
    @Autowired
    private AdoptionRepository adoptionRepository;

    @GetMapping("/adoptions")
    List<Adoption> all() {
        return adoptionRepository.findAll();
    }

    @GetMapping(path = "/adoptions/{name}")
    public List<Adoption> getAdoption(@PathVariable String name) {
        System.out.println(name);
        return adoptionRepository.findByItemByName(name);
    }
    
    @PostMapping(path = "/adoptions")
    public Adoption createAdoption(@RequestBody Adoption adoption) {
        System.out.println(adoption.getOwner());
        return adoptionRepository.save(adoption);
    }

    @DeleteMapping("/adoptions/{id}")
    public Integer DeleteAdoption(@PathVariable int id) {
        adoptionRepository.deleteById(id);
        return id;
    }

    @PutMapping("/adoptions/{id}")
    Adoption replaceCustomer(@RequestBody Adoption newAdoption, @PathVariable int id) {

        return adoptionRepository.findById(id)
                .map(adoption -> {
                    adoption.setPet_image(newAdoption.getPet_image());
                    adoption.setPet_name(newAdoption.getPet_name());
                    adoption.setOwner(newAdoption.getOwner());
                    adoption.setDate(newAdoption.getDate());
                    return adoptionRepository.save(adoption);
                })
                .orElseGet(() -> {
                    return adoptionRepository.save(newAdoption);
                });
    }

    
}
