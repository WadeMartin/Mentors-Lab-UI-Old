import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { SignupComponent } from './signup/signup.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { StartupProfileComponent } from './startup-profile/startup-profile.component';
import { StartupProfileEditComponent } from './startup-profile-edit/startup-profile-edit.component';
import { IndividualProfileComponent } from './individual-profile/individual-profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RequestingMembersComponent } from './requesting-members/requesting-members.component';
import { ManageMembersComponent } from './manage-members/manage-members.component';
import{ RatingReviewComponent } from "./rating-review/rating-review.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SubscribeComponent} from "./subscribe/subscribe.component";
import { SignUpMentorComponent } from 'app/sign-up-mentor/sign-up-mentor.component';
import { SignUpStartupComponent } from 'app/sign-up-startup/sign-up-startup.component';
import { IndividualDashboardComponent } from './individual-dashboard/individual-dashboard.component';


const routes: Routes = [
    { path: 'home',                 component: HomeComponent },
    { path: 'start-up/:SearchInput',             component: StartupProfileComponent },
    { path: 'user-profile-edit',    component: UserProfileComponent },
    { path: 'startup-profile-edit',    component: StartupProfileEditComponent },
    { path: 'profile',              component: ProfileComponent },
    { path: 'user-profile',         component: IndividualProfileComponent },
    { path: 'subscribe',         component: SubscribeComponent },
    { path: 'sign-up-mentor',         component: SignUpMentorComponent },
    { path: 'sign-up-startup',         component: SignUpStartupComponent },
    { path: 'rating-review',         component: RatingReviewComponent },
    { path: 'requesting-members',         component: RequestingMembersComponent },
    { path: 'manage-members',         component: ManageMembersComponent },
    { path: 'search/:SearchInput',             component: SearchComponent },
    { path: 'search',               component: SearchComponent },
    { path: 'signup',               component: SignupComponent },
    { path: 'dashboard',              component: DashboardComponent },
    { path: 'individual-dashboard',              component: IndividualDashboardComponent },
    { path: 'nucleoicons',          component: NucleoiconsComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
