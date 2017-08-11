import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';


@Component({
  selector: 'app-heroes',
  template: `
  <h2>My Heroes</h2>
  <ul class="heroes">
    <li *ngFor="let hero of heroes" 
    [class.selected]="hero === selectedHero"
    (click)="onSelect(hero)">
      <span class="badge">{{hero.id}}</span> {{hero.name}}
    </li>
  </ul>
  <div *ngIf="selectedHero">
    <h2>
      {{selectedHero.name | uppercase}} is my heroes
    </h2>
    <button (click)="gotoDetail()">View Details</button>
  </div>
  `,
  styleUrls:[`./heroes.component.css`]
})

export class HeroesComponent implements OnInit {

  selectedHero : Hero;
  heroes: Hero[];

  constructor(
    private router: Router,
    private heroService: HeroService ) { }

  getHeroes(): void {
  	this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  ngOnInit(): void {
  	this.getHeroes();
  }

  onSelect(hero: Hero): void {
  	this.selectedHero = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
}
