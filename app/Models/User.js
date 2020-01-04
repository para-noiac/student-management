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
			parents: {
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

	async Roles(role){
		return await this.$relatedQuery('roles').where('name', role)
	}

	async hasRoles(role){
		let rows = await this.Roles(role)
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

  /* 
	  User Hierarchy 
	*/

  	Parents(where){
		let trx = this.$relatedQuery('parent')
		return where ? trx.where(where) : trx
	}

  	async hasParents(where){
		let rows = await this.Parents(where)
		return rows.length > 0
	  }
	  
	Children(where){
		let trx = this.$relatedQuery('children')
		return where ? trx.where(where) : trx
	}

  	async hasChildren(where){
		let rows = await this.Children(where)
		return rows.length > 0
  	}

	async assignChildById(id){
		let child = await this.Children({'users.id': id}).first()
		if(!child)
			await this.$relatedQuery('children').relate(id)
	}

	/* 
	  End User Hierarchy 
	*/
} 

module.exports = User