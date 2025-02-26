import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { AppComponent } from './app.component';
import { FirstScreenComponent } from './first-screen/first-screen.component';
import { SecondScreenComponent } from './second-screen/second-screen.component';
import { ThirdScreenAComponent } from './third-screen-a/third-screen-a.component';
import { ThirdScreenBComponent } from './third-screen-b/third-screen-b.component';
import { FourthScreenComponent } from './fourth-screen/fourth-screen.component';
import { FifthScreenComponent } from './fifth-screen/fifth-screen.component';
import { SixthScreenComponent } from './sixth-screen/sixth-screen.component';
import { SeventhScreenComponent } from './seventh-screen/seventh-screen.component';
import { EighthScreenComponent } from './eighth-screen/eighth-screen.component';
import { NinthScreenComponent } from './ninth-screen/ninth-screen.component';
import { FinishComponent } from './finish/finish.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TenScreenComponent } from './ten-screen/ten-screen.component';
import { DataViewComponent } from './data-view/data-view.component';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    FirstScreenComponent,
    SecondScreenComponent,
    ThirdScreenAComponent,
    ThirdScreenBComponent,
    FourthScreenComponent,
    FifthScreenComponent,
    SixthScreenComponent,
    SeventhScreenComponent,
    EighthScreenComponent,
    NinthScreenComponent,
    FinishComponent,
    HomeComponent,
    TenScreenComponent,
    DataViewComponent,
    ImageDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }