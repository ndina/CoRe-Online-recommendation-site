import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ProviderService } from '../../services/provider.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent {

  username = '';
  password = '';
  error = '';

  constructor(private router: Router, private provider: ProviderService) {}

  close(): void {
    this.router.navigateByUrl('/');
  }

  async login(): Promise<void> {
    this.error = '';
    try {
      await this.provider.login(this.username, this.password);
      this.router.navigateByUrl('/categories');
    } catch (err) {
      this.error = this.provider.errorMessage(err);
    }
  }
}
