import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApirequestService {

  constructor(public http: HttpClient) { }

  private urListOfUsers = 'https://reqres.in/api/users?page=2';
  private urListOfResource = 'https://reqres.in/api/unknown';
  private urlUser = 'https://reqres.in/api/users/';

  getListOfUsers(): Observable<any> {
    return this.http.get(
      this.urListOfUsers
    )
  }

  getListOfResource(): Observable<any> {
    return this.http.get(
      this.urListOfResource
    );
  }

  getUserIformationById(id: string | number): Observable<any> {
    return this.http.get(
      this.urlUser + `${id}`
    );
  }

  updateUserInformation(id: string | number, data): Observable<any> {
    return this.http.put(
      this.urlUser + `${id}`, data
    );
  }

  deleteUser(id: string | number): Observable<any> {
    return this.http.delete(
      this.urlUser + `${id}`
    );
  }
} 