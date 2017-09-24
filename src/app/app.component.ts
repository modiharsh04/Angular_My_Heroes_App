import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  template:`
  <nav>
    <h1>{{title}}</h1>
    <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
    <a routerLink="/heroes" routerLinkActive="active">Players</a>
  </nav>
  <router-outlet></router-outlet>
  `,
  styleUrls:[`./app.component.css`]
})

export class AppComponent {
	title = 'Indian Men Cricket Team';
}
