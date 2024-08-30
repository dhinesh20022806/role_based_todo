import TaskListItem from "./TaskListItem";

// const datas = [
//   {
//     id: 1,
//     title: "new title",
//     description: "new title description ",
//     status: "in progress",
//     assign_user: "dhinesh",
//     assign_by: "dhinesh-admin",
//   },
//   {
//     id: 2,
//     title: "new title",
//     description: "new title description ",
//     status: "in progress",
//     assign_user: "dhinesh",
//     assign_by: "dhinesh-admin",
//   },
//   {
//     id: 3,
//     title: "new title",
//     description: "new title description ",
//     status: "in progress",
//     assign_user: "dhinesh",
//     assign_by: "dhinesh-admin",
//   },
//   {
//     id: 4,
//     title: "new title",
//     description: "new title description ",
//     status: "in progress",
//     assign_user: "dhinesh",
//     assign_by: "dhinesh-admin",
//   },
//   {
//     id: 5,
//     title: "new title",
//     description: "new title description ",
//     status: "in progress",
//     assign_user: "dhinesh",
//     assign_by: "dhinesh-admin",
//   },
// ];

const ListTasks = ({ datas }) => {
  return (
    <section className="w-full">
      <h1>Your Tasks</h1>
      {datas &&
        datas.map((data) => {
          return <TaskListItem key={data.id} data={data} />;
        })}
      {datas?.length === 0 && <p>task not yet assigned</p>}
    </section>
  );
};

export default ListTasks;
