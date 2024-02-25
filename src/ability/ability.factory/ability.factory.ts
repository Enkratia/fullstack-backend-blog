import { Injectable } from '@nestjs/common';
import {
  AbilityBuilder,
  createMongoAbility,
  InferSubjects,
  MongoAbility,
} from '@casl/ability';

import { User } from '../../users/entities/user.entity';
import { Post } from '../../posts/entities/post.entity';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

type Subjects = InferSubjects<typeof User | 'all'>;

export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
  defineAbility(user: User) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createMongoAbility,
    );

    if (user.isAdmin) {
      can(Action.Manage, 'all');
    } else {
      can(Action.Read, 'all');
    }

    return build();
  }
}

// type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete';

// export type Subjects = InferSubjects<typeof User | typeof Post | 'all'>;
// export type Subjects = InferSubjects<typeof User | 'all'>;

// export type AppAbility = Ability<[Action, Subjects]>
// export type AppAbility = Ability<[Action, Subjects]>;

// const ability = createMongoAbility<[Actions, Subjects]>();
