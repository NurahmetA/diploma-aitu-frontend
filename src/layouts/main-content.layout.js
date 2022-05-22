import {Route, Routes} from "react-router-dom";
import HeaderLayout from "./header.layout";
import LoginPage from "../pages/common/login.page";
import ProfilePage from "../pages/common/profile.page";
import CommissionDashboardPage from "../pages/commission-pages/dashboard.page";
import AdminProfilePage from "../pages/admin-pages/admin-profile.page";
import Team from "../components/team.component";

function MainContentLayout(props) {
    return (
        <div id="content">
            <HeaderLayout isAdmin={props.isAdmin}/>
            <Routes>
                <Route path="/auth" element={<LoginPage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/commission/dashboard" element={<CommissionDashboardPage/>}/>
                <Route path="/admin/profile" element={<AdminProfilePage/>}/>
                <Route path="/admin/team/:id" element={<Team/>}/>
            </Routes>
        </div>
    );
}

export default MainContentLayout;
