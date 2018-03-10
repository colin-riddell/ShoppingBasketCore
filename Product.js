var shortid = require('shortid');

class Product {
  getPrice(){
    return this.price;
  }
  generateSku() {
    return shortid.generate();
  }
  constructor(price, name, offer) {
    this.price = price;
    this.name = name;
    this.offer = offer;
    this.sku = this.generateSku();
  }
}


module.exports = Product;
