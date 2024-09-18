import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./pages/global/Topbar";
import Sidebar from "./pages/global/Sidebar";
import Dashboard from "./pages/dashboard";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Login from "./pages/login";
import Businesses from "./pages/businesses";
import Investments from "./pages/investments";
import InvestmentRequests from "./pages/investmentRequest";
import InvestmentOffer from "./pages/investmentOffer";
import Contracts from "./pages/contracts";
import Category from "./pages/category";
import NewsBlogs from "./pages/newsBlogs";
import BusinessPerformce from "./pages/businessPerformance";
import BestPerformingInvestor from "./pages/bestPerformingInvestor";
import BestPerformingBusiness from "./pages/bestPerformingBusiness";

import ProtectedRoute from './util/protectedRoute';
import NotFound from "./util/NotFound";
import InvestmentRequest from "./pages/investmentRequest";
import Users from "./pages/users";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  // Get current location (route)
  const location = useLocation();

  // Check if the current route is '/login'
  const isLoginPage = location.pathname === "/login";
  

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div className="app">
          {/* Conditionally render Sidebar and Topbar if not on the login page */}
          {!isLoginPage && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {!isLoginPage && <Topbar setIsSidebar={setIsSidebar} />}
            
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
              <Route path="/investment-requests" element={<ProtectedRoute><InvestmentRequest/></ProtectedRoute>} />
              <Route path="/businesses" element={<ProtectedRoute><Businesses/></ProtectedRoute>} />
              <Route path="/contracts" element={<ProtectedRoute><Contracts/></ProtectedRoute>} />
              <Route path="/investments" element={<ProtectedRoute><Investments/></ProtectedRoute>} />
              <Route path="/investment-offers" element={<ProtectedRoute><InvestmentOffer/></ProtectedRoute>} />
              <Route path="/categories" element={<ProtectedRoute><Category/></ProtectedRoute>} />
              <Route path="/news-blogs" element={<NewsBlogs/>} />
              <Route path="/business-performance" element={<ProtectedRoute><BusinessPerformce/></ProtectedRoute>} />
              <Route path="/best-performing-investor" element={<ProtectedRoute><BestPerformingInvestor/></ProtectedRoute>} />
              <Route path="/best-performing-business" element={<ProtectedRoute><BestPerformingBusiness/></ProtectedRoute>} />
              <Route path="/users" element={<ProtectedRoute><Users/></ProtectedRoute>} />
            
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
