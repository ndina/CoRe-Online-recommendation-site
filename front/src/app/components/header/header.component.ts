import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ProviderService } from '../../services/provider.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: false,
})
export class HeaderComponent {

  constructor(public provider: ProviderService, private router: Router) {}

  async logout(): Promise<void> {
    await this.provider.logout();
    this.router.navigateByUrl('/');
  }
}
