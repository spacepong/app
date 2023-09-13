const socket = io("http://localhost:3000", {
  auth: {
    authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwOGNmNDNiNS0yMjBjLTRkYmQtYmFhZC1iNGJmNzUzZDlmZTgiLCJpbnRyYTQyQWNjZXNzVG9rZW4iOiI5ZTVmYTU1OWU1NjhiNmI3OGRkMDA0N2M4MTkxZGJhOTRhZWQ2N2NmMmIwZDE3NDRhM2YxMjIyZWJjYmE2NTA1IiwiaXMyZmFFbmFibGVkIjpmYWxzZSwiaXMyZmFBdXRoZW50aWNhdGVkIjpmYWxzZSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjkzNDc3OTU5fQ.26fm-mdqe2XadyJG92OVWPIwmpYyzEy7guwCrjBdGxQ",
  },
});

console.log(socket);

const input = document.getElementById("input");
const messages = document.getElementById("messages");
const users = document.getElementById("users");

const handleSubmit = () => {
  socket.emit("message", {
    data: input.value,
  });
  input.value = "";
};

socket.on("connect", () => {
  console.log("connected");
  messages.innerHTML = "";
  socket.emit("add-user", {
    userId: new Date().getTime().toString(),
  });
});

socket.on("message", (data) => {
  console.log(data);
  const li = document.createElement("li");
  li.innerHTML = `<b>${data.userId}:</b> ${data.message}`;
  messages.appendChild(li);
});

socket.on("users", (data) => {
  console.log(data);
  users.innerHTML = "";
  data.forEach((user) => {
    const li = document.createElement("li");
    li.innerHTML = user;
    users.appendChild(li);
  });
});
