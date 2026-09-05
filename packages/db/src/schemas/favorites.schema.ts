import { 
    pgTable,
    serial,
    timestamp,
    uuid,
    index,
    integer
} from 'drizzle-orm/pg-core';
import { users } from './users.schema';
import { pages } from './notes.schema';

export const favorites = pgTable('favorites', {
  id: serial('id').primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: 'cascade' }) 
    .notNull(),
  pageId: integer("page_id")
    .references(() => pages.id, { onDelete: 'cascade' }) 
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (favorite) => [
  index('favorites_user_id_idx').on(favorite.userId),
  index('favorites_page_id_idx').on(favorite.pageId),
]);
