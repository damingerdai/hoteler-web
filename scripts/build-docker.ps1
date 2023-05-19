$sha = (git re-parse HEAD)
docker build -t hoteler-web:$sha .
