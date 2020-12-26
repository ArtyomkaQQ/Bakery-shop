import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() {}

  getEmployees(): Observable<any> {
    return; // TODO: Load data from backend service
  }
}
