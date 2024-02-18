import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCard } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { computedAsync } from 'ngxtension/computed-async';
import { ShyftApiService } from './shyft-api.service';

@Component({
  selector: 'dapp-solana-juan-fuente-balance-section',
  imports: [MatTableModule, MatCard],
  standalone: true,
  template: `
      @if (!account()) {
        <p class="text-center text-l font-bold text-slate-700 bg-slate-200 p-4 h-12 p-4 h-12 mx-auto w-15 rounded-[4px] border-none">Conecta tu wallet para ver tu balance.</p>

      } @else {
    <mat-card class="w-[500px] px-4 py-8">
      <h2 class="text-center text-3xl mb-4">Balance</h2>
      
      <div class="flex justify-center items-center gap-2">
        <img [src]="account()?.info?.image" class="w-8 h-8" />
        <p class="text-xl font-bold">{{ account()?.balance }}</p>
      </div>
    </mat-card>
    
    <mat-card class="w-[500px] px-4 py-8">
        <!-- Para mostrar el balance de SOL -->
        <div class="flex justify-center items-center gap-2">
          <img [src]="solAccount()?.info?.image" class="w-8 h-8"/>
          <p class="text-xl font-bold">
            {{ solAccount()?.balance }}
          </p>
        </div>
           
      </mat-card>
    }
  `,
})
export class BalanceSectionComponent {
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$);

  readonly account = computedAsync(() =>
    this._shyftApiService.getAccount(this._publicKey()?.toBase58(), '7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs'
    ),
    { requireSync: true },
  );
  readonly solAccount = computedAsync(
    () => this._shyftApiService.getAccount(this._publicKey()?.toBase58()
      , 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
    ),
    { requireSync: true },
  );
}