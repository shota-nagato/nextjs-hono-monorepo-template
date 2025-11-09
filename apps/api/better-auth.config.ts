import { drizzle } from 'drizzle-orm/libsql/web'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { betterAuth } from 'better-auth'
import { schema } from './src/db/schemas'
import { betterAuthOptions } from './src/lib/better-auth/options'

const {
  TURSO_DATABASE_URL,
  TURSO_AUTH_TOKEN,
  BETTER_AUTH_URL,
  BETTER_AUTH_SECRET,
} = process.env

const db = drizzle({
  connection: {
    url: TURSO_DATABASE_URL!,
    authToken: TURSO_AUTH_TOKEN || 'local',
  },
  schema,
})

export const auth: ReturnType<typeof betterAuth> = betterAuth({
  ...betterAuthOptions,
  database: drizzleAdapter(db, {
    provider: 'sqlite',
    usePlural: true,
  }),
  baseURL: BETTER_AUTH_URL,
  secret: BETTER_AUTH_SECRET,
})
