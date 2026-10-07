import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { StudentService } from '../../services/student';
import { Student } from '../../models/student';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css'
})
export class StudentListComponent implements OnInit {

  students: Student[] = [];

  loading = false;
  errorMessage = '';

  search = '';
  department = '';
  course = '';

  currentPage = 1;
  limit = 3;

  totalStudents = 0;
  totalPages = 1;

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  loadStudents(): void {

    this.loading = true;
    this.errorMessage = '';

    this.studentService
      .getStudents(
        this.search,
        this.department,
        this.course,
        this.currentPage,
        this.limit
      )
      .subscribe({

        next: (response) => {

          console.log('Students loaded:', response);

          this.students = response.students;

          this.totalStudents =
            response.pagination.totalStudents;

          this.totalPages =
            response.pagination.totalPages;

          this.loading = false;

        },

        error: (error) => {

          console.error(
            'Failed to load students:',
            error
          );

          this.errorMessage =
            error.error?.message ||
            'Failed to load students';

          this.loading = false;

        }

      });
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  searchStudents(): void {

    this.currentPage = 1;

    this.loadStudents();
  }

  filterStudents(): void {

    this.currentPage = 1;

    this.loadStudents();
  }

  clearFilters(): void {

    this.search = '';
    this.department = '';
    this.course = '';

    this.currentPage = 1;

    this.loadStudents();
  }

  goToPage(page: number): void {

    if (
      page < 1 ||
      page > this.totalPages
    ) {
      return;
    }

    this.currentPage = page;

    this.loadStudents();
  }

  editStudent(id: string): void {

    this.router.navigate([
      '/students/edit',
      id
    ]);
  }

  deleteStudent(id: string): void {

    if (
      !confirm(
        'Are you sure you want to delete this student?'
      )
    ) {
      return;
    }

    this.studentService
      .deleteStudent(id)
      .subscribe({

        next: () => {

          this.loadStudents();

        },

        error: (error) => {

          console.error(
            'Delete failed:',
            error
          );

          this.errorMessage =
            'Failed to delete student';

        }

      });
  }

}