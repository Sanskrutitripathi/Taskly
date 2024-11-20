const Task=require("./model")

exports.createTask=async(req,res)=>{
    const { title, description } = req.body;
    try {
        const newTask = new Task({ title, description });
        const savedTask = await newTask.save();
        res.json(savedTask);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        const deletedDocument = await Task.findByIdAndDelete(task._id);
        res.json({ message: 'Task removed', deletedDocument });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateTask = async (req, res) => {
    const updateData = req.body;
    try {
        const updatedDocument = await Task.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedDocument) return res.status(404).json({ message: 'Document not found' });
        res.json({ message: 'Document updated successfully', updatedDocument });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};