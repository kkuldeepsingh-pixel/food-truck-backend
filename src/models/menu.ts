export interface MenuItem {
  id: number;
  truckId: number;
  name: string;
  description: string;
  price: number;
}

export let menuItems: MenuItem[] = [
  { id: 1, truckId: 1, name: "Taco", description: "Spicy beef taco", price: 5 },
  { id: 2, truckId: 1, name: "Burrito", description: "Chicken burrito", price: 7 },
];