import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentListComponent } from './student-list';
import { StudentService } from '../../services/student';
import { of } from 'rxjs';

describe('StudentListComponent', () => {
  let component: StudentListComponent;
  let fixture: ComponentFixture<StudentListComponent>;

  const mockStudentService = {
    getStudents: () =>
      of({
        students: []
      })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentListComponent],
      providers: [
        {
          provide: StudentService,
          useValue: mockStudentService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentListComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});