
import {IMock,Mock} from 'moq.ts';
import {StockRepository} from "../src/stock/stock.repository";
import {Product} from "../src/models/products";
import {StockService} from "../src/stock/stock.service";


describe('StockService',() => {
  let stockRepo: IMock<StockRepository>;
  let stockService: StockService;
  let product: Product = {
    url: 'a',
    name: 'b',
    price: 20,
    id: '123qwe',
    timesPurchased: 0
  };

  beforeEach(() => {
    stockRepo = new Mock<StockRepository>()
      .setup(repo => repo.stockProductCreate(product))
      .returns(Promise.resolve());

    stockRepo = new Mock<StockRepository>()
      .setup(repo => repo.decreaseStockCount(5,''))
      .returns(Promise.resolve());

    stockRepo = new Mock<StockRepository>()
      .setup(repo => repo.updateProductInStock(product))
      .returns(Promise.resolve());

    stockService = new StockService(stockRepo.object());
  });

  it('Creating undefined product rejects',async () =>{
    await expect(stockService.stockProductCreate(undefined as any))
      .rejects.toEqual('Provided product is not of type ProductModel');
  });


});
