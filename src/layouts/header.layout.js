import {Link} from "react-router-dom";
import authService from "../services/auth.service";

function HeaderLayout(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <span className="nav-item">
                    <div className="d-inline-flex align-items-center">
                        <img src="https://astanait.edu.kz/wp-content/uploads/2020/05/aitu-logo-3.png" alt="aitu logo"
                             height="20" width="40"/>
                        <a to="/auth" className="nav-link">Astana IT University</a>
                    </div>
                </span>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="nav navbar-nav ml-auto">
                        {props.isAdmin &&
                            <li className="nav-item active">
                                <Link to="/admin/profile" className="nav-link">Admin Page</Link>
                            </li>
                        }
                        {!props.isAdmin &&
                            <li className="nav-item">
                                <Link to="/profile" className="nav-link">Profile</Link>
                            </li>
                        }
                        <li className="nav-item logout">
                            <p onClick={authService.logout} className="nav-link">Log Out</p>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default HeaderLayout;
