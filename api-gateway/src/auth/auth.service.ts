import { Inject, Injectable } from '@nestjs/common';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {

  constructor(
    @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka
  ) {}

  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }

  createUser(createUserDto: CreateUserDto) {
    this.authClient.emit('create_user', JSON.stringify(createUserDto))
  }

  findAll() {
    return `This action returns all auth`;
  }

  async findOne(id: number) {

    const data = await new Promise((resolve,reject,) => {
    
      this.authClient
        .send('get_user', JSON.stringify({"userId" : id}))
        .subscribe((user: User) => {

            console.log('utente nel subscribe:',user)

            if (user) resolve(user)
            else reject('qualcosa non va');

          });
    })

      return data
  }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
