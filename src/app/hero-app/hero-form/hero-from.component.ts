import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { HeroesComponent } from "./../hero-list/heroes.component";
import { Hero } from './../hero-services/hero';
import { HeroService } from './../hero-services/hero.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent  implements OnInit {
	player:Hero;

	constructor(
	  private heroService: HeroService,
	  private heroesComponent:HeroesComponent,
	  private router:Router,
	  private route:ActivatedRoute,
	  private title:Title ) { }

	ngOnInit(): void {
		this.route.paramMap
		  .subscribe((params: ParamMap) => {
		  	this.player = { id: +params.get('id'), name: '', role:'', bats:'', bowl:'' };
		});
		this.title.setTitle('Add Player');
	}
	
	

	add(): void {
		this.heroService.createHero(this.player)
			.then((hero) => {
				this.heroesComponent.getHeroes();
				this.router.navigate(['/heroes',hero.id]);
			});
	}

}