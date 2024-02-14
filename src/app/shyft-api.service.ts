import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShyftApiService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _headers = { 'x-api-key': 'U6FB9bi1t3_DiqTv' }
  private readonly _mint = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';

  getAccount(publicKey: string | undefined | null) {
    if (!publicKey) {
      return of(null);
    }
    const url = new URL('https://api.shyft.to/sol/v1/wallet/token_balance');

    url.searchParams.set('network', 'mainnet-beta');
    url.searchParams.set('wallet', publicKey);
    url.searchParams.set('token', this._mint);

    return this._httpClient.get<{
      result: { balance: number; info: { image: string } }
    }>(url.toString(), { headers: this._headers }
    )
      .pipe(map(({ result }) => result));
  }
}