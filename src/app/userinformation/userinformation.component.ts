import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ApirequestService } from '../services/apirequest.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../services/snackbar.service';
@Component({
  selector: 'app-userinformation',
  templateUrl: './userinformation.component.html',
  styleUrls: ['./userinformation.component.css']
})
export class UserinformationComponent implements OnInit {
  userForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    firstName: new FormControl<string>('', [Validators.required]),
    lastName: new FormControl<string>('', [Validators.required]),
    avatar: new FormControl(''),
  });

  constructor(
    public ActivatedRoute: ActivatedRoute, 
    public ApirequestService: ApirequestService,
    public snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.userForm.disable();
    this.ActivatedRoute.paramMap.pipe(
      map((params: any) => params.get('id')),
      switchMap((id: string) => this.ApirequestService.getUserIformationById(id))
    ).subscribe((userInformation: any) => {
      this.userForm.setValue({
        email: userInformation.data.email,
        firstName: userInformation.data.first_name,
        lastName: userInformation.data.last_name,
        avatar: userInformation.data.avatar
      })
    });
  };

  enableForm(): void {
    this.userForm.disabled ? this.userForm.enable() : this.userForm.disable();
  }

  onSubmit(): void {
    this.ApirequestService.updateUserInformation(this.ActivatedRoute.snapshot.paramMap.get('id'), this.userForm.value)
      .subscribe(
        (response: any) => {
          this.userForm.setValue({
            email: response.data.email,
            firstName: response.data.first_name,
            lastName: response.data.last_name,
            avatar: response.data.avatar
          })
          this.snackbar.open('The information was updated successfully!', 'Ok')
        }), (error) => {
          this.snackbar.open('Error', 'Ok')
          console.log(error)
        };
  }
  
}