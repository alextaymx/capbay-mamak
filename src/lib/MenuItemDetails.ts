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

export type MenuItemDetails = {
  code: string;
  name: string;
  basePrice: number;
  priceStrategy: Pricing_Strategy;
  priceRules: Price_Rule[];

  category: string;
  description?: string;
  imageUrl?: string;
};
