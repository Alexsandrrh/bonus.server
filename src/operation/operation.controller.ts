import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiOkResponse,
} from '@nestjs/swagger';

import { OperationService } from './operation.service';
import { AuthGuard } from '../auth/auth.guard';
import { AuthUser } from '../auth/decorators';
import { OperationsOkResponse } from './responses';

@ApiTags('Операции пользователя')
@Controller('operations')
export class OperationController {
  constructor(private readonly operationService: OperationService) {}

  /**
   * Получение всех операций пользователя
   * */
  @ApiOperation({ summary: 'Получение всех операций пользователя' })
  @ApiBearerAuth()
  @Get()
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  createUserTransfer() {
    return 'createUserTransfer';
  }

  /**
   * Создать покупку пользователя
   * */
  @ApiOperation({ summary: 'Создать покупку пользователя' })
  @ApiBearerAuth()
  @Post('purchase')
  @UseGuards(AuthGuard)
  createUserPurchase() {
    return 'createUserPurchase';
  }
}
