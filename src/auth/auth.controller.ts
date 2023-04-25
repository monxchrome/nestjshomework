import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MailEnum } from '../core/mail/mail.enum';
import { MailService } from '../core/mail/mail.service';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private mailService: MailService,
  ) {}

  @Post('login')
  async login(@Res() res: any, @Body() body: LoginDto) {
    if (!body.email) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'ERROR.Check_request_email_param' });
    }
    if (!body.password) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'ERROR.Check_request_password_param' });
    }
    const findUser = await this.userService.getByEmail(body.email);

    if (!findUser) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Email or password is incorrect' });
    }

    if (await this.authService.compareHash(body.password, findUser.password)) {
      const token = await this.authService.signIn(findUser.id.toString());
      return res.status(HttpStatus.OK).json({ token });
    }
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: 'Email or password is incorrect' });
  }

  @Post('register')
  async register(@Res() res: any, @Body() body: RegisterDto) {
    let findUser;
    try {
      findUser = await this.userService.getByEmail(body.email.trim());
    } catch (e) {
      console.log(e);
    }
    if (findUser) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'User is already exist' });
    }

    const user = await this.userService.registerUser({
      name: body.name,
      username: body.username,
      email: body.email,
      password: body.password,
      age: body.age,
      avatar: body.avatar || null,
    });

    if (user) {
      this.mailService.send(user.email, 'Welcome!!!', MailEnum.WELCOME, {
        userName: user.name,
      });
      const token = await this.authService.signIn(user.id.toString());
      return res.status(HttpStatus.OK).json({ token });
    }

    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'ERROR.Failed_to_register_user' });
  }
}
