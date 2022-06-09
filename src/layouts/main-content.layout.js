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
import CommissionGradesPage from "../pages/commission-pages/grades.page";
import SecretaryGradesPage from "../pages/secretary/grades.page";
import StudentDashboard from "../pages/student-pages/dashboard.page";
import StudentTeamPage from "../pages/student-pages/team.page";
import StudentTopicPage from "../pages/student-pages/topic.page";
import StudentDashboardPage from "../pages/student-pages/dashboard.page";

function MainContentLayout(props) {
    return (
        <div id="content">
            <HeaderLayout isAdmin={props.isAdmin} isSecretary={props.isSecretary} isCommission={props.isCommission}/>
            <Routes>
                <Route path="/auth" element={<LoginPage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/commission/dashboard" element={<CommissionDashboardPage/>}/>
                <Route path="/commission/defence/:id" element={<CommissionDefencePage/>}/>
                <Route path="/commission/documents" element={<CommissionDocumentsPage/>}/>
                <Route path="/commission/defence/grades/:id" element={<CommissionGradesPage/>}/>
                <Route path="/admin/profile" element={<AdminProfilePage/>}/>
                <Route path="/admin/team/:id" element={<Team/>}/>
                <Route path="/admin/team/defence/:id" element={<TeamDefence/>}/>
                <Route path="/admin/team/defence/:id/success" element={<DefenceSuccess/>}/>
                <Route path="/secretary" element={<SecretaryPage/>}/>
                <Route path="/secretary/defence/:id" element={<SecretaryDefencePage/>}/>
                <Route path="/secretary/defence/grades/:id" element={<SecretaryGradesPage/>}/>
                <Route path="/secretary/documents" element={<SecretaryDocumentsPage/>}/>
                <Route path="/secretary/documents/:id" element={<SecretaryDocumentPage/>}/>
                <Route path="/student/dashboard" element={<StudentDashboardPage/>}/>
                <Route path="/student/team" element={<StudentTeamPage/>}/>
                <Route path="/student/topic" element={<StudentTopicPage/>}/>
            </Routes>
        </div>
    );
}

export default MainContentLayout;
