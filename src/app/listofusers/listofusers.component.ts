import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApirequestService } from '../services/apirequest.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-listofusers',
  templateUrl: './listofusers.component.html',
  styleUrls: ['./listofusers.component.css']
})
export class ListofusersComponent implements OnInit {
  users$: Observable<any>;
  data: any;
  displayedColumns: string[] = ['id', 'name', 'year', 'color', 'pantone_value'];
  constructor(public ApirequestService: ApirequestService, public Router: Router, public MatSnackBar: MatSnackBar) { }

  ngOnInit() {
    this.users$ = this.ApirequestService.getListOfUsers().pipe(map((users: any) => users.data));
    this.ApirequestService.getListOfResource().subscribe((resources: any) => {
      this.data = resources.data,
      console.log(resources)
    });
  }
  deleteUser(id: string | number) {
    this.ApirequestService.deleteUser(id).subscribe(
      response => {
        console.log(response)
      }
    ), (error) => {
      console.log(error)
    }
  }
}
