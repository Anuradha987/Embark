/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.PetService;

import com.example.PetService.Pet;
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
public class PetController {
    @Autowired
    private PetRepository petRepository;

    @GetMapping("/pets")
    List<Pet> all() {
        return petRepository.findAll();
    }

    @GetMapping(path = "/pets/getPetById/{id}")
    public List<Pet> getPet(@PathVariable int id) {
        System.out.println(id);
        return petRepository.findByPetById(id);
    }
    
    @GetMapping(path = "/pets/getPetByName/{name}")
    public List<Pet> getPetByName(@PathVariable String name) {
        System.out.println(name);
        return petRepository.getPetByName(name);
    }

    @PostMapping(path = "/pets")
    public Pet createPet(@RequestBody Pet event) {

        System.out.println(event.getPet_name());
        return petRepository.save(event);
    }

    @DeleteMapping("/pets/{id}")
    public Integer DeletePet(@PathVariable int id) {
        petRepository.deleteById(id);
        return id;
    }

    @PutMapping("/pets/{id}")
    Pet replacePet(@RequestBody Pet newPet, @PathVariable int id) {

        return petRepository.findById(id)
                .map(event -> {
                    event.setPet_image(newPet.getPet_image());
                    event.setPet_name(newPet.getPet_name());
                    event.setGender(newPet.getGender());
                    event.setAge(newPet.getAge());
                    event.setDescription(newPet.getDescription());
                    event.setVaccinated(newPet.getVaccinated());
                    event.setAdopted(newPet.getAdopted());
                    return petRepository.save(event);
                })
                .orElseGet(() -> {
                    return petRepository.save(newPet);
                });
    }
}
