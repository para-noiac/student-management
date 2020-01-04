'use strict'

const _ = require('lodash')
const { User } = require('../Models')
const { Http } = require('../Helpers')

class StudentManagementController {
    async register(req, res){
        let { teacher, students } = req.body
        
        teacher = await User.findOrCreate({ email: teacher })
        if(!await teacher.hasRoles('teacher')){
            await teacher.assignRole('teacher')
        }
        
        for(let student of students){
            student = await User.findOrCreate({ email: student })
            if(!await student.hasRoles('student')){
                await student.assignRole('student')
            }
            await teacher.assignChildById(student.id)
        }

        Http.respond(204, res)
    }

    async listStudents(req, res){
        let teachers, { teacher } = req.query

        switch(typeof(teacher)){
            case 'string': 
                teachers = [await User.query().where('email', teacher).first()]
                break
            case 'object':
                teachers = await User.query().whereIn('email', teacher)
                break
        }

        let students_arr = []
        for(let teacher of teachers){
            if(teacher){
                let temp_students = await teacher.Children()
                students_arr.push(_.map(temp_students, 'email'))
            } else {
                students_arr.push([])
                break
            }
        }
        let students = _.union(...students_arr)
        Http.respond({students}, res)
    }

    async suspend(req, res){
        let { student } = req.body
        student = await User.find({ email: student })
        await student.update({ status: 'SUSPENDED' })
        Http.respond(204, res)
    }

    async retrieveForNotifications(req, res){
        let { teacher, notification } = req.body
        let notification_arr = notification.split(' @')
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let mentions = _.filter(notification_arr, el => el.match(regex))

        let students = await User.query()
                        .where('status', 'ACTIVE')
                        .whereExists(builder =>
                            builder.whereExists(
                                User.relatedQuery('parents').where('email', teacher)
                            ).orWhereIn('email', mentions)
                        )

        Http.respond({recipients: _.map(students, 'email')}, res)
    }
}

module.exports = StudentManagementController