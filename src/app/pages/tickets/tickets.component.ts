import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ticket } from '../../ticket.model';
import { TicketService } from '../../services/ticket.service';
import { RouterOutlet, RouterModule } from '@angular/router'; // <-- Add RouterModule
import { CreateTicketDialogComponent } from '../../components/create-ticket-dialog/create-ticket-dialog.component';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    CreateTicketDialogComponent,
  ],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss',
})
export class TicketsComponent implements OnInit {
  tickets: Ticket[] = [];
  showDialog = false;

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    this.ticketService.getTickets().subscribe({
      next: (data) => (this.tickets = data),
      error: (err) => console.error('Error fetching tickets:', err),
    });
  }

  openCreateTicketDialog() {
    this.showDialog = true;
  }

  addNewTicket(ticket: Ticket) {
    ticket.id = Math.max(...this.tickets.map((t) => t.id)) + 1;
    this.tickets.push(ticket);
  }
}
