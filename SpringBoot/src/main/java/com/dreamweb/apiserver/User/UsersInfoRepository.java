package com.dreamweb.apiserver.User;


import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface UsersInfoRepository extends CrudRepository<UsersInfo, String> {
    @Modifying
    @Transactional
    @Query("delete from UsersInfo where Id = ?1 ")
    int deleteOne(String id);
}
