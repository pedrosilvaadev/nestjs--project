import { AppModule } from "@/infra/app.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import request from "supertest";

describe("Fetch recent question (E2E)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);
    await app.init();
  });

  test("[GET] /questions", async () => {
    const user = await prisma.user.create({
      data: {
        name: "John Doe",
        email: "johndoe@example.com",
        password: "123456",
      },
    });

    const accessToken = jwt.sign({ sub: user.id });

    await prisma.questions.createMany({
      data: [
        {
          title: "Sample Question 1",
          content: "This is a sample question content.",
          authorId: user.id,
          slug: "sample-question-1",
        },
        {
          title: "Sample Question 2",
          content: "This is a sample question content.",
          authorId: user.id,
          slug: "sample-question-2",
        },
        {
          title: "Sample Question 3",
          content: "This is a sample question content.",
          authorId: user.id,
          slug: "sample-question-3",
        },
      ],
    });

    const response = await request(app.getHttpServer())
      .get("/questions")
      .set("Authorization", `Bearer ${accessToken}`)
      .send();

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      questions: [
        expect.objectContaining({
          title: "Sample Question 1",
        }),
        expect.objectContaining({
          title: "Sample Question 2",
        }),
        expect.objectContaining({
          title: "Sample Question 3",
        }),
      ],
    });
  });
});
