
import {IMock, Mock, Times} from 'moq.ts';
import {StockRepository} from "../src/stocks/stock.repository";
import {Product} from "../src/models/products";
import {StockService} from "../src/stocks/stock.service";
import {Stock} from "../src/models/stock";


describe('StockService',() => {
  let stockRepo: IMock<StockRepository>;
  let stockService: StockService;
  const product: Product = {
    url: 'a',
    name: 'b',
    price: 100,
    id: '123qwe',
    timesPurchased: 0
  };
  const productBought: Product = {
    url: 'a',
    name: 'b',
    price: 100,
    id: '123qwe',
    timesPurchased: 1
  };
  const defaultStock : Stock = {count:1000, product:product};
  const stockDecreased: Stock = {count:4, product:productBought};
  beforeEach(() => {
    stockRepo = new Mock<StockRepository>()
      .setup(repo => repo.stockCreate(product))
      .returns(Promise.resolve(defaultStock))
      .setup(repo => repo.stockCreate(undefined as any))
      .returns(Promise.reject())
      .setup(repo => repo.decreaseStockCount(1,productBought))
      .returns(Promise.resolve(stockDecreased))
      .setup(repo => repo.updateProductInStock(product))
      .returns(Promise.resolve(product));

    stockService = new StockService(stockRepo.object());
  });
  it('Stock service needs Stock repository', async () => {
    const stockServiceDef = new StockService(stockRepo.object());
    expect(stockServiceDef).toBeDefined();
  });
  it('When product is undefined, promise rejects',async () => {
    await expect(stockService.createStock(undefined as any))
      .rejects.toEqual(undefined);
  });
  it('Stock service should call create function on Stock repository', async ()=>{
    await stockService.createStock(product);
    stockRepo.verify(repo => repo.stockCreate(product),Times.Once());
  });

  it('Newly created stock should have count of 1000', async () => {
    const stockAdded: Stock =  await stockService.createStock(product);
    expect(stockAdded.count).toBe(1000)
  });
  it('stockProductCreate should add a stocks with the same productName as the added product', async() => {
    const stockAdded: Stock =  await stockService.createStock(product);
    expect(stockAdded.product).toBe(product)
  });
  it('After product is bought its count in the Stock should decrease and timesPurchased increase',async () =>{
    const stockAfter: Stock = await stockService.decreaseStockCount(1, productBought);
      expect(stockAfter).toBe(stockDecreased);
  });
  it('Stock service should contain a method for deleting stock from collection and accept id as param',()=>{
    const id = 'id';
    stockService.deleteStock(id);
  });

});
