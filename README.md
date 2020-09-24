# Sort Racer

This is a game of sorts (pun definitely intended) wherein the goal is to sort your stack of colored balls faster than your opponent. 

## Build/run server Docker image

From the root directory, execute `docker build --no-cache --tag sort-racer-server:latest -f server/Dockerfile .` to build.
To run the server from Docker, execute `docker run --rm -p 80:80 sort-racer-server:latest`.