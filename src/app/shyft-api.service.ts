import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, of } from 'rxjs';
import { config } from '../config';

@Injectable({ providedIn: 'root' })
export class ShyftApiService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _header = { 'x-api-key': config.shyftApiKey }
  //private readonly _mint = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
  //private readonly mint = '7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs';

  //private readonly _mint = '7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs';

  // private mockAccountResponse = { balance: 100, info: { image: 'https://example.com/token-image.png' } };
  // private mockSolBalanceResponse = { balance: 1.5 };
  // private mockTransactionsResponse = [
  //   { status: 'success', type: 'transfer', timestamp: '2024-12-04T12:00:00Z' },
  //   { status: 'pending', type: 'transfer', timestamp: '2024-12-03T15:30:00Z' }
  // ];
  // private mockAllTokensResponse = [
  //   {
  //     address: 'TOKEN1_ADDRESS',
  //     balance: 50,
  //     info: { name: 'Token1', symbol: 'T1', image: 'https://example.com/token1.png' }
  //   },
  //   {
  //     address: 'TOKEN2_ADDRESS',
  //     balance: 100,
  //     info: { name: 'Token2', symbol: 'T2', image: 'https://example.com/token2.png' }
  //   }
  // ];
  
  getEndpoint(){
    const url = new URL('https://rpc.shyft.to');
    url.searchParams.set('api_key', config.shyftApiKey);
    return url.toString();
   }

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
    // return of(this.mockAccountResponse);
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

  // return of(this.mockSolBalanceResponse);
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
    // return of(this.mockTransactionsResponse);
  }
  
  getAllTokens(publicKey: string | undefined | null) {
    if (!publicKey) {
      return of(null);
    }

    const url = new URL('https://api.shyft.to/sol/v1/wallet/all_tokens');

    url.searchParams.set('network', 'mainnet-beta');
    url.searchParams.set('wallet', publicKey);

    return this._httpClient
      .get<{
        result: {
          address: string;
          balance: number;
          info: { name: string; symbol: string; image: string };
        }[];
      }>(url.toString(), {
        headers: this._header,
      })
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