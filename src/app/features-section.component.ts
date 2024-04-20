import { Component } from '@angular/core';

@Component({
  selector: 'dapp-solana-juan-fuente-features-section',
  template: `
    <section class="px-16 py-24">
      <div class="flex flex-wrap items-center justify-start -mx-4 sm:-mx-8 md:-mx-12 lg:-mx-16 xl:-mx-20">
        <div class="w-full mx-4 sm:my-12 my-8 sm:max-w-md lg:max-w-none lg:flex-1">
          <p class="text-center text-2xl text-slate-200 gap-4">
          Transfer your assets within the Solana network with a simple transaction
          </p>         
          <p class="text-center text-2xl text-slate-200 gap-4">
          Check your transaction history
          </p>         
          </div>
      </div>
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