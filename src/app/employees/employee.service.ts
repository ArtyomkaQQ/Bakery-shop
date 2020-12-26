import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) {
  }

  getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>('https://reqres.in/api/users');
  }

}
