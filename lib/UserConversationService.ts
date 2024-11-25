import { PrismaClient, Prisma, UserConversation } from "@prisma/client";
import { UserConversationRepository } from "./UserConversationRepository";

const prisma = new PrismaClient();

export class PrismaUserConversationRepository implements UserConversationRepository {
  async create(data: Prisma.UserConversationCreateInput): Promise<UserConversation> {
    return prisma.userConversation.create({
      data,
    });
  }

  async getById(userId: string, modelId: string, threadId: string): Promise<UserConversation | null> {
    return prisma.userConversation.findUnique({
      where: {
        userId_modelId_threadId: {
          userId,
          modelId,
          threadId,
        },
      },
    });
  }

  async getByUserId(userId: string): Promise<UserConversation[]> {
    return prisma.userConversation.findMany({
      where: {
        userId,
      },
    });
  }

  async getByUserIdAndModelId(userId: string, modelId: string): Promise<UserConversation[]> {
    return prisma.userConversation.findMany({
      where: {
        userId,
        modelId,
      },
    });
  }

  async update(userId: string, modelId: string, threadId: string, data: Prisma.UserConversationUpdateInput): Promise<UserConversation> {
    return prisma.userConversation.update({
      where: {
        userId_modelId_threadId: {
          userId,
          modelId,
          threadId,
        },
      },
      data,
    });
  }

  async delete(userId: string, modelId: string, threadId: string): Promise<UserConversation> {
    return prisma.userConversation.delete({
      where: {
        userId_modelId_threadId: {
          userId,
          modelId,
          threadId,
        },
      },
    });
  }

  async getAll(): Promise<UserConversation[]> {
    return prisma.userConversation.findMany();
  }
}
