import { CanActivateFn, Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token')
  if (token) {
    console.log('token present');
    
    return true
  } else {
    console.log('no token');
    
    const router = new Router()
    router.navigate(['/user/log-in'])
    return false
  }
};
