package com.prolifics.usermanagement.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.prolifics.usermanagement.model.User;

/**
 * @author Aadarsh Gupta
 */
public interface UserRepository extends JpaRepository<User, Long>{

	Optional<User> findByEmpId(String empId);

	boolean existsByEmpId(String empId);
	
}
