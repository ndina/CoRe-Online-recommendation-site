import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ProviderService } from '../../services/provider.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: false,
})
export class SignupComponent {

  username = '';
  password = '';
  email = '';
  name = '';
  surname = '';
  error = '';

  constructor(private router: Router, private provider: ProviderService) {}

  close(): void {
    this.router.navigateByUrl('/');
  }

  async signUp(): Promise<void> {
    this.error = '';
    try {
      await this.provider.createUser(this.username, this.password, this.email, this.name, this.surname);
      await this.provider.login(this.username, this.password);
      this.router.navigateByUrl('/categories');
    } catch (err) {
      this.error = this.provider.errorMessage(err);
    }
  }
}
