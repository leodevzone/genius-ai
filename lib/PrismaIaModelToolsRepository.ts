// lib/PrismaIaModelToolsRepository.ts
import { Prisma, IaModelTools } from "@prisma/client";
import { IaModelToolsRepository } from "./IaModelToolsRepository";
import { db } from "@/lib/db"; // Importa la instancia de db

export class PrismaIaModelToolsRepository implements IaModelToolsRepository {
  async create(data: Prisma.IaModelToolsCreateInput): Promise<IaModelTools> {
    return db.iaModelTools.create({ data }); // Usa db en lugar de this.prisma
  }

  async getById(id: string): Promise<IaModelTools | null> {
    return db.iaModelTools.findUnique({ where: { modelId: id } });
  }

  async update(id: string, data: Prisma.IaModelToolsUpdateInput): Promise<IaModelTools> {
    return db.iaModelTools.update({ where: { modelId: id }, data });
  }

  async delete(id: string): Promise<IaModelTools> {
    return db.iaModelTools.delete({ where: { modelId: id } });
  }

  async getAll(): Promise<IaModelTools[]> {
    return db.iaModelTools.findMany();
  }
}
