-- Adiciona coluna de parcelamento na tabela products
-- Execute este SQL no seu banco de dados

ALTER TABLE products
ADD COLUMN installments INT DEFAULT 1 COMMENT 'Número de parcelas disponíveis para o produto';

-- Atualiza produtos existentes para ter pelo menos 1 parcela
UPDATE products SET installments = 1 WHERE installments IS NULL OR installments = 0;
