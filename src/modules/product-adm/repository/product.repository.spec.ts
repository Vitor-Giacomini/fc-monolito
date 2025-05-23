import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/entity/product.entity";
import { ProductModel } from "./product.model";
import ProductRepository from "./product.repository";
import { mockProducAdmInput1, mockProductAdm } from "../mock/mock";

describe("ProductRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const product = mockProductAdm;
    const productRepository = new ProductRepository();
    await productRepository.add(product);

    const productDb = await ProductModel.findOne({
      where: { id: mockProducAdmInput1.id.id },
    });

    expect(mockProducAdmInput1.id.id).toEqual(productDb.id);
    expect(mockProducAdmInput1.name).toEqual(productDb.name);
    expect(mockProducAdmInput1.description).toEqual(productDb.description);
    expect(mockProducAdmInput1.purchasePrice).toEqual(productDb.purchasePrice);
    expect(mockProducAdmInput1.salesPrice).toEqual(productDb.salesPrice);
    expect(mockProducAdmInput1.stock).toEqual(productDb.stock);
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();

    ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      salesPrice: 150,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const product = await productRepository.find("1");

    expect(product.id.id).toEqual("1");
    expect(product.name).toEqual("Product 1");
    expect(product.description).toEqual("Product 1 description");
    expect(product.purchasePrice).toEqual(100);
    expect(product.salesPrice).toEqual(150);
    expect(product.stock).toEqual(10);
  });
});
