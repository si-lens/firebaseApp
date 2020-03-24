
import {Product} from "../../src/models/products";

describe('ProductService', () => {
  //let productRepository: IMock<ProductRepository>;
  //let productService: ProductService;
  const product: Product = {url: 'a', timesPurchased: 0, name: 'b', price: 22, id:'ab'}
  beforeEach(() => {
    /*
    productRepository = new Mock<ProductRepository>()
      .setup(pr => pr.createStockProduct(product.id))
      .returns(new Promise((resolve, reject) => {resolve()}));
    productService = new ProductService(productRepository.object());
     */
  });

  it('useless test to see if JEST is set up', async () => {
    const prodID = product.id;
    expect(prodID).toBe('ab');
  });

});

