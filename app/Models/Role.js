'use strict'

const Model = require('./BaseModel');

class Role extends Model {
	static get tableName() {
		return 'roles';
	}
	
	static get relationMappings() {
		return {
			users: {
				relation: Model.ManyToManyRelation,
				modelClass: 'User',
				join: {
					from: 'roles.id',
					through: {
						from: 'users_roles.role_id',
						to: 'users_roles.user_id'
					},
					to: 'users.id'
				}
			}
		}
	}
	
} 

module.exports = Role