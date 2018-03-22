const CartCore = require('../CartCore');
const Product = require('../Product');
const Grocery = require('../Grocery');


test('Create BOGOF deal', () => {
  let cart = new CartCore();

  let apple = new Grocery(3.00, 'apple', {
    modMul: 2,
    discountMultiplier: 0.5,
    count: 0,
    discount: 0
  });

  cart.add(apple);
  cart.add(apple);

  expect(cart.total()).toEqual(3.30);


});

test('Create BOGOF deal one extra', () => {
  let cart = new CartCore();

  let apple = new Grocery(3.00, 'apple', {
    modMul: 2,
    discountMultiplier: 0.5,
    count: 0,
    discount: 0
  });

  cart.add(apple);
  cart.add(apple);
  cart.add(apple); // ;)

  expect(cart.total()).toEqual(6.60);


});
//
//
// test('THree for 2', () => {
//   let cart = new CartCore();
//
//   let apple = new Grocery(3.00, 'apple', {
//     modMul: 3,
//     discountMultiplier: 0.667,
//     count: 0,
//     dicount: 0
//   });
//
//   cart.add(apple);
//   cart.add(apple);
//   cart.add(apple);
//
//   cart.applyDealDiscounts();
//
//   expect(cart.total()).toEqual(6.60);
//
// });
