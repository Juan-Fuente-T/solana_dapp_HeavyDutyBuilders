import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatAnchor } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { computedAsync } from 'ngxtension/computed-async';
import { ShyftApiService } from './shyft-api.service';
@Component({
  standalone: true,
  imports: [RouterModule,
    HdWalletMultiButtonComponent,
    DecimalPipe,
    MatAnchor,
    HdWalletMultiButtonComponent,
  ],
  selector: 'dapp-solana-juan-fuente-root',
  template: `
    <header class="px-16 pt-24 pb-8 relative">
      <h1 class="text-center text-5xl mb-4">This is the bank that STEAL your money</h1>
      @if (account()){
        <div class="absolute top-4 left-4 flex items-center gap-2">
        <img [src]="account()?.info?.image" class="w-8 h-8"/>
        <p class="text-2xl font-bold">
          {{ account()?.balance | number }}
        </p>
        </div>
      }
      <div class="flex justify-center mb-4">
        <hd-wallet-multi-button></hd-wallet-multi-button>
      </div>
      </header>
    <main></main>
  `,
})
export class AppComponent {
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$);

  readonly account = computedAsync(
    () => this._shyftApiService.getAccount(this._publicKey()?.toBase58()),
    { requireSync: true },
  );
} 
