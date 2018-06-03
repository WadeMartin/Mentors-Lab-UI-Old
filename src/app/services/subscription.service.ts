import {MemberRequest} from '../models/member-request.model';
import {Http, Response} from '@angular/http';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class SubscriptionService {


    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
    }

    getSubscription(search: any) {
        return this.http.post(this.baseUrl+ '/api/MemberRequest/GetAllForStartup',search).map((res: Response) => <MemberRequest[]>res.json()).catch(err => {
            return Observable.throw('no');
        })
        
        
    }

    
    
}
