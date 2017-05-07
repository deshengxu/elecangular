import { Component, OnInit, NgZone } from '@angular/core';
import { Hero }       from './db/hero';
import { HeroService }    from './service/hero.service';
import { Router }         from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'my-heroes',
  templateUrl: './dist/app/heroes.component.html',
  styleUrls: ['./dist/app/heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  subscription: Subscription;

  constructor(
    private ngzone:NgZone,
    private router: Router,
    private heroService: HeroService) {
      this.subscription = this.heroService.heroesChange.subscribe(heroes =>
      {
        this.ngzone.run(()=>{
          this.heroes = heroes;
          this.selectedHero=null;
          //console.log(this.heroes);
        })
        
        
      });
    }
  
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
  ngOnInit(): void {
    this.getHeroes();
  }
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(name:string): void{
    name = name.trim();
    if(!name) {return;}
    this.heroService.create(name)
      .then(hero => {
        //this.heroes.push(hero);
        this.selectedHero=hero;
      })
  }

  delete(hero:Hero):void{
    this.heroService.delete(hero.id)
      .then( ()=> {
        //this.getHeroes();
        if(this.selectedHero===hero) {this.selectedHero=null};
      });
  }



  
}
