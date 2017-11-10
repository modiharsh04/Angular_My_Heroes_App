import { 
	Component, Input, OnInit, 
	Inject, ElementRef, Renderer2, ViewChild
} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location }                 from '@angular/common';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';

import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';

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
	
	@ViewChild('player') player:ElementRef;

	constructor(
		private heroService: HeroService,
		private route: ActivatedRoute,
		private location: Location,
	  	private title:Title,
    	private heroesComponent: HeroesComponent,
    	private router:Router,
    	private renderer:Renderer2,
    	private snackBar: MatSnackBar
	) {}

	ngOnInit(): void {
		this.route.paramMap
			.switchMap((params: ParamMap) => this.heroService.getHero(+params.get('id')))
			.subscribe((hero) => {
				this.hero = hero;
				this.setTitle(this.hero.name);
				this.focus();
			},(error)=>{
				let snachbarRef = this.alert('No player found','Got it!');
				snachbarRef.afterDismissed().subscribe(()=>{
					this.location.back();
				});
			});
	}

	ngAfterViewInit(){
		return Promise.resolve();
	}

	alert(message: string, action: string) {
		return this.snackBar.open(message, action, {
			duration: 2000,
		});
	}

	focus(){
		this.ngAfterViewInit().then(()=>{
			this.player.nativeElement.scrollIntoView(true);
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