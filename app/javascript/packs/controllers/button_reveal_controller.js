import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "form", "button" ]

  connect() {
    console.log("Hello button reveals...", this.element)
  }

  reveal() {
    $(".revealable-button").addClass("d-block")
  }
}
