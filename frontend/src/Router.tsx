import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuth } from '@/providers';
import { AuthLayout, MainLayout } from '@/layouts';
import { ChildPage, MePage, SignInPage, SignUpPage } from '@/pages';
import { ProtectedRoute } from '@/components';

const Router = () => {
  const { token } = useAuth();

  return (
    <Routes>
      <Route path="/auth/*" element={<AuthLayout />}>
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />

        <Route path="*" element={<Navigate to="sign-in" />} />
      </Route>

      <Route element={<ProtectedRoute isAllowed={Boolean(token)} redirectTo="/auth/sign-in" />}>
        <Route path="/*" element={<MainLayout />}>
          <Route path="me" element={<MePage />} />
          <Route path="children/:id" element={<ChildPage />} />

          <Route path="*" element={<Navigate to="/me" />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
