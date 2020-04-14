import { Controller } from "stimulus"

import Rails from '@rails/ujs';

export default class extends Controller {
  static targets = [ "form", "status", "visibility" ]

  connect() {
    this.timeout  = null
    this.duration = this.data.get("duration") || 1500
    console.log("Autosave controller connected...")
  }

  save() {
    clearTimeout(this.timeout)

    this.timeout = setTimeout(() => {
      this.statusTarget.textContent = "Saving..."
      Rails.fire(this.formTarget, 'submit')
    }, this.duration)
  }

  success() {
    this.setStatus("Saved")
  }

  error() {
    this.setStatus("Unable to save!")
  }

  setStatus(message) {
    this.statusTarget.textContent = message
    this.visibilityTarget.classList.add("visible")

    this.timeout = setTimeout(() => {
      this.statusTarget.textContent = ""
      this.visibilityTarget.classList.remove("visible")
    }, 2000)
  }
}
