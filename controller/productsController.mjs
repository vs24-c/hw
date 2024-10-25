import Product from '../models/productModule.mjs';

class ProductsController {
  static async mainProd(req, res) {
    try {
      const productsList = await Product.loadProductsList();
      res.render('products/productsList', {
        products: productsList,
      });
    } catch (error) {
      res.status(500).send('Error loading product list ;)');
    }
  }

  static async getfindAndShowByID(req, res) {
    try {
      const id = req.params.id;
      const prodById = await Product.getProductById(id);
      res.render('products/product', {
        product: prodById,
      });
    } catch (error) {
      res.status(500).send('Error find product by ID');
    }
  }

  static async prodForm(req, res) {
    try {
      res.render('products/addProducts', {product: null});
    } catch (error) {
      res.status(500).send('Error loading product form');
    }
  }

  static async addNewProd(req, res) {
    try {
      const prodNewObj = req.body;
      Product.addProductNew(prodNewObj);
      res.redirect('/products');
    } catch (error) {
      res.status(500).send('Error adding new product');
    }
  }

  static async getEditProd(req, res) {
    try {
      const prodById = await Product.getProductById(req.params.id);
      res.render('products/addProducts', {
        product: prodById,
      });
    } catch (error) {
      res.status(500).send('Error loading product for edit');
    }
  }

  static async updateProd(req, res) {
    Product.updateProduct(req.params.id, req.body);
    res.redirect('/products');
  }

  static async deleteProd(req, res) {
    const resProdDel = Product.deleteProduct(req.params.id);
    // try {
    //   res.redirect('/products');
    // } catch (error) {
    //   res.status(500).send('Error ');
    // }
    if (resProdDel) {
      res.redirect('/products');
    } else {
      res.status(404).send('Product not found');
    }
  }
}

export default ProductsController;

// Я розумію що десь є помилка, тому що воно працює трохи через костиль але я не зміг зрозуміти де саме я помилився.
