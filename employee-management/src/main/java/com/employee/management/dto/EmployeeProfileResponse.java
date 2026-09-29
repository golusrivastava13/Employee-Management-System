package com.employee.management.dto;

import com.employee.management.entity.EmployeeStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeProfileResponse {

    private Long id;

    private String employeeCode;

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private String gender;

    private LocalDate dateOfBirth;

    private Long departmentId;

    private String departmentName;

    private String designation;

    private BigDecimal salary;

    private LocalDate joiningDate;

    private String address;

    private String city;

    private String state;

    private String country;

    private EmployeeStatus status;
}