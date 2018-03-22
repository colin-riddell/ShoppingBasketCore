const Product = require('./Product');

class CartCore {
  constructor(){
    this.basket = [];
    this.deals = []; // array of: {sku: {deal}}
  }

  addDeal(deal, sku, price) {
    // Check a deal doesn't already exist by looking up the sku
    // if it doesn't, add it.
    var search =  this.deals.find((item) => {
      return item.sku === sku;
    });

    if (search === undefined) {
      let addedSku = deal['sku'] = sku;
      deal['price'] = price;
      this.deals.push(deal);
    }
  }

  applyDealDiscounts(){
    // loop over basket to make list of deals from basket
    // count how many products have deals in basket, save that to deal object
    // do total -  (total % modMul) when totaling the elegable deals to round down
    // work out discount by   (N  * price ) * dicount multiplier

    var deals = [];
    this.basket.forEach((item) => {
      //console.log(item);
      if( item.deal !== undefined) {
        this.addDeal(item.deal, item.sku, item.price);
      }
    });

    // count how many products have deals in basket, save that to deal object
    let totalDiscount = 0;
    this.deals.forEach((deal) =>{
      this.basket.forEach((item) =>{
        if (deal.sku === item.sku) {
          deal.count += 1;
        }
      });

      // Round down when counting the number of elegable deals.
      var newCount = deal.count - (deal.count % deal.modMul);
      deal.count = newCount;

      // Store the  discount against the deal.
      deal.discount = (deal.count * deal.price) * deal.discountMultiplier;
      totalDiscount += deal.discount;
    });
    //console.log(deals);

    return totalDiscount;
  }

  /*
    Calculates and returns the total of all the items in the basket
  */
  total() {
    let total = 0;

    // class objects are not enumerable in JS! Need classic loop:
    for (let i = 0; i < this.basket.length; i++){
      total += this.basket[i].getPrice();
    }
    var newTotal = total - this.applyDealDiscounts();
    return Math.round(newTotal * 100) / 100;// Round to two dp
  }

  /*
    Add a product to the basket. Needs to be of instance  Product at least
  */
  add(item) {
    // Do some checks on type and existence of our argument.
    if (item === undefined){
      throw new Error('Cart.add() takes 1 argument');
    } else if (!(item instanceof Product)) { // if item isn't a product, then that's bad.
      throw new Error('Cart.add(item) must take Object of type Product');
    }

    this.basket.push(item);
    // Was going to make the basket list key'd off SKU, but we need to be able
    // to put multiple of the same SKU into the basket.
  }

  /*
    Remove a product from the basket, given that items unique ID (SKU)
  */
  remove(sku) {
    if (this.basket.length <= 0){
      throw new Error('Cart is already empty');
    }
     // Get the index given the sku
    let index =  this.basket.findIndex((item)=>{
      return sku === item.sku
    });

    //Note: splice operates directly on the data, and doesn't
    // return another array
    this.basket.splice(index, 1);
  }

  /*
    Remove all the products from the basket.
  */
  empty() {
    if (this.basket.length <= 0){
      throw new Error('Cart is already empty');
    }

    this.basket.splice(0, this.basket.length);
  }

  /*
    Helper to list basket contents in JSON
  */
  listBasket(){
    for (let item in this.basket) {
      console.log(JSON.stringify(this.basket, null, 2));
    }
  }

}

module.exports =  CartCore;
