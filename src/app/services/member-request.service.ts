import {MemberRequest} from '../models/member-request.model';
import {Http, Response} from '@angular/http';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class MemberRequestService {
    private companies: MemberRequest[];

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
    }

    searchForRequests(search: any) {
        return this.http.post(this.baseUrl+ '/api/MemberRequest/GetAllForStartup',search).map((res: Response) => <MemberRequest[]>res.json()).catch(err => {
            return Observable.throw('no');
        })
        
        
    }

    approveRequest(object: any){
        return this.http.post(this.baseUrl+ '/api/MemberRequest/ApproveRequest',object).map((res: Response) => res.json()).catch(err => {
            return Observable.throw('no');
        })
    }
     
    sendRequest(object: any){
        return this.http.post(this.baseUrl+ '/api/MemberRequest/CreateNewRequest',object).map((res: Response) => res.json()).catch(err => {
            return Observable.throw('no');
        })
    }
        
    

}
