import { 
    pgTable, 
    text, 
    timestamp, 
    uuid,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  kindId: text('kinde_id').notNull(),
  name: text('name').notNull(),
  description: text('description').default('Welcome to notamai!'),
  email: text('email'),
  googleId: text('google_id'),
  discordId: text('discord_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  deletedAt: timestamp('deleted_at')
});
