import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Rx';

import { Hero } from './hero';
import { SnackBarHelper } from './../../shared/helpers/snackBar.service';


export enum Command{
	ALERT = 0,
	CHANGE = 1
}

export class CommandObj{
	command: Command;
	msg?: any;

	constructor(cmd:Command, msg?:string){
		this.command = cmd;
		this.msg = msg;
	}
}

@Injectable()
export class HeroService {
	private heroesUrl = 'api/heroes';  // URL to web api
	private myEvent = new Subject<CommandObj>();
	event$ = this.myEvent.asObservable();


	constructor(
		private http: Http,
		private snackBar: SnackBarHelper
	){}

	delay(ms: number) {
	    return new Promise(resolve => setTimeout(resolve, ms));
	}

	fireEvent(data:CommandObj){
		if (data.command === Command.ALERT){
			this.delay(1000).then(()=>{
				this.snackBar.alert(String(data.msg),'Got it!');
			});
		}
		else {
			this.myEvent.next(data);
		}
	}

	getHeroes(): Promise<Hero[]> {
		return this.http.get(this.heroesUrl)
						.toPromise()
						.then(response => response.json().data as Hero[])
						.catch(this.handleError);
  		
	}

	private handleError(error:any):Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || 'error occured');
	}

	getHero(id: number): Promise<Hero> {
	  const url = `${this.heroesUrl}/${id}`;
	  return this.http.get(url)
	    .toPromise()
	    .then(response => response.json().data as Hero)
	    .catch(this.handleError);
	}

	private headers = new Headers({'Content-Type': 'application/json'});

	update(hero: Hero): Promise<Hero> {
	  const url = `${this.heroesUrl}/${hero.id}`;
	  return this.http
	    .put(url, JSON.stringify(hero), {headers: this.headers})
	    .toPromise()
	    .then(() => {
	    	this.snackBar.alert('Player detail Updated','Got it!');
	    	this.myEvent.next({command:Command.CHANGE,msg:hero});
	    	return hero;
	    })
	    .catch(this.handleError);
	}

	createHero(hero: Hero):Promise<Hero>{
		return this.http
			.post(this.heroesUrl,JSON.stringify(hero), {headers:this.headers})
			.toPromise()
			.then(res => {
				this.myEvent.next({command:Command.CHANGE,msg:hero});
				this.snackBar.alert('Player created','Got it!');
				return res.json().data as Hero;
			})
			.catch(this.handleError);
	}

	delete(id: number): Promise<void> {
	  const url = `${this.heroesUrl}/${id}`;
	  return this.http.delete(url, {headers: this.headers})
	    .toPromise()
	    .then((hero) => {
	    	this.snackBar.alert('Player removed','Got it!');
	    	return null;
	    })
	    .catch(this.handleError);
	}

}