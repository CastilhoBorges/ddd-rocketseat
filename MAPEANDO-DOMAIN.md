# Entidades de Domínio

## Produto

Número de identificação único
Nome
Tamanho
Cor
Quantidade mínima de estoque
Quantidade atual em estoque


## Movimentação de Estoque

Produto relacionado
Tipo de movimentação (entrada/saída)
Quantidade
Data/hora


## Venda

Produto(s) vendido(s)
Quantidade
Valor/Lucro
Data da venda


## Alerta

Produto relacionado
Tipo de alerta
Data/hora de geração
Status (enviado/não enviado)


## Ordem de Compra

Produto(s)
Quantidade solicitada
Fornecedor
Data de criação
Status da ordem
Prazo de entrega previsto


## Fornecedor

Nome
Informações de contato
Produtos fornecidos
Prazos de entrega



# Casos de Uso (Ações)

## Gestão de Produtos

- Cadastrar Produto - Criar novo produto com ID único e informações detalhadas
- Atualizar Informações do Produto - Modificar dados como tamanho, cor, etc.
- Definir Quantidade Mínima de Estoque - Estabelecer limite mínimo por produto

## Rastreamento e Movimentação

- Rastrear Movimentação de Produto - Registrar entradas e saídas do estoque
- Consultar Estoque Atual - Visualizar quantidade disponível de cada produto

## Sistema de Alertas

- Gerar Alerta de Estoque Baixo - Detectar quando estoque atinge nível mínimo
- Enviar Alerta por E-mail - Notificar via e-mail sobre estoque baixo
- Enviar Notificação no Sistema - Exibir alerta dentro da aplicação

## Análise e Relatórios

- Visualizar Histórico de Vendas - Consultar vendas por período
- Calcular Lucro por Produto - Analisar rentabilidade individual
- Identificar Produtos Mais Vendidos - Rankear produtos por desempenho
- Analisar Tendências de Estoque - Observar padrões ao longo do tempo

## Gestão de Compras

- Criar Ordem de Compra Automaticamente - Gerar pedidos baseados em estoque mínimo e tendências
- Gerenciar Ordens de Compra - Acompanhar status dos pedidos
- Integrar com Fornecedores - Receber atualizações automáticas de prazos de entrega