import { Component } from "@angular/core";
import { TransferFormComponent } from "./transfer-form.component";

@Component({
  selector: 'dapp-solana-juan-fuente-transfer-modal',
  template: `
  <div class="px-8 py-16">
    <h2 class="text-3xl">Transferir fondos</h2>

    <dapp-solana-juan-fuente-transfer-form></dapp-solana-juan-fuente-transfer-form>
  </div>
  `,
  standalone: true,
  imports: [TransferFormComponent],
})
export class TransferModalComponent { }