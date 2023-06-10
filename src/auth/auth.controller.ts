import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.authService.signup(email, password);
    return { user };
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.authService.login(email, password);
    if (user) {
      return { message: 'Login successful', user };
    } else {
      return { message: 'Invalid credentials' };
    }
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    console.log('안녕');
    // initiates the Google OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req) {
    // handles the Google OAuth2 callback
    const user = req.user;
    // Here, you would typically save the user to the database and generate a JWT for the user.
  }
  // You would also have similar methods for Kakao, Github, Naver, etc.
}
