import React, { useMemo } from "react";
import { MinusSquareTwoTone, PlusSquareTwoTone } from "@ant-design/icons";
import { addToCart, removeOneFromCart, selectCartItems } from "@lib/redux/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { countBy } from "lodash";

type Props = {
  itemCode: string;
};

function MenuItemQuantityButton({ itemCode }: Props) {
  const currentCartItems = useSelector(selectCartItems);

  const dispatch = useDispatch();
  const addItemToBasket = () => {
    dispatch(addToCart(itemCode));
  };

  const removeItemFromBasket = () => {
    //   Remove item from redux
    dispatch(removeOneFromCart(itemCode));
  };

  const quantity = useMemo(() => {
    return countBy(currentCartItems, (item) => item)[itemCode] || 0;
  }, [currentCartItems]);

  return (
    <div className="flex flex-col space-y-2 my-auto mx-auto sm:justify-self-end">
      <div className="flex flex-row items-center space-x-5">
        <button className="button p-1" onClick={removeItemFromBasket}>
          <MinusSquareTwoTone className="h-5 text-black" />
        </button>
        <div className="p-2 whitespace-normal sm:p-1 sm:whitespace-nowrap">
          <span className="font-bold text-blue-500 text-xl">{quantity}</span>
        </div>
        <button className="button sm:p-1" onClick={addItemToBasket}>
          <PlusSquareTwoTone className="h-5 text-black" />
        </button>
      </div>
    </div>
  );
}

export default MenuItemQuantityButton;
