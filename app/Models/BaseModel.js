'use strict'

const path = require('path')
const { Model } = require('objection')

class BaseModel extends Model {
   static get modelPaths() {
     return [path.join(appRoot, 'app/Models')]
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
		return await this.query().where(where).first() || await this.query().insertAndFetch(values)
	}
 }
 
module.exports = BaseModel