import { Sequelize } from "sequelize-typescript";
import Brand from "../models/Brand";
import { Repository } from "sequelize-typescript";

export default class BrandService {
  private static brandRepository: Repository<Brand>;

  static initialize(sequelizeInstance: Sequelize): void {
    BrandService.brandRepository = sequelizeInstance.getRepository(Brand);
  }
  static async getAllBrands() {
    return this.brandRepository.findAll();
  }

  static async getBrandById(id: number) {
    return this.brandRepository.findByPk(id);
  }

  static async createBrand(brandData: any) {
    return this.brandRepository.create(brandData);
  }

  static async updateBrand(id: number, brandData: any) {
    const brand = await this.brandRepository.findByPk(id);
    if (!brand) {
      throw new Error("Brand not found");
    }
    await brand.update(brandData);
    return brand;
  }

  static async deleteBrand(id: number) {
    const brand = await this.brandRepository.findByPk(id);
    if (!brand) {
      throw new Error("Brand not found");
    }
    await brand.destroy();
  }
}
