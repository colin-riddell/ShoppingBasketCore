const Product = require('./Product');

// A Grocery *is a* stock Product!
class Grocery extends Product {

  /* Helper takes the current price, and adds on the set VAT %age for the
  item
  */
  applyVat() {
    let newPrice = this.price + this.price / this.vatPercent;
    this.price = Math.round(newPrice * 100) / 100; // Hurrah for weird JS rounding
  }
  constructor(price, name, offer){
    super(price, name, offer);
    this.vatPercent = 10;
    this.applyVat();
  }
}

module.exports = Grocery;
