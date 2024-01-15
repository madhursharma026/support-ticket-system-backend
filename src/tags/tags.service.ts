import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { TagsEntity } from './entities/tags.entity';
import { CreateTagsArgs } from './args/create.tags.args';
import { Injectable, ConflictException, NotFoundException } from "@nestjs/common";
import { AuthEntity } from 'src/auth/entities/auth.entity';

@Injectable()
export class TagsService {
  constructor(@InjectRepository(TagsEntity) public readonly tagsRepo: Repository<TagsEntity>,
    @InjectRepository(AuthEntity) public readonly authRepo: Repository<AuthEntity>) { }

  async findOneById(tagName: string) {
    if (!tagName) throw new ConflictException('No Name Found');
    let tagsDetails = await this.tagsRepo.findOne({ where: { tag_name: tagName } });
    if (tagsDetails === null) {
      throw new ConflictException(`No tag exists with ${tagName}`);
    } else {
      return tagsDetails
    }
  }

  async createTags(createTagsArgs: CreateTagsArgs, adminUserId: number): Promise<TagsEntity> {
    if (!adminUserId) throw new ConflictException('No user Id Found');
    let adminUserDetails = await this.authRepo.findOne({ where: { id: adminUserId } });
    if (adminUserDetails.userPosition === 'admin') {
      let tags: TagsEntity = new TagsEntity();
      let tagsDetails = await this.tagsRepo.findOne({ where: { tag_name: createTagsArgs.tag_name } });
      if (tagsDetails === null) {
        tags.tag_name = createTagsArgs.tag_name
        tags.tag_description = createTagsArgs.tag_description
        return await this.tagsRepo.save(tags);
      } else {
        throw new ConflictException(`Tag exists with ${createTagsArgs.tag_name}`);
      }
    } else {
      throw new ConflictException(`You are not authorize to create Tags`);
    }
  }

  async getAllTags() {
    let tagsDetails = await this.tagsRepo.find();
    return tagsDetails
  }
}

