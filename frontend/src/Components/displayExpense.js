import React , {useState} from 'react';
import './FinanceCSS/DisplayDatabase.css';
import UpdateExpense from './UpdateExpense';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';


function DisplayExpense({ expense, onUpdate, onDelete }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  //popup for deleting a record
  const [isPopupOpenDelete,setIsPopupOpenDelete]=useState(false);
  const [popupText, setPopupText]=useState("");

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };


  const openPopupDelete = () => {
    setIsPopupOpenDelete(true);
    setPopupText("Record Is Deleting.. ");

    // Change text to "Record Is Deleted" after 2 seconds
    setTimeout(() => {
      setPopupText("Record Deleted Successfully");
      setTimeout(() => {
        setIsPopupOpenDelete(false);  // Close the popup after another 1 seconds
      }, 2000);
    }, 100);
  };

  const closePopupDelete = () => {
    setIsPopupOpenDelete(false);
  };

  const { expense_id, date, category, amount, payment_method, description, receipt_no, name, location } = expense;
  const history=useNavigate();

  const deleteHandler = async () => {
    openPopupDelete(); // Open the popup when deleteHandler is called
    try {
      await axios.delete(`http://localhost:8080/expenses/delete/${expense_id}`);
      onDelete();  // Call the onDelete callback
    } catch (error) {
      console.error("Error deleting the expense:", error);
    }
  };

  
  
  

  return (
    <tr>
      <td>{expense_id}</td>
      <td>{date}</td>
      <td>{category}</td>
      <td>{amount}</td>
      <td>{payment_method}</td>
      <td>{description}</td>
      <td>{receipt_no}</td>
      <td>{name}</td>
      <td>{location}</td>
      <td>
        <button className="update-button" onClick={openPopup}>Update</button>
        <br />
        <button className="delete-button" onClick={deleteHandler} >Delete</button>
      </td>

      {isPopupOpenDelete && (
        <>
       <div className="popup-del-overlay"></div>
        <div className="popup-del">
          <p>{popupText}</p>
        </div>
        </>
      )}

      {isPopupOpen && (
        <UpdateExpense expenseId={expense_id} onUpdate={onUpdate} onClose={closePopup} />
      )}
    </tr>
  );
}

export default DisplayExpense;
