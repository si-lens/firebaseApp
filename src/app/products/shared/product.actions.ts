import {Product} from '../../shared/models/product';

export class CreateProduct {
  static readonly type = '[Auth] CreateProduct';

  constructor(public product: Product) {}
}

export class UpdateProduct {
  static readonly type = '[Auth] UpdateProduct';

  constructor() {}
}

export class DeleteProduct {
  static readonly type = '[Auth] DeleteProduct';

  constructor() {}
}
export class GetProducts {
  static readonly type = '[Auth] GetProducts';

  constructor() {}
}
