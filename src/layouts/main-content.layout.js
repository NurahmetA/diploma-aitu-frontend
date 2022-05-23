import {Route, Routes} from "react-router-dom";
import HeaderLayout from "./header.layout";
import LoginPage from "../pages/common/login.page";
import ProfilePage from "../pages/common/profile.page";
import CommissionDashboardPage from "../pages/commission-pages/dashboard.page";
import AdminProfilePage from "../pages/admin-pages/admin-profile.page";
import Team from "../components/team.component";
import TeamDefence from "../components/team-defence-component";
import CommissionDefencePage from "../pages/commission-pages/defence.page";

function MainContentLayout(props) {
    return (
        <div id="content">
            <HeaderLayout isAdmin={props.isAdmin}/>
            <Routes>
                <Route path="/auth" element={<LoginPage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/commission/dashboard" element={<CommissionDashboardPage/>}/>
                <Route path="/commission/defence/:id" element={<CommissionDefencePage/>}/>
                <Route path="/admin/profile" element={<AdminProfilePage/>}/>
                <Route path="/admin/team/:id" element={<Team/>}/>
                <Route path="/admin/team/defence/:id" element={<TeamDefence/>}/>
                {/*<Route path="/admin/team/defence/:id/success" element={<TeamDefence/>}/>*/}
            </Routes>
        </div>
    );
}

export default MainContentLayout;
