import { Request, Response } from "express";
import { prisma } from "../prisma";
import { ItemCreateSchema, ItemUpdateSchema } from "../schemas/items.schema";

export async function listItems(req: any, res: Response) {
  const items = await prisma.item.findMany({ where: { ownerId: req.userId } });
  res.json(items);
}

export async function createItem(req: any, res: Response) {
  const parse = ItemCreateSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });
  const item = await prisma.item.create({ data: { ...parse.data, ownerId: req.userId } });
  res.status(201).json(item);
}

export async function updateItem(req: any, res: Response) {
  const id = Number(req.params.id);
  const parse = ItemUpdateSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });
  const item = await prisma.item.update({ where: { id }, data: parse.data });
  res.json(item);
}

export async function deleteItem(req: any, res: Response) {
  const id = Number(req.params.id);
  await prisma.item.delete({ where: { id } });
  res.status(204).send();
}
