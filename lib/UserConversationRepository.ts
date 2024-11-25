import { Prisma, UserConversation } from "@prisma/client"; 
export interface UserConversationRepository { 
    create(data: Prisma.UserConversationCreateInput): Promise<UserConversation>; 
    getById(userId: string, modelId: string, threadId: string): Promise<UserConversation | null>; 
    getByUserId(userId: string): Promise<UserConversation[]>; 
    getByUserIdAndModelId(userId: string, modelId: string): Promise<UserConversation[]>;
    update(userId: string, modelId: string, threadId: string, data: Prisma.UserConversationUpdateInput): Promise<UserConversation>; 
    delete(userId: string, modelId: string, threadId: string): Promise<UserConversation>; 
    getAll(): Promise<UserConversation[]>; }