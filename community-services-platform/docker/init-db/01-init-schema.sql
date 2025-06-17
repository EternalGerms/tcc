-- Criação das tabelas do sistema de contratação de serviços

-- Tabela de usuários (base para Cliente, Prestador e Administrador)
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('cliente', 'prestador', 'admin')),
    telefone VARCHAR(20),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ativo BOOLEAN DEFAULT TRUE
);

-- Tabela específica para prestadores
CREATE TABLE prestadores (
    usuario_id INTEGER PRIMARY KEY REFERENCES usuarios(id) ON DELETE CASCADE,
    especialidade VARCHAR(255),
    descricao TEXT,
    foto_perfil VARCHAR(500)
);

-- Tabela de categorias de serviços
CREATE TABLE categorias_servico (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT,
    icone VARCHAR(100)
);

-- Tabela de serviços
CREATE TABLE servicos (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    prestador_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    categoria_id INTEGER REFERENCES categorias_servico(id),
    descricao TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'aceito', 'concluido', 'cancelado')),
    data_solicitacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_conclusao TIMESTAMP,
    valor DECIMAL(10,2)
);

-- Tabela de avaliações
CREATE TABLE avaliacoes (
    id SERIAL PRIMARY KEY,
    servico_id INTEGER REFERENCES servicos(id) ON DELETE CASCADE,
    autor_id INTEGER REFERENCES usuarios(id),
    destinatario_id INTEGER REFERENCES usuarios(id),
    nota INTEGER NOT NULL CHECK (nota >= 1 AND nota <= 5),
    comentario TEXT,
    data_avaliacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de pagamentos
CREATE TABLE pagamentos (
    id SERIAL PRIMARY KEY,
    servico_id INTEGER REFERENCES servicos(id) ON DELETE CASCADE,
    cliente_id INTEGER REFERENCES usuarios(id),
    valor DECIMAL(10,2) NOT NULL,
    data_pagamento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'retido', 'liberado', 'cancelado'))
);

-- Tabela de notificações
CREATE TABLE notificacoes (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    mensagem TEXT NOT NULL,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    lida BOOLEAN DEFAULT FALSE
);

-- Índices para melhor performance
CREATE INDEX idx_servicos_cliente ON servicos(cliente_id);
CREATE INDEX idx_servicos_prestador ON servicos(prestador_id);
CREATE INDEX idx_servicos_categoria ON servicos(categoria_id);
CREATE INDEX idx_servicos_status ON servicos(status);
CREATE INDEX idx_avaliacoes_destinatario ON avaliacoes(destinatario_id);
CREATE INDEX idx_notificacoes_usuario ON notificacoes(usuario_id);
CREATE INDEX idx_notificacoes_lida ON notificacoes(lida);

-- Inserir categorias padrão
INSERT INTO categorias_servico (nome, descricao, icone) VALUES
('Manutenção Residencial', 'Reparos e manutenção em residências', 'tools'),
('Limpeza', 'Serviços de limpeza doméstica e comercial', 'cleaning'),
('Jardinagem', 'Cuidados com jardins e áreas verdes', 'grass'),
('Pintura', 'Serviços de pintura residencial e comercial', 'brush'),
('Elétrica', 'Instalações e reparos elétricos', 'bolt'),
('Hidráulica', 'Serviços de encanamento e hidráulica', 'water'),
('Marcenaria', 'Móveis e trabalhos em madeira', 'hammer'),
('Alvenaria', 'Construção e reformas', 'home'),
('Transporte', 'Serviços de transporte e mudanças', 'truck'),
('Outros', 'Outros serviços gerais', 'more'); 