import { CanActivateFn, Router } from '@angular/router';


export const logOutGuard: CanActivateFn = (route, state) => {
  const token  = localStorage.getItem('token')
  console.log('reached logout guard')
  if(token) {
    const router = new Router()
    return router.createUrlTree(['/user/home'])
    return false
  } else {
    console.log('logout guard false');
    
    return true
  }
};

