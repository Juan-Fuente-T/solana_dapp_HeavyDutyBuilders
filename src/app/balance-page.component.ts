import { Component } from '@angular/core';
import { BalanceSectionComponent } from './balance-section.component';
import { TransactionsSectionComponent } from './transactions-section.component';

@Component({
  selector: 'dapp-solana-juan-fuente-balance-page',
  template: `
    <div class="flex justify-center gap-4">
      <!--<dapp-solana-juan-fuente-balance-section></dapp-solana-juan-fuente-balance-section>
-->
      <dapp-solana-juan-fuente-transactions-section></dapp-solana-juan-fuente-transactions-section>
    </div>
  `,
  standalone: true,
  imports: [BalanceSectionComponent, TransactionsSectionComponent],
})
export class BalancePageComponent { }