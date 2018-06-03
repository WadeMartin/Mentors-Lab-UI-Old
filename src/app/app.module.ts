import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { Ng2MultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { RatingReviewComponent} from "./rating-review/rating-review.component"
import {HttpModule} from '@angular/http';
import { HttpClientModule , HttpClient} from '@angular/common/http';
import {UserService} from './services/user.service';
import {LoginService} from './services/login.service';
import { IndividualProfileComponent } from './individual-profile/individual-profile.component';
import { StartupProfileComponent } from './startup-profile/startup-profile.component';
import { StartupProfileEditComponent } from './startup-profile-edit/startup-profile-edit.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {CompanyService} from './services/company.service';
import {SubscriptionService} from './services/subscription.service';
import { NgxCarouselModule } from 'ngx-carousel';
import {RequestingMembersComponent} from './requesting-members/requesting-members.component';
import {ManageMembersComponent} from './manage-members/manage-members.component';
import { DashboardComponent } from "./dashboard/dashboard.component";

import {MemberRequestService} from 'app/services/member-request.service';
import {ReportService} from 'app/services/report.service';
import 'hammerjs';
import { RatingService } from 'app/services/rating.service';
import { FileService } from 'app/services/file.service';
import {MatSidenavModule,MatFormFieldModule,MatOptionModule,MatSelectModule} from '@angular/material';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api';      
import {CalendarModule} from 'primeng/calendar';
import {FileUploadModule} from 'primeng/fileupload';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {DataListModule} from 'primeng/datalist';
import {DataViewModule} from 'primeng/dataview';
import {DropdownModule} from 'primeng/dropdown';
import {PanelModule} from 'primeng/panel';
import {PanelMenuModule} from 'primeng/panelmenu';
import {GrowlModule} from 'primeng/growl';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {SpinnerModule} from 'primeng/spinner';
import {MenuModule} from 'primeng/menu';
import {CheckboxModule} from 'primeng/checkbox';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {SubscribeComponent} from './subscribe/subscribe.component';
import { SubscriberService } from 'app/services/subscriber.service';
import { SignUpMentorComponent } from 'app/sign-up-mentor/sign-up-mentor.component';
import {MessagesModule} from 'primeng/messages';
import {KeyFilterModule} from 'primeng/keyfilter';
import {MessageModule} from 'primeng/message';
import { SignUpStartupComponent } from 'app/sign-up-startup/sign-up-startup.component';
import { NucleoiconsComponent } from 'app/components/nucleoicons/nucleoicons.component';
import {DataScrollerModule} from 'primeng/datascroller';
import {CardModule} from 'primeng/card';
import {ChartModule} from 'primeng/chart';
import {BlockUIModule} from 'primeng/blockui';
import { StartUpStatService } from 'app/services/startup-stats.service';
import { IndividualDashboardComponent } from './individual-dashboard/individual-dashboard.component';
import { UserStatService } from './services/user-stats.service';


@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    IndividualProfileComponent,
    StartupProfileComponent,
    StartupProfileEditComponent,
    SignupComponent,
    SubscribeComponent,
    NucleoiconsComponent,
    HomeComponent,
    SearchComponent,
    NavbarComponent,
    ProfileComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    IndividualDashboardComponent,
    RequestingMembersComponent,
    IndividualProfileComponent,
    RatingReviewComponent,
    SignUpMentorComponent,
    SignUpStartupComponent,
    UserProfileComponent,
    ManageMembersComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    RouterModule,
    AccordionModule,
    MenuModule,
    ScrollPanelModule,
    AppRoutingModule,
    MessageModule,
    KeyFilterModule,
    ChartModule,
    MessagesModule,
    CalendarModule,
    DataScrollerModule,
    Ng2MultiSelectDropDownModule.forRoot(),
    FlexLayoutModule,
    TableModule,
    DialogModule,
    SpinnerModule,
    CheckboxModule,
    ProgressSpinnerModule,
    GrowlModule,
    BlockUIModule,
    PanelModule,
    NgxCarouselModule,
    DataViewModule,
    BrowserAnimationsModule,
    DropdownModule,
    PanelMenuModule,
    MatSidenavModule,
    CardModule,
    MatFormFieldModule,
    MatSelectModule,
    FileUploadModule,
    DataListModule,
    MatOptionModule,
    HttpModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
      UserService,
      CompanyService,
      LoginService,
      SubscriptionService,
      FileService,
      ReportService,
      RatingService,
      SubscriberService,
      MemberRequestService,
      StartUpStatService,
      UserStatService,
      { provide: 'BASE_URL', useFactory: getBaseUrl}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getBaseUrl() {
  return 'http://localhost:57324'//'http://mentorapi20180407113508.azurewebsites.net' // change this to api port
}
