import { applyDecorators, SetMetadata, Type } from '@nestjs/common';
import { ApiOkResponse, ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class PaginatedDto<TData> {
  @ApiProperty({
    name: 'errorMessage',
    description: '错误信息',
  })
  errorMessage: string;
  @ApiProperty({
    name: 'success',
    description: '是否成功',
  })
  success: boolean;
  @ApiProperty({
    name: 'total',
    description: '一共多少条数据',
  })
  total: number;

  @ApiProperty()
  pageSize: number;

  @ApiProperty({
    name: 'current',
    description: '当前页',
  })
  current: number;

  data: TData[];
}

export const ApiPaginateResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};
