import { setAriaCurrent } from '../core/utils/a11y'
import AJAXKlaviyoForm from '../core/ajaxKlaviyoForm'

import BaseSection from './base'

import NewsletterForm from '../components/newsletterForm'

const selectors = {
  navLink: '[data-nav] a'
}

export default class FooterSection extends BaseSection {
  static TYPE = 'footer'

  constructor(container) {
    super(container)

    this.navLinks = this.qsa(selectors.navLink)

    this.newsletterFormEl = this.qs(NewsletterForm.SELECTOR)
    this.newsletterForm = null
    this.ajaxForm = null

    if (this.newsletterFormEl) {
      this.newsletterForm = new NewsletterForm(this.newsletterFormEl)

      this.ajaxForm = new AJAXKlaviyoForm(this.newsletterFormEl, {
        source: this.newsletterFormEl.dataset.source,
        onSubmitStart: () => this.newsletterForm.onSubmitStart(),
        onSubmitFail: errors => this.newsletterForm.onSubmitFail(errors),
        onSubscribeSuccess: () => this.newsletterForm.onSubscribeSuccess(),
        onSubscribeFail: () => this.newsletterForm.onSubscribeFail()
      })
    }
  }

  onUnload() {
    this.newsletterForm?.destroy()
  }

  onNavigateIn(e) {
    const currentPath = new URL(e.detail.to.finalUrl).pathname

    this.navLinks.forEach(link => setAriaCurrent(link, currentPath))
  }  
}

function updateDateTime() {
  const now = new Date();
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit', 
    timeZoneName: 'short' 
  };
  document.getElementById('current-datetime').textContent = now.toLocaleString(undefined, options);
}

updateDateTime();
setInterval(updateDateTime, 1000); // Update every second