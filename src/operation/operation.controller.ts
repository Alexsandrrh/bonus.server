import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { OperationService } from './operation.service';
import { AuthGuard } from '../auth/auth.guard';
import { AuthUser } from '../auth/decorators';
import { OperationsOkResponse } from './responses';
import { CreateUserTransferDto } from './dto';

@ApiTags('Операции пользователя')
@Controller('operations')
@UseGuards(AuthGuard)
export class OperationController {
  constructor(private readonly operationService: OperationService) {}

  /**
   * Получение всех операций пользователя
   * */
  @ApiOperation({ summary: 'Получение всех операций пользователя' })
  @ApiBearerAuth()
  @Get()
  @ApiOkResponse({ type: OperationsOkResponse })
  async getUserOperations(
    @AuthUser('id') userId: string,
  ): Promise<OperationsOkResponse> {
    const operations = await this.operationService.getUserOperations(userId);
    return this.operationService.buildOperationsResponse(operations);
  }

  /**
   * Создать перевод от пользователя к пользователю
   * */
  @ApiOperation({ summary: 'Создать перевод от пользователя к пользователю' })
  @ApiBearerAuth()
  @Post('transfer')
  async createUserTransfer(
    @AuthUser('id') userId: string,
    @Body() createUserTransferDto: CreateUserTransferDto,
  ) {
    const operation = await this.operationService.createTransfer(
      userId,
      createUserTransferDto,
    );
    return this.operationService.buildOperationOkResponse(operation);
  }
}
