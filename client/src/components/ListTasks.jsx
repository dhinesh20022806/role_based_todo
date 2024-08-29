import TaskListItem from "./TaskListItem";

const datas = [
  {
    id: 1,
    title: "new title",
    description: "new title description ",
    status: "in progress",
    assign_user: "dhinesh",
    assign_by: "dhinesh-admin",
  },
  {
    id: 2,
    title: "new title",
    description: "new title description ",
    status: "in progress",
    assign_user: "dhinesh",
    assign_by: "dhinesh-admin",
  },
  {
    id: 3,
    title: "new title",
    description: "new title description ",
    status: "in progress",
    assign_user: "dhinesh",
    assign_by: "dhinesh-admin",
  },
  {
    id: 4,
    title: "new title",
    description: "new title description ",
    status: "in progress",
    assign_user: "dhinesh",
    assign_by: "dhinesh-admin",
  },
  {
    id: 5,
    title: "new title",
    description: "new title description ",
    status: "in progress",
    assign_user: "dhinesh",
    assign_by: "dhinesh-admin",
  },
];

const ListTasks = () => {
  return (
    <section className="w-full">
      <h1>Your Tasks</h1>
      {datas.map((data) => {
        return <TaskListItem key={data.id} data={data} />;
      })}
    </section>
  );
};

export default ListTasks;
