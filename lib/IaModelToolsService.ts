// lib/PrismaIaModelToolsRepository.ts
import { PrismaClient, IaModelTools, Prisma } from "@prisma/client";
import { IaModelToolsRepository } from "./IaModelToolsRepository";

export class PrismaIaModelToolsRepository implements IaModelToolsRepository {
  private prisma = new PrismaClient();

  async create(data: Prisma.IaModelToolsCreateInput): Promise<IaModelTools> {
    return this.prisma.iaModelTools.create({ data });
  }

  async getById(id: string): Promise<IaModelTools | null> {
    return this.prisma.iaModelTools.findUnique({ where: { modelId: id } });
  }

  async update(id: string, data: Prisma.IaModelToolsUpdateInput): Promise<IaModelTools> {
    return this.prisma.iaModelTools.update({ where: { modelId: id }, data });
  }

  async delete(id: string): Promise<IaModelTools> {
    return this.prisma.iaModelTools.delete({ where: { modelId: id } });
  }

  async getAll(): Promise<IaModelTools[]> {
    return this.prisma.iaModelTools.findMany();
  }
}
