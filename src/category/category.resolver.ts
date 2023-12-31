import { Category } from "./schema/category.schema";
import { CategoryService } from "./category.service";
import { CreateCategoryArgs } from "./args/category.args";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

@Resolver(of => Category)
export class CategoryResolver {
    constructor(private readonly categoryService: CategoryService) { }

    @Mutation(returns => [Category], { name: 'findAllCategory' })
    findAllCategory() {
        return this.categoryService.findAllCategory();
    }

    @Query(() => Category, { name: 'findSingleCategory' })
    findOne(@Args('id', { type: () => Number }) id: number) {
        return this.categoryService.findOneById(id);
    }

    @Mutation(returns => Category, { name: 'createCategory' })
    createCategory(@Args('createCategoryArgs') createCategoryArgs: CreateCategoryArgs,
        @Args('adminUserId', { type: () => Number }) adminUserId: number,) {
        return this.categoryService.createCategory(createCategoryArgs, adminUserId);
    }

    @Mutation(returns => Category, { name: 'updateCategory' })
    updateCategory(@Args('categoryId', { type: () => Number }) categoryId: number,
    @Args('adminUserId', { type: () => Number }) adminUserId: number,) {
        return this.categoryService.updateCategory(categoryId, adminUserId);
    }
}
