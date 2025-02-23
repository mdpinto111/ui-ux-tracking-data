import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { TicketDetailComponent } from './pages/ticket-detail/ticket-detail.component';
import { TicketsComponent } from './pages/tickets/tickets.component';

export const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'ticket/:id', component: TicketDetailComponent }, // <-- add this
  { path: '', component: TicketsComponent }, // <-- add this
];
