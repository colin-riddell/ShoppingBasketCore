const Product = require('./Product');


class CartCore {
  constructor(){
    this.basket = [];
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
    return Math.round(total * 100) / 100;// Round to two dp
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
