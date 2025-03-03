import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PrimeIcons } from 'primeng/api';
import AuthService from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  
  private router = inject(Router); //Nos sirve para navegar entre las rutas de la aplicación

  private authService = inject(AuthService); //Nos sirve para gestionar la autenticación de los usuarios

  // Definimos una lista de lo que aparecerá en el navbar
  public navbarItems: Array<{
    label: string; // El texto que aparecerá en el navbar
    url?: string; // Enlace de la ruta
    icon: string; // Icono que aparecerá en el navbar
    action?: () => void; // Función que se ejecutará al hacer clic en el item
    subItems?: Array<{ label: string; url: string; action?: () => void }>; // Submenú (opcionales)
  }> = [];

  public isProfileMenuOpen: boolean = false; // Variable que nos indica si el menú de perfil está abierto

  ngOnInit(): void {
    this.navbarItems = [
      {
        label: 'Inicio', // Botón de inicio
        url: '/home',
        icon: PrimeIcons.HOME,
      },
      {
        label: 'Pdfs', // Botón para ver los pdfs
        url: '/pdfs/pdf-list',
        icon: PrimeIcons.FILE_PDF,
      },
      {
        label: 'Contacto', // Botón para ver la información de contacto
        url: '/contact/about-us',
        icon: PrimeIcons.ENVELOPE,
      }
    ];

    // Verificamos si el usuario está logueado
    if (this.authService.isAuthenticated()) {
      // Si el usuario es administrador, agregamos un boton especial para el
      if (this.authService.isAdmin()) {
        this.navbarItems.push({
          label: 'Administración',
          url: '/admin',
          icon: PrimeIcons.COG,
        });
      }
      // Agregamos un botón para el perfil del usuario, con un menú desplegable
      this.navbarItems.push({
        label: 'Mi Perfil', // Botón de perfil
        icon: PrimeIcons.USER_EDIT,
        url: '/acount/profile',
        subItems: [
          {
            label: 'Mis pagos', // Submenú para ver los pagos
            url: '/account/payments',
          },
          {
            label: 'Editar perfil', // Submenú para editar el perfil
            url: '/account/edit-profile',
          },
          {
            label: 'Cerrar sesión', // Submenú para cerrar sesión
            action: () => {
              this.authService.logout();
              this.router.navigate(['/home']);
            },
            url: '',
          },
        ],
      });
      // Agregamos un boton para la compra
      this.navbarItems.push({
        label: 'Compra', // Botón para comprar
        url: '/payment',
        icon: PrimeIcons.CREDIT_CARD,
      });
    } else {
      // Si el usuario no está logueado, agreamos un boton para iniciar sesion
      this.navbarItems.push({
        label: 'Login', // Botón para iniciar sesión
        url: '/auth/login',
        icon: PrimeIcons.USER,
      });
    }
  }
}
