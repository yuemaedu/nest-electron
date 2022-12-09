import { applyDecorators, SetMetadata, Type } from '@nestjs/common';
import { ApiOkResponse, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { ResponseMapDto } from './api.map.response.decorator';

export class ResponseArrayDto {
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

export const ApiArrayResponse = <TModel extends Type<any>>(model?: TModel) =>
  applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseMapDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: {
                  allOf: [{ $ref: getSchemaPath(model) }],
                },
              },
            },
          },
        ],
      },
    }),
  );
