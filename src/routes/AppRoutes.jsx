import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from '../pages/Home';
import EmailDetection from '../pages/EmailDetection';
import MessageDetection from '../pages/MessageDetection';
import LinkDetection from '../pages/LinkDetection';
import NewsDetection from '../pages/NewsDetection';
import Dashboard from '../pages/Dashboard';
import LearningHub from '../pages/LearningHub';
import SignIn from '../pages/SignIn';
import Awareness from '../pages/Awareness';
import { ProtectedRoute } from './ProtectedRoute';

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/email" element={<EmailDetection />} />
        <Route path="/message" element={<MessageDetection />} />
        <Route path="/link" element={<LinkDetection />} />
        <Route path="/news" element={<NewsDetection />} />
        <Route path="/awareness" element={<Awareness />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/learning-hub" element={<LearningHub />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
