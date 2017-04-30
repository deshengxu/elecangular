import { Component, OnInit } from '@angular/core';

import { Hero } from "./db/hero";
import { HeroService } from "./service/hero.service";

@Component({
  selector: 'my-dashboard',
  templateUrl: './dist/app/dashboard.component.html',
  styleUrls:['./dist/app/dashboard.component.css']
})
export class DashboardComponent implements OnInit{
    heroes: Hero[] = [];
    constructor(private heroService:HeroService){}

    ngOnInit(): void {
        this.heroService.getHeroes().then(heroes=>this.heroes = heroes.slice(1,5));
        console.log(this.heroes);
    }
 }
