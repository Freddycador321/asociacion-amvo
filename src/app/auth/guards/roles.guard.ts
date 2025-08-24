import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { take, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

export const rolesGuard = () => {
  const authService = inject(AuthService)
  const router = inject(Router)
  return authService.isLogged().pipe(
    take(1),
    tap((isLoggedIn)=>{
      !isLoggedIn? router.navigate(['/']):true
    }
    )
  );
};
