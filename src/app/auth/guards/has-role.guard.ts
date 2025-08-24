import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

export const hasRoleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)
  const user=authService.usuarioActualValue.rol
  const allowedRoles= route.data?.['allowedRoles']
  return (allowedRoles.includes(user+"")? true:router.navigate(['/dashboard']))
};
