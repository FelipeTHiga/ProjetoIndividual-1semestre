	'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Usuario = sequelize.define('Usuario',{
		idUsuario: {
			field: 'id',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		nome: {
			field: 'nome',
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			field: 'email',
			type: DataTypes.STRING,
			allowNull: false
		},
		celular: {
			field: 'celular',
			type: DataTypes.STRING,
			allowNull: false
		},
		senha: {
			field: 'senha',
			type: DataTypes.STRING,
			allowNull: false
		}
	}, 
	
	{
		tableName: 'usuario', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});


	return Usuario;
	



};

// module.exports = (sequelize, DataTypes) => {

// 	let Mensagem = sequelize.define('Mensagem',{
// 		idMensagem: {
// 			field: 'idMensagem',
// 			type: DataTypes.INTEGER,
// 			primaryKey: true,
// 			autoIncrement: true
// 		},		
// 		nome: {
// 			field: 'nomeRemetente',
// 			type: DataTypes.STRING,
// 			allowNull: false
// 		},
// 		emailRemetente: {
// 			field: 'emailRemetente',
// 			type: DataTypes.STRING,
// 			allowNull: false
// 		},
// 		mensagem: {
// 			field: 'mensagem',
// 			type: DataTypes.STRING,
// 			allowNull: false
// 		},
// 		fkusuario: {
// 			field: 'fkusuario',
// 			type: DataTypes.INTEGER,
// 			allowNull: false
// 		}
// 	}, 
	
// 	{
// 		tableName: 'mensagem', 
// 		freezeTableName: true, 
// 		underscored: true,
// 		timestamps: false,
// 	});





// 	return Mensagem;
	



// };
