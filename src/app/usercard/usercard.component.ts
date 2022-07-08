import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SnackbarService } from '../services/snackbar.service';
import { User } from '../interfaces/user';
import { ApirequestService } from '../services/apirequest.service';
@Component({
  selector: 'app-usercard',
  templateUrl: './usercard.component.html',
  styleUrls: ['./usercard.component.css']
})
export class UsercardComponent implements OnChanges {
  @Input() id: string | number;
  user: User;
  constructor(public ApirequestService: ApirequestService, public snackbar: SnackbarService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.id && changes.id.currentValue) {
      this.getUser(this.id)
    }
  }

  getUser(id: string | number) {
    this.ApirequestService.getUserIformationById(id).subscribe((user: any) => this.user = user.data);
  }

  deleteUser(id: string | number) {
    this.ApirequestService.deleteUser(id).subscribe(
      response => {
        this.snackbar.open('User deleted', 'Ok')
      }
    ), (error) => {
      this.snackbar.open('Error', 'Ok'),
      console.log(error)
    }
  }
}