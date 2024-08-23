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
exports.request = request;
exports.sleep = sleep;
exports.generateRandomNumber = generateRandomNumber;
const axios_1 = __importDefault(require("axios"));
const https_proxy_agent_1 = require("https-proxy-agent");
function request(method_1, path_1, headers_1) {
    return __awaiter(this, arguments, void 0, function* (method, path, headers, proxy = false, data = false, body = false, retry = true) {
        console.log(`${method} ${path}, ${retry}`);
        let requestOptions = Object.assign(Object.assign({ method: method, url: path, headers, validateStatus: () => true }, (data && { data })), (body && { body }));
        if (proxy) {
            requestOptions.httpsAgent = new https_proxy_agent_1.HttpsProxyAgent(proxy);
        }
        let response = yield axios_1.default.request(requestOptions).catch((error) => __awaiter(this, void 0, void 0, function* () {
            console.log(error);
            console.log(`request(${method}, ${path}, ${retry}) - ${error.message}`, 2);
            if (retry) {
                yield sleep(5);
                return yield request(method, path, headers, proxy, data, body, false);
            }
        }));
        if (!response) {
            return;
        }
        if (response.status !== 200) {
            if (retry) {
                yield sleep(5);
                return yield request(method, path, headers, proxy, data, body, false);
            }
            console.log(`request(${method}, ${path}, ${retry}) - ${response.status} - ${response.statusText}`);
            return;
        }
        if (response.data.error) {
            console.log(`request(${method}, ${path}, ${retry}) - ${response.data.message} - ${response.statusText}`);
            return;
        }
        return response.data;
    });
}
function sleep(seconds) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => setTimeout(resolve, seconds * 1000));
    });
}
function generateRandomNumber(min, max) {
    // Ensure min is less than max
    if (min > max) {
        [min, max] = [max, min];
    }
    // Generate and return the random number
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
