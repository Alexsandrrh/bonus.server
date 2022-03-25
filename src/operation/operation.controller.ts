import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { OperationService } from './operation.service';
import { AuthGuard } from '../auth/auth.guard';
import { AuthUser } from '../auth/decorators';
import { OperationsOkResponse, OperationSuccessOkResponse } from './responses';
import { CreateUserTransferDto, CreateUserPurchaseDto } from './dto';

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
  @HttpCode(200)
  @ApiOkResponse({
    description: 'Ответ об упешном получении всех операций пользователя',
    type: OperationsOkResponse,
    status: 200,
  })
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
  @HttpCode(200)
  @ApiOkResponse({
    description: 'Ответ успешно проведенной операции',
    type: OperationSuccessOkResponse,
    status: 200,
  })
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

  /**
   * Создать пользовательскую покупку товара
   * */
  @ApiOperation({ summary: 'Создать пользовательскую покупку товара' })
  @ApiBearerAuth()
  @Post('purchase')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'Ответ успешно проведенной операции',
    type: OperationSuccessOkResponse,
    status: 200,
  })
  async createUserPurchase(
    @AuthUser('id') userId: string,
    @Body() createUserPurchaseDto: CreateUserPurchaseDto,
  ) {
    const operation = await this.operationService.createPurchase(
      userId,
      createUserPurchaseDto,
    );
    return this.operationService.buildOperationOkResponse(operation);
  }
}
