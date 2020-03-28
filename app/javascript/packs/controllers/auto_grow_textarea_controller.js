import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["input"];

  connect() {
      console.log('Auto-grow textarea controller connected...');
      this.inputTarget.style.resize = 'none';
      this.inputTarget.style.minHeight = `${this.inputTarget.scrollHeight}px`;
  }

  resize(event){
      event.target.style.height = '5px';
      event.target.style.height =  `${event.target.scrollHeight}px`;
  }
}
