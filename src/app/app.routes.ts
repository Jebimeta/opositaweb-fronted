import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'home',
        loadComponent: () => import('./web/home/home.component'),
    },
    {
        path: 'admin',
        loadComponent: () => import('./web/admin/admin.component'),
        children: [
            {
            path: 'dashboard',
            title: "Dashboard de administrador",
            loadComponent: () => import('./web/admin/pages/customer/dashboard/dashboard.component'),
            },
            {
                path: 'create-customer',
                title: "Crear cliente",
                loadComponent: () => import('./web/admin/pages/customer/create-costumer/create-costumer.component'),
            },
            {
                path: 'update-customer/:id',
                title: "Actualizar cliente",
                loadComponent: () => import('./web/admin/pages/customer/update-costumer/update-costumer.component'),
            },
            {
                path: 'customer-list',
                title: "Lista de clientes",
                loadComponent: () => import('./web/admin/pages/customer/customer-list/customer-list.component'),
            },
            {
                path: 'customer-details/:id',
                title: "Detalles del cliente",
                loadComponent: () => import('./web/admin/pages/customer/customer-details/customer-details.component'),
            }
        ]
    }
];
