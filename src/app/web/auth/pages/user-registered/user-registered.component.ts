import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registered',
  imports: [NavbarComponent],
  templateUrl: './user-registered.component.html',
  styleUrls: ['./user-registered.component.css']
})
export default class UserRegisteredComponent implements OnInit {

  public router = inject(Router);

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
