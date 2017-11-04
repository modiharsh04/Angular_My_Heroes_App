import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './app_pages/dashboard.component.html',
	styleUrls: ['./app_css/dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];
  private topFour = [11,13,19,20];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.filter((h) => {
      	return this.topFour.indexOf(h.id)>=0;
      }));
  }
}