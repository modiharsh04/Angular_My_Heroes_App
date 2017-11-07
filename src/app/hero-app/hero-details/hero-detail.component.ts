import { Component, Input, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location }                 from '@angular/common';
import { Title } from '@angular/platform-browser';

import 'rxjs/add/operator/switchMap';

import { HeroService } from './../hero-services/hero.service';
import { Hero } from './../hero-services/hero';
import { HeroesComponent } from './../hero-list/heroes.component';

@Component({
	selector: 'hero-detail',
	templateUrl: './hero-detail.component.html',
  	styleUrls: [`./hero-detail.component.css`]
})

export class HeroDetailComponent implements OnInit {

	hero: Hero;

	constructor(
		private heroService: HeroService,
		private route: ActivatedRoute,
		private location: Location,
	  	private title:Title,
    	private heroesComponent: HeroesComponent,
    	private router:Router
	) {}

	ngOnInit(): void {
		this.route.paramMap
			.switchMap((params: ParamMap) => this.heroService.getHero(+params.get('id')))
			.subscribe((hero) => {
				this.hero = hero;
				this.setTitle(this.hero.name);
			});
	}

	setTitle(msg:string){
		this.title.setTitle(msg);
	}

	save(): void {
		this.heroService.update(this.hero)
			.then(() => {
				HeroesComponent.changed.next(true);
				this.goBack();
			});
	}

	goBack(): void {
	  this.router.navigate(['../']);
	}
}