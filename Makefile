COMPOSE = docker compose

up:
	$(COMPOSE) up -d

dev:
	$(COMPOSE) up --build

down: 
	$(COMPOSE) down

build:
	$(COMPOSE) build

logs: 
	$(COMPOSE) logs -f

clean:
	$(COMPOSE) down --rmi all --volumes --remove-orphans

run-without-docker:
	@echo "Starting Backend (Flask) in the background..."
	cd backend && .venv/bin/python app.py &
	@echo "Starting Frontend (React)..."
	cd frontend && npm start