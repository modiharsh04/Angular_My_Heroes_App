import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Hero } from './../hero-services/hero';
import { HeroService, CommandObj, Command } from './../hero-services/hero.service';

import { Subject } from 'rxjs/Rx';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls:['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: number;

  constructor(
    private router: Router,
    private heroService: HeroService,
    private title: Title,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.getHeroes();
    this.title.setTitle("The Team India");
    this.heroService.event$.subscribe((cmd)=>{
      if (cmd.command == Command.CHANGE){
        this.getHeroes();
      }
    });
    this.selectedHero = +this.route.firstChild.snapshot.params['id'];
  }

  getHeroes(): void {
  	this.heroService.getHeroes()
    .then(heroes => {
      this.heroes = heroes;
    });
  }

  delete(hero: Hero): void {
    if (this.heroes.length <= 11) return;
    this.heroService
        .delete(hero.id)
        .then(() => {
          this.heroes = this.heroes.filter(h => h !== hero);
          if (this.selectedHero === hero.id){
            this.gotoDetail(this.heroes[0]);
          }
        });
  }

  addPlayer() {
    this.selectedHero = this.heroes.length+11;
    this.router.navigate(['/heroes/add',this.selectedHero]);
  }

  gotoDetail(hero): void { 
    this.selectedHero = hero.id;
    this.router.navigate(['/heroes', hero.id],{replaceUrl:true});
  }
}
