import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { NavbarComponent } from "../navbar/navbar.component";
import FooterComponent from "../footer/footer.component";

@Component({
    standalone: true,
    imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
],
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AdminComponent {

    private router = inject(Router);
    
    public adminItems: Array<{
        label: string;
        url: string;
        icon: string;
        action?: () => void;
    }> = [];

    ngOnInit(): void {
        
        this.adminItems = [
            {
                label: 'Usuarios',
                url: '/admin/dashboard-users',
                icon: 'pi pi-users'
            },
            {
                label: 'Pagos',
                url: '/admin/dashboard-payments',
                icon: 'pi pi-money-bill'
            },
            {
                label: 'Planes de pagos',
                url: '/admin/dashboard-paymentPlans',
                icon: 'pi pi-money-bill'
            },
            {
                label: 'Tests',
                url: '/admin/dashboard-tests',
                icon: 'pi pi-file'
            },
            {
                label: 'Questions',
                url: '/admin/dashboard-questions',
                icon: 'pi pi-question'
            },
            {
                label: 'Pdfs',
                url: '/admin/dashboard-pdfs',
                icon: 'pi pi-file-pdf'
            }
        ]

        
    }
    navigateTo(url: string): void {
        this.router.navigate([url]);
    }
}