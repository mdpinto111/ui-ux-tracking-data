import { Component, OnInit } from '@angular/core';
import {
  RouterOutlet,
  NavigationEnd,
  RouterModule,
  Router,
  Event,
} from '@angular/router'; // <-- Add RouterModule
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import posthog from 'posthog-js';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, HeaderComponent, CommonModule], // <-- Add RouterModule here
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  navigationEnd: Observable<NavigationEnd>;

  constructor(public router: Router) {
    this.navigationEnd = router.events.pipe(
      filter((event: Event) => event instanceof NavigationEnd)
    ) as Observable<NavigationEnd>;
  }

  ngOnInit() {
    this.navigationEnd.subscribe((event: NavigationEnd) => {
      posthog.capture('$pageview');
    });
  }
}
