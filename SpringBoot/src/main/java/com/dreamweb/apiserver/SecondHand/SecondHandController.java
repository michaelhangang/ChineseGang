package com.dreamweb.apiserver.SecondHand;
import com.dreamweb.apiserver.Infomation.Information;
import org.apache.coyote.Response;
import com.dreamweb.apiserver.Infomation.InfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController

public class SecondHandController {
    @Autowired
    private SecondHandRepository secondHandRepository;

    @GetMapping("/api/secondHand")
   // @RequestMapping(method = RequestMethod.GET, value = "/api/information")
    public ResponseEntity<Iterable<SecondHand>> findAll(){
        Iterable<SecondHand> secondHands = secondHandRepository.findAll();
        return new ResponseEntity<>(secondHands, HttpStatus.OK);
    }
    @PutMapping("/api/secondHand")
    public ResponseEntity<SecondHand> updateOne(@RequestBody SecondHand secondHand){
        SecondHand updateInfo = secondHandRepository.save(secondHand);
        return new ResponseEntity<>(updateInfo, HttpStatus.OK);
    }
    @PostMapping("/api/secondHand")
    public ResponseEntity<SecondHand> addOne(@RequestBody SecondHand secondHand){
        SecondHand updateInfo = secondHandRepository.save(secondHand);
        return new ResponseEntity<>(updateInfo, HttpStatus.OK);
    }
    @DeleteMapping("/api/secondHand/{id}")
    public ResponseEntity<Integer> deleteOne(@PathVariable long id){
        return new ResponseEntity<Integer>(secondHandRepository.deleteOne(id),HttpStatus.OK);
    }
}
