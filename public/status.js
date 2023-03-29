// fetch the /api/status endpoint
// and display the result in the #status div
// (see index.html)
function getStatus() {
  fetch("https://fields.wclittleleague.org/api/status")
    .then((response) => response.json())
    .then((status) => {
      if (status.isClosed) {
        document.getElementById(
          "status"
        ).innerHTML = `${status.updated} — ${status.message}`;
      }
    });
}

getStatus();
