  class Queue {
    constructor() {
      this.items = [];
    }

    // Enqueue: add element to the rear
    enqueue(element) {
      this.items.push(element);
    }

    // Dequeue: remove and return front element (FIFO)
    dequeue() {
      if (this.isEmpty()) return null;
      return this.items.shift();
    }

    // Front: return front element without removing
    front() {
      if (this.isEmpty()) return null;
      return this.items[0];
    }

    // isEmpty: check if queue has no elements
    isEmpty() {
      return this.items.length === 0;
    }

    // size: returns number of elements
    size() {
      return this.items.length;
    }

    // get all items (for display)
    getAllItems() {
      return [...this.items];
    }

    // clear all elements
    clear() {
      this.items = [];
    }
  }

  // ---------- UI Controller ----------
  const queue = new Queue();

  // DOM elements
  const queueContainer = document.getElementById('queueContainer');
  const sizeSpan = document.getElementById('sizeValue');
  const frontSpan = document.getElementById('frontValue');
  const isEmptySpan = document.getElementById('isEmptyStatus');
  const statusTextSpan = document.getElementById('statusText');
  const valueInput = document.getElementById('valueInput');

  // Helper: update all UI (render queue, stats, front, empty status)
  function updateUI() {
    // Render queue items
    const items = queue.getAllItems();
    const size = queue.size();
    const isEmpty = queue.isEmpty();
    const frontElem = queue.front();

    // update stats
    sizeSpan.innerText = size;
    if (!isEmpty && frontElem !== null && frontElem !== undefined) {
      frontSpan.innerText = typeof frontElem === 'object' ? JSON.stringify(frontElem) : String(frontElem);
    } else {
      frontSpan.innerText = '—';
    }
    isEmptySpan.innerText = isEmpty ? 'Yes' : 'No';

    // Render visual queue
    if (isEmpty) {
      queueContainer.innerHTML = `<div class="empty-queue-placeholder"><i class="fas fa-inbox"></i> Queue is empty — enqueue some elements</div>`;
      return;
    }

    // Build items with index and visual representation
    queueContainer.innerHTML = '';
    items.forEach((item, idx) => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'queue-item';
      // display value (handle different types gracefully)
      let displayValue = (item === null || item === undefined) ? 'null' : item;
      if (typeof displayValue === 'object') {
        try {
          displayValue = JSON.stringify(displayValue);
          if (displayValue.length > 18) displayValue = displayValue.slice(0, 15) + '…';
        } catch(e) { displayValue = 'Object'; }
      } else {
        displayValue = String(displayValue);
        if (displayValue.length > 20) displayValue = displayValue.slice(0, 18) + '…';
      }
      
      itemDiv.innerHTML = `
        <div class="item-value">${escapeHtml(displayValue)}</div>
        <div class="item-index">#${idx}</div>
      `;
      // Additional tooltip if needed
      itemDiv.title = `Index: ${idx} | Value: ${displayValue}`;
      queueContainer.appendChild(itemDiv);
    });
    // Auto-scroll to show newest element (rear)
    if (queueContainer.scrollWidth > queueContainer.clientWidth) {
      queueContainer.scrollLeft = queueContainer.scrollWidth;
    }
  }

  // simple escape to prevent XSS
  function escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
      if (m === '&') return '&amp;';
      if (m === '<') return '&lt;';
      if (m === '>') return '&gt;';
      return m;
    }).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, function(c) {
      return c;
    });
  }

  // set status message (auto clears style after 2.5 sec but keeps last operation? we preserve until next)
  let statusTimeout = null;
  function setStatusMessage(message, isError = false) {
    if (statusTimeout) clearTimeout(statusTimeout);
    const statusIcon = document.querySelector('#statusMessage i');
    statusTextSpan.innerText = message;
    if (isError) {
      statusTextSpan.style.color = '#b91c1c';
      if(statusIcon) statusIcon.style.color = '#ef4444';
      document.getElementById('statusMessage').style.borderLeftColor = '#ef4444';
    } else {
      statusTextSpan.style.color = '#1e293b';
      if(statusIcon) statusIcon.style.color = '#3b82f6';
      document.getElementById('statusMessage').style.borderLeftColor = '#3b82f6';
    }
    // auto revert error style after 2.5 sec? but keep message non-error default but we reset after next action anyway
    statusTimeout = setTimeout(() => {
      if (!isError) {
        // do not reset good messages aggressively, but we won't revert color fully because next action updates.
      } else {
        // revert border color after some time, but not mandatory
        document.getElementById('statusMessage').style.borderLeftColor = '#3b82f6';
        if(statusIcon) statusIcon.style.color = '#3b82f6';
        statusTextSpan.style.color = '#1e293b';
      }
    }, 2800);
  }

  // enqueue action
  function enqueueHandler() {
    let rawValue = valueInput.value;
    if (rawValue.trim() === "") {
      setStatusMessage("Cannot enqueue empty value. Please enter text or number.", true);
      return;
    }
    // preserve data type: try to parse number if possible, else keep string
    let finalValue = rawValue.trim();
    // if it looks like a number (integer/float) convert to number for clarity
    if (!isNaN(finalValue) && finalValue !== "") {
      // check if it's a valid number (excluding empty strings)
      let num = Number(finalValue);
      if (!isNaN(num) && finalValue !== "") {
        finalValue = num;
      }
    }
    queue.enqueue(finalValue);
    updateUI();
    setStatusMessage(`Enqueued: ${typeof finalValue === 'number' ? finalValue : `"${finalValue}"`} | Queue size: ${queue.size()}`);
    valueInput.value = "";
    valueInput.focus();
  }

  // dequeue action
  function dequeueHandler() {
    if (queue.isEmpty()) {
      setStatusMessage("Cannot dequeue: Queue is empty (underflow)", true);
      return;
    }
    const dequeuedItem = queue.dequeue();
    updateUI();
    let displayVal = (dequeuedItem === null || dequeuedItem === undefined) ? 'null' : dequeuedItem;
    if (typeof displayVal === 'object') displayVal = JSON.stringify(displayVal);
    setStatusMessage(`Dequeued: ${escapeHtml(String(displayVal))} | New size: ${queue.size()}`);
  }

  // front / peek
  function frontHandler() {
    if (queue.isEmpty()) {
      setStatusMessage("Front peek: Queue is empty (no front element)", true);
      return;
    }
    const frontItem = queue.front();
    let displayFront = (frontItem === null || frontItem === undefined) ? 'null' : frontItem;
    if (typeof displayFront === 'object') displayFront = JSON.stringify(displayFront);
    setStatusMessage(`Front element: ${escapeHtml(String(displayFront))} (not removed)`);
  }

  // clear queue
  function clearHandler() {
    if (queue.isEmpty()) {
      setStatusMessage("Queue already empty. Nothing to clear.", false);
      return;
    }
    queue.clear();
    updateUI();
    setStatusMessage("Queue cleared completely. All items removed.");
  }

  // add sample dataset (3 interesting elements)
  function addSampleHandler() {
    const samples = [42, "Hello Queue", "FIFO", 1001];
    // we add only up to 4 samples, but not to overflow UI, just append
    for (let sample of samples) {
      queue.enqueue(sample);
    }
    updateUI();
    setStatusMessage(`Added 4 sample elements: 42, 1001 | Size: ${queue.size()}`);
  }

  // optional: handle Enter key on input
  function initEventListeners() {
    document.getElementById('enqueueBtn').addEventListener('click', enqueueHandler);
    document.getElementById('dequeueBtn').addEventListener('click', dequeueHandler);
    document.getElementById('frontBtn').addEventListener('click', frontHandler);
    document.getElementById('clearBtn').addEventListener('click', clearHandler);
    document.getElementById('sampleBtn').addEventListener('click', addSampleHandler);
    
    valueInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        enqueueHandler();
      }
    });
  }

  // initial render (empty queue)
  function init() {
    initEventListeners();
    updateUI();
    // optional: start with some data to show the power? but we prefer empty start to demonstrate from scratch, but comment: maybe show example but default empty
    // To make first impression lively, add one info item? but spec: implement ADT, empty is fine.
    // However adding an info message not needed. Keep empty but show interactive.
    setStatusMessage("Queue ADT ready! Use enqueue, dequeue, front, clear & sample.");
  }
  
  init();