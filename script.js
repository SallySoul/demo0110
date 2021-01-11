// Dragable behaivor from here:
// https://www.w3schools.com/howto/howto_js_draggable.asp
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    console.log("dragMouseDown");
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

var item_count = 0;
function createItem() {
  var item_name = "item" + item_count;
  item_count += 1;

  var item_div = document.createElement('div');
  item_div.id = item_name;
  item_div.className = 'dragable';

  var item_header = document.createElement('div');
  item_header.id = item_name + "header";
  item_header.className = 'dragableheader';
  item_header.innerHTML = "Click to move " + item_name;

  var item_content = document.createElement('div');
  var item_text = document.createTextNode("Message?");
  item_content.appendChild(item_text);
  item_content.contentEditable = "true";

  item_div.appendChild(item_header);
  item_div.appendChild(item_content);
  document.getElementById("workspace").appendChild(item_div);
  dragElement(item_div);
}

window.addEventListener('load',
                        function() {
                          console.log("Initial Create");
                          createItem();
  }, false);


// event listener for keyup
function checkTabPress(e) {
  // pick passed event or global event object if passed one is empty
  e = e || event;
  var activeElement;
  console.log(document.activeElement);
  console.log(e.keyCode);
  console.log(e.keyCode);
  if (e.keyCode == 16) {
    createItem();
  }
}

document.addEventListener('keyup', checkTabPress);

console.log("Done loading script");
