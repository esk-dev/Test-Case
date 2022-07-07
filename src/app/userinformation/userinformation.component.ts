import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ApirequestService } from '../services/apirequest.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-userinformation',
  templateUrl: './userinformation.component.html',
  styleUrls: ['./userinformation.component.css']
})
export class UserinformationComponent implements OnInit {
  userData = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    firstName: new FormControl<string>('', [Validators.required]),
    lastName: new FormControl<string>('', [Validators.required]),
  });

  constructor(
    public ActivatedRoute: ActivatedRoute, 
    public ApirequestService: ApirequestService
  ) { }

  ngOnInit(): void {
    this.userData.disable();
    this.ActivatedRoute.paramMap.pipe(
      map((params: any) => params.get('id')),
      switchMap((id: string) => this.ApirequestService.getUserIformationById(id))
    ).subscribe((userInformation: any) => {
      this.userData.setValue({
        email: userInformation.data.email,
        firstName: userInformation.data.first_name,
        lastName: userInformation.data.last_name,
      })
    });
  };

  enableForm(): void {
    this.userData.disabled ? this.userData.enable() : this.userData.disable();
  }

  onSubmit(): void {
    this.ApirequestService.updateUserInformation(this.ActivatedRoute.snapshot.paramMap.get('id'), this.userData.value)
      .subscribe(
        response => {
          console.log('The information was updated successfully!');
        });
        
  }
  
}