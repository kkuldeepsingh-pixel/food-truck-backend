import { Request, Response } from "express";
import { MenuItem, menuItems } from "../models/menu";

interface MenuParams {
  id: string;
}

// GET all menu items
export const getAllMenuItems = (_req: Request, res: Response) => {
  res.json(menuItems);
};

// GET menu item by ID
export const getMenuItemById = (req: Request<MenuParams>, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const item = menuItems.find(m => m.id === id);
  if (!item) return res.status(404).json({ message: "Menu item not found" });
  res.json(item);
};

// POST new menu item
export const createMenuItem = (req: Request, res: Response) => {
  const { truckId, name, description, price } = req.body;
  if (!truckId || !name || !description || price === undefined)
    return res.status(400).json({ message: "Missing fields" });

  const newItem: MenuItem = {
    id: menuItems.length ? menuItems[menuItems.length - 1].id + 1 : 1,
    truckId,
    name,
    description,
    price,
  };

  menuItems.push(newItem);
  res.status(201).json(newItem);
};

// PUT update menu item
export const updateMenuItem = (req: Request<MenuParams>, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const itemIndex = menuItems.findIndex(m => m.id === id);
  if (itemIndex === -1) return res.status(404).json({ message: "Menu item not found" });

  const { truckId, name, description, price } = req.body;
  if (truckId !== undefined) menuItems[itemIndex].truckId = truckId;
  if (name !== undefined) menuItems[itemIndex].name = name;
  if (description !== undefined) menuItems[itemIndex].description = description;
  if (price !== undefined) menuItems[itemIndex].price = price;

  res.json(menuItems[itemIndex]);
};

// DELETE menu item
export const deleteMenuItem = (req: Request<MenuParams>, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const itemIndex = menuItems.findIndex(m => m.id === id);
  if (itemIndex === -1) return res.status(404).json({ message: "Menu item not found" });

  const deletedItem = menuItems.splice(itemIndex, 1);
  res.json(deletedItem[0]);
};