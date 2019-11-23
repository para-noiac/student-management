'use strict'

const Model = require('./BaseModel');
const Role = require('./Role')

class User extends Model {
	static get tableName() {
		return 'users';
	}
	
	static get relationMappings() {
		return {
			roles: {
				relation: Model.ManyToManyRelation,
				modelClass: 'Role',
				join: {
					from: 'users.id',
					through: {
						from: 'users_roles.user_id',
						to: 'users_roles.role_id'
					},
					to: 'roles.id'
				}
			},
			children: {
				relation: Model.ManyToManyRelation,
				modelClass: 'User',
				join: {
					from: 'users.id',
					through: {
						from: 'users_users.parent_id',
						to: 'users_users.child_id'
					},
					to: 'users.id'
				}
			},
			parent: {
				relation: Model.ManyToManyRelation,
				modelClass: 'User',
				join: {
					from: 'users.id',
					through: {
						from: 'users_users.child_id',
						to: 'users_users.parent_id'
					},
					to: 'users.id'
				}
			}
		}
	}

	async ofRole(role){
		return await this.$relatedQuery('roles').where('name', role)
	}

	async hasRoles(role){
		let rows = await this.ofRole(role)
		if(rows.length > 0)
			return true
		else
			return false
	}

	async assignRole(role){
		let role_id = await Role.query().select('id').where('name', role).first()
		if(role_id)
			 await this.$relatedQuery('roles').relate(role_id)
		else
			 throw Error('RoleNotFoundException')
  }

	async assignChildById(id){
		let user, users
		switch(typeof(id)){
			case 'number': case 'string': {}
				await this.$relatedQuery('children')
					.relate(id)
					// .where('id', id)
				break
			case 'object': 
				await this.$relatedQuery('children')
					.relate(id)
					// .whereIn('id', id)
				break
		}
	}
} 

module.exports = User