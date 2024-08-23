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
Object.defineProperty(exports, "__esModule", { value: true });
exports.balance = balance;
exports.startGame = startGame;
exports.endGame = endGame;
const utils_1 = require("./utils");
const headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "bg-BG,bg;q=0.9,en-US;q=0.8,en;q=0.7",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "User-Agent": "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.6533.64 Mobile Safari/537.36"
};
function balance(token) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.request)("GET", "https://game-domain.blum.codes/api/v1/user/balance", Object.assign(Object.assign({}, headers), { "authorization": token }), false);
    });
}
function startGame(token) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.request)("POST", "https://game-domain.blum.codes/api/v1/game/play", Object.assign(Object.assign({}, headers), { "authorization": token }), false);
    });
}
function endGame(gameId, points, token) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.request)("POST", "https://game-domain.blum.codes/api/v1/game/claim", Object.assign(Object.assign({}, headers), { "Content-Type": "application/json", "authorization": token }), false, JSON.stringify({ gameId, points }));
    });
}
