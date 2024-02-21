import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";

export interface TransferFormModel {
  memo: string | null;
  amount: number | null;
  receiverAddress: string | null;
}
export interface TransferFormPayload {
  memo: string;
  amount: number;
  receiverAddress: string;
}

@Component({
  selector: 'dapp-solana-juan-fuente-transfer-form',
  template: `
  <div class="px-8 py-16">
    <form #form="ngForm" >
      <mat-form-field appearance="fill" >
          <mat-label>Concepto</mat-label>
          <input
          name="memo"
          matInput
          type="text"
          placeholder="Ejemplo: Pagar factura de luz"
          [(ngModel)]="model.memo"
          required
          #memoControl="ngModel"
          />
          <mat-icon matSuffix>description</mat-icon>
          <mat-hint>Debe ser el motivo de la transferencia</mat-hint>
          @if (form.submitted && memoControl.errors){
            <mat-error>
              @if(memoControl.errors['required']){
                El motivo es obligatorio
              }
            </mat-error>
        }@else{
          <mat-hint>Deber ser el motivo de la transferencia</mat-hint>
        }
         

        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Monto</mat-label>
          <input
            name="amount"
            matInput
            type="number"
            min="0"
            placeholder="Ingresa el monto aquí"
            [(ngModel)]="model.amount"
            required
            #amountControl="ngModel"
          />
          <mat-icon matSuffix>attach_money</mat-icon>
          @if (form.submitted && amountControl.errors){
            <mat-error>
              @if(amountControl.errors['required']){
                El monto es obligatorio
              }@else if (amountControl.errors['min']){
                El monto debe ser mayor a cero
          }
            </mat-error>
        }@else{
          <mat-hint>Deber ser el motivo de la transferencia</mat-hint>
        }
         
        </mat-form-field>  
        <mat-form-field appearance="fill">
          <mat-label>Destinatario</mat-label>
          <input
            name="receiverAddress"
            matInput
            type="text"
            placeholder="Public Key de la wallet del destinatario"
            [(ngModel)]="model.receiverAddress"
            required
            #receiverAddressControl="ngModel"
          />
          <mat-icon matSuffix>key</mat-icon>
          @if (form.submitted && receiverAddressControl.errors){
            <mat-error>
              @if(receiverAddressControl.errors['required']){
                EL destinatario es obligatorio
          }
            </mat-error>
        }@else{
          <mat-hint>Deber ser una wallet de Solana</mat-hint>
        }
        </mat-form-field>  
    </form>
  </div>

  `,
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInput, MatIcon, MatButton]
})
export class TransferFormComponent {
  readonly model: TransferFormModel = {
    memo: null,
    amount: null,
    receiverAddress: null
  }
}