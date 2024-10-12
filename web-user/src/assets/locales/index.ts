import { createI18n } from 'vue-i18n'
import cookies from 'js-cookie'

function loadLocaleMessages(): {
  [key: string]: { [key: string]: { [key: string]: string } }
} {
  const locales = require.context('./languages', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages: {
    [key: string]: { [key: string]: { [key: string]: string } }
  } = {}
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}

// 语言
const lang = cookies.get('locale') ? String(cookies.get('locale')) : 'cn'
export const i18n = createI18n({
  locale: lang,
  fallbackLocale: lang,
  messages: loadLocaleMessages()
})
