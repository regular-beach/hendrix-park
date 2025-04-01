import { setAriaCurrent } from '../core/utils/a11y'

import BaseSection from './base'
import HeaderCartControl from '../components/header/headerCartControl'

const selectors = {
  primaryNav: '[data-primary-nav]'
}

export default class HeaderSection extends BaseSection {
  static TYPE = 'header'

  constructor(container) {
    super(container)

    this.primaryNav = this.qs(selectors.primaryNav)
    this.primaryNavLinks = this.primaryNav.querySelectorAll('a')    

    this.headerCartControl = new HeaderCartControl(this.qs(HeaderCartControl.SELECTOR))
  }

  onNavigateIn(e) {
    const currentPath = new URL(e.detail.to.finalUrl).pathname

    this.primaryNavLinks.forEach(link => setAriaCurrent(link, currentPath))
  }  
}

document.addEventListener("DOMContentLoaded", function () {
  const indexButton = document.getElementById("index-button");
  const dropdownMenu = document.getElementById("dropdown-menu");

  if (indexButton && dropdownMenu) {
    indexButton.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevents click from closing immediately
      dropdownMenu.classList.toggle("hidden");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {
      if (!dropdownMenu.contains(event.target) && event.target !== indexButton) {
        dropdownMenu.classList.add("hidden");
      }
    });
  }
});
