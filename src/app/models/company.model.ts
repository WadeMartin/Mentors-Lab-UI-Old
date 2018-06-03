import {Subscription} from './subscription.model';
import {Rating} from './rating.model';

export class Company {

    public Id: any;
    public companyName: string;
    public field: string[];
    public OwningUsername: string;
    public location: string;
    public createdYear: Date;
    public description: string;
    public logoLoc: string;
    public photos: string[];
    public videos: any[];
    public mediaLinks: string[];
    public websiteUrl: string;
    public numberOfEmployees: number;
    public industries: string[];
    public country: string;
    public city: string;
    public members: string[];

    fromJSON(json) {
        for (var propName in json)
            this[propName] = json[propName];
        return this;
    }

}
