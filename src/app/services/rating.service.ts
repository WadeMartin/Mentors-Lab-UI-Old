import {Rating} from '../models/rating.model';
import {Http, Response} from '@angular/http';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class RatingService {

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
    }

    
    searchForRatings(search: any) {
        return this.http.post(this.baseUrl+ '/api/rating/getAllRatings',search).map((res: Response) => <Rating[]>res.json()).catch(err => {
            return Observable.throw('no');
        })
    }
    searchForRatingsByUsername(search: any) {
        return this.http.post(this.baseUrl+ '/api/rating/getAllRatingsByUsername',search).map((res: Response) => <Rating[]>res.json()).catch(err => {
            return Observable.throw('no');
        })
    }

    submitRating(search: any) {
        return this.http.post(this.baseUrl+ '/api/rating',search).map((res: Response) => res.json()).catch(err => {
            return Observable.throw('no');
        })
    }

    getAverageRating(rating: any) {
        let avg: number;
        let total = 0;
            for (const ratingItem of rating){
                total += +ratingItem.rate;
            }

            avg = new Number(total).valueOf() / rating.length;
            console.log(avg);
        
        return Math.round( avg * 10 ) / 10;
    }

}
