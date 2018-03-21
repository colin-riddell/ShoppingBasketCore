var shortid = require('shortid');

class Product {
  /*
  Takes a number and applies that percent onto the price of the product.
  This method modifies the value of this.price
  */
  applyVat(vatPercent) {
    if (vatPercent === undefined) {
      throw new Error('applyVat(): argment vatPercent is required');
    }
    this.vatPercent = vatPercent; // keep it in the object, for reference.
    let newPrice = this.price + this.price / vatPercent;
    this.price = Math.round(newPrice * 100) / 100; // Hurrah for weird JS rounding
  }
  /*
  return the price of the products
  */
  getPrice(){
    return this.price;
  }
  /*
  Generates then returns a unique ID for the product.
  */
  generateSku() {
    return shortid.generate();
  }

  constructor(price, name, deal) {
    this.price = price;
    this.name = name;
    this.sku = this.generateSku();

    this.deal = deal;
  }
}


module.exports = Product;
