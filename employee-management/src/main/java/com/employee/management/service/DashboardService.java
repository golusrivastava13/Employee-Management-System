package com.employee.management.service;

import com.employee.management.dto.DashboardStatsResponse;
import com.employee.management.dto.DepartmentEmployeeCountResponse;

import java.util.List;

public interface DashboardService {

    DashboardStatsResponse getDashboardStats();

    List<DepartmentEmployeeCountResponse>
    getDepartmentEmployeeCounts();
}