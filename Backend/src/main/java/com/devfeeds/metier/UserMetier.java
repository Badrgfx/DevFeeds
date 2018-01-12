package com.devfeeds.metier;

import java.util.List;

import com.devfeeds.entities.User;


public interface UserMetier {
	
	public List<User> listUsers();
	public User saveUser(User user);
	public void deleteUser(Long id);
	public User findUser(Long id);
	public User getUserbyFacebookKey(String facebookKey);
	public int existeUserByusername (String username);

}
