import { Controller, Get, Post, Body, Patch, Param, Delete, OnModuleInit, Inject, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController implements OnModuleInit {

  constructor(
    private readonly authService: AuthService,
    @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka
    ) {}

  @Post('sign-up')
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }

  onModuleInit() { 
    this.authClient.subscribeToResponseOf('get_user');
  }
}
