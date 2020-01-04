'use strict'

const path = require('path')
const { Model } = require('objection')

class BaseModel extends Model {
   static get modelPaths() {
     return [path.join(appRoot, 'app/Models')]
	}

	async update(values){
		await this.constructor.query().update(values).where('id', this.id)
	}

	/**
		Statics
	 */

	static async find(where){
		return await this.query().where(where).first()
	}

	static async create(values, returnable){
		if(returnable){
			return await this.query().insertAndFetch(values)
		}
		return await this.query().insert(values)
	}

   static async findOrCreate(...args){
		let where = args[0], values
		switch(args.length){
			case 1:
				values = where
				break
			default:
				values = args[1]
				break
		}
		return await this.find(where) || await this.create(values, true)
	}
 }
 
module.exports = BaseModel