import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

export const BearerTokenGuard = () =>
  applyDecorators(UseGuards(AuthGuard), ApiBearerAuth());

export const PublicGuard = () => SetMetadata('public', true);
