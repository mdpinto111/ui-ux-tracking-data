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

function printObjectFields(obj, prefix = "", depth = 0, maxDepth = 3) {
  if (depth > maxDepth) return;

  for (const key in obj) {
    if (typeof obj[key] == "function") continue;
    if (prefix.includes(key)) continue;
    if (prefix.includes("currentTarget-documentElement")) continue;
    if (prefix.includes("currentTarget-doctype")) continue;
    if (prefix.includes("currentTarget-body")) continue;
    if (prefix.includes("targetfirstChild-parentNode")) continue;
    if (prefix.includes("targetfirstChild-parentElement")) continue;
    if (obj[key] == "body") continue;
    if (obj["localName"] && obj["localName"] == "body") continue;

    if (obj["doctype"] && obj["doctype"].name && obj["doctype"].name == "html")
      continue;

    const value = obj[key];
    const newKey = prefix ? `${prefix}-${key}` : key;

    if (typeof value === "object" && value !== null) {
      printObjectFields(value, newKey, depth + 1, maxDepth);
    } else {
      //console.log(`${newKey}: ${value}`);
    }
  }
}

function buildFlatObject(obj, prefix = "", depth = 0, maxDepth = 3) {
  let result = {};

  if (depth > maxDepth) return result;

  for (const key in obj) {
    if (typeof obj[key] == "function") continue;
    if (prefix.includes(key)) continue;
    if (prefix.includes("currentTarget-documentElement")) continue;
    if (prefix.includes("currentTarget-doctype")) continue;
    if (prefix.includes("currentTarget-body")) continue;
    if (prefix.includes("targetfirstChild-parentNode")) continue;
    if (prefix.includes("targetfirstChild-parentElement")) continue;
    if (obj[key] == "body") continue;
    if (obj["localName"] && obj["localName"] == "body") continue;

    if (obj["doctype"] && obj["doctype"].name && obj["doctype"].name == "html")
      continue;

    const value = obj[key];
    const newKey = prefix ? `${prefix}-${key}` : key;

    if (typeof value === "object" && value !== null) {
      Object.assign(
        result,
        buildFlatObject(value, newKey, depth + 1, maxDepth)
      );
    } else {
      result[newKey] = value;
    }
  }

  return result;
}

let fieldsValues = [];

// Function to log the event details
const handleEvent = (event) => {
  const obj = {
    currentTargetBodyId: event.currentTarget?.body?.id,
    currentTargetBodyText: event.currentTarget?.body?.innerText,
    currentTargetDocumentElementId: event.currentTarget?.documentElement?.id,
    currentTargetDocumentElementLocalName:
      event.currentTarget?.documentElement?.localName,
    type: event.type,
    currentTargetLocationUrl: event.currentTarget?.URL,
    currentTargetActiveElementInnerHTML:
      event.currentTarget?.activeElement?.innerHTML,
    currentTargetActiveElementInnerText:
      event.currentTarget?.activeElement?.innerText,
    currentTargetActiveElementNodeName:
      event.currentTarget?.activeElement?.nodeName,
    fromElement: event.fromElement,
    returnValue: event.returnValue ? event.returnValue : null,
    targetnodeName: event.target?.nodeName,
    targetname: event.target?.name,
    targetinnerText: event.target?.innerText,
    targetinnerHTML: event.target?.innerHTML,
    targetformAction: event.target?.formAction,
    targetfirstChildnodeName: event.target?.firstChild?.nodeName,
    targetclassName: event.target?.className,
    targetid: event.target.id,
  };

  let obj2 = {};

  for (const [key, value] of Object.entries(obj)) {
    if (fieldsValues[key] != undefined) {
      if (fieldsValues[key][value] != undefined) {
        obj2[key] = fieldsValues[key][value];
      } else {
        fieldsValues[key][value] = Object.keys(fieldsValues[key]).length;
      }
    } else {
      fieldsValues[key] = [];
      fieldsValues[key][value] = Object.keys(fieldsValues[key]).length;
      obj2[key] = fieldsValues[key][value];
    }
  }
  //const o = buildFlatObject(obj);
  if (event.type == "click" && event.srcElement.tagName == "BUTTON") {
    flow.y = obj2;
    //console.log(obj);
    //printObjectFields(obj);
    //console.log(flow);

    training(flow);
    flow.x = [];
  } else {
    flow.x.push(obj2);
  }
};

function training(flow) {
  let arr = [];
  flow.x.forEach((element) => {
    arr.push(Object.keys(element).map((key) => element[key]));
  });
  arr.push(Object.keys(flow.y).map((key) => flow.y[key]));

  const inputEvents = arr.slice(0, arr.length - 1).flat();

  // Your output (the last event)
  const outputEvent = arr[arr.length - 1];
  //console.log(inputEvents);
  //console.log(outputEvent);
  const xs = tf.tensor2d([inputEvents]); // shape [1, 3582] (199 events × 18)
  const ys = tf.tensor2d([outputEvent]); // shape [1, 18]

  const model = tf.sequential();

  model.add(
    tf.layers.dense({
      units: 128,
      activation: "relu",
    })
  );
  model.add(tf.layers.dense({ units: 64, activation: "relu" }));
  model.add(tf.layers.dense({ units: 18 }));

  model.compile({ optimizer: "adam", loss: "meanSquaredError" });

  (async () => {
    await model.fit(xs, ys, {
      epochs: 200,
      batchSize: 16,
    });
    console.log("✅ Model training complete!");
  })();
}

function predict(flow) {
  let arr = [];
  flow.x.forEach((element) => {
    arr.push(Object.keys(element).map((key) => element[key]));
  });
  const inputEvents = arr.slice(0, arr.length).flat();

  const res = model.predict(tf.tensor2d(inputEvents, [1, 1])).dataSync();
  console.log(res);
}
// Attach event listeners to track all user events
allEvents.forEach((eventType) => {
  document.addEventListener(eventType, handleEvent, {
    capture: true,
    passive: true,
  });
});

window.onload = function () {
  const collectAllIds = () => {
    const elementsWithId = document.querySelectorAll("[id]");
    return [...new Set([...elementsWithId].map((el) => el.id))];
  };

  const allIds = collectAllIds();
  //console.log("All IDs:", allIds);

  const collectAllClasses = () => {
    const elementsWithClass = document.querySelectorAll("[class]");
    const classSet = new Set();

    elementsWithClass.forEach((el) => {
      el.classList.forEach((cls) => classSet.add(cls));
    });

    return [...classSet];
  };

  const allClasses = collectAllClasses();
  //console.log("All Classes:", allClasses);
};
