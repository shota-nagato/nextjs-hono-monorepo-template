import { BetterAuthOptions } from 'better-auth'

/**
 * Custom options for Better Auth
 *
 * Docs: https://www.better-auth.com/docs/reference/options
 */
export const betterAuthOptions: BetterAuthOptions = {
  /**
   * Base path for Better Auth.
   * @default "/api/auth"
   */
  basePath: '/api/v1/auth',
  emailAndPassword: {
    enabled: true,
  },
}
