import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { getMetadataStorage } from 'class-validator';

const toSlug = (str: string): string => {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const wrapCreate = <T>(arr?: T[]): { create: T[] } | undefined => {
  return arr && arr.length > 0 ? { create: arr } : undefined;
};

const parseJson = <T>(str: string): T | undefined => {
  try {
    return JSON.parse(str) as T;
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    return undefined;
  }
};

const parseDescriptions = <T extends { descriptions?: unknown }>(
  arr: T[],
): T[] => {
  return arr.map((item) => {
    let parsed: unknown = item.descriptions;
    if (typeof parsed === 'string') {
      parsed = parseJson<any[]>(item.descriptions as string) ?? [];
    } else if (!Array.isArray(parsed)) {
      parsed = [];
    }
    return {
      ...item,
      descriptions: Array.isArray(parsed) ? parsed : [],
    };
  });
};

const ApplyApiQueryFromDto = (dto: new (...args: any[]) => any) => {
  const metadataStorage = getMetadataStorage();
  const validations = metadataStorage.getTargetValidationMetadatas(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    dto as unknown as Function,
    '',
    false,
    false,
  );

  const properties = Array.from(
    new Set(validations.map((m) => m.propertyName)),
  );

  const decorators = properties.map((prop) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
    const type = Reflect.getMetadata('design:type', dto.prototype, prop);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return ApiQuery({ name: prop, required: false, type });
  });

  return applyDecorators(...decorators);
};

export {
  toSlug,
  wrapCreate,
  parseJson,
  parseDescriptions,
  ApplyApiQueryFromDto,
};
