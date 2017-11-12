import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Hero } from './../hero-services/hero';
import { HeroService} from './../hero-services/hero.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent  implements OnInit {
	player:Hero;
	@ViewChild('frm') containerRef:ElementRef;

	constructor(
	  private heroService: HeroService,
	  private router:Router,
	  private route:ActivatedRoute,
	  private title:Title
	) { }

	ngOnInit(): void {
		this.route.paramMap
		  .subscribe((params: ParamMap) => {
		  	this.player = { id: +params.get('id'), name: '', role:'', bats:'', bowl:'' };
		});
		this.title.setTitle('Add Player');
	}
	
	ngAfterViewInit(){
		this.containerRef.nativeElement.scrollIntoView(true);
	}

	add(): void {
		this.heroService.createHero(this.player)
			.then((hero) => {
				this.router.navigate(['/heroes',hero.id]);
			});
	}

}