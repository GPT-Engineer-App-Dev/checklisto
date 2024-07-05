import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">All Tasks</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Task</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
            </DialogHeader>
            <TaskForm onSubmit={addTask} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-4">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onEdit={setCurrentTask} onDelete={deleteTask} />
        ))}
      </div>
      {currentTask && (
        <Dialog open={!!currentTask} onOpenChange={() => setCurrentTask(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>
            <TaskForm task={currentTask} onSubmit={updateTask} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

const TaskCard = ({ task, onEdit, onDelete }) => (
  <Card>
    <CardHeader>
      <CardTitle>{task.title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p>{task.description}</p>
      <p className="text-sm text-muted-foreground">{format(new Date(task.dueDate), "PPP")}</p>
    </CardContent>
    <CardFooter className="flex justify-end space-x-2">
      <Button variant="outline" onClick={() => onEdit(task)}>Edit</Button>
      <Button variant="destructive" onClick={() => onDelete(task.id)}>Delete</Button>
    </CardFooter>
  </Card>
);

const TaskForm = ({ task = {}, onSubmit }) => {
  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const [dueDate, setDueDate] = useState(task.dueDate || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: task.id || Date.now(),
      title,
      description,
      dueDate,
    };
    onSubmit(newTask);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="dueDate">Due Date</Label>
        <Input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
      </div>
      <Button type="submit">Save</Button>
    </form>
  );
};

export default AllTasks;