import "./SideBar.css";
import avatar from "../../assets/avatar.png";

function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <img src={avatar} alt="Avatar" className="sidebar__avatar" />
        <div className="sidebar__username">Placeholder</div>
      </div>
    </aside>
  );
}

export default SideBar;
