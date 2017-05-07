import { Injectable }           from '@angular/core';
import { Hero }                 from '../db/hero';
//import { HEROES }               from "./../db/mock-heroes";
import { Headers, Http }    from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Subject }  from 'rxjs/Subject';
import { Observable }   from  'rxjs';
@Injectable()
export class HeroService{

    HEROES: Hero[] = [
        {id: 11, name: 'Mr. Nice'},
        {id: 12, name: 'Narco'},
        {id: 13, name: 'Bombasto'},
        {id: 14, name: 'Celeritas'},
        {id: 15, name: 'Magneta'},
        {id: 16, name: 'RubberMan'},
        {id: 17, name: 'Dynama'},
        {id: 18, name: 'Dr IQ'},
        {id: 19, name: 'Magma'},
        {id: 20, name: 'Tornado'}
    ];

    heroesChange: Subject<Hero[]> = new Subject<Hero[]>();

    setHeroes(heroes:Hero[]):Promise<void> {
        this.HEROES=heroes;
        this.heroesChange.next(this.HEROES);

        return Promise.resolve();
    }

    getHeroes():Promise<Hero[]> {
        return Promise.resolve(this.HEROES);
    }

    getHero(id: number): Promise<Hero> {
        return this.getHeroes()
             .then(heroes => heroes.find(hero => hero.id === id));
    }

    update(hero: Hero): Promise<Hero>{
        this.HEROES.forEach(function(part, index, theArray){
            if(part.id == hero.id){
                theArray[index] = hero;
            }
        });
        return Promise.resolve(hero);
    }

    create(name:string): Promise<Hero>{
        var heroid:number = 0;

        this.HEROES.forEach(function(part,index,theArray){
            if(part.id>=heroid){
                heroid = part.id+1;
            }
        });

        var newHero = new Hero(heroid,name);
        this.HEROES.push(newHero);

        return Promise.resolve(newHero);
    }

    delete(deleteId:number): Promise<void>{
        //console.log(deleteId);
        for(var i=0; i< this.HEROES.length; i++){
            var hero = this.HEROES[i];
            if(hero.id == deleteId) {
                this.HEROES.splice(i, 1);
                break;
            }
        }
        return Promise.resolve();
    }
}