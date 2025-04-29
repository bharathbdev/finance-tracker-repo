import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
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
import { TenScreenComponent } from './ten-screen/ten-screen.component';
import { DataViewComponent } from './data-view/data-view.component';
import { AgreementScreenComponent } from './aggrement-screen/aggrement-screen.component';
import { NewScreenComponent } from './new-screen/new-screen.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'agreement', component: AgreementScreenComponent },
  { path: 'data-view', component: DataViewComponent },
  { path: 'first-screen', component: FirstScreenComponent },
  { path: 'second-screen', component: SecondScreenComponent },
  { path: 'third-screen-a', component: ThirdScreenAComponent },
  { path: 'third-screen-b', component: ThirdScreenBComponent },
  { path: 'fourth-screen', component: FourthScreenComponent },
  { path: 'fifth-screen', component: FifthScreenComponent },
  { path: 'sixth-screen', component: SixthScreenComponent },
  { path: 'seventh-screen', component: SeventhScreenComponent },
  { path: 'eighth-screen', component: EighthScreenComponent },
  { path: 'ninth-screen', component: NinthScreenComponent },
  { path: 'tenth-screen', component: TenScreenComponent },
  { path: 'finish', component: FinishComponent },
  { path: 'new', component: NewScreenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }