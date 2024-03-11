import { Controller, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  
  @EventPattern('create_user')
  handleCreateUser( data : CreateUserDto){
    //POST
    this.appService.createUser(data);
  }

  @MessagePattern('get_user')
  handleGetUser(@Payload('userId') userId: number){
    
    //GET
    console.log(userId,this.appService.getUser(userId));
    
    return this.appService.getUser(userId);
  }


}
