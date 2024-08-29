import SideBar from "../components/SideBar";
import ProfileButton from "../components/ProfileButton";
import NewTask from "../components/NewTask";
import ListTasks from "../components/ListTasks";
const admin = () => {
  return (
    <section>
      <div className="grid-new-task">
        <NewTask />
      </div>
      <div className="grid-list-task">
        <ListTasks />
      </div>
    </section>
  );
};

export default admin;
