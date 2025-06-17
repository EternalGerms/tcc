-- Inserir usuários de exemplo
-- Senha criptografada para 'senha123': $2a$10$X/7.U8H8YrVJvOyWqG5kqOC7mRlJg.UJSgyYtNKh8m6LZGhJi.2yy

-- Administrador
INSERT INTO usuarios (nome, email, senha, tipo, telefone) VALUES
('Admin Sistema', 'admin@sistema.com', '$2a$10$X/7.U8H8YrVJvOyWqG5kqOC7mRlJg.UJSgyYtNKh8m6LZGhJi.2yy', 'admin', '(11) 99999-9999');

-- Clientes
INSERT INTO usuarios (nome, email, senha, tipo, telefone) VALUES
('João Cliente', 'cliente@teste.com', '$2a$10$X/7.U8H8YrVJvOyWqG5kqOC7mRlJg.UJSgyYtNKh8m6LZGhJi.2yy', 'cliente', '(11) 98888-8888'),
('Maria Silva', 'maria.silva@email.com', '$2a$10$X/7.U8H8YrVJvOyWqG5kqOC7mRlJg.UJSgyYtNKh8m6LZGhJi.2yy', 'cliente', '(11) 97777-7777'),
('Carlos Santos', 'carlos.santos@email.com', '$2a$10$X/7.U8H8YrVJvOyWqG5kqOC7mRlJg.UJSgyYtNKh8m6LZGhJi.2yy', 'cliente', '(11) 96666-6666');

-- Prestadores
INSERT INTO usuarios (nome, email, senha, tipo, telefone) VALUES
('Pedro Prestador', 'prestador@teste.com', '$2a$10$X/7.U8H8YrVJvOyWqG5kqOC7mRlJg.UJSgyYtNKh8m6LZGhJi.2yy', 'prestador', '(11) 95555-5555'),
('Ana Eletricista', 'ana.eletricista@email.com', '$2a$10$X/7.U8H8YrVJvOyWqG5kqOC7mRlJg.UJSgyYtNKh8m6LZGhJi.2yy', 'prestador', '(11) 94444-4444'),
('José Encanador', 'jose.encanador@email.com', '$2a$10$X/7.U8H8YrVJvOyWqG5kqOC7mRlJg.UJSgyYtNKh8m6LZGhJi.2yy', 'prestador', '(11) 93333-3333'),
('Fernanda Pintora', 'fernanda.pintora@email.com', '$2a$10$X/7.U8H8YrVJvOyWqG5kqOC7mRlJg.UJSgyYtNKh8m6LZGhJi.2yy', 'prestador', '(11) 92222-2222'),
('Roberto Jardineiro', 'roberto.jardineiro@email.com', '$2a$10$X/7.U8H8YrVJvOyWqG5kqOC7mRlJg.UJSgyYtNKh8m6LZGhJi.2yy', 'prestador', '(11) 91111-1111');

-- Inserir informações dos prestadores
INSERT INTO prestadores (usuario_id, especialidade, descricao, foto_perfil) VALUES
(5, 'Manutenção Geral', 'Profissional com 10 anos de experiência em manutenção residencial', 'https://via.placeholder.com/150'),
(6, 'Elétrica Residencial', 'Eletricista certificada, especialista em instalações e reparos', 'https://via.placeholder.com/150'),
(7, 'Hidráulica', 'Encanador experiente em consertos e instalações hidráulicas', 'https://via.placeholder.com/150'),
(8, 'Pintura', 'Pintora profissional, trabalho com tintas ecológicas', 'https://via.placeholder.com/150'),
(9, 'Jardinagem', 'Jardineiro especializado em paisagismo e manutenção de jardins', 'https://via.placeholder.com/150');

-- Inserir serviços de exemplo
INSERT INTO servicos (cliente_id, prestador_id, categoria_id, descricao, status, valor) VALUES
(2, 6, 5, 'Instalação de tomadas na sala', 'concluido', 150.00),
(2, 7, 6, 'Conserto de vazamento na cozinha', 'concluido', 200.00),
(3, 5, 1, 'Manutenção geral no apartamento', 'aceito', 300.00),
(3, 8, 4, 'Pintura do quarto principal', 'pendente', 450.00),
(4, 9, 3, 'Criação de jardim vertical', 'aceito', 350.00);

-- Inserir avaliações
INSERT INTO avaliacoes (servico_id, autor_id, destinatario_id, nota, comentario) VALUES
(1, 2, 6, 5, 'Excelente profissional! Trabalho rápido e limpo.'),
(2, 2, 7, 4, 'Bom trabalho, resolveu o problema do vazamento.'),
(1, 6, 2, 5, 'Cliente muito educado e pontual no pagamento.');

-- Inserir pagamentos
INSERT INTO pagamentos (servico_id, cliente_id, valor, status) VALUES
(1, 2, 150.00, 'liberado'),
(2, 2, 200.00, 'liberado');

-- Inserir notificações de exemplo
INSERT INTO notificacoes (usuario_id, mensagem) VALUES
(2, 'Seu serviço foi aceito pelo prestador Ana Eletricista'),
(6, 'Você recebeu uma nova avaliação 5 estrelas!'),
(3, 'Pedro Prestador aceitou seu pedido de serviço'),
(5, 'Novo pedido de serviço disponível em sua área'); 