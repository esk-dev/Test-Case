import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { map } from 'rxjs';
import { ApirequestService } from '../services/apirequest.service';
@Component({
  selector: 'app-usercard',
  templateUrl: './usercard.component.html',
  styleUrls: ['./usercard.component.css']
})
export class UsercardComponent implements OnChanges {
  @Input() id: string | number;
  user;
  constructor(public ApirequestService: ApirequestService) { }

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
        console.log(response)
      }
    ), (error) => {
      console.log(error)
    }
  }
}