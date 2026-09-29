package com.employee.management.service.impl;

import com.employee.management.dto.*;
import com.employee.management.entity.Department;
import com.employee.management.entity.Employee;
import com.employee.management.entity.EmployeeStatus;
import com.employee.management.exception.BadRequestException;
import com.employee.management.exception.ResourceNotFoundException;
import com.employee.management.repository.DepartmentRepository;
import com.employee.management.repository.EmployeeRepository;
import com.employee.management.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.employee.management.entity.User;
import com.employee.management.repository.UserRepository;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl
        implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    private final DepartmentRepository departmentRepository;

    private final UserRepository userRepository;

    @Override
    public EmployeeResponse createEmployee(
            EmployeeRequest request) {

        if (employeeRepository.existsByEmployeeCode(
                request.getEmployeeCode())) {

            throw new BadRequestException(
                    "Employee code already exists: "
                            + request.getEmployeeCode()
            );
        }

        if (employeeRepository.existsByEmail(
                request.getEmail())) {

            throw new BadRequestException(
                    "Employee email already exists: "
                            + request.getEmail()
            );
        }

        Department department =
                departmentRepository.findById(
                        request.getDepartmentId()
                ).orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Department not found with id: "
                                        + request.getDepartmentId()
                        )
                );

        Employee employee = new Employee();

        employee.setEmployeeCode(
                request.getEmployeeCode()
        );

        employee.setFirstName(
                request.getFirstName()
        );

        employee.setLastName(
                request.getLastName()
        );

        employee.setEmail(
                request.getEmail()
        );

        employee.setPhone(
                request.getPhone()
        );

        employee.setGender(
                request.getGender()
        );

        employee.setDateOfBirth(
                request.getDateOfBirth()
        );

        employee.setDepartment(
                department
        );

        employee.setDesignation(
                request.getDesignation()
        );

        employee.setSalary(
                request.getSalary()
        );

        employee.setJoiningDate(
                request.getJoiningDate()
        );

        employee.setAddress(
                request.getAddress()
        );

        employee.setCity(
                request.getCity()
        );

        employee.setState(
                request.getState()
        );

        employee.setCountry(
                request.getCountry()
        );

        employee.setStatus(
                request.getStatus()
        );

        Employee savedEmployee =
                employeeRepository.save(employee);

        return mapToResponse(savedEmployee);
    }


    // GET ALL - OLD API
    @Override
    public List<EmployeeResponse> getAllEmployees() {

        return employeeRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    // SEARCH + FILTER + PAGINATION + SORTING
    @Override
    public EmployeePageResponse getEmployees(
            int page,
            int size,
            String sortBy,
            String direction,
            String search,
            Long departmentId,
            EmployeeStatus status) {

        if (page < 0) {
            throw new BadRequestException(
                    "Page number cannot be negative"
            );
        }

        if (size <= 0) {
            throw new BadRequestException(
                    "Page size must be greater than zero"
            );
        }

        if (size > 100) {
            throw new BadRequestException(
                    "Page size cannot exceed 100"
            );
        }

        Sort.Direction sortDirection;

        try {

            sortDirection =
                    Sort.Direction.fromString(
                            direction
                    );

        } catch (IllegalArgumentException exception) {

            throw new BadRequestException(
                    "Direction must be ASC or DESC"
            );
        }

        Pageable pageable =
                PageRequest.of(
                        page,
                        size,
                        Sort.by(
                                sortDirection,
                                sortBy
                        )
                );

        Page<Employee> employeePage;

        boolean hasSearch =
                search != null
                        && !search.trim().isEmpty();

        if (hasSearch) {

            String searchText =
                    search.trim();

            employeePage =
                    employeeRepository
                            .findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrEmployeeCodeContainingIgnoreCase(
                                    searchText,
                                    searchText,
                                    searchText,
                                    searchText,
                                    pageable
                            );

        } else if (departmentId != null
                && status != null) {

            employeePage =
                    employeeRepository
                            .findByDepartmentIdAndStatus(
                                    departmentId,
                                    status,
                                    pageable
                            );

        } else if (departmentId != null) {

            employeePage =
                    employeeRepository
                            .findByDepartmentId(
                                    departmentId,
                                    pageable
                            );

        } else if (status != null) {

            employeePage =
                    employeeRepository
                            .findByStatus(
                                    status,
                                    pageable
                            );

        } else {

            employeePage =
                    employeeRepository
                            .findAll(pageable);
        }

        List<EmployeeResponse> employees =
                employeePage.getContent()
                        .stream()
                        .map(this::mapToResponse)
                        .toList();

        return new EmployeePageResponse(
                employees,
                employeePage.getNumber(),
                employeePage.getSize(),
                employeePage.getTotalElements(),
                employeePage.getTotalPages(),
                employeePage.isFirst(),
                employeePage.isLast()
        );
    }

    // GET BY ID
    @Override
    public EmployeeResponse getEmployeeById(
            Long id) {

        Employee employee =
                employeeRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Employee not found with id: "
                                                + id
                                )
                        );

        return mapToResponse(employee);
    }



    @Override
    public EmployeeResponse updateEmployee(
            Long id,
            EmployeeRequest request) {

        Employee employee =
                employeeRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Employee not found with id: "
                                                + id
                                )
                        );

        if (!employee.getEmployeeCode()
                .equalsIgnoreCase(
                        request.getEmployeeCode()
                )
                && employeeRepository
                .existsByEmployeeCode(
                        request.getEmployeeCode()
                )) {

            throw new BadRequestException(
                    "Employee code already exists: "
                            + request.getEmployeeCode()
            );
        }

        if (!employee.getEmail()
                .equalsIgnoreCase(
                        request.getEmail()
                )
                && employeeRepository
                .existsByEmail(
                        request.getEmail()
                )) {

            throw new BadRequestException(
                    "Employee email already exists: "
                            + request.getEmail()
            );
        }

        Department department =
                departmentRepository.findById(
                        request.getDepartmentId()
                ).orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Department not found with id: "
                                        + request.getDepartmentId()
                        )
                );

        employee.setEmployeeCode(
                request.getEmployeeCode()
        );

        employee.setFirstName(
                request.getFirstName()
        );

        employee.setLastName(
                request.getLastName()
        );

        employee.setEmail(
                request.getEmail()
        );

        employee.setPhone(
                request.getPhone()
        );

        employee.setGender(
                request.getGender()
        );

        employee.setDateOfBirth(
                request.getDateOfBirth()
        );

        employee.setDepartment(
                department
        );

        employee.setDesignation(
                request.getDesignation()
        );

        employee.setSalary(
                request.getSalary()
        );

        employee.setJoiningDate(
                request.getJoiningDate()
        );

        employee.setAddress(
                request.getAddress()
        );

        employee.setCity(
                request.getCity()
        );

        employee.setState(
                request.getState()
        );

        employee.setCountry(
                request.getCountry()
        );

        employee.setStatus(
                request.getStatus()
        );

        Employee updatedEmployee =
                employeeRepository.save(employee);

        return mapToResponse(updatedEmployee);
    }


    @Override
    public void deleteEmployee(Long id) {

        Employee employee =
                employeeRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Employee not found with id: "
                                                + id
                                )
                        );

        employeeRepository.delete(employee);
    }


    @Override
    public EmployeeResponse updateEmployeeStatus(
            Long id,
            EmployeeStatus status) {

        Employee employee =
                employeeRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Employee not found with id: "
                                                + id
                                )
                        );

        employee.setStatus(status);

        Employee updatedEmployee =
                employeeRepository.save(employee);

        return mapToResponse(updatedEmployee);
    }

    @Override
    @Transactional(readOnly = true)
    public EmployeeProfileResponse getMyProfile(String email) {
        Employee employee = employeeRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee profile not found with email: "
                                        + email
                        )
                );

        return mapToProfileResponse(employee);
    }

    @Override
    @Transactional
    public EmployeeProfileResponse updateMyProfile(String email, EmployeeProfileRequest request) {
        Employee employee = employeeRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee profile not found with email: "
                                        + email
                        )
                );

        if (!employee.getEmail()
                .equalsIgnoreCase(request.getEmail())
                && employeeRepository.existsByEmail(
                request.getEmail())) {

            throw new BadRequestException(
                    "Email already exists: "
                            + request.getEmail()
            );
        }

        employee.setFirstName(request.getFirstName());
        employee.setLastName(request.getLastName());
        employee.setEmail(request.getEmail());
        employee.setPhone(request.getPhone());
        employee.setGender(request.getGender());
        employee.setDateOfBirth(request.getDateOfBirth());
        employee.setAddress(request.getAddress());
        employee.setCity(request.getCity());
        employee.setState(request.getState());
        employee.setCountry(request.getCountry());

        Employee updatedEmployee =
                employeeRepository.save(employee);

        return mapToProfileResponse(updatedEmployee);
    }

    private EmployeeProfileResponse mapToProfileResponse(
            Employee employee) {

        return new EmployeeProfileResponse(
                employee.getId(),
                employee.getEmployeeCode(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail(),
                employee.getPhone(),
                employee.getGender(),
                employee.getDateOfBirth(),
                employee.getDepartment().getId(),
                employee.getDepartment().getName(),
                employee.getDesignation(),
                employee.getSalary(),
                employee.getJoiningDate(),
                employee.getAddress(),
                employee.getCity(),
                employee.getState(),
                employee.getCountry(),
                employee.getStatus()
        );
    }


    private EmployeeResponse mapToResponse(
            Employee employee) {

        return new EmployeeResponse(
                employee.getId(),
                employee.getEmployeeCode(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail(),
                employee.getPhone(),
                employee.getGender(),
                employee.getDateOfBirth(),
                employee.getDepartment().getId(),
                employee.getDepartment().getName(),
                employee.getDesignation(),
                employee.getSalary(),
                employee.getJoiningDate(),
                employee.getAddress(),
                employee.getCity(),
                employee.getState(),
                employee.getCountry(),
                employee.getStatus(),
                employee.getCreatedAt(),
                employee.getUpdatedAt()
        );
    }
}