import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../ticket.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticket-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ticket-detail.component.html',
  styleUrl: './ticket-detail.component.scss',
})
export class TicketDetailComponent implements OnInit {
  ticket?: Ticket;

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ticketService.getTicketById(id).subscribe((ticket) => {
      if (ticket) {
        this.ticket = ticket;
      } else {
        console.error('Ticket not found');
      }
    });
  }
}
