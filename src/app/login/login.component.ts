import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public errorMsg;
  constructor(private _authService: AuthService, private router: Router) {}
  token: string;
  ngOnInit() {}
    loginUser(user, pass): void {
    this.token = btoa(user + ':' + pass);
    this._authService.getAllPallets(this.token)
    .subscribe(data => {
      localStorage.setItem('pass', this.token);
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['paletList']);
    },
      error => {
        this.errorMsg = error;
        this._authService.errorMess();
      });
  }
  logout(): void {
    console.log('Logout');
    this._authService.logout();
    this.router.navigate(['/login']);
  }
}

