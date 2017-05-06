import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { AppComponent }   from './app.component';
import { HeroDetailComponent } from "./hero-detail.component";
import { HeroService } from "./service/hero.service";
import { HeroesComponent } from "./heroes.component";
import { HttpModule }   from '@angular/http';

import { RouterModule, Routes }   from '@angular/router';
import { DashboardComponent } from "./dashboard.component";
import { AppRoutingModule } from "./app-routing.module";
import {APP_BASE_HREF} from '@angular/common';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

@NgModule({
  imports:      [ BrowserModule,
    FormsModule,
    HttpModule,
    //InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  declarations: [ AppComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroesComponent ],
  bootstrap:    [ AppComponent ],
  providers: [HeroService,
    {provide: APP_BASE_HREF, useValue : '/' }
  ]
})
export class AppModule {


 }
