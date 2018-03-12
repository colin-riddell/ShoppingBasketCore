const CartCore = require('../CartCore');
const Product = require('../Product');
const Grocery = require('../Grocery');

test('Grocery class is available', () => {
  expect(typeof Grocery).toEqual('function');
});

test('Grocery can be initialized', () => {
  let grocery = new Grocery(3.00, 'random grocery');
  expect(grocery !== null);
});

test('Check instance of Grocery', () => {
  class Foo{};
  let grocery = new Grocery(3.00, 'random grocery');
  expect(grocery instanceof Grocery).toEqual(true);
  expect(grocery instanceof Product).toEqual(true); // A grocery 'is a' Product ;)
  expect(grocery instanceof Foo).toEqual(false);
});

test('Try to create a Grocery with no price or name', () =>{
  expect(()=>{
    let apple = new Grocery();
  }).toThrow();
});

test('Try to create a Grocery with null price and name ', () =>{
  expect(()=>{
    let apple = new Grocery(null, null);
  }).toThrow();
});

test('Try to create a Grocery with null price ', () =>{
  expect(()=>{
    let apple = new Grocery(null);
  }).toThrow();
});

test('Create a Grocery', () => {
  let apple = new Grocery(1.40, 'apple');
  expect(apple instanceof Grocery).toEqual(true);
});

test('Check VAT on Grocery', () => {
  let apple = new Grocery(1.40, 'apple');
  expect(apple.price).toEqual(1.54);
  expect(apple.name).toEqual('apple');

  let milk = new Grocery(2.00, 'milk');
  expect(milk.price).toEqual(2.20);
  expect(milk.name).toEqual('milk');

});
