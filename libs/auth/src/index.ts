import { canActivteAuth } from "./lib/auth/access.guard";
import { authTokenInterceptor } from "./lib/auth/auth.interceptor";
import { AuthService } from "./lib/auth/auth.service";
import { LoginPageComponent } from "./lib/feature-login/login-page/login-page.component";

export {
  canActivteAuth,
  authTokenInterceptor,
  AuthService,
  LoginPageComponent
};
