import { NgModule } from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { DashboardComponent } from './hero-app/dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-app/hero-details/hero-detail.component';
import { HeroesComponent } from './hero-app/hero-list/heroes.component';
import { HeroFormComponent } from './hero-app/hero-form/hero-from.component';

const routes: Routes = [
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
	imports: [ RouterModule.forRoot(routes)],
	exports: [ RouterModule ]
})

export class AppRoutingModule {}