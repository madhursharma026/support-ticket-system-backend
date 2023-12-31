import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryService } from "./category.service";
import { CategoryResolver } from "./category.resolver";
import { CategoryEntity } from "./entities/category.entity";
import { AuthEntity } from "src/auth/entities/auth.entity";

@Module({
    imports: [TypeOrmModule.forFeature([CategoryEntity, AuthEntity])],
    controllers: [],
    providers: [CategoryService, CategoryResolver],
})

export class CategoryModule { }
