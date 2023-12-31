import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from './entities/category.entity';
import { CreateCategoryArgs } from './args/category.args';
import { Injectable, ConflictException, NotFoundException } from "@nestjs/common";
import { AuthEntity } from 'src/auth/entities/auth.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity) public readonly categoryRepo: Repository<CategoryEntity>,
    @InjectRepository(AuthEntity) public readonly authRepo: Repository<AuthEntity>
  ) { }

  findAllCategory() {
    return this.categoryRepo.find({ where: { category_status: true } });
  }

  async findOneById(id: number) {
    if (!id) throw new ConflictException('No ID Found');
    let categoryDetails = await this.categoryRepo.findOne({ where: { id: id } });
    if (categoryDetails === null) {
      throw new ConflictException(`No category exists with ${id}`);
    } else {
      return categoryDetails
    }
  }

  async createCategory(createCategoryArgs: CreateCategoryArgs, adminUserId: number): Promise<CategoryEntity> {
    if (!adminUserId) throw new ConflictException('No user Id Found');
    let adminUserDetails = await this.authRepo.findOne({ where: { id: adminUserId } });
    if (adminUserDetails.userPosition === 'admin') {
      let categoryFound = await this.categoryRepo.findOne({ where: { category_name: createCategoryArgs.category_name } });
      if (categoryFound === null) {
        let category: CategoryEntity = new CategoryEntity();
        category.category_name = createCategoryArgs.category_name
        return await this.categoryRepo.save(category);
      } else {
        throw new ConflictException(`Category exists with ${createCategoryArgs.category_name}`);
      }
    } else {
      throw new ConflictException(`You are not authorize to create category`);
    }
  }

  async updateCategory(categoryId: number, adminUserId: number) {
    if (!adminUserId) throw new ConflictException('No user Id Found');
    let adminUserDetails = await this.authRepo.findOne({ where: { id: adminUserId } });
    if (adminUserDetails.userPosition === 'admin') {
      let categoryDetails = await this.categoryRepo.findOne({ where: { id: categoryId } });
      if (categoryDetails === null) {
        throw new NotFoundException("Category with given id doesn't exists");
      } else {
        if (categoryDetails.category_status === false) {
          throw new ConflictException(`Category is already closed`);
        } else {
          categoryDetails.category_status = false
          return await this.categoryRepo.save(categoryDetails);
        }
      }
    } else {
      throw new ConflictException(`You are not authorize to delete category`);
    }
  }
}
