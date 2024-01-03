"use strict";
// serverApp.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerApp = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const database_1 = require("./config/database");
const user_routes_1 = require("./modules/user/interface/routes/user.routes");
const admin_routes_1 = require("./modules/admin/interface/routes/admin.routes");
const socketService_1 = require("./services/socketService");
class ServerApp {
    constructor(app) {
        this.port = process.env.PORT;
        this.app = app;
        this.server = http_1.default.createServer(this.app);
        this.socketService = socketService_1.SocketService.getInstance();
        this.socketService.setUpSocketIo(this.server);
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
        (0, database_1.mongo)();
    }
    initializeMiddlewares() {
        const limiter = (0, express_rate_limit_1.default)({
            windowMs: 15 * 60 * 1000,
            max: 1000,
        });
        const corsOptions = {
            origin: ["https://cric-connect.netlify.app", 'http://localhost:4200', "https://cric.uno"],
            optionsSuccessStatus: 200,
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
            credentials: true, // This allows session cookies to be sent back and forth
            allowedHeaders: ["Content-Type", "Authorization"],
        };
        this.app.use((0, cors_1.default)(corsOptions));
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use(express_1.default.json());
        this.app.use(limiter);
    }
    initializeRoutes() {
        this.app.use("/user", user_routes_1.userRoutes);
        this.app.use("/admin", admin_routes_1.adminRoutes);
        // Catch-all route handler for invalid routes
        this.app.use((_req, res) => {
            res.status(404).json({ error: "Not Found" });
        });
    }
    initializeErrorHandling() {
        this.app.use((err, _req, res) => {
            console.error("Error:", err.message);
            res.status(500).json({ error: "Internal Server Error" });
        });
    }
    startServer() {
        this.server.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port}`);
        });
    }
}
exports.ServerApp = ServerApp;
