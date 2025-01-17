import { IsUUID } from 'class-validator';

export class RessourceParams {
  /**
   * The id of the ressource.
   * @example 1
   */
  @IsUUID()
  id: string;
}
