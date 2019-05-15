import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  constructor(private  router: Router, private provider: ProviderService) { }

  ngOnInit() {
  }

  hide(){
    this.router.navigateByUrl('');
  }

  login() {
    if (this.username !== '' || this.password !== '') {
    
        this.provider.login(this.username, this.password).then( res => {
            localStorage.setItem('token', res.token);
        });
        this.provider.logged = true;
        alert('Welcome');
        this.router.navigateByUrl('');
    }
  }

  register(){
    this.router.navigateByUrl('signUp')
  }

}
