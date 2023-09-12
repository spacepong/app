const socket = io("http://localhost:3000");

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
