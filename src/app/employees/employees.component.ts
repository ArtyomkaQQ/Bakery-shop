import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  form: FormGroup;
  public employees: any;

  constructor(private employeeService: EmployeeService, private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    this.getEmployees();
  }

  private initForm(): void {
    this.form = this.fb.group({
      id: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      name: ['', [Validators.required, Validators.pattern("^[a-zA-ZäöüÄÖÜ]*$")]],
      email: ['', [Validators.required, Validators.email]],
      avatar: ['', [Validators.required]]
    });
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe(response => {
        const data = response.data;
        let employees = [];
        for (let employee of data) {
          console.log('employee: ', employee);
          employee.name = employee.first_name + ' ' + employee.last_name;
          employees.push(employee);
        }

        this.employees = employees;
        console.log('employees: ', this.employees);
      }, error => {
        console.log(error);
      });
  }

  addEmployee(): void {
    const newEmployee: Employee = {
      id: this.form.get('id').value,
      name: this.form.get('name').value,
      email: this.form.get('email').value,
      avatar: this.form.get('avatar').value
    };

    const isValidEmployee = this.employeeValidation(this.form.controls); // employee validation
    if (isValidEmployee) {
      this.employees.push(newEmployee);
      this.initForm();
    }
  }

  employeeValidation(controls): boolean {
    if (controls.id.status === 'INVALID') return false;
    if (controls.name.status === 'INVALID') return false;
    if (controls.email.status === 'INVALID') return false;
    if (controls.avatar.status === 'INVALID') return false;

    return true;
  }

  deleteEmployee(employee): void {
    this.employees = this.employees.filter(item => item !== employee);
  }
}
