import {balance, endGame, startGame} from "./bloom";
import {generateRandomNumber, sleep} from "./utils";

(async () => {
    const authToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoYXNfZ3Vlc3QiOmZhbHNlLCJ0eXBlIjoiQUNDRVNTIiwiaXNzIjoiYmx1bSIsInN1YiI6IjIxN2IwNjA1LTZmZGYtNDg3NS1hZmE1LWRlODcyOTMxYjdkYyIsImV4cCI6MTcyNDQyMzUzNiwiaWF0IjoxNzI0NDE5OTM2fQ.Mh1aHsFc_EGX1sekZ6I54W7dFbnkZaOD9YMg2og-sBU";


    const minReward = 160;
    const maxReward = 190;

    try {
        let balanceResponse = await balance(authToken);

        if(!balanceResponse) {
            console.log("Update token");
            return;
        }

        if(balanceResponse.playPasses <= 0) {
            console.log("You don't have enough tickets to farm");
            return;
        }

        for(let i = 0; i < balanceResponse.playPasses; i++) {
            console.log(`Current ticket balance ${balanceResponse.playPasses - i}`);

            let points = generateRandomNumber(minReward, maxReward);
            let {gameId} = await startGame(authToken);
            if(!gameId) {
                console.log("Update token");
                return;
            }

            let timeout = generateRandomNumber(30, 37);
            await sleep(timeout);

            let claimStatus = await endGame(gameId, points, authToken);
            if(!claimStatus || claimStatus !== "OK") {
                console.log("Update token", "Claim status is invalid", claimStatus);
                return;
            }
        }

        console.log("Finished");
    } catch (e: any) {
        console.log(e);
        console.log("Update token");
    }
})();
