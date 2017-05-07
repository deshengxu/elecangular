import { Component, Input , OnInit, NgZone}    from '@angular/core';
import { Hero }         from './db/hero';
import { HeroService } from "./service/hero.service";
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Router }         from '@angular/router';
import { Subscription } from 'rxjs/Subscription';


@Component({
    selector: 'hero-detail',
    templateUrl: './dist/app/hero-detail.component.html',
    styleUrls:['./dist/app/hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit{
    @Input() hero: Hero;
    subscription: Subscription;

    constructor(
        private ngzone:NgZone,
        private heroService: HeroService,
        private route: ActivatedRoute,
        private router:Router,
        private location: Location
    ){
        this.subscription = this.heroService.heroesChange.subscribe(heroes =>
      {
        this.ngzone.run(()=>{
          this.router.navigate(['/heroes']);
        })
        
        
      });
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }

    ngOnInit(): void {
    this.route.params
        .switchMap((params: Params) => this.heroService.getHero(+params['id']))
        .subscribe(hero => this.hero = hero);
    }

    goBack(): void {
        this.location.back();
    }

    save(): void{
        this.heroService.update(this.hero)
            .then( () => this.goBack());
    }

}