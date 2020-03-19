// For testing: data-controller="hello"

import { Controller } from "stimulus"
export default class extends Controller {
  connect() {
    console.log("Hello, Stimulus!")
  }
}
