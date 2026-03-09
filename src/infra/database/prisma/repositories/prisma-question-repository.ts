import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionsRepository } from "@/domain/forum/application/repositories/question-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PrismaQuestionMapper } from "../mappers/prisma-question-mapper";

@Injectable()
export class PrismaQuestionRepository implements QuestionsRepository {
  constructor(private prisma: PrismaService) {}
  async findById(id: string): Promise<Question | null> {
    const question = await this.prisma.questions.findUnique({
      where: { id },
    });

    if (!question) {
      return null;
    }
    return PrismaQuestionMapper.toDomain(question);
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = await this.prisma.questions.findUnique({
      where: { slug },
    });

    if (!question) {
      return null;
    }
    return PrismaQuestionMapper.toDomain(question);
  }

  async findManyRecent(params: PaginationParams): Promise<Question[]> {
    const questions = await this.prisma.questions.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
      skip: (params.page - 1) * 20,
    });

    return questions.map(PrismaQuestionMapper.toDomain);
  }

  async create(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question);

    await this.prisma.questions.create({
      data,
    });
  }

  async save(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question);

    await this.prisma.questions.update({
      where: { id: data.id },
      data,
    });
  }

  async delete(question: Question): Promise<void> {
    await this.prisma.questions.delete({
      where: { id: question.id.toString() },
    });
  }
}
