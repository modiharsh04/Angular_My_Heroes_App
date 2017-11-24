import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Injectable()
export class ScoreService {
	private cricApiUrl = 'http://cricapi.com/api/';  // URL to web api
	private key = 'STFZMtXSzvhoYNlb7dN3w4SGrrc2/'

	constructor(
		private http: Http
	){}

	getMatches(){
		const url = this.cricApiUrl + 'matches/' + this.key
		return this.http.get("http://cricapi.com/api/matches/STFZMtXSzvhoYNlb7dN3w4SGrrc2/")
					.toPromise()
					.then(res => console.log(res))
					.catch((error) => {
						console.log('Error occured');
						console.log(error);
					});
	}
}