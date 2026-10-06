const Student = require("../models/Student");

// Add student
const createStudent = async (req, res) => {
    try {
        const student = await Student.create(req.body);

        res.status(201).json({
            message: "Student created successfully",
            student
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// Get all students
const getStudents = async (req, res) => {
    try {
        const {
            search = "",
            department = "",
            course = "",
            page = 1,
            limit = 5
        } = req.query;

        const query = {};

        // Search by name or email
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } }
            ];
        }

        // Filter by department
        if (department) {
            query.department = department;
        }

        // Filter by course
        if (course) {
            query.course = course;
        }

        const skip = (Number(page) - 1) * Number(limit);

        const students = await Student.find(query)
            .skip(skip)
            .limit(Number(limit))
            .sort({ createdAt: -1 });

        const totalStudents = await Student.countDocuments(query);

        res.status(200).json({
            students,
            pagination: {
                currentPage: Number(page),
                totalPages: Math.ceil(totalStudents / Number(limit)),
                totalStudents,
                limit: Number(limit)
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get single student
const getStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Update student
const updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student updated successfully",
            student
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// Delete student
const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createStudent,
    getStudents,
    getStudent,
    updateStudent,
    deleteStudent
};