import {Product} from "../src/models/products";

describe('StockService', () => {
  //let stockRepository: IMock<StockRepository>;
  //let stockService: StockService;
  const product: Product = {url: 'a', timesPurchased: 0, name: 'b', price: 22, id: 'ab'}
  //const stock: Stock = {product:product, count: 5}
  beforeEach(() => {
    /*
        stockRepository = new Mock<StockRepository>()
          .setup(st => st.stockProductCreate(product))
          .returns(new Promise((resolve, reject) => {resolve()}));
        stockService = new StockService(stockRepository.object());
     */
    it('useless test to see if JEST is set up', async () => {
      const prodID = product.id;
      expect(prodID).toBe('ab');
    });


  });
})
