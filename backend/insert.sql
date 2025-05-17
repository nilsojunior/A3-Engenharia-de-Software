-- Fake data
INSERT INTO NGO (id, org_name, email, phone, address) VALUES
(1, 'Patas Felizes', 'contato@patasfelizes.org', '11987654321', 'Rua das Flores, 123, São Paulo, SP'),
(2, 'Amor Animal', 'amoranimal@gmail.com', '21999887766', 'Av. Brasil, 456, Rio de Janeiro, RJ'),
(3, 'Cãotinho do Amor', 'caotinho@ong.com.br', '31988776655', 'Rua dos Bichos, 789, Belo Horizonte, MG'),
(4, 'Gatinhos do Bem', 'gatinhosdobem@ong.org', '11991234567', 'Rua dos Felinos, 321, Campinas, SP'),
(5, 'Vida de Pet', 'vida.de.pet@ong.net', '11991122334', 'Av. Central, 567, Porto Alegre, RS');

INSERT INTO Pet (id, owner_id, name, species, birth_date, description) VALUES
(1, 1, 'Luna', 'Gato', '2021-06-15', 'Gatinha dócil e carinhosa, adora brincar com bolinhas.'),
(2, 1, 'Rex', 'Cachorro', '2020-03-22', 'Cachorro forte e protetor, ótimo para companhia e segurança.'),
(3, 2, 'Mimi', 'Gato', '2022-01-05', 'Muito curiosa e brincalhona.'),
(4, 2, 'Thor', 'Cachorro', '2019-11-10', 'Muito amoroso com crianças e outros pets.'),
(5, 3, 'Bidu', 'Cachorro', '2018-08-30', 'Sabe alguns comandos e é bem obediente.'),
(6, 4, 'Nina', 'Gato', '2023-02-14', 'Recém resgatada, está em adaptação.'),
(7, 5, 'Snow', 'Coelho', '2022-07-07', 'Coelhinho branco, muito tranquilo e dócil.'),
(8, 5, 'Lola', 'Gato', '2021-09-25', 'Gatinha independente, ideal para apartamento.'),
(9, 3, 'Spike', 'Cachorro', '2020-12-01', 'Muito ativo, precisa de espaço para correr.'),
(10, 4, 'Bella', 'Gato', '2019-05-17', 'Já está castrada e vacinada.');
