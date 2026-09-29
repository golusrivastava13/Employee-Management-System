package com.employee.management.service;

import com.employee.management.dto.EmployeePageResponse;
import com.employee.management.dto.EmployeeProfileRequest;
import com.employee.management.dto.EmployeeProfileResponse;
import com.employee.management.dto.EmployeeRequest;
import com.employee.management.dto.EmployeeResponse;
import com.employee.management.entity.EmployeeStatus;

import java.util.List;

public interface EmployeeService {

    EmployeeResponse createEmployee(
            EmployeeRequest request
    );

    List<EmployeeResponse> getAllEmployees();

    EmployeePageResponse getEmployees(
            int page,
            int size,
            String sortBy,
            String direction,
            String search,
            Long departmentId,
            EmployeeStatus status
    );

    EmployeeResponse getEmployeeById(
            Long id
    );

    EmployeeResponse updateEmployee(
            Long id,
            EmployeeRequest request
    );

    void deleteEmployee(
            Long id
    );

    EmployeeResponse updateEmployeeStatus(
            Long id,
            EmployeeStatus status
    );

    EmployeeProfileResponse getMyProfile(
            String email
    );

    EmployeeProfileResponse updateMyProfile(
            String email,
            EmployeeProfileRequest request
    );
}