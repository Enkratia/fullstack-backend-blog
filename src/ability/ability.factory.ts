import { Injectable } from '@nestjs/common';
import {
  AbilityBuilder,
  createMongoAbility,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility,
  MongoQuery,
} from '@casl/ability';

import { User } from '../users/entities/user.entity';
import { Post } from '../posts/entities/post.entity';

import { AboutUsStatic } from '../about-us-static/entities/about-us-static.entity';
import { Join } from '../join/entities/join.entity';
import { CategoryDescription } from '../category-description/entities/category-description.entity';
import { ContactUs } from '../contact-us/entities/contact-us.entity';
import { ContactUsMessage } from '../contact-us-messages/entities/contact-us-message.entity';
import { ContactUsQuery } from '../contact-us-queries/entities/contact-us-query.entity';
import { FeaturedIn } from '../featured-in/entities/featured-in.entity';
import { FooterBottom } from '../footer-bottom/entities/footer-bottom.entity';
import { KnowMore } from '../know-more/entities/know-more.entity';
import { PrivacyPolicy } from '../privacy-policy/entities/privacy-policy.entity';
import { Subscribe } from '../subscribe/entities/subscribe.entity';
import { Testimonial } from '../testimonial/entities/testimonial.entity';
import { UsMission } from '../us-mission/entities/us-mission.entity';
import { TestimonialStatic } from '../testimonial-static/entities/testimonial-static.entity';
import { WhyThisBlog } from '../why-this-blog/entities/why-this-blog.entity';
import { WhyWeStarted } from '../why-we-started/entities/why-we-started.entity';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type Subjects =
  | InferSubjects<
      | typeof Post
      | typeof User
      | typeof AboutUsStatic
      | typeof Join
      | typeof CategoryDescription
      | typeof ContactUs
      | typeof ContactUsMessage
      | typeof ContactUsQuery
      | typeof FeaturedIn
      | typeof FooterBottom
      | typeof KnowMore
      | typeof PrivacyPolicy
      | typeof Subscribe
      | typeof Testimonial
      | typeof UsMission
      | typeof TestimonialStatic
      | typeof WhyThisBlog
      | typeof WhyWeStarted
    >
  | 'all';

type Conditions = MongoQuery;

export type AppAbility = MongoAbility<[Action, Subjects], Conditions>;

// **
type FlatPost = Post & {
  'user.id': Post['user']['id'];
};

@Injectable()
export class AbilityFactory {
  defineAbility(user: User) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createMongoAbility,
    );

    if (user.isAdmin) {
      can(Action.Manage, 'all');

      cannot(Action.Update, User);
    } else {
      can<FlatPost>(Action.Update, Post, { 'user.id': { $eq: user.id } });
      can<FlatPost>(Action.Delete, Post, { 'user.id': { $eq: user.id } });

      cannot(Action.Update, Post, ['isFeatured']);

      // **
      can(Action.Update, User, { id: { $eq: user.id } });
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}

// type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete';

// export type Subjects = InferSubjects<typeof User | typeof Post | 'all'>;
// export type Subjects = InferSubjects<typeof User | 'all'>;

// export type AppAbility = Ability<[Action, Subjects]>
// export type AppAbility = Ability<[Action, Subjects]>;

// const ability = createMongoAbility<[Actions, Subjects]>();

// **
// can(Action.Read, 'all').because('only users');
// can(Action.Create, Post, { user: { id: user.id } }).because('not a John');
// can(Action.Create, Post).because('Only users');
