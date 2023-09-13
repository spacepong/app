const socket = io("http://localhost:3000", {
  auth: {
    authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwOGNmNDNiNS0yMjBjLTRkYmQtYmFhZC1iNGJmNzUzZDlmZTgiLCJpbnRyYTQyQWNjZXNzVG9rZW4iOiI5ZTVmYTU1OWU1NjhiNmI3OGRkMDA0N2M4MTkxZGJhOTRhZWQ2N2NmMmIwZDE3NDRhM2YxMjIyZWJjYmE2NTA1IiwiaXMyZmFFbmFibGVkIjpmYWxzZSwiaXMyZmFBdXRoZW50aWNhdGVkIjpmYWxzZSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjkzNDc3OTU5fQ.26fm-mdqe2XadyJG92OVWPIwmpYyzEy7guwCrjBdGxQ",
    userId: "08cf43b5-220c-4dbd-baad-b4bf753d9fe8",
  },
});

const input = document.getElementById("input");
const messages = document.getElementById("messages");
const users = document.getElementById("users");
const rooms = document.getElementById("rooms");
const errors = document.getElementById("errors");

const handleSubmit = () => {
  socket.emit("message", {
    roomId: "29bbe4f1-052d-4807-9ae8-1a609cf96146",
    message: input.value,
  });
  input.value = "";
  input.focus();
};

socket.on("connect", () => {
  messages.innerHTML = "";
  errors.innerHTML = "";
});

socket.on("error", (err) => {
  errors.innerHTML = err.message;
});

socket.on("message", (data) => {
  errors.innerHTML = "";
  const li = document.createElement("li");
  li.innerHTML = `<b>${data.userId}:</b> ${data.message}`;
  messages.appendChild(li);
});

socket.on("users", (data) => {
  users.innerHTML = "";
  data.forEach((user) => {
    const li = document.createElement("li");
    li.innerHTML = user;
    users.appendChild(li);
  });
});
