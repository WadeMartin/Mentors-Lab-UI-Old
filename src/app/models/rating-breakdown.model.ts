import {User} from './user.model';

export class RatingBreakdown {
    public fiveStarCount = 0;
    public fourStarCount = 0;
    public threeStarCount = 0;
    public twoStarCount = 0;
    public oneStarCount = 0;

    public fiveStarPercentage: number;
    public fourStarPercentage: number;
    public threeStarPercentage: number;
    public twoStarPercentage: number;
    public oneStarPercentage: number;

    constructor() { }

    SetCountsAndPercentages(ratings: any) {
        const ratingCount = ratings.length;

        // Five
        this.fiveStarCount = ratings.filter(x => x.rate === "5").length;
        this.fiveStarPercentage = (this.fiveStarCount / ratingCount) * 100;

        // Four
        this.fourStarCount = ratings.filter(x => x.rate === "4").length;
        this.fourStarPercentage = (this.fourStarCount / ratingCount) * 100;

        // Three
        this.threeStarCount = ratings.filter(x => x.rate === "3").length;
        this.threeStarPercentage = (this.threeStarCount / ratingCount) * 100;

        // Two
        this.twoStarCount = ratings.filter(x => x.rate === "2").length;
        this.twoStarPercentage = (this.twoStarCount / ratingCount) * 100;

        // One
        this.oneStarCount = ratings.filter(x => x.rate === "1").length;
        this.oneStarPercentage = (this.oneStarCount / ratingCount) * 100;

        return this;
    }
}
