package com.employee.management.repository;

import com.employee.management.entity.Employee;
import com.employee.management.entity.EmployeeStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmployeeCode(
            String employeeCode
    );

    boolean existsByEmployeeCode(
            String employeeCode
    );

    boolean existsByEmail(
            String email
    );

    Optional<Employee> findByEmail(
            String email
    );

    List<Employee> findByDepartmentId(
            Long departmentId
    );

    List<Employee> findByStatus(
            EmployeeStatus status
    );

    long countByStatus(
            EmployeeStatus status
    );

    long countByDepartmentId(
            Long departmentId
    );

    Page<Employee>
    findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrEmployeeCodeContainingIgnoreCase(
            String firstName,
            String lastName,
            String email,
            String employeeCode,
            Pageable pageable
    );

    Page<Employee> findByDepartmentId(
            Long departmentId,
            Pageable pageable
    );

    Page<Employee> findByStatus(
            EmployeeStatus status,
            Pageable pageable
    );

    Page<Employee> findByDepartmentIdAndStatus(
            Long departmentId,
            EmployeeStatus status,
            Pageable pageable
    );
}