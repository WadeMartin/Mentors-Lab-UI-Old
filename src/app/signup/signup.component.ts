import { Component, OnInit } from '@angular/core';
import {SubscriptionService} from '../services/subscription.service';
import {Subscription} from '../models/subscription.model';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    subscriptions: Subscription[];

    constructor(private subscriptionService: SubscriptionService) { }

    ngOnInit() {
        //this.subscriptions = this.subscriptionService.getSubscriptions();
    }
}
