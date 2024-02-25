import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCard } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { computedAsync } from 'ngxtension/computed-async';
import { ShyftApiService } from './shyft-api.service';
@Component({
  selector: 'dapp-solana-juan-fuente-transactions-section',
  imports: [MatTableModule, MatCard, DatePipe],
  standalone: true,
  template: `
    <mat-card class="mx-auto  w-[700px] px-4 py-8">
      <h2 class="text-center text-3xl mb-4">Historial de Transacciones</h2>

      @if (!transactions()) {
        <p class="text-center text-xl text-slate-700  px-32 py-8 bg-slate-200 rounded-[4px]" >Conecta tu wallet para ver las transacciones.</p>
      } @else if (transactions()?.length === 0) {
        <p class="text-center text-xl ">No hay transacciones disponibles.</p>
      } @else {
        <table mat-table [dataSource]="transactions() ?? []">
          <ng-container matColumnDef="type">
            <th mat-header-cell *matHeaderCellDef>Type</th>
            <td mat-cell *matCellDef="let element">{{ element.type }}</td>
          </ng-container>

          <ng-container matColumnDef="timestamp">
            <th mat-header-cell *matHeaderCellDef>Timestamp</th>
            <td mat-cell *matCellDef="let element">{{ element.timestamp | date: 'dd/MM/yy HH:mm:ss' }}</td></ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let element">{{ element.status }}</td>
          </ng-container>

        <!--
        result: {
          type: string;
          timestamp: string;
          actions: {
            info: {
              receiver: string;
              amount: number;-->
          

          <!--<ng-container *ngIf="!element.transaction">
          <ng-container matColumnDef="receiver">
            <th mat-header-cell *matHeaderCellDef>Receiver</th>
            <td mat-cell *matCellDef="let element">{{ element.actions?.info?.receiver }}</td>
          </ng-container>
          <ng-container matColumnDef="amount">
            <th mat-header-cell *matHeaderCellDef>Amount</th>
            <td mat-cell *matCellDef="let element">{{ element.actions?.info?.amount}}</td>
          </ng-container>
          </ng-container>-->

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      }
    </mat-card>
  `,
})
//entonces deberias tener un if o algo para verificar
//si es una transferencia, entonces haces transaction.actions[0].info.amount.. si no, 
export class TransactionsSectionComponent {
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$);

  readonly transactions = computedAsync(() =>
    this._shyftApiService.getTransactions(this._publicKey()?.toBase58()),
  );

  //displayedColumns: string[] = ['type', 'timestamp', 'receiver', 'amount'];
  displayedColumns: string[] = ['type', 'timestamp', 'status'];
}