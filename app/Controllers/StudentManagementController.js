'use strict'

const { User } = require('../Models')
const { Http } = require('../Helpers')

class StudentManagementController {
    async register(req, res){
        let { teacher, students } = req.body
        
        teacher = await User.findOrCreate({ email: teacher })
        if(!await teacher.hasRoles('teacher')){
            await teacher.assignRole('teacher')
        }
        
        let student_ids = []
        for(let student of students){
            student = await User.findOrCreate({ email: student })
            if(!await student.hasRoles('student')){
                await student.assignRole('student')
            }
            student_ids.push(student.id)
        }

        await teacher.assignChildById(student_ids)
            
        Http.respond(204, res)
    }

    async listStudents(req, res){
        let { teacher } = req.query
        
        let students = await User.ofRole('student')

        Http.respond(200, res)
    }
}

module.exports = StudentManagementController