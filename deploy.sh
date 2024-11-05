git pull
docker compose up --build -d
docker compose exec app yarn migration:run