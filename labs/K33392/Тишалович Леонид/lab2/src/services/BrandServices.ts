import { Sequelize } from "sequelize-typescript";
import Brand from "../models/Brand";
import { Repository } from "sequelize-typescript";

export default class BrandService {
  private brandRepository: Repository<Brand>;

  constructor(sequelizeInstance: Sequelize) {
    this.brandRepository = sequelizeInstance.getRepository(Brand);
  }

  async getAllBrands() {
    return this.brandRepository.findAll();
  }

  async getBrandById(id: number) {
    return this.brandRepository.findByPk(id);
  }

  async createBrand(brandData: any) {
    return this.brandRepository.create(brandData);
  }

  async updateBrand(id: number, brandData: any) {
    const brand = await this.brandRepository.findByPk(id);
    if (!brand) {
      throw new Error("Brand not found");
    }
    await brand.update(brandData);
    return brand;
  }

  async deleteBrand(id: number) {
    const brand = await this.brandRepository.findByPk(id);
    if (!brand) {
      throw new Error("Brand not found");
    }
    await brand.destroy();
  }
}
