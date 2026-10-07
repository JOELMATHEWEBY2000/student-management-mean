import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { StudentService } from '../../services/student';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './student-form.html',
  styleUrl: './student-form.css'
})
export class StudentFormComponent implements OnInit {

  studentForm: FormGroup;

  studentId: string | null = null;

  isEditMode = false;

  successMessage = '';
  errorMessage = '';

  submitting = false;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.studentForm = this.fb.group({

      name: [
        '',
        Validators.required
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{10}$')
        ]
      ],

      age: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(100)
        ]
      ],

      gender: [
        '',
        Validators.required
      ],

      course: [
        '',
        Validators.required
      ],

      department: [
        '',
        Validators.required
      ],

      semester: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(12)
        ]
      ],

      address: [
        '',
        Validators.required
      ]

    });
  }

  ngOnInit(): void {

    this.studentId =
      this.route.snapshot.paramMap.get('id');

    if (this.studentId) {

      this.isEditMode = true;

      this.loadStudent(this.studentId);

    }

  }

  loadStudent(id: string): void {

    this.studentService
      .getStudent(id)
      .subscribe({

        next: (student) => {

          this.studentForm.patchValue(student);

        },

        error: (error) => {

          console.error(error);

          this.errorMessage =
            'Failed to load student';

        }

      });

  }

  onSubmit(): void {

    if (this.studentForm.invalid) {

      this.studentForm.markAllAsTouched();

      return;

    }

    this.submitting = true;

    this.successMessage = '';

    this.errorMessage = '';

    if (this.isEditMode && this.studentId) {

      // UPDATE

      this.studentService
        .updateStudent(
          this.studentId,
          this.studentForm.value
        )
        .subscribe({

          next: (response) => {

            console.log(response);

            this.successMessage =
              'Student updated successfully!';

            this.submitting = false;

            setTimeout(() => {

              this.router.navigate([
                '/students'
              ]);

            }, 1000);

          },

          error: (error) => {

            console.error(error);

            this.errorMessage =
              error.error?.message ||
              'Failed to update student';

            this.submitting = false;

          }

        });

    } else {

      // CREATE

      this.studentService
        .createStudent(
          this.studentForm.value
        )
        .subscribe({

          next: (response) => {

            console.log(response);

            this.successMessage =
              'Student added successfully!';

            this.studentForm.reset();

            this.submitting = false;

          },

          error: (error) => {

            console.error(error);

            this.errorMessage =
              error.error?.message ||
              'Failed to add student';

            this.submitting = false;

          }

        });

    }

  }

  cancel(): void {

    this.router.navigate([
      '/students'
    ]);

  }

}