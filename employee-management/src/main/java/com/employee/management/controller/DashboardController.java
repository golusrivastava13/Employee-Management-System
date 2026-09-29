package com.employee.management.controller;

import com.employee.management.dto.DashboardStatsResponse;
import com.employee.management.dto.DepartmentEmployeeCountResponse;
import com.employee.management.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsResponse>
    getDashboardStats() {

        return ResponseEntity.ok(
                dashboardService.getDashboardStats()
        );
    }

    @GetMapping("/department-count")
    public ResponseEntity<List<DepartmentEmployeeCountResponse>>
    getDepartmentEmployeeCounts() {

        return ResponseEntity.ok(
                dashboardService.getDepartmentEmployeeCounts()
        );
    }
}