import { Module } from "@nestjs/common";
import { TagsService } from "./tags.service";
import { TagsResolver } from "./tags.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TagsEntity } from "./entities/tags.entity";
import { AuthEntity } from "src/auth/entities/auth.entity";

@Module({
    imports: [TypeOrmModule.forFeature([TagsEntity, AuthEntity])],
    controllers: [],
    providers: [TagsService, TagsResolver],
})

export class TagsModule { }
