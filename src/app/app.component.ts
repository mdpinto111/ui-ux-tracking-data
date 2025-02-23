import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router'; // <-- Add RouterModule
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, HeaderComponent, CommonModule], // <-- Add RouterModule here
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor() {}
}
