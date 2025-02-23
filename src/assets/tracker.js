// Get all possible events from window and document
const allEvents = new Set();

let flow = { x: [], y: null };

// Collect all event names that start with "on"
for (let key in window) {
  if (key.startsWith("on")) {
    allEvents.add(key.slice(2));
  }
}

for (let key in document) {
  if (key.startsWith("on")) {
    allEvents.add(key.slice(2));
  }
}

// Function to log the event details
const handleEvent = (event) => {
  const obj = {
    type: event.type,
    currentTarget: event.currentTarget,
    fromElement: event.fromElement,
    relatedTarget: event.relatedTarget,
    returnValue: event.returnValue ? event.returnValue : null,
    srcElement: event.srcElement,
    target: event.target,
    toElement: event.toElement,
    type: event.type,
  };

  if (event.type == "click" && event.srcElement.tagName == "BUTTON") {
    flow.y = obj;
    console.log(flow);
    flow.x = [];
  } else {
    flow.x.push(obj);
  }
};

// Attach event listeners to track all user events
allEvents.forEach((eventType) => {
  document.addEventListener(eventType, handleEvent, {
    capture: true,
    passive: true,
  });
});

console.log("🔍 Tracking all user events...");
