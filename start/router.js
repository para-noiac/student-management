var express = require('express')
var router = express.Router()

const { StudentManagement } = require('../app/Controllers')

router.get('/api', function (_, res) {
   res.send('Hello World!')
})

router.post('/api/register', StudentManagement.register)
router.get('/api/commonstudents', StudentManagement.listStudents)

module.exports = router