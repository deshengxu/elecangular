import { Component, OnInit } from '@angular/core';
import { Hero }       from './db/hero';
import { HeroService }    from './service/hero.service';
import { Router }         from '@angular/router';

@Component({
  selector: 'my-heroes',
  templateUrl: './dist/app/heroes.component.html',
  styleUrls: ['./dist/app/heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  constructor(
    private router: Router,
    private heroService: HeroService) { }
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
}
