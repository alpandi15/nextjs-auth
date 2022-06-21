import React, { ReactNode } from 'react'
import { IntlProvider } from 'react-intl'
import flatten from 'flat'

import messages from './messages'
import { useRouter } from 'next/router'

interface I18nProps {
  children: ReactNode,
  locale: 'en'|'id'
}

const Provider = ({
  children,
  locale = 'id'
}: I18nProps) => {
  const { defaultLocale } = useRouter()
  return (
    <IntlProvider
      textComponent={React.Fragment}
      locale={locale}
      defaultLocale={defaultLocale}
      messages={flatten(messages[locale])}
    >
      {children}
    </IntlProvider>
  )
}

Provider.displayName = 'I18nProvider'

export default Provider