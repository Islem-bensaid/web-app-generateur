import {AuthGuard} from './auth.guard';
import {NonAuthGuard} from './non-auth.guard';

export const Guards = [
    AuthGuard,
    NonAuthGuard,

];
