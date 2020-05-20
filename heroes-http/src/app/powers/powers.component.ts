import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { Power } from '../power';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-powers',
  templateUrl: './powers.component.html',
  styleUrls: ['./powers.component.scss'],
})

export class PowersComponent implements OnInit {

  // This creates a map object data struct. This takes in a string and an array of Heros 
  heroesByPower: Map<string,Hero[]> = new Map();

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.heroService.getHeroes().subscribe(heroes => {
      for (var hero of heroes) {
        let powerList = this.heroesByPower.get(hero.power);
        if (powerList === undefined) {
          powerList = [];
          this.heroesByPower.set(hero.power, powerList);
        }
        powerList.push(hero);
      }

      for (let power of this.heroesByPower.keys()) {
        let powerList = this.heroesByPower.get(power);
        powerList.sort((a, b) => a.name.localeCompare(b.name))
      }
    });
  }
}
