import { Socket } from "socket.io";
import { parse } from "cookie";
import Session from "../../models/SessionModel";
import User from "../../models/UserModel";

const socket_auth_interceptor = async (socket: Socket, next: (err?: Error) => void) => {
    const cookie = socket.handshake.headers.cookie;
    if (!cookie) {
        next(new Error("Unauthorized: No token found"));
        return;
    }
    const cookie_object = parse(cookie ?? "")
    const token = cookie_object.session;
    if (!token) {
        next(new Error("Unauthorized: No token found"));
        return;
    }

    try {
        const session = await Session.findOne({ token: token });
        if (!session) {
            next(new Error("Unauthorized: No token found"));
            return;
        }
        const user = await User.findById(session.userId);
        if(!user)
        {
            next(new Error("User not found!"));
            return
        }
        socket.data.userId = session.userId;
        socket.data.username = user.username;
        next();
    }
    catch (err) {
        next(new Error("Backend Sockets Error:" + err));
    }
}

export default socket_auth_interceptor;