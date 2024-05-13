import React from 'react';
import {Route, Routes} from "react-router";
import './App.css';
import FinanceHome from './Components/FinanceHome';
import ExpendituresHome from './Components/ExpendituresHome';
import SalaryHome from './Components/SalaryHome';
import UpdateExpense from './Components/UpdateExpense';

function App() {
  return (
    <div>
      
      <React.Fragment>
        <Routes>
        <Route path = "/" element={<FinanceHome/>}/>
        <Route path = "/financial-analysis" element={<FinanceHome/>}/>
        <Route path = "/expenditures" element={<ExpendituresHome/>}/>
        <Route path = "/expenditures/get/:id" element={<UpdateExpense/>}/>
        <Route path = "/salary-management" element={<SalaryHome/>}/>
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
