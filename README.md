# ShoppingBasketCore

Install dependencies:
```npm install```

Run tests: ``` npm test ```

## Documentation

### Quick Example
```javascript
let salad = new Grocery(3.90, 'salad');
let irnBru = new Grocery(3.00, 'irnBru');

let cart = new CartCore();

cart.add(salad);
cart.add(salad);
cart.add(irnBru);

expect(cart.total()).toEqual(11.88)
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

`new WhiteGood(150.00, 'RubixCube')`
##### Product Methods
###### `getPrice()`     Return: `Integer`
Gets the price
###### `generateSku()`     Return: -
Generates an SKU for the product.. which is basically a unique product ID. It's saved as a class attribute for that constructed product.
