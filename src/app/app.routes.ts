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
        path: 'dashboard users',
        title: 'Dashboard de administrador Customer',
        loadComponent: () =>
          import('./web/admin/pages/dashboard/dashboard.component'),
        children: [
          {
            path: 'create-customer',
            title: 'Crear cliente',
            loadComponent: () =>
              import(
                './web/admin/pages/customer/create-costumer/create-costumer.component'
              ),
          },
          {
            path: 'update-customer/:id',
            title: 'Actualizar cliente',
            loadComponent: () =>
              import(
                './web/admin/pages/customer/update-costumer/update-costumer.component'
              ),
          },
          {
            path: 'customer-list',
            title: 'Lista de clientes',
            loadComponent: () =>
              import(
                './web/admin/pages/customer/customer-list/customer-list.component'
              ),
          },
          {
            path: 'customer-details/:id',
            title: 'Detalles del cliente',
            loadComponent: () =>
              import(
                './web/admin/pages/customer/customer-details/customer-details.component'
              ),
          },
          {
            path: 'delete-customer/:id',
            title: 'Borrar cliente',
            loadComponent: () =>
              import(
                './web/admin/pages/customer/delete-customer/delete-customer.component'
              ),
          },
        ],
      },
      {
        path: 'dashboard questions',
        title: 'Dashboard de administrador Questions',
        loadComponent: () =>
          import('./web/admin/pages/dashboard/dashboard.component'),
        children: [
          {
            path: 'create-question',
            title: 'Crear pregunta',
            loadComponent: () =>
              import(
                './web/admin/pages/question/create-question/create-question.component'
              ),
          },
          {
            path: 'question-list',
            title: 'Lista de preguntas',
            loadComponent: () =>
              import(
                './web/admin/pages/question/question-list/question-list.component'
              ),
          },
          {
            path: 'question-details/:id',
            title: 'Detalles de la pregunta',
            loadComponent: () =>
              import(
                './web/admin/pages/question/question-details/question-details.component'
              ),
          },
          {
            path: 'update-question/:id',
            title: 'Actualizar pregunta',
            loadComponent: () =>
              import(
                './web/admin/pages/question/update-question/update-question.component'
              ),
          },
          {
            path: 'delete-question/:id',
            title: 'Borrar pregunta',
            loadComponent: () =>
              import(
                './web/admin/pages/question/delete-question/delete-question.component'
              ),
          },
        ],
      },
      {
        path: 'dashboard payments',
        title: 'Dashboard de administrador Payments',
        loadComponent: () =>
          import('./web/admin/pages/dashboard/dashboard.component'),
        children: [
          {
            path: 'create-payment',
            title: 'Crear pago',
            loadComponent: () =>
              import(
                './web/admin/pages/payment/create-payment/create-payment.component'
              ),
          },
          {
            path: 'payment-list',
            title: 'Lista de pagos',
            loadComponent: () =>
              import(
                './web/admin/pages/payment/payment-list/payment-list.component'
              ),
          },
          {
            path: 'payment-details/:id',
            title: 'Detalles del pago',
            loadComponent: () =>
              import(
                './web/admin/pages/payment/payment-details/payment-details.component'
              ),
          },
          {
            path: 'update-payment/:id',
            title: 'Actualizar pago',
            loadComponent: () =>
              import(
                './web/admin/pages/payment/update-payment/update-payment.component'
              ),
          },
          {
            path: 'delete-payment/:id',
            title: 'Borrar pago',
            loadComponent: () =>
              import(
                './web/admin/pages/payment/delete-payment/delete-payment.component'
              ),
          },
        ],
      },
      {
        path: 'dashboard paymentPlans',
        title: 'Dashboard de administrador PaymentPlans',
        loadComponent: () =>
          import('./web/admin/pages/dashboard/dashboard.component'),
        children: [
          {
            path: 'create-paymentPlan',
            title: 'Crear plan de pago',
            loadComponent: () =>
              import(
                './web/admin/pages/paymentPlan/create-payment-plan/create-payment-plan.component'
              ),
          },
          {
            path: 'paymentPlan-list',
            title: 'Lista de planes de pago',
            loadComponent: () =>
              import(
                './web/admin/pages/paymentPlan/payment-plan-list/payment-plan-list.component'
              ),
          },
          {
            path: 'paymentPlan-details/:id',
            title: 'Detalles del plan de pago',
            loadComponent: () =>
              import(
                './web/admin/pages/paymentPlan/payment-plan-details/payment-plan-details.component'
              ),
          },
          {
            path: 'update-paymentPlan/:id',
            title: 'Actualizar plan de pago',
            loadComponent: () =>
              import(
                './web/admin/pages/paymentPlan/update-payment-plan/update-payment-plan.component'
              ),
          },
          {
            path: 'delete-paymentPlan/:id',
            title: 'Borrar plan de pago',
            loadComponent: () =>
              import(
                './web/admin/pages/paymentPlan/delete-payment-plan/delete-payment-plan.component'
              ),
          }
        ],
      },
      {
        path: 'dashboard tests',
        title: 'Dashboard de administrador Tests',
        loadComponent: () =>
          import('./web/admin/pages/dashboard/dashboard.component'),
        children: [
          {
            path: 'create-test',
            title: 'Crear test',
            loadComponent: () =>
              import(
                './web/admin/pages/test/create-test/create-test.component'
              ),
          },
          {
            path: 'test-list',
            title: 'Lista de tests',
            loadComponent: () =>
              import(
                './web/admin/pages/test/test-list/test-list.component'
              ),
          
          },
          {
            path: 'test-details/:id',
            title: 'Detalles del test',
            loadComponent: () =>
              import(
                './web/admin/pages/test/test-details/test-details.component'
              ),
          },
          {
            path: 'update-test/:id',
            title: 'Actualizar test',
            loadComponent: () =>
              import(
                './web/admin/pages/test/update-test/update-test.component'
              ),
          },
          {
            path: 'delete-test/:id',
            title: 'Borrar test',
            loadComponent: () =>
              import(
                './web/admin/pages/test/delete-test/delete-test.component'
              ),
          }
        ]
      },
      {
        path: 'dashboard pdfs',
        title: 'Dashboard de administrador PDFs',
        loadComponent: () =>
          import('./web/admin/pages/dashboard/dashboard.component'),
        children: [
          {
            path: 'create-pdf',
            title: 'Crear PDF',
            loadComponent: () =>
              import(
                './web/admin/pages/pdf/create-pdf/create-pdf.component'
              ),
          },
          {
            path: 'pdf-list',
            title: 'Lista de PDFs',
            loadComponent: () =>
              import(
                './web/admin/pages/pdf/pdf-list/pdf-list.component'
              ),
          },
          {
            path: 'pdf-details/:id',
            title: 'Detalles del PDF',
            loadComponent: () =>
              import(
                './web/admin/pages/pdf/pdf-details/pdf-details.component'
              ),
          },
          {
            path: 'update-pdf/:id',
            title: 'Actualizar PDF',
            loadComponent: () =>
              import(
                './web/admin/pages/pdf/update-pdf/update-pdf.component'
              ),
          },
          {
            path: 'delete-pdf/:id',
            title: 'Borrar PDF',
            loadComponent: () =>
              import(
                './web/admin/pages/pdf/delete-pdf/delete-pdf.component'
              ),
          }
        ]
      }
    ],
  },
];
