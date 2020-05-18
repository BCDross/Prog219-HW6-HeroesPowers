import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter((h) => h !== hero); // see note below, this removes it from the current list on the client
    this.heroService.deleteHero(hero).subscribe();
  }

  add(name: string, power: string): void {
    name = name.trim();
    power = power.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name, power } as Hero).subscribe((hero) => {
      this.heroes.push(hero);
    });
  }
}
