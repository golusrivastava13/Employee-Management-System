package com.employee.management.controller;

import com.employee.management.dto.EmployeeProfileRequest;
import com.employee.management.dto.EmployeeProfileResponse;
import com.employee.management.dto.UserProfileResponse;
import com.employee.management.entity.Role;
import com.employee.management.entity.User;
import com.employee.management.repository.UserRepository;
import com.employee.management.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class EmployeeProfileController {

    private final EmployeeService employeeService;

    private final UserRepository userRepository;


    // ================= GET MY PROFILE =================

    @GetMapping
    public ResponseEntity<?> getMyProfile(
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found with email: " + email
                        )
                );

        /*
         * ADMIN profile comes from User table
         */
        if (user.getRole() == Role.ADMIN) {

            UserProfileResponse response =
                    new UserProfileResponse(
                            user.getId(),
                            user.getName(),
                            user.getEmail(),
                            user.getPhone(),
                            user.getRole()
                    );

            return ResponseEntity.ok(response);
        }

        /*
         * EMPLOYEE profile comes from Employee table
         */
        return ResponseEntity.ok(
                employeeService.getMyProfile(email)
        );
    }


    // ================= UPDATE MY PROFILE =================

    @PutMapping
    public ResponseEntity<?> updateMyProfile(
            Authentication authentication,
            @Valid @RequestBody EmployeeProfileRequest request) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found with email: " + email
                        )
                );

        /*
         * ADMIN can update basic User information
         */
        if (user.getRole() == Role.ADMIN) {

            String fullName =
                    request.getFirstName()
                            + " "
                            + request.getLastName();

            user.setName(fullName.trim());
            user.setPhone(request.getPhone());

            User updatedUser =
                    userRepository.save(user);

            UserProfileResponse response =
                    new UserProfileResponse(
                            updatedUser.getId(),
                            updatedUser.getName(),
                            updatedUser.getEmail(),
                            updatedUser.getPhone(),
                            updatedUser.getRole()
                    );

            return ResponseEntity.ok(response);
        }

        /*
         * EMPLOYEE profile update
         */
        return ResponseEntity.ok(
                employeeService.updateMyProfile(
                        email,
                        request
                )
        );
    }
}