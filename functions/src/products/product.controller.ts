export interface ProductController {
  productCreated(productID: string): Promise<any>;

  productWritten(productID: string): Promise<any>;
}
