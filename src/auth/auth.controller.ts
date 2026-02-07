import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  @Render('auth/login')
  loginPage() {
    return { 
      title: 'Login Admin',
      layout: false
    };
  }

  @Post('login')
  async login(@Body() body: any, @Res() res: Response) {
    try {
      const token = await this.authService.login(body.username, body.password);
      
      res.cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), 
      });
  
      return res.redirect('/laundry');
    }catch (error) {
      return res.render('auth/login', {
        title : 'Login Admin',
        layout : false,
        error : 'Username or Password incorreect!'
      })
    }
  }

  @Get('logout')
  logout(@Res() res: Response) {
    res.clearCookie('access_token');
    return res.redirect('/auth/login');
  }

  @Get('register')
  @Render('auth/register') 
  registerPage() {
    return { 
      title: 'Register Admin',
      layout: false
   };
  }

  @Post('register')
  async register(@Body() body: any, @Res() res: Response) {
    try {
      await this.authService.create(body.username, body.password);

      return res.redirect('/auth/login');
    } catch(error) {
      return res.render('auth/register', {
        title : 'Register Admin',
        layout : false,
        error : error.message || 'Gagal Register, coba pakai username lain!'
      })
    }
  }
  
  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
