import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  constructor(private employeeService: EmployeeService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
    this.getEmployees();
  }

  private initForm(): void {
    this.form = this.fb.group({ // TODO: Add validations
      id: [''],
      name: [''],
      email: ['']
    });
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe(response => {
        var data = response.data;
        var employees = [];
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
      email: this.form.get('email').value
    };

    this.employees.push(newEmployee);
    this.initForm();
  }

  deleteEmployee(employee): void {
    this.employees = this.employees.filter(item => item !== employee);
  }
}
