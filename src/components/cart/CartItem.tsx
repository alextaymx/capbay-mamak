import MenuItemQuantityButton from "@components/order-menu/MenuItemQuantityButton";
import { MENU_ITEM_DETAILS, Pricing_Strategy } from "@lib/pricingScheme";
import { isNil, orderBy } from "lodash";
import Image from "next/image";
import React, { useMemo } from "react";

type Props = {
  item: { code: string; quantity: number };
};

function CartItem({ item }: Props) {
  const itemDetails = useMemo(() => {
    return MENU_ITEM_DETAILS.find((menuItem) => menuItem.code === item.code);
  }, [item.code]);

  if (itemDetails === undefined) return null;

  const { imageUrl, basePrice, category, priceStrategy, priceRules, code, name, description } =
    itemDetails;
  const priceStrategyDescription = useMemo(() => {
    if (priceStrategy === Pricing_Strategy.Buy_X_Get_Y_Free) {
      // sort price rules by buy quantity
      const sortedPriceRules = orderBy(priceRules, ["buy"], ["desc"]);
      // find the price rule that matches the quantity
      const priceRule = sortedPriceRules.find((rule) => rule.buy! <= item.quantity);

      // if no price rule is found, use the base price
      if (isNil(priceRule)) return "";

      const { buy, free } = priceRule;
      // if buy and free are not defined, use the base price
      if (isNil(buy) || isNil(free)) return "";
      return `Buy ${buy} Get ${free} Free`;
    } else if (priceStrategy === Pricing_Strategy.Buy_X_AT_Y_Unit_Price) {
      // sort price rules by min quantity
      const sortedPriceRules = orderBy(priceRules, ["min"], ["desc"]);
      // find the price rule that matches the quantity
      const priceRule = sortedPriceRules.find((rule) => rule.min! <= item.quantity);

      // if no price rule is found, use the base price
      if (isNil(priceRule)) return "";

      const { min, max, unitPrice } = priceRule;
      // if min, max and price are not defined, use the base price
      if (isNil(min) || isNil(unitPrice)) return "";
      return `Buy ${min} at ${unitPrice.toFixed(2)} each`;
    }
  }, [priceStrategy, item.quantity]);

  return (
    <div className="p-4">
      <div className="-m-3 flex items-center flex-wrap rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
        <div className="">
          <MenuItemQuantityButton itemCode={code} />
        </div>
        <div
          hidden
          className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12"
        >
          {imageUrl ? (
            <Image src={imageUrl} height={40} width={40} objectFit="cover" />
          ) : (
            <span className="h-6 w-6 rounded-full bg-blue-600" />
          )}
        </div>
        <div className="ml-4 flex-grow">
          <p className="text-sm font-medium text-gray-900">{name}</p>
          <p className="text-sm text-gray-500 italic">{priceStrategyDescription}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">RM {basePrice.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
