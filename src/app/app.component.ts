import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatAnchor } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
//import { RouterModule } from '@angular/router';
import { MatCard } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { ConnectionStore, WalletStore } from '@heavy-duty/wallet-adapter';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
//import { computedAsync } from 'ngxtension/computed-async';
import { ShyftApiService } from './shyft-api.service';
import { TransferModalComponent } from './transfer-modal.component';
@Component({

  standalone: true,
  imports: [RouterOutlet,
    RouterLink,
    //imports: [RouterModule,
    DecimalPipe,
    MatAnchor,
    HdWalletMultiButtonComponent,
    CommonModule,
    MatCard
  ],
  selector: 'dapp-solana-juan-fuente-root',
  template: `
    <header class=" px-4 py-4 pt-4 pb-8 relative">
    <div class="flex flex-direction-row justify-between items-center">
    <img src="assets/logo.png" alt="Logo" class="w-80 h-16">
      <h1 class="text-center text-3xl text-slate-200 gap-4">Solana Shift Token Service</h1>
      <div class="flex justify-center mb-4">
        <hd-wallet-multi-button class="mt-4 mb-4"></hd-wallet-multi-button>
      </div>
    </div> 
      <h1 class="text-center text-slate-200 text-4xl m-8">Make your life easy, send yor money right</h1>



      <nav>
        <ul class="flex justify-center items-center gap-4 mt-8 mb-24">
          <li>
            <a [routerLink]="['']" mat-raised-button>Home</a>
          </li>      
          <li>
            <a [routerLink]="['transactions']" mat-raised-button>Transactions</a>
          </li>
          <li>
            <a [routerLink]="['settings']" mat-raised-button>Settings</a>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
})

export class AppComponent {
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$);
  private readonly _matDialog = inject(MatDialog);
  private readonly _connectionStore = inject(ConnectionStore);


  ngOnInit() {
    this._connectionStore.setEndpoint(this._shyftApiService.getEndpoint());
  }

  onTransfer(){
    this._matDialog.open(TransferModalComponent);
  }

}

