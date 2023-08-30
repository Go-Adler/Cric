import { CanActivateFn, Router } from '@angular/router';


export const logOutGuard: CanActivateFn = (route, state) => {
  const token  = localStorage.getItem('token')
  
  if(token) {
    const router = new Router()
    return router.createUrlTree(['/user/home'])
  } else {
    return true
  }
};

