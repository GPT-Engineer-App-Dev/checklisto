import React from "react";
import AllTasks from "./AllTasks";
import { isFuture } from "date-fns";

const Upcoming = () => {
  const filterTasks = (tasks) => tasks.filter(task => isFuture(new Date(task.dueDate)));

  return <AllTasks filterTasks={filterTasks} />;
};

export default Upcoming;