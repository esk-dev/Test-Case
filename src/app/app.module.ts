import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
// Components
import { AppComponent } from './app.component';
import { ListofusersComponent } from './listofusers/listofusers.component';
import { UserinformationComponent } from './userinformation/userinformation.component';
import { UsercardComponent } from './usercard/usercard.component';
@NgModule({
  imports: [ BrowserAnimationsModule, BrowserModule, FormsModule, HttpClientModule, MaterialModule, AppRoutingModule, ReactiveFormsModule],
  declarations: [AppComponent, ListofusersComponent, UserinformationComponent, UsercardComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
