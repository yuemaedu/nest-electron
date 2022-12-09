import { Type } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common/decorators/core/apply-decorators';
import { ApiOkResponse, ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class ResponseMapDto {
  @ApiProperty({
    description: '状态：true表示成功；false表示失败',
    type: 'boolean',
    default: true,
  })
  success: boolean;
  @ApiProperty({
    description: '提示信息',
    required: false,
  })
  errorMessage: string;
}

export const ApiMapResponse = <TModel extends Type<any>>(model?: TModel) =>
  applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseMapDto) },
          {
            properties: {
              data: {
                type: 'object',
                allOf: model ? [{ $ref: getSchemaPath(model) }] : [],
              },
            },
          },
        ],
      },
    }),
  );
