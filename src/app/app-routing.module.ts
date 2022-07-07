import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListofusersComponent } from './listofusers/listofusers.component';
import { UserinformationComponent } from './userinformation/userinformation.component';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: ListofusersComponent },
  { path: 'user/:id', component: UserinformationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}