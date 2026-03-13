import { Module } from "@nestjs/common";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { PrismaQuestionRepository } from "./prisma/repositories/prisma-question-repository";
import { PrismaAnswerAttachmentsRepository } from "./prisma/repositories/prisma-answer-attachments-repository";
import { PrismaAnswerRepository } from "./prisma/repositories/prisma-answer-repository";
import { PrismaAnswerCommentsRepository } from "./prisma/repositories/prisma-answer-comments-repository";
import { PrismaQuestionCommentsRepository } from "./prisma/repositories/prisma-question-comments-repository";
import { PrismaQuestionAttachmentsRepository } from "./prisma/repositories/prisma-question-attachments-repository";
import { QuestionsRepository } from "@/domain/forum/application/repositories/question-repository";
import { StudentsRepository } from "@/domain/forum/application/repositories/students-repository";
import { PrismaStudentsRepository } from "./prisma/repositories/prisma-student-repository";

@Module({
  providers: [
    PrismaService,
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionRepository,
    },
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepository,
    },
    PrismaQuestionCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaAnswerRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswerAttachmentsRepository,
  ],
  exports: [
    PrismaService,
    QuestionsRepository,
    StudentsRepository,
    PrismaQuestionCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaAnswerRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswerAttachmentsRepository,
  ],
})
export class DatabaseModule {}
