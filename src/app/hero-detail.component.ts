// Keep the Input import for now, you'll remove it later:
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { HeroService } from './hero.service';
import { Hero } from './hero';

@Component({
	selector: 'hero-detail',
	 templateUrl: `./app_pages/hero-detail.component.html`,
	  styleUrls: [`./app_css/hero-detail.component.css`]
})

export class HeroDetailComponent implements OnInit {

	ngOnInit(): void {
	  this.route.paramMap
	    .switchMap((params: ParamMap) => this.heroService.getHero(+params.get('id')))
	    .subscribe(hero => this.hero = hero);
	}

	save(): void {
	  this.heroService.update(this.hero)
	    .then(() => this.goBack());
	}

	goBack(): void {
	  this.location.back();
	}

	@Input() hero: Hero;

	constructor(
	  private heroService: HeroService,
	  private route: ActivatedRoute,
	  private location: Location
	) {}
}