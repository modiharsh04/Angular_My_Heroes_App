// Keep the Input import for now, you'll remove it later:
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { HeroService } from './hero.service';
import { Hero } from './hero';

@Component({
	selector: 'hero-detail',
	 template: `
	    <div *ngIf="hero" class="hero_detail">
	      <h2>{{hero.name}}</h2>
	      <div><label>id: </label>{{hero.id}}</div>
	      <div>
	        <label>name: </label>
	        <input [(ngModel)]="hero.name" placeholder="name"/>
	      </div>
	      <button (click)="goBack()">Back</button>
	    </div>
	  `,
	  styleUrls: [`./hero-detail.component.css`]
})

export class HeroDetailComponent implements OnInit {

	ngOnInit(): void {
	  this.route.paramMap
	    .switchMap((params: ParamMap) => this.heroService.getHero(+params.get('id')))
	    .subscribe(hero => this.hero = hero);
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