
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("binForm");
  const binsInput = document.getElementById("binsInput");
  const lowBinsSection = document.getElementById("lowBinsSection");
  const entriesDiv = document.getElementById("entries");

  binsInput.addEventListener("input", () => {
    if (parseInt(binsInput.value) < 60) {
      lowBinsSection.style.display = "block";
    } else {
      lowBinsSection.style.display = "none";
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const date = document.getElementById("dateInput").value;
    const hour = document.getElementById("hourInput").value;
    const bins = binsInput.value;
    const reason = document.getElementById("reasonInput").value;
    const downtime = document.getElementById("downtimeInput").value;

    const entry = {
      date,
      hour,
      bins,
      reason: bins < 60 ? reason : "",
      downtime: bins < 60 ? downtime : ""
    };

    const entries = JSON.parse(localStorage.getItem("entries") || "[]");
    entries.push(entry);
    localStorage.setItem("entries", JSON.stringify(entries));
    renderEntries();
    form.reset();
    lowBinsSection.style.display = "none";
  });

  function renderEntries() {
    const entries = JSON.parse(localStorage.getItem("entries") || "[]");
    entriesDiv.innerHTML = entries.map(e =>
      `<div><strong>${e.date} - ${e.hour}:00</strong>: ${e.bins} bins ${e.reason ? `(Reason: ${e.reason}, Downtime: ${e.downtime}min)` : ''}</div>`
    ).join('');
  }

  renderEntries();
});
