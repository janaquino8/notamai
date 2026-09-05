import { 
    pgTable,
    serial,
    timestamp,
    uuid,
    index,
} from 'drizzle-orm/pg-core';
import { users } from './users.schema';

export const follows = pgTable('follows', {
  id: serial('id').primaryKey(),
  followerId: uuid("follower_id")
    .references(() => users.id, { onDelete: 'cascade' }) 
    .notNull(),
  followedId: uuid("followed_id")
    .references(() => users.id, { onDelete: 'cascade' }) 
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (follow) => [
  index('follows_follower_id_idx').on(follow.followerId),
  index('follows_followed_id_idx').on(follow.followedId),
]);
