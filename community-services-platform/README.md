# Sistema de Contratação de Serviços Comunitários

Sistema web completo para conectar prestadores de serviços e clientes em comunidades locais.

## 🚀 Tecnologias Utilizadas

### Backend
- **Java 17** com **Spring Boot 3.1.5**
- **Spring Cloud Gateway** para API Gateway
- **Spring Security** com **JWT** para autenticação
- **Spring Data JPA** com **PostgreSQL**
- **Maven** para gerenciamento de dependências

### Frontend
- **React 18** com **Material-UI 5**
- **Redux Toolkit** para gerenciamento de estado
- **React Router 6** para navegação
- **Axios** para requisições HTTP
- **React Hook Form** para formulários

### Infraestrutura
- **Docker** e **Docker Compose**
- **PostgreSQL 15** como banco de dados
- **Nginx** para servir o frontend

## 🏗️ Arquitetura

O sistema segue uma arquitetura de microsserviços com os seguintes componentes:

1. **API Gateway** (porta 8080) - Ponto de entrada único para todas as requisições
2. **Auth Service** (porta 8081) - Serviço de autenticação e autorização
3. **User Service** (porta 8082) - Gerenciamento de usuários
4. **Service Service** (porta 8083) - Gerenciamento de serviços
5. **Rating Service** (porta 8084) - Sistema de avaliações
6. **Payment Service** (porta 8085) - Processamento de pagamentos
7. **Frontend** (porta 3000) - Interface do usuário em React

## 📋 Pré-requisitos

- Docker e Docker Compose instalados
- Git para clonar o repositório
- (Opcional) Java 17 e Node.js 18 para desenvolvimento local

## 🛠️ Instalação e Execução

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd community-services-platform
```

### 2. Execute com Docker Compose

```bash
cd docker
docker-compose up -d
```

Este comando irá:
- Baixar todas as imagens necessárias
- Construir os microsserviços e o frontend
- Iniciar o banco de dados PostgreSQL
- Criar as tabelas e inserir dados de exemplo
- Iniciar todos os serviços

### 3. Acesse o sistema

- Frontend: http://localhost:3000
- API Gateway: http://localhost:8080
- Documentação da API: http://localhost:8080/swagger-ui.html (quando implementado)

## 🔑 Credenciais de Teste

### Cliente
- Email: `cliente@teste.com`
- Senha: `senha123`

### Prestador de Serviços
- Email: `prestador@teste.com`
- Senha: `senha123`

### Administrador
- Email: `admin@sistema.com`
- Senha: `senha123`

## 📁 Estrutura do Projeto

```
community-services-platform/
├── backend/
│   ├── api-gateway/         # API Gateway com Spring Cloud Gateway
│   ├── auth-service/        # Serviço de autenticação
│   ├── user-service/        # Serviço de usuários
│   ├── service-service/     # Serviço de gerenciamento de serviços
│   ├── rating-service/      # Serviço de avaliações
│   └── payment-service/     # Serviço de pagamentos
├── frontend/                # Aplicação React
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── services/       # Serviços de API
│   │   ├── store/          # Redux store
│   │   └── utils/          # Funções utilitárias
│   └── public/             # Arquivos públicos
├── docker/
│   ├── docker-compose.yml   # Configuração do Docker Compose
│   └── init-db/            # Scripts SQL de inicialização
└── docs/                   # Documentação adicional
```

## 🔧 Desenvolvimento

### Backend (Spring Boot)

Para desenvolver um microsserviço específico:

```bash
cd backend/auth-service
./mvnw spring-boot:run
```

### Frontend (React)

```bash
cd frontend
npm install
npm start
```

## 📊 Banco de Dados

O sistema utiliza PostgreSQL com as seguintes tabelas principais:

- `usuarios` - Informações básicas de todos os usuários
- `prestadores` - Informações específicas dos prestadores
- `categorias_servico` - Categorias de serviços disponíveis
- `servicos` - Serviços solicitados/prestados
- `avaliacoes` - Avaliações entre usuários
- `pagamentos` - Informações de pagamentos
- `notificacoes` - Notificações do sistema

## 🔒 Segurança

- Autenticação via JWT tokens
- Senhas criptografadas com BCrypt
- CORS configurado para o frontend
- Validação de dados em todas as entradas
- Proteção contra SQL Injection via JPA

## 🚧 Funcionalidades Implementadas

### Para Clientes
- ✅ Cadastro e login
- ✅ Visualizar categorias de serviços
- ✅ Buscar prestadores
- 🚧 Solicitar serviços
- 🚧 Avaliar prestadores
- 🚧 Realizar pagamentos

### Para Prestadores
- ✅ Cadastro e login
- 🚧 Criar perfil profissional
- 🚧 Gerenciar serviços oferecidos
- 🚧 Aceitar/recusar solicitações
- 🚧 Visualizar avaliações

### Para Administradores
- 🚧 Gerenciar usuários
- 🚧 Gerenciar categorias
- 🚧 Visualizar relatórios
- 🚧 Moderar conteúdo

## 📝 Variáveis de Ambiente

As principais variáveis de ambiente estão configuradas no `docker-compose.yml`:

- `DB_HOST`, `DB_PORT`, `DB_NAME` - Configurações do banco de dados
- `DB_USER`, `DB_PASSWORD` - Credenciais do banco
- `JWT_SECRET` - Chave secreta para tokens JWT
- `REACT_APP_API_URL` - URL da API para o frontend

## 🐛 Troubleshooting

### Erro ao conectar ao banco de dados
- Verifique se o PostgreSQL está rodando: `docker ps`
- Verifique os logs: `docker logs community-services-postgres`

### Frontend não carrega
- Limpe o cache do navegador
- Verifique o console do navegador para erros
- Certifique-se que a API está rodando

### Erro de autenticação
- Verifique se o token JWT não expirou
- Tente fazer logout e login novamente

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 👥 Contribuindo

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para suporte, envie um email para suporte@servicoscomunitarios.com.br ou abra uma issue no GitHub. 