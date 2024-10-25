import managerFiles from '../utils/managerFiles.mjs';
import {v4 as uuidv4} from 'uuid';

class Product {
  //------------read object----------------//
  static loadProductsList() {
    try {
      return managerFiles.loadData();
    } catch (error) {
      throw new Error('Working with data is not possible');
    }
  }

  //------------Adding object----------------//
  static addProductNew(productobj) {
    try {
      managerFiles.addNewObj({id: uuidv4(), ...productobj});
    } catch (error) {
      throw new Error('Working with data is not possible');
    }
  }

  //------------Updating object----------------//
  static updateProduct(id, productobj) {
    try {
      managerFiles.updateObj(id, productobj);
    } catch (error) {
      throw new Error('Working with data is not possible');
    }
  }

  //------------getProductbyId--------------------//
  static getProductById(id) {
    try {
      return managerFiles.getTempById(id);
    } catch (error) {
      throw new Error('Working with data is not possible');
    }
  }

  //------------deleteProductbyId--------------------//
  static deleteProduct(id) {
    try {
      managerFiles.deleteObj(id);
    } catch (error) {
      throw new Error('Working with data is not possible');
    }
  }
}

export default Product;
