import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApirequestService } from '../services/apirequest.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../interfaces/user';
@Component({
  selector: 'app-listofusers',
  templateUrl: './listofusers.component.html',
  styleUrls: ['./listofusers.component.css']
})
export class ListofusersComponent implements OnInit {
  usersId$: Observable<any>;
  resources: any;
  displayedColumns: string[] = [];
  constructor(public ApirequestService: ApirequestService, public Router: Router, public MatSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.usersId$ = this.ApirequestService.getListOfUsers().pipe(map((users: any) => users.data));
    this.ApirequestService.getListOfResource().subscribe((resources: any) => {
      this.resources = resources.data
      Object.keys(resources.data).forEach(key => this.displayedColumns.push(key))
    }), (error) => {
      console.log(erro)
    };
  }
  deleteUser(id: string | number): void {
    this.ApirequestService.deleteUser(id).subscribe(
      response => {
        console.log(response)
      }
    ), (error) => {
      console.log(error)
    }
  }
}
