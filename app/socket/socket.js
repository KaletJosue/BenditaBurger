let io;

export const setSocket = (serverIO) => {
    io = serverIO
}

export const getSocket = () => {
    return io
}