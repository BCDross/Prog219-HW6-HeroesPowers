// This async functionality uses an Angular HttpClint module to do the REST api to node server
// for us. As we will need  calls to Node and over to mongo to be async, it uses the
// Observable  (called with a .subscribe modifier)
// each of the 5 methods return back the RESULT of executing the this.http.something call
// up to the node server
// all of this is provided to any component in the app as an Angular "Service", our hero service



import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './hero';
import { Power } from './power';
import { MessageService } from './message.service';

// new for HTTP
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })  // this makes this service injectable, Angular's dependecy injection model


export class HeroService {

  // constructor(private messageService: MessageService) { }
  constructor(
    private http: HttpClient, private messageService: MessageService) { }


  getHeroes(): Observable<Hero[]> {                                     // an array of them
    return  this.http.get<Hero[]>('http://localhost:3000/heroes');  
     this.messageService.add('HeroService: fetched heroes');
    // return  this.http.get<Hero[]>(' https://kurtmongoserver.azurewebsites.net/heros/');
  }
  getHero(id: number): Observable<Hero> {                        // one of them
    return this.http.get<Hero>('http://localhost:3000/heroes/' + id);
    // return this.http.get<Hero>('https://kurtmongoserver.azurewebsites.net/tasks/' + taskName);
  }

  // This is part of my original way to display the heroes by power.

  // getPowers(): Observable<Power[]> {                                     // an array of them
  //   return  this.http.get<Power[]>('http://localhost:3000/powers');
  //    this.messageService.add('HeroService: fetched powers');
  //   // return  this.http.get<Hero[]>(' https://kurtmongoserver.azurewebsites.net/heros/');
  //}


  updateHero(hero: Hero): Observable<void> {
  return this.http.put<void>('http://localhost:3000/heroes/' + hero.id,  hero);
  // return this.http.put<void>('https://kurtmongoserver.azurewebsites.net/tasks/' + task._id, task);
  }

  deleteHero(hero: Hero) {
    return this.http.delete('http://localhost:3000/heroes/' + hero.id);
    // return this.http.delete('https://kurtmongoserver.azurewebsites.net/heroes/' + hero.id);
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>('http://localhost:3000/heroes/', hero);  // passed in body object
     // return this.http.post<Task>('https://kurtmongoserver.azurewebsites.net/heroes/', hero);
  }
}
