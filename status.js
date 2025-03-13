// export baseball field status.
module.exports = {
  isClosed: true,
  updated: "",
  message: "",
  shortMessage: "",
  checkFieldStatus: function () {
    const now = new Date("3/12/25");
    this.updated = now.toLocaleDateString("en-US");

    if (this.isClosed) {
      this.message = "The fields are closed.";
      this.shortMessage = "Closed";
    } else {
      this.isClosed = false;
      this.message = "The fields are open.";
      this.shortMessage = "Open";
    }
  },
};

// Call the function to set the initial status
module.exports.checkFieldStatus();
