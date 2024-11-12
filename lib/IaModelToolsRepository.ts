// lib/IaModelToolsRepository.ts
import { Prisma, IaModelTools } from "@prisma/client";

export interface IaModelToolsRepository {
  create(data: Prisma.IaModelToolsCreateInput): Promise<IaModelTools>;
  getById(id: string): Promise<IaModelTools | null>;
  update(id: string, data: Prisma.IaModelToolsUpdateInput): Promise<IaModelTools>;
  delete(id: string): Promise<IaModelTools>;
  getAll(): Promise<IaModelTools[]>;
}
