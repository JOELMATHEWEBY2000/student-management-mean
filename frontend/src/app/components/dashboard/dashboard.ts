import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentService } from '../../services/student';
import { Student } from '../../models/student';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {

  students: Student[] = [];

  totalStudents = 0;
  totalCourses = 0;
  totalDepartments = 0;

  recentStudents: Student[] = [];

  loading = false;
  errorMessage = '';

  constructor(
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {

    this.loading = true;
    this.errorMessage = '';

    this.studentService
      .getStudents('', '', '', 1, 1000)
      .subscribe({

        next: (response) => {

          this.students = response.students;

          this.totalStudents =
            response.pagination.totalStudents;

          this.calculateStatistics();

          this.loading = false;

        },

        error: (error) => {

          console.error(error);

          this.errorMessage =
            'Failed to load dashboard';

          this.loading = false;

        }

      });
  }

  calculateStatistics(): void {

    const courses = new Set(
      this.students.map(
        student => student.course
      )
    );

    const departments = new Set(
      this.students.map(
        student => student.department
      )
    );

    this.totalCourses = courses.size;

    this.totalDepartments = departments.size;

    this.recentStudents =
      this.students.slice(0, 5);
  }

}