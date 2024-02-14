import { Component } from '@angular/core';
import { FeaturesSectionComponent } from './features-section.component';
import { FooterComponent } from './footer.component';
import { HeroSectionComponent } from './hero-section.component';
@Component({
  selector: 'dapp-solana-juan-fuente-home-page',
  template: `
      <dapp-solana-juan-fuente-hero-section></dapp-solana-juan-fuente-hero-section>
      <dapp-solana-juan-fuente-features-section></dapp-solana-juan-fuente-features-section>
      <dapp-solana-juan-fuente-footer> </dapp-solana-juan-fuente-footer>
`,
  imports: [HeroSectionComponent, FeaturesSectionComponent, FooterComponent],
  standalone: true
})
export class HomePageComponent { }