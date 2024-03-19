"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userMode_1 = __importDefault(require("../server/model/userMode")); // Corrected import path
const supertest_1 = __importDefault(require("supertest"));
const globals_1 = require("@jest/globals");
const server_1 = __importDefault(require("../server"));
// import singleUser from "./constants/user";
const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWViMmMzNTk5NDQ5NjQ4MGYzYTVkMDMiLCJpYXQiOjE3MTA3NjU2NzMsImV4cCI6MTcxMzM1NzY3M30.0dXEoZQiRv9_QImcthzR810UAWDEK3Rd2KqM0pb4d_Y";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWVlZTllMTZjYTMzOWM4ZWI4ZWE2MjIiLCJpYXQiOjE3MTA3NjA0MTQsImV4cCI6MTcxMzM1MjQxNH0.7Yq6yc7U4rYMNbd3AjyOHygIcpwkr4Jq6Uz_B0ZvwS4";
const singleUser = {
    profile: "https://up.yimg.com/ib/th?id=OIP.52T8HHBWh6b0dwrG6tSpVQHaFe&%3Bpid=Api&rs=1&c=1&qlt=95&w=156&h=115",
    _id: "dummyid",
    username: "kazuba",
    email: "update",
    isAdmin: false,
    createdAt: '2024-03-08T15:23:52.134Z',
    updatedAt: '2024-03-08T16:14:14.838Z',
};
(0, globals_1.test)("Test home route", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(server_1.default).get("/");
    (0, globals_1.expect)(res.statusCode).toBe(200);
}));
(0, globals_1.test)("Test non existing route", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(server_1.default).get("/sdsdsfds");
    (0, globals_1.expect)(res.statusCode).toBe(404);
}));
(0, globals_1.describe)("Testing user registrations", () => {
    (0, globals_1.test)("Testing if user already registered", () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(userMode_1.default, "findOne").mockResolvedValueOnce({ email: "solei45l@gmail.com" });
        const user = yield (0, supertest_1.default)(server_1.default).post("/api/v1/users/auth/register").send({
            email: "solei45l@gmail.com",
            password: "testpassword",
            username: "testuser",
        });
        (0, globals_1.expect)(user.statusCode).toBe(400);
    }));
    globals_1.test.skip("Testing successful registered user", () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(userMode_1.default, "findOne").mockResolvedValueOnce({ username: "soem", password: "testpassword", email: "soem@gmail.com" });
        const user = yield (0, supertest_1.default)(server_1.default).post("/api/v1/users/auth/register").send({
            username: "soem", password: "testpassword", email: "soem@gmail.com"
        });
        (0, globals_1.expect)(user.status).toBe(201);
    }));
});
(0, globals_1.describe)("Test user login", () => {
    (0, globals_1.test)("Test user does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(userMode_1.default, "findOne").mockResolvedValueOnce(undefined);
        const user = yield (0, supertest_1.default)(server_1.default).post("/api/v1/users/auth/login").send({
            email: "test@example.com",
            password: "testpassword",
        });
        (0, globals_1.expect)(user.status).toBe(404);
    }));
    (0, globals_1.test)("Test incorrect password", () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(userMode_1.default, "findOne").mockResolvedValueOnce({ email: "admin@admin.com", password: "testpassss" });
        const user = yield (0, supertest_1.default)(server_1.default).post("/api/v1/users/auth/login").send({
            email: "admin@admin.com",
            password: "testpassword",
        });
        (0, globals_1.expect)(user.status).toBe(401);
    }));
    (0, globals_1.test)("Test success", () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(userMode_1.default, "findOne").mockResolvedValueOnce({ email: "admin@admin.com", password: "admin" });
        const user = yield (0, supertest_1.default)(server_1.default).post("/api/v1/users/auth/login").send({
            email: "admin@admin.com",
            password: "admin",
        });
        (0, globals_1.expect)(user.status).toBe(200);
    }));
});
(0, globals_1.describe)("Test Get all users", () => {
    (0, globals_1.describe)("test isAuthenticated middleware", () => {
        (0, globals_1.test)("Test if no token provided in header(isAuthenticated)", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(server_1.default).get("/api/v1/users");
            (0, globals_1.expect)(res.statusCode).toBe(401);
        }));
        (0, globals_1.test)("test for invalid token provided", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(server_1.default)
                .get("/api/v1/users")
                .set({ "Authorization": "Bearer some_token" });
            (0, globals_1.expect)(res.statusCode).toBe(401);
        }));
        (0, globals_1.test)("Test for is Authenticated but not is admin logged in", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(server_1.default)
                .get("/api/v1/users")
                .set({ "Authorization": `Bearer ${userToken}` });
            (0, globals_1.expect)(res.statusCode).toBe(401);
        }));
        (0, globals_1.describe)("Test isAdmin middleare", () => {
            (0, globals_1.test)("Test isAuthenticated and isAdmin logged in", () => __awaiter(void 0, void 0, void 0, function* () {
                const res = yield (0, supertest_1.default)(server_1.default)
                    .get("/api/v1/users")
                    .set({ "Authorization": `Bearer ${token}` });
                (0, globals_1.expect)(res.statusCode).toBe(200);
            }));
            (0, globals_1.test)('Test no users', () => __awaiter(void 0, void 0, void 0, function* () {
                globals_1.jest.spyOn(userMode_1.default, "find").mockResolvedValueOnce([]);
                const users = yield (0, supertest_1.default)(server_1.default).get("/api/v1/users").set({ "Authorization": `Bearer ${token}` });
                (0, globals_1.expect)(users.status).toBe(404);
            }), 10000);
        });
    });
});
(0, globals_1.describe)("Test Get single user", () => {
    (0, globals_1.test)('Test user not found', () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(userMode_1.default, "findById").mockResolvedValueOnce({ isAdmin: false, name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id" }).mockResolvedValueOnce(undefined);
        const users = yield (0, supertest_1.default)(server_1.default).get("/api/v1/users/userId").set({ "Authorization": `Bearer ${token}` });
        (0, globals_1.expect)(users.status).toBe(404);
    }));
    (0, globals_1.test)('Test get user success', () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(userMode_1.default, "findById").mockResolvedValueOnce({ isAdmin: false, name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id" }).mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id" });
        const users = yield (0, supertest_1.default)(server_1.default).get("/api/v1/users/userId").set({ "Authorization": `Bearer ${token}` });
        (0, globals_1.expect)(users.status).toBe(200);
    }));
});
