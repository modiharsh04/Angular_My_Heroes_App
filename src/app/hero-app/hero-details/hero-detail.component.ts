import { 
	Component, Input, OnInit, AfterViewInit,
	Inject, ElementRef, Renderer2, ViewChild
} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location }                 from '@angular/common';
import { Title } from '@angular/platform-browser';

import 'rxjs/add/operator/switchMap';

import { Observable } from 'rxjs/Rx';

import { HeroService, CommandObj, Command } from './../hero-services/hero.service';
import { Hero } from './../hero-services/hero';

@Component({
	selector: 'hero-detail',
	templateUrl: './hero-detail.component.html',
  	styleUrls: [`./hero-detail.component.css`]
})

export class HeroDetailComponent implements OnInit {
	hero: Hero;
	@ViewChild('player') player:ElementRef;
	viewInit : boolean = true;

	constructor(
		private heroService: HeroService,
		private route: ActivatedRoute,
		private location: Location,
	  	private title:Title,
    	private router:Router,
    	private renderer:Renderer2
	) {}

	ngOnInit(): void {
		this.route.paramMap
			.switchMap((params: ParamMap) => this.heroService.getHero(+params.get('id')))
			.subscribe((hero : Hero) => {
				this.hero = hero;
				this.setTitle(this.hero.name);
				if (this.viewInit){
					this.ngAfterViewInit();
				}
				this.viewInit = !this.viewInit;
			},(error : any) => {
				this.router.navigate(['../'],{replaceUrl:true});
				this.heroService.fireEvent( {command:Command.ALERT, msg:'No player found'} );
			});
	}

	ngAfterViewInit(){
		this.player.nativeElement.scrollIntoView(true);
		this.viewInit = false;
	}

	setTitle(msg:string){
		this.title.setTitle(msg);
	}

	save(): void {
		this.heroService.update(this.hero);
	}

	goBack(): void {
	  this.router.navigate(['../']);
	}
}