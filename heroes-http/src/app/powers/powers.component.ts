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
  powers: Power[] = [];

  heroes: Hero[] = [];
  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getPowers();
    this.getHeroes();
  }

  getPowers(): void {
    this.heroService.getPowers().subscribe((powers) => (this.powers = powers));
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

}
