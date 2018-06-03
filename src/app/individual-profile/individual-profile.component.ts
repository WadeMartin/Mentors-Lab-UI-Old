import { Component, OnInit } from '@angular/core';
import {RatingBreakdown} from '../models/rating-breakdown.model';
import {Response} from '@angular/http';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-individual-profile',
  templateUrl: './individual-profile.component.html',
  styleUrls: ['./individual-profile.component.scss']
})
export class IndividualProfileComponent implements OnInit {
    public user;
    public userName: string;
    public avgRating: number;
    public breakdown: RatingBreakdown;

    constructor(private userService: UserService) {
        console.log('const hit');
        this.userService.getUserDetails(this.userName).subscribe(
            (resp: Response) => {
                this.user = resp;
                this.user.fullName = this.userService.getFullName(this.user);
                console.log(this.user);
                
                this.breakdown = new RatingBreakdown();
                this.breakdown.SetCountsAndPercentages(this.user);
            }
        );
    }

    ngOnInit() {
        console.log('ngInit hit');
    }
}
