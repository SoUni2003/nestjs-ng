import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signup() {
    return { message: 'User registered successfully' };
  }
  login() {
    return { message: 'User logged in successfully' };
  }
}
