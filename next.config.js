const withSass = require('@zeit/next-sass')
const withPWA = require("next-pwa");

module.exports = withPWA(
  withSass((phase, { defaultConfig }) => {
    const isDev = phase === PHASE_DEVELOPMENT_SERVER
    const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
    const isStaging = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

    const env = {
      RESTURL_SPEAKERS: (() => {
        if (isDev) return 'http://localhost:4000/speakers'
        if (isProd) return 'https://www.siliconvalley-codecamp.com/rest/speakers/ps'
        if (isStaging) return 'http://localhost:11639'
        return 'RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)'
      })(),
      RESTURL_SESSIONS: (() => {
        if (isDev) return 'http://localhost:4000/sessions'
        if (isProd) return 'https://www.siliconvalley-codecamp.com/rest/sessions'
        if (isStaging) return 'http://localhost:11639'
        return 'RESTURL_SESSIONS:not (isDev,isProd && !isStaging,isProd && isStaging)'
      })(),
    }

    return {
      env,
      headers: {
        "X-Frame-Options": "sameorigin",
      },
      cssModules: true,
      target: "server",
      pwa: {
        dest: "public",
        disable: process.env.NODE_ENV === "development",
      },
    }
  })
)