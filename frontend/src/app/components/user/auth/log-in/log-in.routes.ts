import { Routes } from "@angular/router"

export const authRoutes: Routes = [
    {
        path: '',
        redirectTo: 'user/log-in'
    },
    {
        path: 'log-in',
        loadComponent: () => import('./log-in.component').then(c => c.LogInComponent)
    }
]