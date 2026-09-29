package com.employee.management.controller;

import com.employee.management.dto.EmployeePageResponse;
import com.employee.management.dto.EmployeeRequest;
import com.employee.management.dto.EmployeeResponse;
import com.employee.management.entity.EmployeeStatus;
import com.employee.management.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;


    @PostMapping
    public ResponseEntity<EmployeeResponse> createEmployee(
            @Valid @RequestBody EmployeeRequest request) {

        EmployeeResponse response =
                employeeService.createEmployee(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }



    @GetMapping("/all")
    public ResponseEntity<List<EmployeeResponse>>
    getAllEmployees() {

        return ResponseEntity.ok(
                employeeService.getAllEmployees()
        );
    }



    @GetMapping
    public ResponseEntity<EmployeePageResponse>
    getEmployees(

            @RequestParam(
                    defaultValue = "0"
            )
            int page,

            @RequestParam(
                    defaultValue = "10"
            )
            int size,

            @RequestParam(
                    defaultValue = "id"
            )
            String sortBy,

            @RequestParam(
                    defaultValue = "ASC"
            )
            String direction,

            @RequestParam(
                    required = false
            )
            String search,

            @RequestParam(
                    required = false
            )
            Long departmentId,

            @RequestParam(
                    required = false
            )
            EmployeeStatus status) {

        return ResponseEntity.ok(
                employeeService.getEmployees(
                        page,
                        size,
                        sortBy,
                        direction,
                        search,
                        departmentId,
                        status
                )
        );
    }



    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponse>
    getEmployeeById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                employeeService.getEmployeeById(id)
        );
    }



    @PutMapping("/{id}")
    public ResponseEntity<EmployeeResponse>
    updateEmployee(
            @PathVariable Long id,
            @Valid @RequestBody EmployeeRequest request) {

        return ResponseEntity.ok(
                employeeService.updateEmployee(
                        id,
                        request
                )
        );
    }


    @PatchMapping("/{id}/status")
    public ResponseEntity<EmployeeResponse>
    updateEmployeeStatus(
            @PathVariable Long id,
            @RequestParam EmployeeStatus status) {

        return ResponseEntity.ok(
                employeeService.updateEmployeeStatus(
                        id,
                        status
                )
        );
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(
            @PathVariable Long id) {

        employeeService.deleteEmployee(id);

        return ResponseEntity.noContent().build();
    }
}