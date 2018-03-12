# ShoppingBasketCore

![Image of Pretty Screenshot](https://raw.githubusercontent.com/colin-riddell/ShoppingBasketCore/master/example.png)


## High level dependencies

* Node.js v=>8.2.1 (tested)

## Package dependencies
Install dependencies:
* ```npm install```

## Run all tests

Run tests:
* ``` npm test ``` (invokes jest)

## Documentation

### Quick Example
```javascript
let salad = new Grocery(3.90, 'salad');
let irnBru = new Grocery(3.00, 'irnBru');

let television = new WhiteGood(300, 'Colour TV');

let cart = new CartCore();

cart.add(salad);
cart.add(salad);
cart.add(irnBru);
cart.add(television);

cart.total(); // Gives a total
cart.empty();
```

### Class Structure

#### CartCore
`CartCore` is the main class for the shopping cart. Create it by doing `new CartCore()`

##### CartCore Methods

###### `total()`   Return type: float
Calculates the total for the cart and returns that value.
###### `add(<Product>)`       Return: -
Accepts an object of base prototype `Product`, and adds that to the basket.
###### `remove(sku)`     Return: -
Accepts product SKU (unique product ID) and removes that product from the cart.
###### `empty()`     Return: -
Empties the cart
###### `listBasket()` Return: -
Helper that prints out the basket in formatted JSON.

#### Product
Product is the base class for all products that can be added to the cart.
To get the best use, I recommend to create a class which inherits from `Product` first, then instantiate that.
`class WhiteGood extends Product {}`

##### Creating a new product
The constructor accepts three arguments, the first two are required:
* `price`  - the price of the product before VAT
* `name` - name of the product eg `DVD Player`

eg:

`new WhiteGood(150.00, 'DVDPlayer')`
##### Product Methods
###### `getPrice()`     Return: `Integer`
Gets the price
###### `generateSku()`     Return: -
Generates an SKU for the product.. which is basically a unique product ID. It's saved as a class attribute for that constructed product.
###### `applyVat(int)`     Return: -
Adds vat onto the product. Requires the vat


#### Grocery

Grocery *is a* Product. Grocery inherits from Product as its base class.

Grocery is different from product in that it has a specific VAT value.
Product can be specialised on and used as a base class to **demonstrate Object Orientated** programming.

Product can be used as a base class to specify and build many product types with different VAT values.


## Future Work / Ideas

### Deals blueprint
A mechanisim for attaching a deal (discount / offer) against a particular Product.

```javascript
{
  multiple: 2,
  price: null
}
  ```
  The deal object properties are:
  * `multiple`: The number of the product that needs to be in the basket before the deal is enabled
  * `price`: Will give a mechanism to override the price for that particular deal. Iff price is null or undefined, then use the product price
  if price is null or undefined, then use the product price

#### Deals examples
  ```javascript
  let threeFor130 =  { // specific deal
    multiple: 3
    price: 130
  };

  let bogof = {
    multiple: 2,
    price: null
  }
```

* generate list of deals from basket:
  * Look through all items in basket + add deals against products to list
  * Give deals taken boolean attributekey deals off sku. one deal per product

eg:
```javascript
let deals =  [{sku:'skuxyz',
    required: 2,
    price: null,
    found: 0,
    enabled: false
  },
  {sku:'skuabc',
      required: 3,
      price: 140.00,
      found: 0,
      enabled: false
    }
];
```

```javascript
// check if item already exists in basket
let index = this.basket.findIndex((item) => {
  return sku === item.sku;
});

if (index === -1){
  this.basket.push({...item, count: 0}); // Product not already in basket, so add it
} else {
  this.basket[index]
}
```
* Look through all item in basket
* When find item that has recorded deal against it then decrement deal count in list ( or increment deal found)
when count is 0 (or deal found === deal count)
then enable deal as active - switch it, don't do anything now

* Check for actionable deals:
  * Look through deals list.
  * Apply discounts or adjust total accordingly.
