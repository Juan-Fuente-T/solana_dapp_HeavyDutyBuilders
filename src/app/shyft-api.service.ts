import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { forkJoin, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShyftApiService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _headers = { 'x-api-key': 'U6FB9bi1t3_DiqTv' }
  //private readonly _mint = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
  private readonly mint = '7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs';

  getAccount(publicKey: string | undefined | null, mint: string) {
    if (!publicKey) {
      return of(null);
    }
    const baseUrl = 'https://api.shyft.to/sol/v1/wallet';
    const params: { [key: string]: string } = {
      network: 'mainnet-beta',
      wallet: publicKey,
      token: mint
    };

    const tokenBalanceUrl = new URL(`${baseUrl}/token_balance`);
    const transactionHistoryUrl = new URL(`${baseUrl}/transaction_history`);
    const collectionsUrl = new URL(`${baseUrl}/collections`);

    Object.keys(params).forEach(key => {
      tokenBalanceUrl.searchParams.set(key, params[key]);
      transactionHistoryUrl.searchParams.set(key, params[key]);
      collectionsUrl.searchParams.set(key, params[key]);
    });

    const tokenBalanceRequest = this._httpClient.get<{
      result: { balance: number; info: { image: string } }
    }>(tokenBalanceUrl.toString(), { headers: this._headers }
    )

    const transactionHistoryRequest = this._httpClient.get<{
      success: boolean;
      message: string;
      result: {
        blockTime: number;
        transaction: {
          message: {
            accountKeys: { pubkey: string }[];
            instructions: {
              parsed: {
                info: { destination: string; amount: number };
              }[];
            }[];
          };
        };
      }[];
    }>(transactionHistoryUrl.toString(), { headers: this._headers });

    const collectionsRequest = this._httpClient.get<{
      success: boolean;
      message: string;
      result: {
        collections: {
          name: string;
          nft_count: number;
          nfts: {
            name: string;
            mint: string;
            metadata_uri: string;
          }[];
        }[];
      };
    }>(collectionsUrl.toString(), { headers: this._headers });

    //const transactionHistoryRequest = this._httpClient.get<any>(transactionHistoryUrl.toString(), { headers: this._headers });
    //const collectionsRequest = this._httpClient.get<any>(collectionsUrl.toString(), { headers: this._headers });

    return forkJoin([tokenBalanceRequest, transactionHistoryRequest, collectionsRequest])
      .pipe(
        map(([tokenBalanceResponse, transactionHistoryResponse, collectionsResponse]) => ({
          tokenBalance: tokenBalanceResponse,
          transactionHistory: transactionHistoryResponse,
          collections: collectionsResponse
        }))
      )
  }
}
/*
shyftApiService.getAccount(publicKey, mint).subscribe(accountData => {
  console.log(accountData); // Aquí tendrás el resultado de la petición
}, error => {
  console.error(error); // Maneja cualquier error que ocurra durante la petición
});
*/