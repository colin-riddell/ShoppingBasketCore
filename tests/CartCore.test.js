const CartCore = require('../CartCore');
const Product = require('../Product');
const Grocery = require('../Grocery');


test('CartCore class is available', () => {
  expect(typeof CartCore).toEqual('function');
});

test('CartCore can be initialized', () => {
  let cart = new CartCore();
  expect(cart !== null).toEqual(true);
  expect(cart.basket.length === 0).toEqual(true);
});

test('Check instance of CartCore is an instance of CartCore', () => {
  class Foo{};

  let cart = new CartCore();
  expect(cart instanceof CartCore).toEqual(true);
  expect(cart instanceof Foo).toEqual(false);
});

test('Try to add no products to the cart.( No args to add() )', () => {
  let cart = new CartCore();

  expect(()=>{
    cart.add();
  }).toThrow();

  expect(cart.basket.length).toEqual(0);

});

test('Try to add a non Product object to the cart', () => {
  class NotAProduct {}
  let notProduct = new NotAProduct();
  let cart = new CartCore();

  expect(()=>{
    cart.add(notProduct);
  }).toThrow();

  expect(cart.basket.length).toEqual(0);
});


test('Add a product to the cart', () => {
  let apple = new Grocery(1.40, 'apple', {
      multiple: 2,
      price: null
    }
  );
  let cart = new CartCore();

  cart.add(apple);
  expect(cart.basket.length).toEqual(1);

  cart.add(apple);
  expect(cart.basket.length).toEqual(2);
  //cart.listBasket();

});


test('Remove one product from the cart', () => {
  let salad = new Grocery(3.90, 'salad');

  let cart = new CartCore();

  cart.add(salad);
  expect(cart.basket.length).toEqual(1);

  cart.remove(salad.sku);
  expect(cart.basket.length).toEqual(0);

});

test('Remove one from cart, add some to cart.', () => {
  let salad = new Grocery(3.90, 'salad');

  let cart = new CartCore();

  cart.add(salad);
  expect(cart.basket.length).toEqual(1);

  cart.remove(salad.sku);
  expect(cart.basket.length).toEqual(0);

  cart.add(salad);
  cart.add(salad);
  expect(cart.basket.length).toEqual(2);
});

test('Remove when already none', () => {
  let salad = new Grocery(3.90, 'salad');

  let cart = new CartCore();
  expect(()=>{
    cart.remove('123acb'); // Expect some error to be bubbled up?
  }).toThrow();
  expect(cart.basket.length).toEqual(0);


});

test('Add a few, remove a few', () => {
  let apple = new Grocery(1.40, 'apple', {
      multiple: 2,
      price: null
    }
  );

  let pear = new Grocery(1.40, 'pear', {
      multiple: 2,
      price: null
    }
  );
  let cart = new CartCore();

  cart.add(apple);
  expect(cart.basket.length).toEqual(1);
  cart.remove(apple.sku);
  expect(cart.basket.length).toEqual(0);

  cart.add(pear);
  expect(cart.basket.length).toEqual(1);
  cart.add(pear);
  expect(cart.basket.length).toEqual(2);

  cart.remove(pear.sku);
  expect(cart.basket.length).toEqual(1);

});

test('Empty the basket',()=>{
  let salad = new Grocery(3.90, 'salad');
  let irnBru = new Grocery(3.00, 'irnBru');

  let cart = new CartCore();

  cart.add(salad);
  cart.add(salad);
  cart.add(irnBru);
  expect(cart.basket.length).toEqual(3);
  cart.empty();
  expect(cart.basket.length).toEqual(0);
});

test('Empty the basket when its already empty',()=>{
  let cart = new CartCore();

  expect(cart.basket.length).toEqual(0);
  expect(()=>{
    cart.empty();
  }).toThrow();
  expect(cart.basket.length).toEqual(0);

});

test('Calculate shopping basket total',()=>{
  let salad = new Grocery(3.90, 'salad');
  let irnBru = new Grocery(3.00, 'irnBru');

  let cart = new CartCore();

  cart.add(salad);
  cart.add(salad);
  cart.add(irnBru);

  expect(cart.total()).toEqual(11.88); // Including tax
});
//
// test('Add two items with same deal',()=>{
//   let salad = new Grocery(3.90, 'salad', {
//     modMul: 2,
//     discountMultiplier: 0.5,
//     count: 0
//   });
//   let cart = new CartCore();
//
//   cart.add(salad);
//   cart.add(salad);
//   cart.applyDealDiscounts();
//
//   expect(cart.deals.length).toEqual(1);
//
// });
