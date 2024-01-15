import { Auth } from "./schema/auth.schema";
import { AuthService } from "./auth.service";
import { LoginUserArgs } from "./args/login.auth.args";
import { CreateUserArgs } from "./args/create.auth.args";
import { CreateAdminArgs } from "./args/create-admin.args";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

@Resolver(of => Auth)
export class AuthResolver {
    constructor(private readonly authService: AuthService) { }

    @Query(() => Auth, { name: 'findSingleUser' })
    findOne(@Args('emailAddress', { type: () => String }) emailAddress: string) {
        return this.authService.findOneById(emailAddress);
    }

    @Mutation(() => [Auth], { name: 'findAllUser' })
    findAllUser(@Args('userId', { type: () => Number }) userId: number) {
        return this.authService.findAllUser(userId);
    }

    @Mutation(returns => Auth, { name: 'createAdmin' })
    createAdmin(@Args('createAdminArgs') createAdminArgs: CreateAdminArgs) {
        return this.authService.createAdmin(createAdminArgs);
    }

    @Mutation(returns => Auth, { name: 'createUser' })
    createUser(@Args('createUserArgs') createUserArgs: CreateUserArgs) {
        return this.authService.createUser(createUserArgs);
    }

    @Mutation(returns => Auth, { name: 'loginUser' })
    loginUser(@Args('loginUserArgs') loginUserArgs: LoginUserArgs) {
        return this.authService.loginUser(loginUserArgs);
    }

    @Mutation(returns => Auth, { name: 'updateUser' })
    updateUser(
        @Args('userId', { type: () => Number }) userId: number,
        @Args('adminUserId', { type: () => Number }) adminUserId: number) {
        return this.authService.updateUser(userId, adminUserId);
    }
}
