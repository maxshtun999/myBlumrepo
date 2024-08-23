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
const bloom_1 = require("./bloom");
const utils_1 = require("./utils");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const authToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoYXNfZ3Vlc3QiOmZhbHNlLCJ0eXBlIjoiQUNDRVNTIiwiaXNzIjoiYmx1bSIsInN1YiI6IjIxN2IwNjA1LTZmZGYtNDg3NS1hZmE1LWRlODcyOTMxYjdkYyIsImV4cCI6MTcyNDQyMzUzNiwiaWF0IjoxNzI0NDE5OTM2fQ.Mh1aHsFc_EGX1sekZ6I54W7dFbnkZaOD9YMg2og-sBU";
    const minReward = 160;
    const maxReward = 190;
    try {
        let balanceResponse = yield (0, bloom_1.balance)(authToken);
        if (!balanceResponse) {
            console.log("Update token");
            return;
        }
        if (balanceResponse.playPasses <= 0) {
            console.log("You don't have enough tickets to farm");
            return;
        }
        for (let i = 0; i < balanceResponse.playPasses; i++) {
            console.log(`Current ticket balance ${balanceResponse.playPasses - i}`);
            let points = (0, utils_1.generateRandomNumber)(minReward, maxReward);
            let { gameId } = yield (0, bloom_1.startGame)(authToken);
            if (!gameId) {
                console.log("Update token");
                return;
            }
            let timeout = (0, utils_1.generateRandomNumber)(30, 37);
            yield (0, utils_1.sleep)(timeout);
            let claimStatus = yield (0, bloom_1.endGame)(gameId, points, authToken);
            if (!claimStatus || claimStatus !== "OK") {
                console.log("Update token", "Claim status is invalid", claimStatus);
                return;
            }
        }
        console.log("Finished");
    }
    catch (e) {
        console.log(e);
        console.log("Update token");
    }
}))();
