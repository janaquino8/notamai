import { 
    pgTable, 
    jsonb,
    serial,
    text, 
    timestamp,
    uuid,
    index,
    integer,
    foreignKey,
    boolean,
} from 'drizzle-orm/pg-core';
import { users } from './users.schema';

export const pages = pgTable('pages', {
  id: serial('id').primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: 'cascade' }) 
    .notNull(),
  originalId: integer('original_id'), 
  originalUsers: uuid('original_users').array().default([]), 
  title: text('title').notNull(),
  caption: text('caption'),
  content: jsonb('content').array().notNull().default([]),
  isPublic: boolean('is_public').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  deletedAt: timestamp('deleted_at')
}, (page) => [
  index('pages_user_id_idx').on(page.userId),
  foreignKey({
    columns: [page.originalId],
    foreignColumns: [page.id],
    name: 'pages_original_id_referencing'
  })
]);
