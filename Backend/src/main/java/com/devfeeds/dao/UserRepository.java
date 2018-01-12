package com.devfeeds.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.devfeeds.entities.User;

public interface UserRepository extends JpaRepository<User,Long> {
	
	public User findOneByFacebookKey(String facebookKey);
	
	@Query("SELECT COUNT(u.username) FROM User u WHERE u.username=:username")
	public int existeUserByusername (@Param("username") String username);
	
	
}
