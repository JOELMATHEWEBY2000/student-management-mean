import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student';

export interface StudentResponse {
  students: Student[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalStudents: number;
    limit: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'https://student-management-mean.onrender.com/api/students';

  constructor(private http: HttpClient) {}

  getStudents(
  search = '',
  department = '',
  course = '',
  page = 1,
  limit = 5
): Observable<StudentResponse> {
  return this.http.get<StudentResponse>(this.apiUrl, {
    params: {
      search,
      department,
      course,
      page,
      limit
    }
  });
}

  getStudent(id: string): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  updateStudent(id: string, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student);
  }

  deleteStudent(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
