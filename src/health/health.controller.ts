import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  PrismaHealthIndicator,
  MemoryHealthIndicator,
  DiskHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';
import { PrismaClient } from '@generated/prisma/client';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: PrismaHealthIndicator,
    private prismaClient: PrismaClient,
    private memory: MemoryHealthIndicator,
    private readonly disk: DiskHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      this.checkApi(),
      this.checkApiDocs(),
      this.checkDatabase(),
      this.checkMemoryHeap(),
      this.checkMemoryRss(),
      this.checkStorage(),
    ]);
  }

  private checkApi() {
    return () =>
      this.http.pingCheck('api', `${process.env.HEALTH_APP_URL}api/customers`);
  }

  private checkApiDocs() {
    return () =>
      this.http.pingCheck('api-docs', process.env.HEALTH_API_DOC_URL);
  }

  private checkDatabase() {
    return () => this.db.pingCheck('database', this.prismaClient);
  }

  private checkMemoryHeap() {
    return () => this.memory.checkHeap('memory_heap', Number(process.env.HEALTH_MEMORY_LIMIT) * 1024 * 1024);
  }

  private checkMemoryRss() {
    return () => this.memory.checkRSS('memory_rss', Number(process.env.HEALTH_MEMORY_LIMIT) * 1024 * 1024);
  }

  private checkStorage() {
    return () =>
      this.disk.checkStorage('storage', {
        path: '/',
        thresholdPercent: Number(process.env.HEALTH_STORAGE_LIMIT),
      });
  }
}
