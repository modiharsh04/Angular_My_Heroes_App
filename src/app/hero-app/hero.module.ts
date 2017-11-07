import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule,Title } from '@angular/platform-browser';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { HeroRoutingModule } from './hero-routing.module';
import { InMemoryDataService }  from './hero-services/in-memory-data.service';
import { HeroService } from './hero-services/hero.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-details/hero-detail.component';
import { HeroesComponent } from './hero-list/heroes.component';
import { HeroFormComponent } from './hero-form/hero-from.component';
import { MaterialModule } from './material.module';


@NgModule({
  declarations: [
    HeroDetailComponent,
    HeroesComponent,
    DashboardComponent,
    HeroFormComponent
  ],
  imports: [
    HeroRoutingModule,
  	InMemoryWebApiModule.forRoot(InMemoryDataService),
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule
  ],
  providers: [HeroService,HeroesComponent,Title]
})

export class HeroModule { }