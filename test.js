const CartCore = require('./CartCore');
const Product = require('./Product');
const Grocery = require('./Grocery');


test('CartCore class is available', () => {
  expect(typeof CartCore).toEqual('function');
});

test('Product class is available', () => {
  expect(typeof Product).toEqual('function');
});

test('CartCore can be initialized', () => {
  let cart = new CartCore();
  expect(cart !== null);
});

test('Product can be initialized', () => {
  let product = new Product();
  expect(product !== null);
});

test('Check instance of CartCore', () => {
  class Foo{};

  let cart = new CartCore();
  expect(cart instanceof CartCore).toEqual(true);
  expect(cart instanceof Foo).toEqual(false);
});

test('Check instance of Product', () => {
  class Foo{};
  let product = new Product();
  expect(product instanceof Product).toEqual(true);
  expect(product instanceof Foo).toEqual(false);
});

test('Create a product', () => {
  let product = new Product();
  expect(product instanceof Product).toEqual(true);
});

test('Create a Grocery', () => {
  let apple = new Grocery(1.40, 'apple');
  expect(apple instanceof Grocery).toEqual(true);
});

test('Check VAT on Grocery', () => {
  let apple = new Grocery(1.40, 'apple');
  expect(apple.price).toEqual(1.54);

  let milk = new Grocery(2.00, 'milk');
  expect(milk.price).toEqual(2.20);
});

test('Create Grocery with deal two for one', () => {
  let apple = new Grocery(1.40, 'apple', {
      multiple: 2,
      price: null
    });
  expect(apple.price).toEqual(1.54);
  expect(apple.offer.multiple).toEqual(2);
  expect(apple.offer.price).toEqual(null);
});

test('Try to add no products to the cart', () => {
  expect.hasAssertions(); // prepare for assertions

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

test('Add a Grocery to the cart', () => {
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

test('Create Product with no deal', () => {
  let apple = new Grocery(1.40, 'apple');
  expect(apple.offer).toEqual(undefined);
});


test('Remove one product', () => {
  let salad = new Grocery(3.90, 'salad');

  let cart = new CartCore();

  cart.add(salad);
  expect(cart.basket.length).toEqual(1);

  cart.remove(salad.sku);
  expect(cart.basket.length).toEqual(0);

});

test('Remove one, add some.', () => {
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

  expect(cart.total()).toEqual(11.88) // Including tax
});





// Deal rules:
// multiple is for how many in Deal
// price is the price for taht deal
// if price is null or undefined, then use the product price

// Deals:
// let threeFor130 =  {
//   multiple: 3
//   price: 130
// };
//
// let bogof = {
//   multiple: 2,
//   price: null
// }
