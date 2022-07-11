import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApirequestService } from '../services/apirequest.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { User } from '../interfaces/user';
import { Resources } from '../interfaces/resources';
@Component({
  selector: 'app-listofusers',
  templateUrl: './listofusers.component.html',
  styleUrls: ['./listofusers.component.css']
})
export class ListofusersComponent implements OnInit {
  usersId$: Observable<User[]>;
  resources: Resources[];
  displayedColumns: string[] = ["id", "name", "year", "color", "pantone_value"];
  constructor(public ApirequestService: ApirequestService, public Router: Router, public snackbar: SnackbarService) { }
  
  ngOnInit(): void {
    this.usersId$ = this.ApirequestService.getListOfUsers().pipe(map((users: any) => users.data));
    this.ApirequestService.getListOfResource().subscribe((resources: any) => {
      this.resources = resources.data
    }), (error) => {
      console.log(error)
    };
  }
}
