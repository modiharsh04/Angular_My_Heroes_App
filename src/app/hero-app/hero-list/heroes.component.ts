import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Hero } from './../hero-services/hero';
import { HeroService } from './../hero-services/hero.service';

import { Subject } from 'rxjs/Rx';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls:['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  public static changed: Subject<boolean> = new Subject();

  constructor(
    private router: Router,
    private heroService: HeroService,
    private title: Title ) {
    HeroesComponent.changed.subscribe(res => {
      this.getHeroes();
    });
  }

  ngOnInit(): void {
    this.getHeroes();
    this.title.setTitle("The Team India");
  }

  getHeroes(): void {
  	this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  delete(hero: Hero): void {
    if (this.heroes.length <= 11) return;
    this.heroService
        .delete(hero.id)
        .then(() => {
          this.heroes = this.heroes.filter(h => h !== hero);
        });
  }

  addPlayer() {
    this.router.navigate(['/heroes/add',this.heroes.length+11]);
  }

  gotoDetail(hero): void { 
    this.selectedHero = hero;
    this.router.navigate(['/heroes', hero.id]);
  }
}
