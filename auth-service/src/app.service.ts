import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repostiory';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';



@Injectable()
export class AppService {
  constructor(private readonly  usersRepository: UsersRepository) {}

  createUser(data : CreateUserDto) : void{
    console.log(data);
    
    this.usersRepository.save(data);
  }

  getUser(id: number) : User {
    return this.usersRepository.findOne(id);
  }
}