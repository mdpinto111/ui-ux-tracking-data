(function () {
  const userActions = [];
  let pageEnterTime = Date.now();
  let currentPage = window.location.pathname; // Track current page

  // Function to log page time spent
  function logPageTimeSpent() {
    const timeSpent = ((Date.now() - pageEnterTime) / 1000).toFixed(2); // Convert to seconds
    console.log(`User spent ${timeSpent} seconds on page: ${currentPage}`);

    // Store time spent data
    userActions.push({
      type: "time_spent",
      page: currentPage,
      duration: timeSpent + " seconds",
      time: new Date().toISOString(),
    });

    // Reset the timer for the new page
    pageEnterTime = Date.now();
  }

  // Track clicks on all elements
  document.addEventListener("click", (event) => {
    const target = event.target;
    userActions.push({
      type: "click",
      tag: target.tagName,
      id: target.id || "no-id",
      class: target.className || "no-class",
      text: target.innerText?.substring(0, 50) || "no-text",
      page: currentPage,
      time: new Date().toISOString(),
    });
    console.log("User Click:", userActions[userActions.length - 1]);
  });

  // Track keypresses
  document.addEventListener("keydown", (event) => {
    userActions.push({
      type: "keypress",
      key: event.key,
      page: currentPage,
      time: new Date().toISOString(),
    });
    console.log("Key Pressed:", event.key);
  });

  // Track mouse movements (Optional: Can be removed)
  document.addEventListener("mousemove", (event) => {
    userActions.push({
      type: "mousemove",
      x: event.clientX,
      y: event.clientY,
      page: currentPage,
      time: new Date().toISOString(),
    });
  });

  // Detect navigation changes (for Single Page Applications - SPA)
  const observer = new MutationObserver(() => {
    if (window.location.pathname !== currentPage) {
      logPageTimeSpent(); // Log time spent on the previous page
      currentPage = window.location.pathname; // Update current page
      console.log(`User navigated to: ${currentPage}`);
    }
  });

  observer.observe(document, { childList: true, subtree: true });

  // Track page unload (for normal navigation)
  window.addEventListener("beforeunload", () => {
    logPageTimeSpent(); // Log time before user leaves
  });

  console.log("User behavior tracking initialized...");
})();
