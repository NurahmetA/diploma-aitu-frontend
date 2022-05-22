import {Link} from "react-router-dom";

function SidebarLayout(props) {
    return (
        <nav id="sidebar"
             className={props.isStudent ? "sidebar-student active" :
                 props.isCommission ? "sidebar-commission active" : "sidebar-professor active"}>
            <h1>
                <a href="index.html" className="logo">
                    <img src="https://astanait.edu.kz/wp-content/uploads/2020/05/aitu-logo-3.png" alt="aitu logo"
                         width="140"/>
                </a>
            </h1>
            <ul className="list-unstyled components mb-5">

                {props.isStudent &&
                    <div>
                        <li className="nav-item active">
                            <Link to="/student/dashboard" className="nav-a">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/student/team" className="nav-a">Team</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/student/topic" className="nav-a">Topic</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/student/defence" className="nav-a">Defence</Link>
                        </li>
                    </div>
                }
                {props.isCommission &&
                    <div>
                        <li className="nav-item active">
                            <Link to="/commission/dashboard" className="nav-a">Dashboard</Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/commission/defence" className="nav-a">Defence</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/commission/team" className="nav-a">Documents</Link>
                        </li>
                    </div>
                }


            </ul>
            <div className="footer">
                <p>Copyright</p>
            </div>
        </nav>
    );
}

export default SidebarLayout;
