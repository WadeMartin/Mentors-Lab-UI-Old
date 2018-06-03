import {Report} from '../models/report.model';
import {Http, Response} from '@angular/http';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ReportService {

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
    }

    
    submitReport(search: any) {
        return this.http.post(this.baseUrl+ '/api/report',search).map((res: Response) => res.json()).catch(err => {
            return Observable.throw('no');
        })
    }

}
