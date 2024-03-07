import { SetMetadata } from '@nestjs/common';

import { Action, Subjects } from './ability.factory';
import { Post } from '../posts/entities/post.entity';

export interface IRequiredRule {
  action: Action;
  subject: Subjects;
  field?: string;
}

export const CHECK_ABILITY = 'check_ability';

export const CheckAbilities = (...requirements: IRequiredRule[]) => {
  return SetMetadata(CHECK_ABILITY, requirements);
};

// **
// export class ReadUserAbility implements IRequiredRule {
//   action = Action.Read;
//   subject: Post;
//   field?: string;
// }
