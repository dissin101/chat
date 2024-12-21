DOCKER_COMPOSE = docker-compose
NODE_ENV ?= development

dev:
	@NODE_ENV=development $(DOCKER_COMPOSE) up --build

prod:
	@NODE_ENV=production $(DOCKER_COMPOSE) up --build
