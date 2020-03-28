
import {IMock,Mock} from 'moq.ts';
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
  const defaultStock : Stock = {count:1000, product:product};
  const stockDecreased: Stock = {count:4, product:product};
  beforeEach(() => {
    stockRepo = new Mock<StockRepository>()
      .setup(repo => repo.stockProductCreate(product))
      .returns(Promise.resolve(defaultStock))
      .setup(repo => repo.stockProductCreate(undefined as any))
      .returns(Promise.reject())
      .setup(repo => repo.decreaseStockCount(1,product))
      .returns(Promise.resolve(stockDecreased))
      .setup(repo => repo.updateProductInStock(product))
      .returns(Promise.resolve(product));

    stockService = new StockService(stockRepo.object());
  });
  it('When product is undefined, promise rejects',async () =>{
    await expect(stockService.stockProductCreate(undefined as any))
      .rejects.toEqual(undefined);
  });

  it('Newly created stock should have count of 1000', async () => {
    const stockAdded: Stock =  await stockService.stockProductCreate(product);
    expect(stockAdded.count).toBe(1000)
  });
  it('stockProductCreate should add a stocks with the same productName as the added product', async() => {
    const stockAdded: Stock =  await stockService.stockProductCreate(product);
    expect(stockAdded.product).toBe(product)
  });
  it('After product is bought its count in the Stock should decrease and timesPurchased increase',async () =>{
    const stockAfter: Stock = await stockService.decreaseStockCount(1,product);
      expect(stockAfter).toBe(stockDecreased);
  });

});
