import { Component, OnInit } from '@angular/core';

import { Hero } from './../hero-services/hero';
import { HeroService } from './../hero-services/hero.service';
import { ScoreService } from './../hero-services/scores.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];
  private topFour = [11,13,19,20];

  constructor(
      private heroService: HeroService,
      private scoreService : ScoreService
    ) { }

  ngOnInit(): void {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.filter((h) => {
      	return this.topFour.indexOf(h.id)>=0;
      }));
    this.scoreService.getMatches();
  }
}