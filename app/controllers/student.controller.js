const db = require("../models");
const Student = db.students;

exports.findAll = (req, res) => {

    const name = req.query.name;
    let condition = name ? { name: { $regex: new RegExp(name), $options: "i" }} : { };
    Student.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error"
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Student.findById(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `There is no student with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error with id=${id}.`
            });
        });
};

exports.findGraduated = (req, res) => {
    Student.find({ graduated: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error"
            });
        });
};

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({ message: "name parameter cannot be empty." });
    }

    const student = new Student({
        student_num: req.body.student_num,
        name: req.body.name,
        college: req.body.college,
        major: req.body.major,
        student_type: req.body.student_type,
        graduated: req.body.graduated ? req.body.graduated : false,
        entrance_date: req.body.entrance_date
    });

    student
        .save(student)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};


exports.update = (req, res) => {
    const id = req.params.id;
    Student.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `The student with id ${id} was updated.`
                });
            } else {
                res.send({
                    message: `The student with id ${id} cannot be updated.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error with student id ${id}`
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Student.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.send({
                    message: `The student with id ${id} was deleted.`
                });
            } else {
                res.send({
                    message: `The student with id ${id} cannot be deleted.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error with student id ${id}`
            })
        })
};

exports.deleteAll = (req, res) => {
    Student.deleteMany({})
        .then(data => {
            res.send({ message: `${data.deletedCount} students were deleted.`});
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error"
            });
        });
};