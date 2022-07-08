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
  });
  file: File = null;
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
      })
    });
  };

  enableForm(): void {
    this.userForm.disabled ? this.userForm.enable() : this.userForm.disable();
  }

  onfilechange(event: any) {
    console.log(event.target.files[0])
    this.file = event.target.files[0]
  }
  uploadFile(){
    if (this.file) {
      this.ApirequestService.upload(this.file).subscribe(response => {
        this.snackbar.open('Uploaded', 'ok')
      })
    } else {
        this.snackbar.open('Select a file', 'ok')
      }
    }
    
  onSubmit(): void {
    this.ApirequestService.updateUserInformation(this.ActivatedRoute.snapshot.paramMap.get('id'), this.userForm.value)
      .subscribe(
        (response: any) => {
          this.userForm.setValue({
            email: response.data.email,
            firstName: response.data.first_name,
            lastName: response.data.last_name,
          })
          this.snackbar.open('The information was updated successfully!', 'Ok')
        }), (error) => {
          this.snackbar.open('Error', 'Ok')
          console.log(error)
        };
  }
  
}