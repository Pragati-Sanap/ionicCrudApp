var express = require('express');
var router = express.Router();

var classrooms = require('./controllers/classroom.js');


router.get('/api/classroom/', classrooms.getAll);
router.get('/api/classroom/:id', classrooms.getOne);
router.post('/api/classroom/add_with_students', classrooms.create);
router.put('/api/classroom/:id', classrooms.update);
router.delete('/api/classroom/:id', classrooms.delete);


module.exports = router;