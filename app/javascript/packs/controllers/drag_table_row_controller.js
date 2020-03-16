// Based on: https://johnbeatty.co/2018/03/09/stimulus-js-tutorial-how-do-i-drag-and-drop-items-in-a-list/

console.log("SynapseUiDragTableRowController.js")

import { Controller } from "stimulus"
export default class extends Controller {
  connect() {
    console.log("Drag and drop for table rows...")
  }

  dragstart(event) {
    event.dataTransfer.setData("application/drag-key", event.target.getAttribute("data-table-row-id"))
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
    const draggedItem = this.element.querySelector(`[data-table-row-id='${data}']`);
    const positionComparison = dropTarget.compareDocumentPosition(draggedItem)
    if ( positionComparison & 4) {
      event.target.closest('tr').insertAdjacentElement('beforebegin', draggedItem);
    } else if ( positionComparison & 2) {
      event.target.closest('tr').insertAdjacentElement('afterend', draggedItem);
    }
    event.preventDefault()
  }

  dragend(event) {
    var rows = event.target.closest('tbody');
    var row = rows.getElementsByTagName('tr');
    var new_rows = [];
    for (var i=0; i < row.length; i++) {
      new_rows.push( parseInt( row[i].getAttribute('data-table-row-id'), 10 ) );
    }

    $.ajax({
      url: event.target.closest('table').getAttribute('data-url'),
      type: "PATCH",
      data: { new_rows: new_rows }
    })
  }
}
