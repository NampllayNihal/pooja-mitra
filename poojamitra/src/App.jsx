import { Routes, Route, Navigate } from "react-router-dom";

import Splash from "./pages/Splash";
import Login from "./pages/Login";
import OTP from "./pages/OTP";
import Home from "./pages/Home";
import PoojaCategories from "./pages/PoojaCategories";
import PoojaDetails from "./pages/PoojaDetails";
import Booking from "./pages/Booking";
import BookingConfirmation from "./pages/BookingConfirmation";
import MyBookings from "./pages/MyBookings";
import BookingDetails from "./pages/BookingDetails";
import AstrologyServices from "./pages/AstrologyServices";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import PriestRegistration from "./pages/PriestRegistration";
import PriestProfessionalDetails from "./pages/PriestProfessionalDetails";
import PriestLanguages from "./pages/PriestLanguages";
import PriestServiceLocation from "./pages/PriestServiceLocation";
import PriestDocuments from "./pages/PriestDocuments";
import PriestVerification from "./pages/PriestVerification";
import PriestInterviewAvailability from "./pages/PriestInterviewAvailability";
import PriestInterviewScheduled from "./pages/PriestInterviewScheduled";
import PriestInterviewRoom from "./pages/PriestInterviewRoom";
import PriestVerificationStatus from "./pages/PriestVerificationStatus";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPriestApplications from "./pages/AdminPriestApplications";
import AdminPriestApplicationDetails from "./pages/AdminPriestApplicationDetails";
import AdminInterviews from "./pages/AdminInterviews";
import AdminInterviewDetails from "./pages/AdminInterviewDetails";
import AdminApprovedPriests from "./pages/AdminApprovedPriests";
import AdminCustomers from "./pages/AdminCustomers";
import AdminBookings from "./pages/AdminBookings";
import AdminServices from "./pages/AdminServices";
import AdminPayments from "./pages/AdminPayments";
import AdminReports from "./pages/AdminReports";
import AdminNotifications from "./pages/AdminNotifications";
import AdminSettings from "./pages/AdminSettings";
import PriestDashboard from "./pages/PriestDashboard";
import PriestBookings from "./pages/PriestBookings";
import PriestCalendar from "./pages/PriestCalendar";
import PriestServices from "./pages/PriestServices";
import PriestEarnings from "./pages/PriestEarnings";
import PriestReviews from "./pages/PriestReviews";
import PriestProfile from "./pages/PriestProfile";
import PriestNotifications from "./pages/PriestNotifications";
import PriestSettings from "./pages/PriestSettings";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<Login />} />
      <Route path="/otp" element={<OTP />} />
      <Route path="/home" element={<Home />} />
  <Route
  path="/pooja-categories"
  element={<PoojaCategories />}
/>
<Route
  path="/pooja-details"
  element={<PoojaDetails />}
/>
<Route
  path="/booking"
  element={<Booking />}
/>
<Route
  path="/booking-confirmation"
  element={<BookingConfirmation />}
/>
<Route path="/my-bookings" element={<MyBookings />} />
<Route
  path="/booking-details"
  element={<BookingDetails />}
/>
<Route
  path="/astrology"
  element={<AstrologyServices />}
/>

<Route
  path="/profile"
  element={<Profile />}
/>

<Route
  path="/notifications"
  element={<Notifications />}
/>

<Route
  path="/settings"
  element={<Settings />}
/>

<Route
  path="/priest-registration"
  element={<PriestRegistration />}
/>
<Route
  path="/priest-professional-details"
  element={<PriestProfessionalDetails />}
/>
<Route
  path="/priest-languages"
  element={<PriestLanguages />}
/>
<Route
  path="/priest-service-location"
  element={<PriestServiceLocation />}
/>
<Route
  path="/priest-documents"
  element={<PriestDocuments />}
/>
<Route
  path="/priest-verification"
  element={<PriestVerification />}
/>
<Route
  path="/priest-interview-availability"
  element={<PriestInterviewAvailability />}
/>
<Route
  path="/priest-interview-scheduled"
  element={<PriestInterviewScheduled />}
/>
<Route
  path="/priest-interview-room"
  element={<PriestInterviewRoom />}
/>
<Route
  path="/priest-verification-status"
  element={<PriestVerificationStatus />}
/>
<Route
  path="/admin-dashboard"
  element={<AdminDashboard />}
/>
<Route
  path="/admin-priest-applications"
  element={<AdminPriestApplications />}
/>
<Route
  path="/admin-priest-application-details"
  element={<AdminPriestApplicationDetails />}
/>
<Route
  path="/admin-interviews"
  element={<AdminInterviews />}
/>
<Route
  path="/admin-interview-details"
  element={<AdminInterviewDetails />}
/>
<Route
  path="/admin-approved-priests"
  element={<AdminApprovedPriests />}
/>
<Route
  path="/admin-customers"
  element={<AdminCustomers />}
/>
<Route
  path="/admin-bookings"
  element={<AdminBookings />}
/>
<Route
  path="/admin-services"
  element={<AdminServices />}
/>
<Route
  path="/admin-payments"
  element={<AdminPayments />}
/>
<Route
  path="/admin-reports"
  element={<AdminReports />}
/>
<Route
  path="/admin-notifications"
  element={<AdminNotifications />}
/>
<Route
  path="/admin-settings"
  element={<AdminSettings />}
/>
<Route
  path="/priest-dashboard"
  element={<PriestDashboard />}
/>
<Route
  path="/priest-bookings"
  element={<PriestBookings />}
/>

<Route
  path="/priest-calendar"
  element={<PriestCalendar />}
/>

<Route
  path="/priest-services"
  element={<PriestServices />}
/>

<Route
  path="/priest-earnings"
  element={<PriestEarnings />}
/>

<Route
  path="/priest-reviews"
  element={<PriestReviews />}
/>

<Route
  path="/priest-profile"
  element={<PriestProfile />}
/>

<Route
  path="/priest-notifications"
  element={<PriestNotifications />}
/>

<Route
  path="/priest-settings"
  element={<PriestSettings />}
/>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>

    
  );
}

export default App;