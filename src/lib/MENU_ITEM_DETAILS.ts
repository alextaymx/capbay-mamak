import { MenuItemDetails, Pricing_Strategy } from "./MenuItemDetails";

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
    description: "Traditional coffee beverage",
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
    description: "Traditional Malaysian pan-fried flatbread ",
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
    description: "A brew of hot tea with milk",
    category: "drinks",
    imageUrl: "/assets/menu/teh-tarik.webp",
  },
];
