import { Controller } from "stimulus"
export default class extends Controller {
  connect() {
    console.log("Drag content block controller connected...")
  }

  dragstart(event) {
    event.dataTransfer.setData("application/drag-key", event.target.closest(".content-block").getAttribute("data-content-block-id"))
    event.dataTransfer.effectAllowed = "move"
  }

  dragover(event) {
    event.preventDefault()
    return true
  }

  dragenter(event) {
    event.preventDefault()
  }

  drop(event) {
    var data = event.dataTransfer.getData("application/drag-key")
    const dropTarget = event.target
    const draggedItem = this.element.querySelector(`[data-content-block-id='${data}']`);
    const positionComparison = dropTarget.compareDocumentPosition(draggedItem)
    if ( positionComparison & 4) {
      event.target.closest('.content-block').insertAdjacentElement('beforebegin', draggedItem);
    } else if ( positionComparison & 2) {
      event.target.closest('.content-block').insertAdjacentElement('afterend', draggedItem);
    }
    event.preventDefault()
  }

  dragend(event) {
    var rows = event.target.closest('#contentBlocks');
    var row = rows.getElementsByClassName('content-block');
    var new_positions = [];
    for (var i=0; i < row.length; i++) {
      new_positions.push( parseInt( row[i].getAttribute('data-content-block-id'), 10 ) );
    }

    $.ajax({
      url: event.target.closest('.content-block').getAttribute('data-url'),
      type: "PATCH",
      data: { new_positions: new_positions }
    })
  }
}
