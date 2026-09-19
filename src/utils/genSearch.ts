export const DEFAULT_GEN_SEARCH_CONFIG_ID = '9dd24cf9-0860-4afb-97dd-3093c5eb8647'

/**
 * Programmatically triggers the Google Cloud Vertex AI Search widget popup
 */
export function openGenSearchWidget(): void {
  const trigger = document.getElementById('searchWidgetTrigger')
  if (trigger) {
    trigger.click()
  } else {
    console.warn('searchWidgetTrigger element not found in DOM')
  }
}
