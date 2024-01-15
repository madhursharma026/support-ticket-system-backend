import { Tags } from "./schema/tags.schema";
import { TagsService } from "./tags.service";
import { CreateTagsArgs } from "./args/create.tags.args";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

@Resolver(of => Tags)
export class TagsResolver {
    constructor(private readonly tagsService: TagsService) { }

    @Mutation(() => Tags, { name: 'findSingleTag' })
    findOne(@Args('tagName', { type: () => String }) tagName: string) {
        return this.tagsService.findOneById(tagName);
    }

    @Mutation(returns => Tags, { name: 'createTags' })
    createTags(@Args('createTagsArgs') createTagsArgs: CreateTagsArgs,
    @Args('adminUserId', { type: () => Number }) adminUserId: number,) {
        return this.tagsService.createTags(createTagsArgs, adminUserId);
    }

    @Mutation(returns => [Tags], { name: 'getAllTags' })
    getAllTags() {
        return this.tagsService.getAllTags();
    }
}
