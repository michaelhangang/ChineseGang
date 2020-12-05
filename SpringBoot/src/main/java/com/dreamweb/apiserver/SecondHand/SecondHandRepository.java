package com.dreamweb.apiserver.SecondHand;

import com.dreamweb.apiserver.Infomation.Information;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository

public interface SecondHandRepository extends CrudRepository<SecondHand, Long> {
    @Modifying
    @Transactional
    @Query("delete from SecondHand where Id = ?1 ")
    int deleteOne(Long id);
}
