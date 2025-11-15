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
  /**
   * Advanced options for cross-domain cookies
   * When frontend and API are on different domains, set SameSite=None and Secure=true
   * Docs: https://www.better-auth.com/docs/integrations/hono#cross-domain-cookies
   */
  advanced: {
    defaultCookieAttributes: {
      sameSite: 'none',
      secure: true,
      partitioned: true, // New browser standards will mandate this for foreign cookies
    },
  },
}
