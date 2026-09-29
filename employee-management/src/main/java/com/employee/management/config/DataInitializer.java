package com.employee.management.config;

import com.employee.management.entity.Department;
import com.employee.management.entity.Employee;
import com.employee.management.entity.EmployeeStatus;
import com.employee.management.entity.Role;
import com.employee.management.entity.User;
import com.employee.management.repository.DepartmentRepository;
import com.employee.management.repository.EmployeeRepository;
import com.employee.management.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        createDefaultUsers();
        createDefaultDepartments();
        createDefaultEmployees();
    }

    // -------------------------------------------------
    // USERS
    // -------------------------------------------------

    private void createDefaultUsers() {

        // Create ADMIN
        if (!userRepository.existsByEmail("admin@gmail.com")) {

            User admin = new User();

            admin.setName("System Admin");
            admin.setEmail("admin@gmail.com");

            admin.setPassword(
                    passwordEncoder.encode("Admin@123")
            );

            admin.setPhone("9999999999");
            admin.setRole(Role.ADMIN);

            userRepository.save(admin);

            System.out.println(
                    "Default ADMIN created: admin@gmail.com"
            );
        }

        // Create EMPLOYEE
        if (!userRepository.existsByEmail(
                "employee@gmail.com")) {

            User employee = new User();

            employee.setName("John Employee");
            employee.setEmail("employee@gmail.com");

            employee.setPassword(
                    passwordEncoder.encode("Employee@123")
            );

            employee.setPhone("8888888888");
            employee.setRole(Role.EMPLOYEE);

            userRepository.save(employee);

            System.out.println(
                    "Default EMPLOYEE created: employee@gmail.com"
            );
        }
    }

    // -------------------------------------------------
    // DEPARTMENTS
    // -------------------------------------------------

    private void createDefaultDepartments() {

        Department itDepartment =
                createDepartmentIfNotExists(
                        "IT",
                        "Information Technology Department"
                );

        Department hrDepartment =
                createDepartmentIfNotExists(
                        "HR",
                        "Human Resources Department"
                );

        Department financeDepartment =
                createDepartmentIfNotExists(
                        "Finance",
                        "Finance and Accounts Department"
                );

        System.out.println("Default departments checked/created.");
    }

    private Department createDepartmentIfNotExists(
            String name,
            String description) {

        return departmentRepository
                .findByName(name)
                .orElseGet(() -> {

                    Department department =
                            new Department();

                    department.setName(name);
                    department.setDescription(description);
                    department.setStatus(true);

                    return departmentRepository.save(
                            department
                    );
                });
    }

    // -------------------------------------------------
    // EMPLOYEES
    // -------------------------------------------------

    private void createDefaultEmployees() {

        if (employeeRepository
                .existsByEmployeeCode("EMP001")) {

            return;
        }

        Department itDepartment =
                departmentRepository
                        .findByName("IT")
                        .orElse(null);

        if (itDepartment == null) {
            return;
        }

        Employee employee = new Employee();

        employee.setEmployeeCode("EMP001");
        employee.setFirstName("John");
        employee.setLastName("Doe");
        employee.setEmail("john.doe@gmail.com");
        employee.setPhone("7777777777");
        employee.setGender("Male");
        employee.setDateOfBirth(
                LocalDate.of(1998, 5, 10)
        );

        employee.setDepartment(itDepartment);

        employee.setDesignation("Software Developer");

        employee.setSalary(
                BigDecimal.valueOf(45000)
        );

        employee.setJoiningDate(
                LocalDate.of(2025, 7, 1)
        );

        employee.setAddress(
                "Bangalore"
        );

        employee.setCity(
                "Bangalore"
        );

        employee.setState(
                "Karnataka"
        );

        employee.setCountry(
                "India"
        );

        employee.setStatus(
                EmployeeStatus.ACTIVE
        );

        employeeRepository.save(employee);

        System.out.println(
                "Default employee created: EMP001"
        );
    }
}