import { Component } from '@angular/core';

@Component({
  selector: 'dapp-solana-juan-fuente-features-section',
  template: `
    <section class="px-16 py-24">
      <ul class="flex justify-center items-center gap-16 text-slate-200 text-2xl font-bold">
        <li>Fast</li>
        <li>Safe</li>
        <li>Efficient</li>
     </ul>
  </section>
  `,
  standalone: true,
})
export class FeaturesSectionComponent { }