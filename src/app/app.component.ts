import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatAnchor } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
//import { RouterModule } from '@angular/router';
import { MatCard } from '@angular/material/card';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { computedAsync } from 'ngxtension/computed-async';
import { ShyftApiService } from './shyft-api.service';

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
    <header class="px-16 pt-24 pb-8 relative">
      <h1 class="text-center text-5xl mb-4">This is the bank that STEALS your money</h1>

      <div class="flex justify-center mb-4">
        <hd-wallet-multi-button></hd-wallet-multi-button>
      </div>

      <!--@if (account()){
        <div class="absolute top-4 left-4 flex items-center gap-2">
        <img [src]="account()?.info?.image" class="w-8 h-8"/>
        <p class="text-2xl font-bold">
          {{ account()?.balance | number }}
        </p>
        </div>
      }-->

      <nav>
        <ul class="flex justify-center items-center gap-4">
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


  /*ngOnInit(): void {
    this._shyftApiService.getTransactions(this._publicKey()?.toBase58()).subscribe(data => {
      this.transactions = data;
    });
  }*/
  readonly account = computedAsync(
    () => this._shyftApiService.getAccount(this._publicKey()?.toBase58()
      , '7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs'
    ),
    { requireSync: true },
  );

  /*solBalance() {
    // Obtener el balance de SOL de manera asíncrona
    const solAccount = computedAsync(
      () => this._shyftApiService.getAccount(this._publicKey()?.toBase58(), 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
      { requireSync: true }
    );
  
    return solAccount()?.balance; // Ajusta 'solAddress' a la dirección correcta de tu cuenta SOL
  }*/
  /*readonly transactions = computedAsync(
    () => this._shyftApiService.getTransactions(this._publicKey()?.toBase58()
    ),
    { requireSync: true },
  );*/
  /*ngOnInit(): void {
    this.transactions.subscribe(
      (data: any) => {
        // Manejar los datos de transacciones aquí
        console.log('Transacciones:', data);
      },
      (error: any) => {
        // Manejar errores si es necesario
        console.error('Error al obtener transacciones:', error);
      }
    );
  }*/
}

//RESPUESTA API COLECCION DE NFTs

/**
"success":true,"message":"Collection Nfts retrieved successfully","result":{"nfts":[{"name":"Shiba 6390","symbol":"SSHIBAS","royalty":2.5,"image_uri":"https://www.arweave.net/7H3Sc8E-lDBwqjK52201Fq0p2okp6uJFYUVBSwVDEyM?ext=png","cached_image_uri":"https://cdn.shyft.to/img/https%253A%252F%252Fwww.arweave.net%252F7H3Sc8E-lDBwqjK52201Fq0p2okp6uJFYUVBSwVDEyM%253Fext%253Dpng","animation_url":"","cached_animation_url":"","metadata_uri":"https://arweave.net/6MlMPWWFMPdmTY1_oMvtF17myAbXvXaSziXzZ1Qyvno","description":"Dopest pixel shibas on the chain","mint":"12R1YDL8JvNuuZgy7HuaRma6p9U8bEXwKzXeRw3ps6jM","owner":"8AapzFc33t9LCV44SywwbAWNEcNuX2os5iCPvjFG8PWc","update_authority":"padaSLVyzU91GkTVVHFfzLD8ec86Svnv9T1HJ2E9qKW","creators":[{"address":"7rK2nh1hfALTjQcauAUXR2eg74UcgTpQzPZG79XTS9au","share":0,"verified":true},{"address":"Hmi7WNiQEumHHezXw5cdJrWFF3QpKXHTmDDBTFkE5KL1","share":100,"verified":false}],"collection":{"address":"1ascapYyxEYhbmmUcgXEsg9Nkdk9eZwPBohRCJCZSx3","verified":true,"name":"Such Shibas","family":"Such Shibas"},"attributes":{"Background":"Green","Base":"Black Shiba","Mouth":"Sad","Neck":"Anchor Tattoo","Head":"None","Eyes":"Frown","Ears":"None"},"attributes_array":[{"trait_type":"Background","value":"Green"},{"trait_type":"Base","value":"Black Shiba"},{"trait_type":"Mouth","value":"Sad"},{"trait_type":"Neck","value":"Anchor Tattoo"},{"trait_type":"Head","value":"None"},{"trait_type":"Eyes","value":"Frown"},{"trait_type":"Ears","value":"None"}],"files":[{"uri":"https://www.arweave.net/7H3Sc8E-lDBwqjK52201Fq0p2okp6uJFYUVBSwVDEyM?ext=png","type":"image/png"}],"external_url":"https://suchshibas.io/","is_loaded_metadata":true,"primary_sale_happened":true,"is_mutable":true,"token_standard":"NonFungible","is_compressed":false,"merkle_tree":"","is_burnt":false},{"name":"Shiba 1168","symbol":"SSHIBAS","royalty":2.5,"image_uri":"https://www.arweave.net/fS9wnzuAkFA0vqswGKOu0HlweeV_e34OSEnn1vC3-mw?ext=png","cached_image_uri":"https://www.arweave.net/fS9wnzuAkFA0vqswGKOu0HlweeV_e34OSEnn1vC3-mw?ext=png","animation_url":"","cached_animation_url":"","metadata_uri":"https://arweave.net/QOthStT7PWC0EmHxyq2yyhlmz-QdKm4A9p18O-Pb0N4","description":"Dopest pixel shibas on the chain","mint":"12xjtn9Kr1pW3K2DxeLHP9RdaZUhaAspWsf3zyXR1huj","owner":"BWT2R4c38qBiHSCN9s2Hoq5QXDw59rHGmSWbZd2J8G2F","update_authority":"padaSLVyzU91GkTVVHFfzLD8ec86Svnv9T1HJ2E9qKW","creators":[{"address":"7rK2nh1hfALTjQcauAUXR2eg74UcgTpQzPZG79XTS9au","share":0,"verified":true},{"address":"Hmi7WNiQEumHHezXw5cdJrWFF3QpKXHTmDDBTFkE5KL1","share":100,"verified":false}],"collection":{"address":"1ascapYyxEYhbmmUcgXEsg9Nkdk9eZwPBohRCJCZSx3","verified":true,"name":"Such Shibas","family":"Such Shibas"},"attributes":{"Background":"Yellow","Base":"Red Shiba","Mouth":"Smile","Neck":"Red Scarf","Head":"None","Eyes":"Eyes Shut","Ears":"None"},"attributes_array":[{"trait_type":"Background","value":"Yellow"},{"trait_type":"Base","value":"Red Shiba"},{"trait_type":"Mouth","value":"Smile"},{"trait_type":"Neck","value":"Red Scarf"},{"trait_type":"Head","value":"None"},{"trait_type":"Eyes","value":"Eyes Shut"},{"trait_type":"Ears","value":"None"}],"files":[{"uri":"https://www.arweave.net/fS9wnzuAkFA0vqswGKOu0HlweeV_e34OSEnn1vC3-mw?ext=png","type":"image/png"}],"external_url":"https://suchshibas.io/","is_loaded_metadata":true,"primary_sale_happened":true,"is_mutable":true,"token_standard":"NonFungible","is_compressed":false,"merkle_tree":"","is_burnt":false}],"total_count":8039,"total_pages":4020,"page":5,"size":2}}
 * 
 * 
 * 
 * 
 * tokenBalance
: 
message
: 
"Token balance fetched successfully"
result
: 
address
: 
"7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs"
associated_account
: 
"5BHhCwiq3Z1PQLhu7t2dGX7pxn8ifWtFHGmutDFWSWTN"
balance
: 
30
info
: 
decimals
: 
9
image
: 
"https://assets.coingecko.com/coins/images/33698/large/image.png?1702821846"
name
: 
"Silly Dragon"
symbol
: 
"SILLY"
[[Prototype]]
: 
Object
constructor
: 
ƒ Object()
hasOwnProperty
: 
ƒ hasOwnProperty()
isPrototypeOf
: 
ƒ isPrototypeOf()
propertyIsEnumerable
: 
ƒ propertyIsEnumerable()
toLocaleString
: 
ƒ toLocaleString()
toString
: 
ƒ ()
valueOf
: 
ƒ valueOf()
__defineGetter__
: 
ƒ __defineGetter__()
__defineSetter__
: 
ƒ __defineSetter__()
__lookupGetter__
: 
ƒ __lookupGetter__()
__lookupSetter__
: 
ƒ __lookupSetter__()
__proto__
: 
(...)
get __proto__
: 
ƒ __proto__()
set __proto__
: 
ƒ __proto__()
isFrozen
: 
false
[[Prototype]]
: 
Object
constructor
: 
ƒ Object()
hasOwnProperty
: 
ƒ hasOwnProperty()
isPrototypeOf
: 
ƒ isPrototypeOf()
propertyIsEnumerable
: 
ƒ propertyIsEnumerable()
toLocaleString
: 
ƒ toLocaleString()
toString
: 
ƒ ()
valueOf
: 
ƒ valueOf()
__defineGetter__
: 
ƒ __defineGetter__()
__defineSetter__
: 
ƒ __defineSetter__()
__lookupGetter__
: 
ƒ __lookupGetter__()
__lookupSetter__
: 
ƒ __lookupSetter__()
__proto__
: 
(...)
get __proto__
: 
ƒ __proto__()
set __proto__
: 
ƒ __proto__()
success
: 
true
[[Prototype]]
: 
Object
constructor
: 
ƒ Object()
hasOwnProperty
: 
ƒ hasOwnProperty()
isPrototypeOf
: 
ƒ isPrototypeOf()
propertyIsEnumerable
: 
ƒ propertyIsEnumerable()
toLocaleString
: 
ƒ toLocaleString()
toString
: 
ƒ ()
valueOf
: 
ƒ valueOf()
__defineGetter__
: 
ƒ __defineGetter__()
__defineSetter__
: 
ƒ __defineSetter__()
__lookupGetter__
: 
ƒ __lookupGetter__()
__lookupSetter__
: 
ƒ __lookupSetter__()
__proto__
: 
(...)
get __proto__
: 
ƒ __proto__()
set __proto__
: 
ƒ __proto__()
transactions
: 
Array(1)
0
: 
{receiver: undefined, amount: undefined}
length
: 
1
[[Prototype]]
: 
Array(0)
[[Prototype]]
: 
Object
constructor
: 
ƒ Object()
hasOwnProperty
: 
ƒ hasOwnProperty()
isPrototypeOf
: 
ƒ isPrototypeOf()
propertyIsEnumerable
: 
ƒ propertyIsEnumerable()
toLocaleString
: 
ƒ toLocaleString()
toString
: 
ƒ ()
valueOf
: 
ƒ valueOf()
__defineGetter__
: 
ƒ __defineGetter__()
__defineSetter__
: 
ƒ __defineSetter__()
__lookupGetter__
: 
ƒ __lookupGetter__()
__lookupSetter__
: 
ƒ __lookupSetter__()
__proto__
: 
(...)
get __proto__
: 
ƒ __proto__()
set __proto__
: 
ƒ __proto__()
length
: 
1
name
: 
"set __proto__"
arguments
: 
(...)
caller
: 
(...)
[[Prototype]]
: 
ƒ ()
[[Scopes]]
: 
Scopes[0]
﻿


 * 
*/