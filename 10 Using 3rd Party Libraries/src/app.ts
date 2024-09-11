import "reflect-metadata";
import { plainToClass } from "class-transformer";
// import _ from "lodash";

// console.log(_.shuffle([1, 2, 3]));

// declare const GLOBAL: any;
// console.log(GLOBAL);

import { Product } from "./product.model";
import { validate } from "class-validator";

const products = [
  { title: "A carpet", price: 29.99 },
  { title: "A book", price: 10.99 },
];

// const loadedProducts = products.map(
//   (prod) => new Product(prod.title, prod.price)
// );

const loadedProducts = plainToClass(Product, products);

console.log(loadedProducts);

const p1 = new Product("Toy", 10);
console.log(p1.getInformation());

const newProd = new Product("", -5.99);
validate(newProd).then((err) => {
  if (err.length > 0) {
    console.log(err);
  } else console.log(newProd.getInformation());
});
