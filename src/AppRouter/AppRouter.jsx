import { Navigate, Route, Routes } from "react-router-dom";

import { JournalRoutes } from "../Journal/Routes/JournalRoutes"
import { AuthRoutes } from "../Auth/Routes/AuthRoutes";
import { CheckingAuth } from "../UI";
import { UseCheckOut } from "../Hooks";

export const AppRouter = () => {

  const  status  = UseCheckOut()

  if (status === 'checking') {
    return <CheckingAuth />
  }

  return (
    <Routes>
      {
       
       (status === 'authenticated')
       
        ? <Route path="/*" element={<JournalRoutes />} />
       
        : <Route path="/auth/*" element={<AuthRoutes />} />
      }
 
       <Route path='/*' element={ <Navigate to='/auth/login' />} />

    </Routes>
  );
};


