import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Ticket } from '../ticket.model';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private ticketsUrl = 'assets/tickets.json';

  constructor(private http: HttpClient) {}

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.ticketsUrl);
  }

  getTicketById(id: number): Observable<Ticket | undefined> {
    return this.getTickets().pipe(
      map((tickets) => tickets.find((ticket) => ticket.id === id))
    );
  }
}
