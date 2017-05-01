import {Component} from '@angular/core';
import { HeroesComponent } from "./heroes.component";
import { Hero } from "./db/hero";


@Component({
    selector: 'my-app',
    template: `
  <h1>{{title}}</h1>
  <nav>
    <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
    <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
  </nav>
  <router-outlet></router-outlet>
`,

 styleUrls:['file://'+__dirname+'dist/app/app.component.css']

})
export class AppComponent {
    title = "Tour of Heroes";


}