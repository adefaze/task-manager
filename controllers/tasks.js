const Task = require('../models/tasks')
const asyncWrapper = require('../middleware/async-wrapper')
const {createCustomError} = require('../errors/custom-errors')

const getAllTasks = asyncWrapper(
    async (req, res) => {
        const task = await Task.find({})
        res.status(200).json({ task })
    }
)

const createTask = asyncWrapper(
    async (req, res) => {

        const task = await Task.create(req.body)
        res.status(201).json({ task })
    }
)



const getTask = asyncWrapper(
    async (req, res, next) => {

        const { id: taskID } = req.params
        const task = await Task.findOne({ _id: taskID })


        if (!task) {
            return next(createCustomError(`no task with ID ${taskID}`, 404))
            // return res.status(404).json({ msg: `no task with ID ${taskID}` })
        }
        res.status(200).json({ task })


    }
)

const updateTask = asyncWrapper(
    async (req, res) => {

        const { id: taskID } = req.params
        const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
            new: true,
            runValidators: true
        })

        if (!task) {
            return next(createCustomError(`no task with ID ${taskID}`, 404))
            // return res.status(404).json({ msg: `no task with ID ${taskID}` })
        }

        res.status(200).json({ task })

    }
)

const deleteTask = asyncWrapper(
    async (req, res) => {

        const { id: taskID } = req.params
        const task = await Task.deleteOne({ _id: taskID })

        if (!task) {
            return next(createCustomError(`no task with ID ${taskID}`, 404))
            // return res.status(404).json({ msg: `no task with ID ${taskID}` })
        }

        res.status(201).json({ task })


    }
)


module.exports = {
    getAllTasks, createTask, getTask, updateTask, deleteTask
}