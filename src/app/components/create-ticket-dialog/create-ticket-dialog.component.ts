import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-ticket-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-ticket-dialog.component.html',
  styleUrl: './create-ticket-dialog.component.scss',
})
export class CreateTicketDialogComponent {
  @Output() newTicketCreated = new EventEmitter<any>();
  @Output() closeDialog = new EventEmitter<void>();

  ticket = {
    senderName: '',
    receiverName: '',
    body: '',
    date: new Date().toISOString().substring(0, 10),
  };

  createTicket() {
    this.newTicketCreated.emit(this.ticket);
    this.close();
  }

  close() {
    this.closeDialog.emit();
  }
}
