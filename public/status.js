// fetch the /api/status endpoint
// and display the result in the #status div
// (see index.html)
function getStatus() {
  fetch("https://fields.wclittleleague.org/api/status")
    .then((response) => response.json())
    .then((status) => {
      if (status.isClosed) {
        document.getElementsByClassName(
          "status-message"
        )[0].innerHTML = `${status.updated} — ${status.message}`;
        // Let's make the font red and 26px;
        document.getElementsByClassName("status-message")[0].style.color =
          "red";
        document.getElementsByClassName("status-message")[0].style.fontSize =
          "26px";
      }
    });
}

getStatus();
