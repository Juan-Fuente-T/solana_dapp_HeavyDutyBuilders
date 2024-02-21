import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShyftApiService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _header = { 'x-api-key': 'U6FB9bi1t3_DiqTv' }
  //private readonly _mint = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
  //private readonly mint = '7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs';

  private readonly _mint = '7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs';

  getAccount(publicKey: string | undefined | null, mint: string) {
    if (!publicKey) {
      return of(null);
    }

    const url = new URL('https://api.shyft.to/sol/v1/wallet/token_balance');

    url.searchParams.set('network', 'mainnet-beta');
    url.searchParams.set('wallet', publicKey);
    url.searchParams.set('token', mint);

    return this._httpClient
      .get<{
        result: { balance: number; info: { image: string } };
      }>(url.toString(), { headers: this._header })
      .pipe(map((response) => response.result));
  }

  getSolBalance(publicKey2: string | undefined | null) {
  
    if (!publicKey2) {
      return of(null);
    }
    
    const url = new URL('https://api.shyft.to/sol/v1/wallet/balance');

    url.searchParams.set('network', 'mainnet-beta');
    url.searchParams.set('wallet', publicKey2);
    

    return this._httpClient.get<{
      result: { balance: number };
    }>(url.toString(), { headers: this._header })
    .pipe(map((response) => response.result));
  }


  getTransactions(publicKey: string | undefined | null) {
    if (!publicKey) {
      return of(null);
    }

    const url = new URL('https://api.shyft.to/sol/v1/transaction/history');

    url.searchParams.set('network', 'mainnet-beta');
    url.searchParams.set('account', publicKey);
    url.searchParams.set('tx-num', '10');

    return this._httpClient
      .get<{
        result: {
          /*type: string;
          timestamp: string;
          actions: {
            info: {
              receiver: string;
              amount: number;
            }
          }*/
          status: string;
          type: string;
          timestamp: string
          /*.get<{
            result: {
              type: string;
              timestamp: string;*/
        }[];
      }>(url.toString(), { headers: this._header })
      .pipe(map((response) => response.result));
  }
}


/*
shyftApiService.getAccount(publicKey, mint).subscribe(accountData => {
  console.log(accountData); // Aquí tendrás el resultado de la petición
}, error => {
  console.error(error); // Maneja cualquier error que ocurra durante la petición
});
*/