import {Route, Routes} from "react-router-dom";
import HeaderLayout from "./header.layout";
import LoginPage from "../pages/common/login.page";
import ProfilePage from "../pages/common/profile.page";
import CommissionDashboardPage from "../pages/commission-pages/dashboard.page";
import AdminProfilePage from "../pages/admin-pages/admin-profile.page";
import Team from "../components/team.component";
import TeamDefence from "../components/team-defence-component";
import CommissionDefencePage from "../pages/commission-pages/defence.page";
import CommissionDocumentsPage from "../pages/commission-pages/documents.page";
import DefenceSuccess from "../components/defence-creation-success-component";
import SecretaryPage from "../pages/secretary/dashboard.page";
import SecretaryDefencePage from "../pages/secretary/defence.page";
import SecretaryDocumentsPage from "../pages/secretary/documents.page";
import SecretaryDocumentPage from "../pages/secretary/document.page";
//import SecretaryDocumentsPage from "../pages/secretary/documents.page";
//import SecretaryDocumentPage from "../pages/secretary/document.page";

function MainContentLayout(props) {
    return (
        <div id="content">
            <HeaderLayout isAdmin={props.isAdmin} isSecretary={props.isSecretary}/>
            <Routes>
                <Route path="/auth" element={<LoginPage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/commission/dashboard" element={<CommissionDashboardPage/>}/>
                <Route path="/commission/defence/:id" element={<CommissionDefencePage/>}/>
                <Route path="/commission/documents" element={<CommissionDocumentsPage/>}/>
                <Route path="/admin/profile" element={<AdminProfilePage/>}/>
                <Route path="/admin/team/:id" element={<Team/>}/>
                <Route path="/admin/team/defence/:id" element={<TeamDefence/>}/>
                <Route path="/admin/team/defence/:id/success" element={<DefenceSuccess/>}/>
                <Route path="/secretary" element={<SecretaryPage/>}/>
                <Route path="/secretary/defence/:id" element={<SecretaryDefencePage/>}/>
                <Route path="/secretary/documents" element={<SecretaryDocumentsPage/>}/>
                <Route path="/secretary/documents/:id" element={<SecretaryDocumentPage/>}/>
            </Routes>
        </div>
    );
}

export default MainContentLayout;
