import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FooterComponent {

  public email = 'opositaweb@gmail.com';
  public phone = '+34 123 45 67 89';
  public instagram = 'https://www.instagram.com/';
  public facebook = 'https://www.facebook.com/';
  public twitter = 'https://twitter.com/';
}
