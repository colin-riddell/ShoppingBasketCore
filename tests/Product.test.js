const CartCore = require('../CartCore');
const Product = require('../Product');
const Grocery = require('../Grocery');



test('Product class is available', () => {
  expect(typeof Product).toEqual('function');
});

test('Product can be initialized', () => {
  let product = new Product();
  expect(product !== null);
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

test('Get price', () => {
  let product = new Product(133.21);
  expect(product.getPrice()).toEqual(133.21);
});
