import React, { useEffect, useRef } from 'react'
import { DEFAULT_GEN_SEARCH_CONFIG_ID } from '../utils/genSearch'

interface GenSearchWidgetProps {
  configId?: string
  authToken?: string
}

export const GenSearchWidget: React.FC<GenSearchWidgetProps> = ({
  configId,
  authToken,
}) => {
  const widgetRef = useRef<HTMLElement>(null)
  const effectiveConfigId =
    configId ||
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEN_SEARCH_CONFIG_ID) ||
    DEFAULT_GEN_SEARCH_CONFIG_ID

  useEffect(() => {
    let isMounted = true

    const applyAuthToken = (token: string) => {
      if (!token) return
      const el = widgetRef.current || (document.querySelector('gen-search-widget') as HTMLElement | null)
      if (el) {
        // Set authorization token on the custom element as specified in Google Cloud docs:
        // const searchWidget = document.querySelector('gen-search-widget');
        // searchWidget.authToken = "<JWT or OAuth token>";
        ;(el as unknown as { authToken: string }).authToken = token
      }
    }

    const token =
      authToken ||
      (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEN_SEARCH_AUTH_TOKEN) ||
      ''

    if (token) {
      applyAuthToken(token)
    } else {
      // If no token was provided via props or env, attempt to fetch from backend token endpoint if available
      fetch('/api/search/token')
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (isMounted && data?.token) {
            applyAuthToken(data.token)
          }
        })
        .catch(() => {
          // Public access mode, no token required
        })
    }

    // Ensure token is applied if web component is upgraded asynchronously
    if (typeof window !== 'undefined' && 'customElements' in window && window.customElements) {
      window.customElements.whenDefined('gen-search-widget').then(() => {
        if (isMounted && token) {
          applyAuthToken(token)
        }
      })
    }

    return () => {
      isMounted = false
    }
  }, [authToken])

  return (
    <gen-search-widget
      ref={widgetRef}
      configId={effectiveConfigId}
      triggerId="searchWidgetTrigger"
      anchorsTarget="_blank"
    />
  )
}
