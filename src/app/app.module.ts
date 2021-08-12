import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { UserComponent } from './user/user.component';
//import { PostComponent } from './post/post.component';
import {ReactiveFormsModule} from '@angular/forms'

import {FirstCharDirective, LastCharPipe} from "./helper"

@NgModule({
  declarations: [
    AppComponent,
    FirstCharDirective,
    LastCharPipe
    //UserComponent,
    //PostComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
