# Makefile para Sistema de Contratação de Serviços Comunitários

.PHONY: help build up down restart logs clean install-deps dev-backend dev-frontend test

# Cores para output
GREEN  := $(shell tput -Txterm setaf 2)
YELLOW := $(shell tput -Txterm setaf 3)
WHITE  := $(shell tput -Txterm setaf 7)
RESET  := $(shell tput -Txterm sgr0)

# Alvo padrão
help:
	@echo '${GREEN}Sistema de Contratação de Serviços Comunitários${RESET}'
	@echo ''
	@echo 'Uso:'
	@echo '  ${YELLOW}make${RESET} ${GREEN}<comando>${RESET}'
	@echo ''
	@echo 'Comandos disponíveis:'
	@echo '  ${YELLOW}build${RESET}          Constrói todas as imagens Docker'
	@echo '  ${YELLOW}up${RESET}             Inicia todos os serviços'
	@echo '  ${YELLOW}down${RESET}           Para todos os serviços'
	@echo '  ${YELLOW}restart${RESET}        Reinicia todos os serviços'
	@echo '  ${YELLOW}logs${RESET}           Mostra logs de todos os serviços'
	@echo '  ${YELLOW}clean${RESET}          Remove containers, volumes e imagens'
	@echo '  ${YELLOW}install-deps${RESET}   Instala dependências do frontend'
	@echo '  ${YELLOW}dev-backend${RESET}    Inicia apenas backend e banco de dados'
	@echo '  ${YELLOW}dev-frontend${RESET}   Inicia o frontend em modo desenvolvimento'
	@echo '  ${YELLOW}test${RESET}           Executa testes'

# Construir todas as imagens
build:
	@echo '${GREEN}Construindo imagens Docker...${RESET}'
	cd docker && docker-compose build

# Iniciar todos os serviços
up:
	@echo '${GREEN}Iniciando todos os serviços...${RESET}'
	cd docker && docker-compose up -d
	@echo '${GREEN}Serviços iniciados!${RESET}'
	@echo 'Frontend: http://localhost:3000'
	@echo 'API Gateway: http://localhost:8080'

# Parar todos os serviços
down:
	@echo '${YELLOW}Parando todos os serviços...${RESET}'
	cd docker && docker-compose down

# Reiniciar todos os serviços
restart: down up

# Mostrar logs
logs:
	cd docker && docker-compose logs -f

# Limpar tudo
clean:
	@echo '${YELLOW}Limpando containers, volumes e imagens...${RESET}'
	cd docker && docker-compose down -v --rmi all

# Instalar dependências do frontend
install-deps:
	@echo '${GREEN}Instalando dependências do frontend...${RESET}'
	cd frontend && npm install

# Desenvolvimento - apenas backend
dev-backend:
	@echo '${GREEN}Iniciando backend e banco de dados...${RESET}'
	cd docker && docker-compose up -d postgres api-gateway auth-service

# Desenvolvimento - frontend
dev-frontend:
	@echo '${GREEN}Iniciando frontend em modo desenvolvimento...${RESET}'
	cd frontend && npm start

# Executar testes
test:
	@echo '${GREEN}Executando testes...${RESET}'
	@echo '${YELLOW}Testes ainda não implementados${RESET}' 