import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {

  navigating = false;

  preventDoubleClick(): void {

    if (this.navigating) {
      return;
    }

    this.navigating = true;

    setTimeout(() => {
      this.navigating = false;
    }, 500);
  }
}