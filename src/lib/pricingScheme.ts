import { isNil, orderBy, sortBy } from "lodash";

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

export enum Pricing_Strategy {
  Buy_X_Get_Y_Free,
  Buy_X_AT_Y_Unit_Price,
}
type Price_Rule = {
  buy?: number;
  free?: number;
  min?: number;
  max?: number;
  unitPrice?: number;
};

type MenuItemDetails = {
  code: string;
  name: string;
  basePrice: number;
  priceStrategy: Pricing_Strategy;
  priceRules: Price_Rule[];

  category: string;
  description?: string;
  imageUrl?: string;
};

export const MENU_ITEM_DETAILS: MenuItemDetails[] = [
  {
    code: "B001",
    name: "Kopi",
    basePrice: 2.5,
    priceStrategy: Pricing_Strategy.Buy_X_Get_Y_Free,
    priceRules: [
      {
        buy: 1,
        free: 1,
        //
        min: undefined,
        max: undefined,
        unitPrice: undefined,
      },
    ],
    description: "Measure actions your users take",
    category: "drinks",
    imageUrl: "/assets/menu/kopi.jpeg",
  },
  {
    code: "F001",
    name: "Roti Kosong",
    basePrice: 1.5,
    priceStrategy: Pricing_Strategy.Buy_X_AT_Y_Unit_Price,
    priceRules: [
      {
        min: 2,
        max: undefined,
        unitPrice: 1.2,
        //
        buy: undefined,
        free: undefined,
      },
    ],
    description: "Keep track of your growth",
    category: "dishes",
    imageUrl: "/assets/menu/roti-kosong.jpeg",
  },
  {
    code: "B002",
    name: "Teh Tarik",
    basePrice: 2,
    priceStrategy: Pricing_Strategy.Buy_X_Get_Y_Free,
    priceRules: [
      {
        buy: 1,
        free: 1,
        //
        min: undefined,
        max: undefined,
        unitPrice: undefined,
      },
    ],
    description: "Create your own targeted content",
    category: "drinks",
    imageUrl: "/assets/menu/teh-tarik.webp",
  },
];

const getCartItemQuantity = (cart: string[], itemCode: string) => {
  return cart.filter((code) => code === itemCode).length;
};
export const getCartItemGroupedByQuantity = (cart: string[]) => {
  const itemCodes = [...new Set(cart)];
  return itemCodes.map((code) => ({
    code,
    quantity: getCartItemQuantity(cart, code),
  }));
};

const getTotalItemPriceBuyXGetYFree = (
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

const getTotalItemPriceBuyXAtYUnitPrice = (
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

export const getTotalPriceInCart = (cart: string[]) => {
  const itemGroups = getCartItemGroupedByQuantity(cart);
  const totalCartItemsPrice = itemGroups.reduce((cartTotal, item) => {
    // find item price rule
    const itemPriceDetails: MenuItemDetails | undefined = MENU_ITEM_DETAILS.find(
      (itemPriceRule) => itemPriceRule.code === item.code
    );
    // Do not apply any price rule if item price is not found
    if (isNil(itemPriceDetails)) return cartTotal;
    // Apply price rule
    switch (itemPriceDetails.priceStrategy) {
      case Pricing_Strategy.Buy_X_Get_Y_Free: {
        return cartTotal + getTotalItemPriceBuyXGetYFree(itemPriceDetails, item);
      }
      case Pricing_Strategy.Buy_X_AT_Y_Unit_Price: {
        return cartTotal + getTotalItemPriceBuyXAtYUnitPrice(itemPriceDetails, item);
      }

      default:
        return cartTotal;
    }
  }, 0);
  return totalCartItemsPrice;
};
