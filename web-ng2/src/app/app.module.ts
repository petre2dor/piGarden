import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AlertModule } from 'ng2-bootstrap';
import { PresentComponent } from './present/present.component';
import { PastComponent } from './past/past.component';
import { FutureComponent } from './future/future.component';
import { routing }  from './app.routing';


@NgModule({
  declarations: [
    AppComponent,
    PresentComponent,
    PastComponent,
    FutureComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AlertModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }