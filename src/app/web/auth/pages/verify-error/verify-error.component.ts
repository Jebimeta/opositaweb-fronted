import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-error',
  imports: [NavbarComponent],
  templateUrl: './verify-error.component.html',
  styleUrls: ['./verify-error.component.css'],
})
export default class VerifyErrorComponent implements OnInit {
  
  private router = inject(Router);
  ngOnInit(): void {
    let counter = 10;

    const interval = setInterval(() => {
      counter--;
      document.getElementById('counter')!.textContent = counter.toString();
      if (counter === 0) {
        clearInterval(interval);
        this.router.navigateByUrl('/home');
      }
    }, 1000);
  }
}
