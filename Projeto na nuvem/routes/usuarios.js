var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Usuario = require('../models').Usuario;
var Mensagem = require('../models').Mensagem;
var Exposicao = require('../models').Exposicao;


let sessoes = [];
// let fk_usuario
// fk_usuario = sessionStorage.id_usuario_meuapp;

/* Recuperar usuário por email e senha */
router.post('/autenticar', function(req, res, next) {
	console.log('Recuperando usuário por email e senha');

	var email = req.body.email; // depois de .body, use o nome (name) do campo em seu formulário de email
	var senha = req.body.senha; // depois de .body, use o nome (name) do campo em seu formulário de email	
	
	let instrucaoSql = `select * from usuario where email='${email}' and senha='${senha}'`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, {
		model: Usuario
	}).then(resultado => {
		console.log(`Encontrados: ${resultado.length}`); 

		if (resultado.length == 1) {
			sessoes.push(resultado[0].dataValues.email);
			console.log('sessoes: ',sessoes);
			res.json(resultado[0]);
		} else if (resultado.length == 0) {
			res.status(403).send('Login e/ou senha inválido(s)');
		} else {
			res.status(403).send('Mais de um usuário com o mesmo email e senha!');
		}

	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

/* Cadastrar usuário */
router.post('/cadastrar', function(req, res, next) {
	console.log('Criando um usuário');
	
	Usuario.create({
		nome : req.body.nome_cadastro,
		email : req.body.email_cadastro,
		celular : req.body.celular_cadastro,
		senha: req.body.senha_cadastro,

	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
        res.send(resultado);
    }).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

/* Enviar mensagem */
router.post('/enviar', function(req, res, next) {
	console.log('Enviando uma mensagem');
	
	Mensagem.create({
		nome : req.body.nome_mensagem,
		emailRemetente: req.body.email_mensagem,
		mensagem: req.body.corpo_mensagem,
		fkusuario: 1,

	}).then(recado => {
		console.log(`Registro criado: ${recado}`)
        res.send(recado);
    }).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});


/* Salvar dados do perfil */
router.post('/salvar', function(req, res, next) {
	console.log('Salvando dados');
	
	

	Exposicao.create({
		nomeComercial : req.body.nome_comercial,
		categoria: req.body.categoria,
		subcategoria: req.body.subcategoria,
		facebook: req.body.facebook,
		instagram: req.body.instagram,
		whatsapp: req.body.whatsapp,
		descricao: req.body.descricao,
		fkUsuario: fk_usuario,

	}).then(dados => {
		console.log(`Registro criado: ${dados}`)
        res.send(dados);
    }).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});


/* Verificação de usuário */
router.get('/sessao/:email', function(req, res, next) {
	let email = req.params.email;
	console.log(`Verificando se o usuário ${email} tem sessão`);
	
	let tem_sessao = false;
	for (let u=0; u<sessoes.length; u++) {
		if (sessoes[u] == email) {
			tem_sessao = true;
			break;
		}
	}

	if (tem_sessao) {
		let mensagem = `Usuário ${email} possui sessão ativa!`;
		console.log(mensagem);
		res.send(mensagem);
	} else {
		res.sendStatus(403);
	}
	
});


/* Logoff de usuário */
router.get('/sair/:email', function(req, res, next) {
	let email = req.params.email;
	console.log(`Finalizando a sessão do usuário ${email}`);
	let nova_sessoes = []
	for (let u=0; u<sessoes.length; u++) {
		if (sessoes[u] != email) {
			nova_sessoes.push(sessoes[u]);
		}
	}
	sessoes = nova_sessoes;
	res.send(`Sessão do usuário ${email} finalizada com sucesso!`);
});


/* Recuperar todos os usuários */
router.get('/', function(req, res, next) {
	console.log('Recuperando todos os usuários');
	Usuario.findAndCountAll().then(resultado => {
		console.log(`${resultado.count} registros`);

		res.json(resultado.rows);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

module.exports = router;
