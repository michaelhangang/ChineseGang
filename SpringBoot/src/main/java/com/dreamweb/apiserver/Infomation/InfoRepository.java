package com.dreamweb.apiserver.Infomation;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository

public interface InfoRepository extends CrudRepository<Information, Long> {
    @Modifying
    @Transactional
    @Query("delete from Information where Id = ?1 ")
    int deleteOne(Long id);
}
