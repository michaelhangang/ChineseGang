package com.dreamweb.apiserver.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Optional;

@CrossOrigin
@RestController
public class UsersInfoController {
    @Autowired
    private UsersInfoRepository usersInfoRepository;
    @PersistenceContext
    private EntityManager entityManager;

    @GetMapping("/api/usersinfo")
    public ResponseEntity<Iterable<UsersInfo>> findAll() {
        Iterable<UsersInfo> usersInfos = usersInfoRepository.findAll();
        return new ResponseEntity<Iterable<UsersInfo>>(usersInfos, HttpStatus.OK);
    }
    @GetMapping("/api/usersinfo/{id}")
    public ResponseEntity<UsersInfo> findOne(@PathVariable String id) {
         UsersInfo usersInfo = entityManager.find(UsersInfo.class, id);
        return new ResponseEntity<>(usersInfo, HttpStatus.OK);
    }

    @PutMapping("/api/usersinfo")
    public ResponseEntity<UsersInfo> updateOne(@RequestBody UsersInfo usersInfo) {
        UsersInfo updatedUsersInfo = usersInfoRepository.save(usersInfo);
        return new ResponseEntity<UsersInfo>(updatedUsersInfo, HttpStatus.OK);
    }
//    @PutMapping("/api/usersinfo/vip")
//    public ResponseEntity<UsersInfo> updateOneToVip(@RequestBody UsersInfo usersInfo) {
//        //usersInfo.setIsVip(true);
//        UsersInfo updatedUsersInfo = usersInfoRepository.save(usersInfo);
//        return new ResponseEntity<UsersInfo>(updatedUsersInfo, HttpStatus.OK);
//    }

    @PostMapping("/api/usersinfo")
    public ResponseEntity<UsersInfo> addOne(@RequestBody UsersInfo usersInfo) {
        UsersInfo newUsersInfo = usersInfoRepository.save(usersInfo);
        return new ResponseEntity<UsersInfo>(newUsersInfo, HttpStatus.OK);
    }
    @DeleteMapping("/api/usersinfo/{id}")
    public ResponseEntity<Integer> deleteOne(@PathVariable String id) {
        return new ResponseEntity<Integer>(usersInfoRepository.deleteOne(id), HttpStatus.OK);
    }
}
