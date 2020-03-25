import {Product} from "../src/models/products";

describe('ProductService', () => {
  //let productRepository: IMock<OrderRepository>;
  //let productService: OrderService;
  const product: Product = {url: 'a', timesPurchased: 0, name: 'b', price: 22, id:'ab'}
  beforeEach(() => {
    /*
    productRepository = new Mock<OrderRepository>()
      .setup(pr => pr.createStockProduct(product.id))
      .returns(new Promise((resolve, reject) => {resolve()}));
    productService = new OrderService(productRepository.object());
     */
  });

  it('useless test to see if JEST is set up', async () => {
    const prodID = product.id;
    expect(prodID).toBe('ab');
  });

});
