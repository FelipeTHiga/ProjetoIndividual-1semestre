	'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Exposicao = sequelize.define('Exposicao',{
		idExposicao: {
			field: 'id',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
        },		
        fkUsuario: {
			field: 'fkUsuario',
			type: DataTypes.INTEGER,
			allowNull: false
        },
		nomeComercial: {
			field: 'nomeComercial',
			type: DataTypes.STRING,
			allowNull: false
		},
		categoria: {
			field: 'categoria',
			type: DataTypes.STRING,
			allowNull: false
        },
        subcategoria: {
			field: 'subcategoria',
			type: DataTypes.STRING,
			allowNull: false
        },
		facebook: {
			field: 'facebook',
			type: DataTypes.STRING,
			allowNull: true
		},
		instagram: {
			field: 'instagram',
			type: DataTypes.STRING,
			allowNull: true
        },
        whatsapp: {
			field: 'whatsapp',
			type: DataTypes.STRING,
			allowNull: true
        },
        descricao: {
			field: 'descricao',
			type: DataTypes.STRING,
			allowNull: false
        }
	}, 
	
	{
		tableName: 'exposicao', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});


	return Exposicao;
	



};

