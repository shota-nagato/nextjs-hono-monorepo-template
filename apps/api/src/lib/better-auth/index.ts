import { drizzle } from 'drizzle-orm/libsql/web'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { betterAuth } from 'better-auth'
import { betterAuthOptions } from './options'
import { schema } from '../../db/schemas'
import { admin } from 'better-auth/plugins'

export const auth = (env: CloudflareBindings) => {
  const db = drizzle({
    connection: {
      url: env.TURSO_DATABASE_URL,
      authToken: env.TURSO_AUTH_TOKEN || 'local',
    },
    schema,
  })

  return betterAuth({
    ...betterAuthOptions,
    database: drizzleAdapter(db, {
      provider: 'sqlite',
      usePlural: true,
    }),
    baseURL: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
    trustedOrigins: [env.FRONTEND_URL],
    plugins: [admin()],
  })
}
