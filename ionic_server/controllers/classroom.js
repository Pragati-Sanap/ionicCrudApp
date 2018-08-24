var classroomModel = require('../models/classroom');

var classrooms = {
    getAll: function (req, res) {
        classroomModel.find(function (err, doc) {
            if (err) {
                res.status(500).json({ status: 'errror', message: 'Database error' + err, docs: doc });
            }
            else {
                res.status(200).json({ status: 'success', message: 'success', docs: doc });
            }
        });
    }
    ,
    getOne: function (req, res) {
        classroomModel.findById(req.params.id, function (err, doc) {
            if (err) {
                res.status(500).json({ status: 'error', message: 'Database error' + err, docs: '' });
            }
            else {
                res.status(200).json({ status: 'success', message: 'success', doc: doc });
            }
        });
    },
    create: function (req, res) {
        var classroom = new classroomModel();
        classroom.class_name = req.body.class_name;
        classroom.students = req.body.students;
        classroom.student_name = req.body.student_name;

        classroom.save(function (err, doc) {
            if (err) {
                res.status(500).json({ status: 'error', message: 'database error' + err, docs: '' });
            }
            else {
                res.status(200).json({ status: 'success', message: 'Document Created Successfully', docs: doc });
            }
        })
    },
    update: function (req, res) {
        classroomModel.findById(req.params.id, function (err, doc) {
            if (err)
                res.status(500).json({ status: 'error', message: 'Database error' + err, docs: '' });

            doc.class_name = req.body.class_name;
            doc.students = req.body.students;
            doc.student_name = req.body.student_name; 


            doc.save(function (err) {
                if (err) {
                    res.status(504).json({ status: 'error', message: 'database error' + err, docs: doc });
                }
                else {
                    res.status(200).json({ status: 'success', message: 'Document Updated Successfully', docs: doc });
                }
            });

        });
    },
    delete: function (req, res) {
        classroomModel.remove({
            _id: req.params.id
        }, function (err, user) {
            if (err) {
                res.status(500).json({ status: 'error', message: 'Database error' + err, docs: '' })
            }
            else {
                res.status(200).json({ status: 'success', message: 'Document deleted Successfully', docs: '' });
            }
        });
    }
}

module.exports = classrooms;