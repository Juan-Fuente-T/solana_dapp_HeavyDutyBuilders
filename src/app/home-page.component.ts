import { Component } from '@angular/core';
import { BalanceSectionComponent } from './balance-section.component';
import { FeaturesSectionComponent } from './features-section.component';
import { FooterComponent } from './footer.component';
@Component({
  selector: 'dapp-solana-juan-fuente-home-page',
  template: `
      <dapp-solana-juan-fuente-balance-section class="mx-auto w-full bg-black bg-opacity-5 px-16 py-8"></dapp-solana-juan-fuente-balance-section>
      <dapp-solana-juan-fuente-features-section></dapp-solana-juan-fuente-features-section>
      <dapp-solana-juan-fuente-footer> </dapp-solana-juan-fuente-footer>
`,
  imports: [BalanceSectionComponent, FeaturesSectionComponent, FooterComponent],
  standalone: true
})
export class HomePageComponent { }