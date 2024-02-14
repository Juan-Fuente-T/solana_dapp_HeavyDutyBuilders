import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { computedAsync } from 'ngxtension/computed-async';
import { ShyftApiService } from './shyft-api.service';
@Component({
  standalone: true,
  imports: [RouterModule, HdWalletMultiButtonComponent],
  selector: 'dapp-solana-juan-fuente-root',
  template: `
    <header class="px-16 pt-24 pb-8">
      <h1 class="text-center text-5xl mb-4">This is my bank</h1>
      <div class="flex justify-center mb-4">
        <hd-wallet-multi-button></hd-wallet-multi-button>
      </div>
      @if(account()){
        <div class="absolute top-4 left-4 justify-center items-center gap-2">
        <img [src] = "account()?.info?.image" class="w-8 h-8"/>
        <p class= "text-2xl font-bold">{{ account()?.balance }}</p>
        </div>
      }
    </header>
    <main></main>
  `,
})
export class AppComponent {
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$);

  private readonly account = computedAsync(() => this._shyftApiService.getAccount(this._publicKey()?.toBase58()),
    { requireSync: true },
  );
} 
