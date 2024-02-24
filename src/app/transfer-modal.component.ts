import { Component } from "@angular/core";
import { createTransferInstructions } from '@heavy-duty/spl-utils';
import { injectTransactionSender } from "@heavy-duty/wallet-adapter";
import { TransferFormComponent, TransferFormPayload } from "./transfer-form.component";
@Component({
  selector: 'dapp-solana-juan-fuente-transfer-modal',
  template: `
  <div class="px-8 pt-16 pb-8">
    <h2 class="text-3xl text-center text-slate-200 mb-4 ">Transferir fondos</h2>

 <dapp-solana-juan-fuente-transfer-form (submitForm)="onTransfer($event, mint)"></dapp-solana-juan-fuente-transfer-form>

  </div>
  `,
  standalone: true,
  imports: [TransferFormComponent],
})
export class TransferModalComponent {
  private readonly _transactionSender = injectTransactionSender();
  mint: string= '';

  onTransfer(payload: TransferFormPayload, mint: string ) {
    
    console.log("Hola mundo!", payload);

    this._transactionSender
      .send(({ publicKey }) => createTransferInstructions({
        amount: payload.amount,
        mintAddress: this.mint,
        receiverAddress: payload.receiverAddress,
        senderAddress: publicKey.toBase58(),
        fundReceiver: true,
        memo: payload.memo
      })).subscribe({
        next: (signature) => console.log(`Firma: ${signature}`),
        error: error => console.error("Ocurrió un error", this.mint),
        complete: () => console.log('Transacción lista')
      })
  }
}