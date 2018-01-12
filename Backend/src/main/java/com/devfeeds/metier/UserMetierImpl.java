package com.devfeeds.metier;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.devfeeds.dao.UserRepository;
import com.devfeeds.entities.User;

@Service
public class UserMetierImpl implements UserMetier{
	@Autowired
	private UserRepository userRepository;

	@Override
	public List<User> listUsers() {
		return userRepository.findAll();
	}

	@Override
	public User saveUser(User user) {
		return userRepository.save(user);
	}

	@Override
	public void deleteUser(Long id) {
		userRepository.delete(id);
		
	}

	@Override
	public User findUser(Long id) {
		return userRepository.findOne(id);
	}

	@Override
	public User getUserbyFacebookKey(String facebookKey) {
		User u = this.userRepository.findOneByFacebookKey(facebookKey);
			if (u == null) {
				return new User();
			} 
				return u;
		
	}

	@Override
	public int existeUserByusername(String username) {
		return userRepository.existeUserByusername(username);
	}

}
