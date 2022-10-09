import { isNil } from "lodash";
import { getCartItemGroupedByQuantity } from "./utils";
import { MENU_ITEM_DETAILS } from "./MENU_ITEM_DETAILS";
import { getTotalItemPriceBuyXGetYFree, getTotalItemPriceBuyXAtYUnitPrice } from "./type";
import { MenuItemDetails, Pricing_Strategy } from "./MenuItemDetails";

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
