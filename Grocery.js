const Product = require('./Product');

// A Grocery *is a*  Product!
class Grocery extends Product {

  constructor(price, name){
    super(price, name);
    if (price === undefined){
      throw new Error('Grocery constructor must have a price');
    }
    if(price === null) {
      throw new Error('Grocery constructor: price cannot be null');
    }
    if (name === undefined){
      throw new Error('Grocery constructor: must have a name');
    }
    if(name === null) {
      throw new Error('Grocery constructor: name cannot be null');
    }

    this.applyVat(10);
  }
}

module.exports = Grocery;
