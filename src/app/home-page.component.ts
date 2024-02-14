import { Component } from '@angular/core';
import { FeaturesSectionComponent } from './features-section.component';
import { HeroSectionComponent } from './hero-section.component';

@Component({
  selector: 'dapp-solana-juan-fuente-home-page',
  template: `
      <dapp-solana-juan-fuente-hero-section>
      <dapp-solana-juan-fuente-features-section></dapp-solana-juan-fuente-features-section>
`,
  standalone: true,
  imports: [FeaturesSectionComponent, HeroSectionComponent]
})
export class HomePageComponent { }