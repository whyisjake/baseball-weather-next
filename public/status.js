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
        )[0].innerHTML = `<h1>${status.updated} — ${status.message}</h1>`;
        // Let's make the font red and 26px;
        document.getElementsByClassName("status-message")[0].style.color =
          "red";
        document.getElementsByClassName("status-message")[0].style.fontSize =
          "26px";
        // Let's center the text, and make it bold
        document.getElementsByClassName("status-message")[0].style.textAlign =
          "center";
        document.getElementsByClassName("status-message")[0].style.fontWeight =
          "bold";
      }
    });
}

getStatus();
