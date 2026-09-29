package com.employee.management.service;

import com.employee.management.dto.LoginRequest;
import com.employee.management.dto.LoginResponse;
import com.employee.management.dto.UserSignupRequest;

public interface AuthService {

    void signup(UserSignupRequest request);

    LoginResponse login(LoginRequest request);
}