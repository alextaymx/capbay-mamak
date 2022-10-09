import { Container } from "@components/base/Container";
import { getTotalPriceInCart } from "@lib/getTotalPriceInCart";
import { getCartItemGroupedByQuantity } from "@lib/utils";
import { MENU_ITEM_DETAILS } from "@lib/MENU_ITEM_DETAILS";
import { selectCartItems } from "@lib/redux/cart/cartSlice";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { Tooltip } from "antd";

type Props = {};

function CartOverview(props: Props) {
  const currentCartItems = useSelector(selectCartItems);

  const cartItemsGrouped = useMemo(() => {
    return getCartItemGroupedByQuantity(currentCartItems);
  }, [currentCartItems]);

  const totalPrice = useMemo(() => {
    return getTotalPriceInCart(currentCartItems);
  }, [cartItemsGrouped]);

  const grossPrice = useMemo(() => {
    return currentCartItems.reduce((acc, item) => {
      const itemDetails = MENU_ITEM_DETAILS.find((i) => i.code === item);
      return acc + itemDetails?.basePrice!;
    }, 0);
  }, [totalPrice]);

  const cartItemSequence = useMemo(() => {
    return currentCartItems.join(" > ");
  }, [currentCartItems]);

  return (
    <div id="cart" className="py-16 bg-slate-50">
      <Container>
        <div className="h-96 w-11/12 sm:w-5/12 bg-white mx-auto rounded-lg">
          <Tooltip color="blue" placement="top" title={cartItemSequence}>
            <div className="text-center px-10 py-2 font-semibold text-2xl">Your Cart</div>
          </Tooltip>

          <div className="divide-y divide-slate-20 divide-dashed">
            {cartItemsGrouped.map((item) => {
              return <CartItem key={item.code} item={item} />;
            })}
          </div>
          <div hidden={!!cartItemsGrouped.length} className="p-5 text-center italic text-gray-500">
            Your cart is empty. Please add some items to your cart.
          </div>
          <div className="border-t border-dashed border-slate-200 p-5 mb-5">
            <div className="flex justify-between ">
              <div className="text-gray-500">Subtotal: </div>
              <div className="text-gray-500">RM {grossPrice.toFixed(2)}</div>
            </div>
            <div className="flex justify-between ">
              <div className="text-gray-500">You saved: </div>
              <div className="text-gray-500">RM {(grossPrice - totalPrice).toFixed(2)}</div>
            </div>
            <div className="flex justify-between text-black">
              <div className="">Total: </div>
              <div className="">RM {totalPrice.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default CartOverview;
