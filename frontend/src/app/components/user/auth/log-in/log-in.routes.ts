import { Routes } from "@angular/router"
import { LogInComponent } from "./log-in.component"

export const authRoutes: Routes = [
    {
        path: '',
        redirectTo: 'user/log-in'
    },
    {
        path: 'log-in',
        component: LogInComponent
    }
]