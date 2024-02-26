import { Component } from '@angular/core';

@Component({
  selector: 'dapp-solana-juan-fuente-footer',
  template: `
  <section class="px-16 py-8 bg-white bg-opacity-5 fixed bottom-0 w-full ">
    <p class="text-center text-2xl font-bold mb-4">
    Solana<span> STS</span>
    </p>
   
    <p class="text-center text-1xl">
    Made with <span style="color: red;">&#10084;</span> by Juan Fuente
    </p>
    </section>
  `,
  standalone: true,
})
export class FooterComponent { }