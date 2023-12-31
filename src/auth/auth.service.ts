import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { AuthEntity } from './entities/auth.entity';
import { LoginUserArgs } from './args/login.auth.args';
import { CreateUserArgs } from './args/create.auth.args';
import { CreateAdminArgs } from './args/create-admin.args';
import { Injectable, ConflictException, NotFoundException } from "@nestjs/common";

@Injectable()
export class AuthService {
  constructor(@InjectRepository(AuthEntity) public readonly authRepo: Repository<AuthEntity>) { }

  async findAllUser(userId: number) {
    if (!userId) throw new ConflictException('No user Id Found');
    let adminUserDetails = await this.authRepo.findOne({ where: { id: userId } });
    if (adminUserDetails.userPosition === 'admin') {
      return this.authRepo.find();
    } else {
      throw new ConflictException(`You are not authorize to view data`);
    }
  }

  async findOneById(emailAddress: string) {
    if (!emailAddress) throw new ConflictException('No Email Address Found');
    let userDetails = await this.authRepo.findOne({ where: { emailAddress: emailAddress } });
    if (userDetails === null) {
      throw new ConflictException(`No user exists with ${emailAddress}`);
    } else {
      return userDetails
    }
  }

  async createUser(createUserArgs: CreateUserArgs): Promise<AuthEntity> {
    let userFound = await this.authRepo.findOne({ where: { emailAddress: createUserArgs.emailAddress } });
    if (userFound === null) {
      let user: AuthEntity = new AuthEntity();
      user.emailAddress = createUserArgs.emailAddress
      let hashPassword = await bcrypt.hash(createUserArgs.password, 10)
      user.password = hashPassword
      user.firstName = createUserArgs.firstName
      user.lastName = createUserArgs.lastName
      return await this.authRepo.save(user);
    } else {
      throw new ConflictException(`User already exists with ${createUserArgs.emailAddress}`);
    }
  }

  async createAdmin(createAdminArgs: CreateAdminArgs): Promise<AuthEntity> {
    let userFound = await this.authRepo.findOne({ where: { emailAddress: createAdminArgs.emailAddress } });
    if (userFound === null) {
      let user: AuthEntity = new AuthEntity();
      user.emailAddress = createAdminArgs.emailAddress
      let hashPassword = await bcrypt.hash(createAdminArgs.password, 10)
      user.password = hashPassword
      user.firstName = createAdminArgs.firstName
      user.lastName = createAdminArgs.lastName
      user.userPosition = createAdminArgs.userPosition
      return await this.authRepo.save(user);
    } else {
      throw new ConflictException(`User already exists with ${createAdminArgs.emailAddress}`);
    }
  }

  async loginUser(loginUserArgs: LoginUserArgs) {
    let userFound = await this.authRepo.findOne({ where: { emailAddress: loginUserArgs.emailAddress } });
    if (userFound === null) {
      throw new ConflictException(`User doesn't exists with ${loginUserArgs.emailAddress}`);
    } else {
      const validPassword = await bcrypt.compare(loginUserArgs.password, userFound.password)
      if (!validPassword) {
        throw new ConflictException(`Password doesn't match`);
      } else {
        if (userFound.userPosition === 'suspended') {
          throw new ConflictException(`User suspended, Contact Admin`);
        } else {
          return userFound
        }
      }
    }
  }

  async updateUser(userId: number, adminUserId: number) {
    let adminUserDetails = await this.authRepo.findOne({ where: { id: adminUserId } });
    if (adminUserDetails.userPosition === 'admin') {
      let userDetails = await this.authRepo.findOne({ where: { id: userId } });
      if (userDetails === null) {
        throw new NotFoundException("User with given id doesn't exists");
      } else {
        if (userDetails.userPosition === 'suspended') {
          throw new ConflictException(`User is already suspended`);
        } else {
          userDetails.userPosition = 'suspended'
          return await this.authRepo.save(userDetails);
        }
      }
    } else {
      throw new ConflictException(`You are not authorize to suspend user`);
    }
  }
}
