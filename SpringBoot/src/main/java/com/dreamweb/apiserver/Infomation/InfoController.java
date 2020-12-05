package com.dreamweb.apiserver.Infomation;
import org.apache.coyote.Response;
import com.dreamweb.apiserver.Infomation.InfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController

public class InfoController {
    @Autowired
    private InfoRepository infoRepository;

    @GetMapping("/api/information")
   // @RequestMapping(method = RequestMethod.GET, value = "/api/information")
    public ResponseEntity<Iterable<Information>> findAll(){
        Iterable<Information> Information = infoRepository.findAll();
        return new ResponseEntity<>(Information, HttpStatus.OK);
    }
    @PutMapping("/api/information")
    public ResponseEntity<Information> updateOne(@RequestBody Information information){
        Information updateInfo = infoRepository.save(information);
        return new ResponseEntity<>(updateInfo, HttpStatus.OK);
    }
    @PostMapping("/api/information")
    public ResponseEntity<Information> addOne(@RequestBody Information information){
        Information updateInfo = infoRepository.save(information);
        return new ResponseEntity<>(updateInfo, HttpStatus.OK);
    }
    @DeleteMapping("/api/information/{id}")
    public ResponseEntity<Integer> deleteOne(@PathVariable long id){
        return new ResponseEntity<Integer>(infoRepository.deleteOne(id),HttpStatus.OK);
    }
}
