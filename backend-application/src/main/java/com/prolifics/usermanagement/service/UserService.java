package com.prolifics.usermanagement.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.prolifics.usermanagement.model.User;

/**
 * @author Aadarsh Gupta
 */
public interface UserService {
    
    User createUser(User user);
    User updateUser(Long id, User user);
    User getUserById(Long id);
    List<User> getAllUsers();
    void deleteUser(Long id);
	User addComment(Long id, String comment);
    List<User> saveUsersFromExcel(MultipartFile file) throws IOException;
}
