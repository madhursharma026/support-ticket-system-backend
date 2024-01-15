import { InputType, Field, } from "@nestjs/graphql";

@InputType()
export class CreateTagsArgs {

    @Field({ nullable: false })
    tag_name: string;

    @Field({ nullable: false })
    tag_description: string;
}
