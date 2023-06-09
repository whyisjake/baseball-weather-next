// fetch the /api/status endpoint
// and display the result in the #status div
// (see index.html)
function getFields() {
  // if we are on localhost, we need to use the testing domain.
  let domain = window.location.hostname;
  let proxy = "https";
  if (domain === "localhost") {
    domain = "localhost:3000";
    proxy = "http";
  } else {
    domain = "fields.wclittleleague.org";
  }
  // Let's get the status.
  fetch(`${proxy}://${domain}/api/status`)
    .then((response) => response.json())
    .then((status) => {
      if (status.isClosed) {
        // Let's get all of the fields.
        fetch("https://fields.wclittleleague.org/api/fields")
          .then((response) => response.json())
          .then((fields) => {
            // Create a table.
            // We'll start with a div and append the table to the div.
            let div = document.createElement("div");
            div.setAttribute("class", "tableWrapper");

            let table = document.createElement("table");
            table.setAttribute("class", "table table-striped");

            table.setAttribute("border", "1");
            table.setAttribute("cellpadding", "0");
            table.setAttribute("cellspacing", "0");
            table.style.width = "100%";

            // We have three column headers: Field, division, and status.
            let headers = ["Field", "Division", "Status"];
            // Create the table header.
            let thead = document.createElement("thead");
            // Create a row.
            let tr = document.createElement("tr");
            // For each header, let's create a table header.
            headers.forEach((header) => {
              let th = document.createElement("th");
              // Add five pixels of padding.
              th.style.padding = "5px";
              // Add a grey background.
              th.style.backgroundColor = "#e9ecef";
              th.innerHTML = header;
              tr.appendChild(th);
            });

            // Append the row to the table header.
            thead.appendChild(tr);
            // Append the table header to the table.
            table.appendChild(thead);

            // Create a table body.
            let tbody = document.createElement("tbody");
            // For each field, let's get the status.
            // Fields is an object. Loop through the keys and get the values.
            Object.keys(fields).forEach((key) => {
              // Create a row.
              let tr = document.createElement("tr");
              tr.style.padding = "5px";
              // Create a cell for the field name.
              let td = document.createElement("td");
              td.style.padding = "5px";
              td.setAttribute("colspan", "3");
              td.style.fontWeight = "bold";

              // Build an anchor tag.
              let anchor = `<a href="https://fields.wclittleleague.org/field/${key}">${fields[key].name} &rarr;</a>`;

              td.innerHTML = anchor;
              tr.appendChild(td);
              tbody.appendChild(tr);

              // Inside of each object is an array of fields. Loop through the array with a for loop.
              for (let i = 0; i < fields[key].fields.length; i++) {
                // Create a row.
                let tr = document.createElement("tr");
                tr.style.padding = "5px";
                // Create a cell for the field name.
                let td = document.createElement("td");
                td.style.padding = "5px";
                td.innerHTML = fields[key].fields[i].name;
                tr.appendChild(td);
                // Create a cell for the division.
                td = document.createElement("td");
                td.style.padding = "5px";
                td.innerHTML = fields[key].fields[i].division;
                tr.appendChild(td);
                // Create a cell for the status.
                td = document.createElement("td");
                td.style.padding = "5px";
                td.innerHTML = status.shortMessage;
                // Let's make the message red;
                td.style.color = "red";
                tr.appendChild(td);
                // Append the row to the table body.
                tbody.appendChild(tr);
              }
            });
            // Append the table body to the table.
            table.appendChild(tbody);
            div.appendChild(table);
            // Append the table to the status-message div.
            document.getElementsByClassName("fields")[0].appendChild(table);
          });
      } else {
        // fetch the /api/fields endpoint
        // and display the result in the #fields div
        // (see index.html)
        fetch("https://fields.wclittleleague.org/api/fields")
          .then((response) => response.json())
          .then((fields) => {
            // Create a table.
            // We'll start with a div and append the table to the div.
            let div = document.createElement("div");
            div.setAttribute("class", "tableWrapper");

            let table = document.createElement("table");
            table.setAttribute("class", "table table-striped");

            table.setAttribute("border", "1");
            table.setAttribute("cellpadding", "0");
            table.setAttribute("cellspacing", "0");
            table.style.width = "100%";

            // We have three column headers: Field, division, and status.
            let headers = ["Field", "Division", "Status"];
            // Create the table header.
            let thead = document.createElement("thead");
            // Create a row.
            let tr = document.createElement("tr");
            // For each header, let's create a table header.
            headers.forEach((header) => {
              let th = document.createElement("th");
              // Add five pixels of padding.
              th.style.padding = "5px";
              // Add a grey background.
              th.style.backgroundColor = "#e9ecef";
              th.innerHTML = header;
              tr.appendChild(th);
            });

            // Append the row to the table header.
            thead.appendChild(tr);
            // Append the table header to the table.
            table.appendChild(thead);

            // Create a table body.
            let tbody = document.createElement("tbody");
            // For each field, let's get the status.
            // Fields is an object. Loop through the keys and get the values.
            Object.keys(fields).forEach((key) => {
              // Create a row.
              let tr = document.createElement("tr");
              // Each row should have some padding.
              tr.style.padding = "5px";

              // Create a cell for the field name.
              let td = document.createElement("td");
              td.style.padding = "5px";
              td.setAttribute("colspan", "3");
              td.innerHTML = fields[key].name;

              // Build an anchor tag.
              let anchor = `<a href="https://fields.wclittleleague.org/field/${key}">${fields[key].name} &rarr;</a>`;
              td.innerHTML = anchor;

              tr.appendChild(td);
              tbody.appendChild(tr);

              // Inside of each object is an array of fields. Loop through the array with a for loop.
              for (let i = 0; i < fields[key].fields.length; i++) {
                // Create a row.
                let tr = document.createElement("tr");
                // Create a cell for the field name.
                let td = document.createElement("td");
                td.style.padding = "5px";
                td.innerHTML = fields[key].fields[i].name;
                tr.appendChild(td);
                // Create a cell for the division.
                td = document.createElement("td");
                td.style.padding = "5px";
                td.innerHTML = fields[key].fields[i].division;
                tr.appendChild(td);
                // Create a cell for the status.
                td = document.createElement("td");
                td.style.padding = "5px";
                let fieldStatus = fields[key].fields[i].status;
                if (fieldStatus === undefined) {
                  fieldStatus = "open";
                }
                td.style.color = "green";
                td.innerHTML = fieldStatus;
                tr.appendChild(td);
                // Append the row to the table body
                tbody.appendChild(tr);
              }
            });
            // Append the table body to the table.
            table.appendChild(tbody);
            div.appendChild(table);
            // Append the table to the status-message div.
            document.getElementsByClassName("fields")[0].appendChild(table);
          });
      }
    });
}
getFields();
