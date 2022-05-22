const mongoose = require("mongoose");
module.exports = mongoose => {
    const Student = mongoose.model(
        "student",
        mongoose.Schema(
            {
                student_num: Number,
                name: String,
                college: String,
                major: String,
                student_type: String,
                graduated: Boolean,
                entrance_date: Date
            },
            {timestamps: true}
        )
    );

    // schema.method("toJSON", function() {
    //     const { __v, _id, ...object } = this.toObject();
    //     object.id = _id;
    //     return object;
    // });
    return Student;
};