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
