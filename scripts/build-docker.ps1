$sha = (git rev-parse HEAD)
docker build -t hoteler-web:$sha .
