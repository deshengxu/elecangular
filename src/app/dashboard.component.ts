import { Component, OnInit,NgZone } from '@angular/core';

import { Hero } from "./db/hero";
import { HeroService } from "./service/hero.service";
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dist/app/dashboard.component.html',
  styleUrls:['./dist/app/dashboard.component.css']
})
export class DashboardComponent implements OnInit{
    heroes: Hero[] = [];
    subscription: Subscription;

    constructor(private heroService:HeroService,
        private ngzone:NgZone){
            this.subscription = this.heroService.heroesChange.subscribe(heroes =>
            {
                this.ngzone.run(()=>{
                this.heroes = heroes.slice(1,5);
                console.log(this.heroes);
                })
                
                
            });
        }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }
    ngOnInit(): void {
        this.heroService.getHeroes().then(heroes=>this.heroes = heroes.slice(1,5));
        console.log(this.heroes);
    }
 }
