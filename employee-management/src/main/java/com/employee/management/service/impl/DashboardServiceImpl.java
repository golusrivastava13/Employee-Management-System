package com.employee.management.service.impl;

import com.employee.management.dto.DashboardStatsResponse;
import com.employee.management.dto.DepartmentEmployeeCountResponse;
import com.employee.management.entity.Department;
import com.employee.management.entity.EmployeeStatus;
import com.employee.management.repository.DepartmentRepository;
import com.employee.management.repository.EmployeeRepository;
import com.employee.management.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl
        implements DashboardService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;

    @Override
    public DashboardStatsResponse getDashboardStats() {

        long totalEmployees =
                employeeRepository.count();

        long activeEmployees =
                employeeRepository.countByStatus(
                        EmployeeStatus.ACTIVE
                );

        long inactiveEmployees =
                employeeRepository.countByStatus(
                        EmployeeStatus.INACTIVE
                );

        long onLeaveEmployees =
                employeeRepository.countByStatus(
                        EmployeeStatus.ON_LEAVE
                );

        long totalDepartments =
                departmentRepository.count();

        return new DashboardStatsResponse(
                totalEmployees,
                activeEmployees,
                inactiveEmployees,
                onLeaveEmployees,
                totalDepartments
        );
    }

    @Override
    public List<DepartmentEmployeeCountResponse>
    getDepartmentEmployeeCounts() {

        List<Department> departments =
                departmentRepository.findAll();

        return departments.stream()
                .map(department ->
                        new DepartmentEmployeeCountResponse(
                                department.getId(),
                                department.getName(),
                                employeeRepository.countByDepartmentId(
                                        department.getId()
                                )
                        )
                )
                .toList();
    }
}