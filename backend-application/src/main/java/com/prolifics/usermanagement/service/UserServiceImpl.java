package com.prolifics.usermanagement.service;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.management.RuntimeErrorException;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.prolifics.usermanagement.exception.ResourceNotFoundException;
import com.prolifics.usermanagement.model.User;
import com.prolifics.usermanagement.repository.UserRepository;
/**
 * @author Aadarsh Gupta
 */

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
    private UserRepository userRepository;

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(Long id, User user) {
        User existingUser = userRepository.findById(id)
        		.orElseThrow(()-> new RuntimeErrorException(null, "User not found"));
        
        if(!existingUser.getEmpId().equals(user.getEmpId()) && userRepository.existsByEmpId(user.getEmpId())) {
        	throw new RuntimeException("EmpId already exists");
        }
        existingUser.setEmpId(user.getEmpId());
        existingUser.setName(user.getName());
        existingUser.setEmail(user.getEmail());
        existingUser.setPassword(user.getPassword());
        return userRepository.save(existingUser);
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
    
    @Override
    public User addComment(Long id, String comment) {
    	Optional<User> commentUser = userRepository.findById(id);
    	if(commentUser.isPresent()) {
    		User user = commentUser.get();
    		user.setComment(comment);
    		return userRepository.save(user);
    	}
    	throw new RuntimeErrorException(null, "User not found");
    }
    
    
    // Import Excel data through this service
    @Override
    public List<User> saveUsersFromExcel(MultipartFile file) throws IOException {
        List<User> users = new ArrayList<>();
        
        try (InputStream inputStream = file.getInputStream();
             Workbook workbook = new XSSFWorkbook(inputStream)) {
            
            Sheet sheet = workbook.getSheetAt(0);
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                
                String empId = row.getCell(0).getStringCellValue();
                String name = row.getCell(1).getStringCellValue();
                String email = row.getCell(2).getStringCellValue();
                String password = row.getCell(3).getStringCellValue();
                
                // Checking that user exist in database or not 
                Optional<User> existingUserChecking = userRepository.findByEmpId(empId);
                
                if(existingUserChecking.isPresent()) {
                	
                	User existingUser = existingUserChecking.get();
                	existingUser.setName(name);
                	existingUser.setEmail(email);
                	existingUser.setPassword(password);
                	users.add(userRepository.save(existingUser)); // This will update the users in the database
                } else {
                	// If the users does not exist then adding 
                	User newUser = new User();
                	newUser.setEmpId(empId);
                	newUser.setName(name);
                	newUser.setEmail(email);
                	newUser.setPassword(password);
                	users.add(userRepository.save(newUser));
                }
                
            }
        }
        return users;
    }

}
