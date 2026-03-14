import { ConfigService } from "@nestjs/config";
import { EnvSchema } from "./env";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService<EnvSchema, true>) {}
  get<T extends keyof EnvSchema>(key: T) {
    return this.configService.get<T>(key, { infer: true });
  }
}
