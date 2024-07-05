import React from "react";
import AllTasks from "./AllTasks";
import { isToday } from "date-fns";

const Today = () => {
  const filterTasks = (tasks) => tasks.filter(task => isToday(new Date(task.dueDate)));

  return <AllTasks filterTasks={filterTasks} />;
};

export default Today;