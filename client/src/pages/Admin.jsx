import SideBar from "../components/SideBar";
import ProfileButton from "../components/ProfileButton";
import NewTask from "../components/NewTask";
import ListTasks from "../components/ListTasks";
const admin = () => {
  return (
    <section className="grid-admin">
      <div className="grid-admin-sidebar bg-purple">
        <SideBar items={["home", "assign task", "manage all user"]} />
      </div>
      <div className="grid-admin-profile flex justify-content-end">
        <ProfileButton />
      </div>
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
