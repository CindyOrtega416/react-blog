const io = require("socket.io")(5100, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
        allowedHeaders: ["access-token"],
    },
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) && // if user.some and for each user inside, if user.userId === this userId, we can add this user
    users.push({userId, socketId})
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
    // if the user's socketId is not equal to this socket id, our new users array
    // will be equal to this new filter
}

const getUser = (userId) => {
    return users.find(user => user.userId === userId)
};

io.on("connection", (socket) => {
    //when connect
    console.log("a user connected.")

    // take userId and socketId from user
    socket.on("addUser", userId => {
        addUser(userId, socket.id)
        io.emit("getUsers", users)
    });

    //send and get message
    socket.on("sendMessage", ({senderId, receiverId, text}) => {
        const user = getUser(receiverId);
        io.to(user.socketId).emit("getMessage", {
            senderId,
            text,
        });
    });

    //when disconnect
    socket.on("disconnect", () => {
        console.log("a user disconnected!")
        // after this, remove user from users array
        removeUser(socket.id);
        io.emit("getUsers", users)
    })
})