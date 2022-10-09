import { isNil, orderBy, sortBy } from "lodash";
import { MenuItemDetails } from "./MenuItemDetails";

/**
 * Our CapBay Mamak sells the following products:
Code | Name | Price
----------------------------
B001 | Kopi | RM2.5
F001 | Roti Kosong | RM1.5
B002 | Teh Tarik | RM2
We understand that the mamak is a place of gathering and good food is best enjoyed
together. Hence, drinks such as Kopi and Teh Tarik have a buy 1 free 1 package (on the
same drink only, e.g. 2 Kopi then 1 will be free).
Also, our Roti Kosong is famous and we love it when people eat a lot of them. Hence, when
people buy 2 or more Roti Kosong, the price should drop to RM1.2 each.
 */

// Write a function that takes in a list of products and returns the total price of the
// products after applying the pricing scheme.
// Example:
// Input: [B001, F001, B002, B001, F001, B001]
// Output: 9.5

/**
 * Implement a checkout system that fulfils these requirements.
Test Data
List: B001,F001,B002,B001,F001
Total price expected: RM6.9
List: B002,B002,F001
Total price expected: RM3.5
List: B001,B001,B002
Total price expected: RM4.5

*/

const cart1 = ["B001", "F001", "B002", "B001", "F001"];
const cart2 = ["B002", "B002", "F001"];
const cart3 = ["B001", "B001", "B002"];

export const getTotalItemPriceBuyXGetYFree = (
  itemPriceDetails: MenuItemDetails,
  item: {
    code: string;
    quantity: number;
  }
) => {
  const { priceRules } = itemPriceDetails;
  // sort price rules by buy quantity
  const sortedPriceRules = orderBy(priceRules, ["buy"], ["desc"]);
  // find the price rule that matches the quantity
  const priceRule = sortedPriceRules.find((rule) => rule.buy! <= item.quantity);

  // if no price rule is found, use the base price
  if (isNil(priceRule)) return itemPriceDetails.basePrice * item.quantity;

  const { buy, free } = priceRule;
  // if buy and free are not defined, use the base price
  if (isNil(buy) || isNil(free)) return itemPriceDetails.basePrice * item.quantity;

  const { quantity } = item;

  const freeQuantity = Math.floor(quantity / (buy + free)) * free;
  const totalItemPrice = (quantity - freeQuantity) * itemPriceDetails.basePrice;
  return totalItemPrice;
};

export const getTotalItemPriceBuyXAtYUnitPrice = (
  itemPriceDetails: MenuItemDetails,
  item: {
    code: string;
    quantity: number;
  }
) => {
  const { priceRules } = itemPriceDetails;
  // sort price rules by min quantity
  const sortedPriceRules = orderBy(priceRules, ["min"], ["desc"]);
  // find the price rule that matches the quantity
  const priceRule = sortedPriceRules.find((rule) => rule.min! <= item.quantity);

  // if no price rule is found, use the base price
  if (isNil(priceRule)) return itemPriceDetails.basePrice * item.quantity;

  const { min, max, unitPrice } = priceRule;
  // if min, max and price are not defined, use the base price
  if (isNil(min) || isNil(unitPrice)) return itemPriceDetails.basePrice * item.quantity;

  const totalItemPrice = item.quantity * unitPrice;
  return totalItemPrice;
};
