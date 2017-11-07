import { NgModule } from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-details/hero-detail.component';
import { HeroesComponent } from './hero-list/heroes.component';
import { HeroFormComponent } from './hero-form/hero-from.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'heroes',     component: HeroesComponent, children: [
  	{ path: '', redirectTo:'11', pathMatch:'full' },
  	{ path: ':id', component: HeroDetailComponent },
  	{ path: 'add/:id',     component: HeroFormComponent }
  ]},
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})

export class HeroRoutingModule {}