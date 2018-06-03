import {Company} from '../models/company.model';
import {Http, Response} from '@angular/http';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class SubscriberService {
    private companies: Company[];

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
    }
    applySubscription(object: any){
        return this.http.post(this.baseUrl+ '/api/Subscribe',object).map((res: Response) => res.json()).catch(err => {
            return Observable.throw('no');
        })
    }

    getSubscription(object: any){
        return this.http.post(this.baseUrl+ '/api/Subscribe/getSubscription',object).map((res: Response) => res.json()).catch(err => {
            return Observable.throw('no');
        })
    }

    updateSubscription(object: any){
        return this.http.post(this.baseUrl+ '/api/Subscribe/updateSubscription',object).map((res: Response) => res.json()).catch(err => {
            return Observable.throw('no');
        })
    }

}
