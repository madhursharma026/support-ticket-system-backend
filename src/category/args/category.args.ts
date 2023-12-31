import { InputType, Field, } from "@nestjs/graphql";

@InputType()
export class CreateCategoryArgs {
    @Field({ nullable: false })
    category_name: string;
}

