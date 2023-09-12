import React, { useEffect, useState } from 'react';
import './cashbook.css';
import { Link, useNavigate} from 'react-router-dom';
import './navbar.css';
import logo from './img/logo.jpg';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Chatbot from './Chatbot';
import QRCode from 'qrcode.react'; 

function Cashbook() {
  const [transactions, setTransactions] = useState([]);
  const [showCashInPopup, setShowCashInPopup] = useState(false);
  const [showCashOutPopup, setShowCashOutPopup] = useState(false);
  const [amount, setAmount] = useState('');
  const [remark, setRemark] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [isloggedin, setIsloggedin] = useState(false);
  const [email, setEmail] = useState('');
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [renderId,setrenderId]=useState(null);
  const [showSharePopup, setShowSharePopup] = useState(false); 
 const [PutData,changePutData]=useState({
  id:transactions.id,
  amount: transactions.amount,
  type: transactions.type,
  date: transactions.date,
  purpose: transactions.purpose,
  paymentMode: transactions.paymentMode,
  userEmail: transactions.email,
 });
 const [putType,setType]=useState('');
  const [dates,setDates]=useState('');
  const [putEmail,setPutEmail]=useState('');
  const [FilterType_cash,setFilterType_cash]=useState('');
  const [FilterType_mode,setFilterType_mode]=useState('');
  const navigate=useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (!email) {
      navigate('/login'); 
    } else {
      setIsloggedin(true);
      setEmail(email);
      if(FilterType_cash!=='')
      {
        fetchCash(email,FilterType_cash);
      }else{
        if(FilterType_mode!=='')
      {
        fetchMode(email,FilterType_mode);
      }else{
        fetchTransactions(email);
      } 
      } 
      
           
    }
  }, [navigate,FilterType_cash,FilterType_mode]);

const fetchCash=(email,type)=>{
  console.log(type+email);
  axios.get(`http://localhost:8080/api/transactions/getFilter/${type}/${email}`)
  .then((response)=>{
    setTransactions(response.data)
  })
  .catch((error)=>{
    console.error('Error:',error);
  })
}
const fetchMode=(email,type)=>{
  console.log(type+email);
  axios.get(`http://localhost:8080/api/transactions/payment-mode/${type}/user/${email}`)
  .then((response)=>{
    setTransactions(response.data)
  })
  .catch((error)=>{
    console.error('Error:',error);
  })
}

  const fetchTransactions = (email) => {
    // Fetch transactions from the server
    axios
      .get(`http://localhost:8080/api/transactions/${email}`)
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching transactions:', error);
      });
  };

  const handleCashIn = () => {
    setShowCashInPopup(true);
  };

  const handleCashOut = () => {
    setShowCashOutPopup(true);
  };

  const handlePopupClose = () => {
    setShowCashInPopup(false);
    setShowEditPopup(false);
    setShowCashOutPopup(false);
    setAmount('');
    setRemark('');
    setPaymentMethod('Cash');
  };
  const handleLogout = () => {
    localStorage.removeItem("email");
    navigate("/login");
  }
  const handleCashInPopupSubmit = () => {
    const newTransaction = {
      amount: amount,
      type: 'Cash In',
      date: new Date().toISOString().split('T')[0],
      purpose: remark,
      paymentMode: paymentMethod,
      userEmail: email
    };
    if(!amount){
        alert('Enter amount')
    }else{
      axios.post('http://localhost:8080/api/transactions/cash-in', newTransaction);
      setTransactions([...transactions, newTransaction]);
      setShowCashInPopup(false);
      setAmount('');
      setRemark('');
      setPaymentMethod('Cash');
    }
    
    
  };
  
  const handleEdit=(id,date,type,email)=>{
    setShowEditPopup(true)
    setDates(date);
    setType(type);
    setPutEmail(email)
    setrenderId(id);
  }
  const handleDeleteTransaction = (id) => {
    axios.delete(`http://localhost:8080/api/transactions/delete/${id}`)
    .then((response)=>{console.log(response.data);})
    .catch((error)=>{console.log(error.data);});
    window.location.reload();
    
  }
  

  const handleCashInOutPopupSubmit = (id) => {
    const updatedTransaction = {
      id: id,
      amount: PutData.amount,
      type: putType,
      date: dates,
      purpose: PutData.purpose,
      paymentMode: PutData.paymentMode,
      userEmail: putEmail,
    };
    axios.put(`http://localhost:8080/api/transactions/put/${id}`,updatedTransaction)
    .then((response)=>{console.log(response.data);})
    .catch((error)=>{console.log(error.data);});
    setShowEditPopup(false)
    window.location.reload();
  }
  const handleCashOutPopupSubmit = () => {
    const newTransaction = {
      amount: amount,
      type: 'Cash Out',
      date: new Date().toISOString().split('T')[0],
      purpose: remark,
      paymentMode: paymentMethod,
      userEmail: email
    };
    
    axios.post('http://localhost:8080/api/transactions/cash-out', newTransaction);
    setTransactions([...transactions, newTransaction]);
    setShowCashOutPopup(false);
    setAmount('');
    setRemark('');
    setPaymentMethod('Cash');
  };



  const handleDownload = () => {
    const doc = new jsPDF();
  
    const headers = ['Amount', 'Cash In/Out', 'Date', 'Purpose', 'Payment Mode'];
    const tableData = transactions.map(transaction => [
      transaction.amount,
      transaction.type,
      transaction.date,
      transaction.purpose,
      transaction.paymentMode
    ]);
   
    const tableStyle = {
      margin: { top: 20 },
      styles: { font: 'helvetica', fontSize: 10 }
    };
  
    doc.autoTable({
      head: [headers],
      body: tableData,
      ...tableStyle
    });
  
    const cashInTotal = transactions
      .filter(transaction => transaction.type === 'Cash In')
      .reduce((total, transaction) => total + parseFloat(transaction.amount), 0);
  
    const cashOutTotal = transactions
      .filter(transaction => transaction.type === 'Cash Out')
      .reduce((total, transaction) => total + parseFloat(transaction.amount), 0);
  
    const netAmount = cashInTotal - cashOutTotal;
  
    const totalsY = 15; // Adjust the y-coordinate as per your needs
    const totalsFontSize = 12;
  
    doc.setFontSize(totalsFontSize);
    doc.text(`Total Cash In: Rs ${cashInTotal.toFixed(2)}`, 10, totalsY);
    doc.text(`Total Cash Out: Rs ${cashOutTotal.toFixed(2)}`, 70, totalsY);
    doc.text(`Net Amount: Rs ${netAmount.toFixed(2)}`, 130, totalsY);
  
    doc.save('cashbook.pdf');
  };
  const handleShareQRCode = () => {
      const tableData = transactions.map(transaction => [ // Convert table data to a 2D array
      transaction.amount,
      transaction.type,
      transaction.date,
      transaction.purpose,
      transaction.paymentMode
    ]);
    const tableHeaders = ['Amount', 'Cash In/Out', 'Date', 'Purpose', 'Payment Mode'];
  
    // Calculate total cash in, total cash out, and net amount
    const totalCashIn = transactions.reduce((total, transaction) => {
      return transaction.type === 'Cash In' ? total + transaction.amount : total;
    }, 0);
  
    const totalCashOut = transactions.reduce((total, transaction) => {
      return transaction.type === 'Cash Out' ? total + transaction.amount : total;
    }, 0);
  
    const netAmount = totalCashIn - totalCashOut;
  
    const qrCodeContent = `

    Total Cash In: ${totalCashIn}
      Total Cash Out: ${totalCashOut}
      Net Amount: ${netAmount}

      Table Data:
      ${tableHeaders.join('\t')}
      ${tableData.map(row => row.join('\t')).join('\n')}
    `;
  
    return (
      <div>
        <QRCode value={qrCodeContent} />
      </div>
    );
  };
  
  
  
  
  const [showChatbot, setShowChatbot] = useState(false);

  const handleChatbotToggle = () => {
    setShowChatbot(!showChatbot);
  }
  
  const cashInTotal = transactions
  .filter(transaction => transaction.type === 'Cash In')
  .reduce((total, transaction) => total + parseFloat(transaction.amount), 0);

const cashOutTotal = transactions
  .filter(transaction => transaction.type === 'Cash Out')
  .reduce((total, transaction) => total + parseFloat(transaction.amount), 0);


  const netAmount = cashInTotal - cashOutTotal;
  const handleShare = () => {
    setShowSharePopup(true); 
  };
  
  const handleSharePopupClose = () => {
    setShowSharePopup(false); 
  };
  
  

  const handleOptionChange_cash = (e) => {
    setFilterType_mode('');
    setFilterType_cash(e.target.value);
  };
  
  const handleOptionChange_mode = (e) => {
    setFilterType_cash('');
    setFilterType_mode(e.target.value);
  };

  const handleTracker =() => {
    navigate('/BudgetTracker')
  }

  return (
    <div className="cashbook">
      <header className="header">
      <div className='navbar1'>
                <p></p>
                <button className="logoutbtn" onClick={handleLogout}>Logout</button>
               
                <Link to ='/contact'>
                <p>Contact Us</p>
                </Link >
              
                <Link to="/About">
                    <p>About Us</p>
                </Link>
                    <img src={logo} alt="Logo" onClick={()=>navigate("/")}></img>
            </div>
      </header>
      <main>
        <div className="buttons">
          <button className="download" onClick={handleDownload}>
          Download
          </button>
          <button className="share" onClick={handleShare}>
          Share
          </button>
          <button className="budget-tracker_cash" onClick={handleTracker}>
          BudgetTracker
          </button>
          <button className="cash-out" onClick={handleCashOut}>
            Cash Out
          </button>
          <button className="cash-in" onClick={handleCashIn}>
            Cash In
          </button>
          
        </div>
        <div className="dropdown-container">
      <select className="dropdown-select" value={FilterType_cash} onChange={handleOptionChange_cash}>
        <option value="">Select an option</option>
        <option value="Cash In">Cash In</option>
        <option value="Cash Out">Cash Out</option>
      </select>
      <select className="dropdown-select" value={FilterType_mode} onChange={handleOptionChange_mode}>
        <option value="">Select an option</option>
        <option value="Online">Online</option>
        <option value="Cash">Cash</option>
      </select>
    </div>
        <div className="container">
          <div className="summary-box">
            <div className="summary-item">
              <h3>Cash In</h3>
              <p>Total: ₹{cashInTotal.toFixed(2)}</p>
            </div>
            <div className="summary-item">
              <h3>Cash Out</h3>
              <p>Total: ₹{cashOutTotal.toFixed(2)}</p>
            </div>
            <div className="summary-item">
              <h3>Net Amount</h3>
              <p>₹{netAmount.toFixed(2)}</p>
            </div>
          </div>
          <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Cash In/Out</th>
              <th>Date</th>
              <th>Purpose</th>
              <th>Payment Mode</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr
                key={index}
                className={transaction.type === 'Cash In' ? 'cash-in-row' : 'cash-out-row'}
              >
                <td>{transaction.amount}</td>
                <td>{transaction.type}</td>
                <td>{transaction.date}</td>
                <td>{transaction.purpose}</td>
                <td>{transaction.paymentMode}</td>
                <td>
                  <button className="delete-button" onClick={() => handleDeleteTransaction(transaction.id)}>
                    Delete
                  </button>
                  <button className="delete-button" onClick={() => handleEdit(transaction.id, transaction.date, transaction.type, transaction.userEmail)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
      </main>
      {showEditPopup && (
  <div className="popup">
    <div className="popup-content">
      <h2>Update</h2>
      <div className="form-group">
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          max="100000"
          min="1"
          id="amount"
          value={PutData.amount}
          onChange={e =>
            changePutData({...PutData,amount:Math.min(Math.max(e.target.value, 0), 100000)})
          }
        />
      </div>
      <div className="form-group">
        <label htmlFor="remark">Remark:</label>
        <input
          type="text"
          id="remark"
          value={PutData.purpose}
          onChange={e => changePutData({...PutData,purpose:e.target.value})}
        />
      </div>
      <div className="form-group">
        <label htmlFor="paymentMethod">Payment Method:</label>
        <select
          id="paymentMethod"
          value={PutData.paymentMode}
          onChange={e => changePutData({...PutData,paymentMode:e.target.value})}
        >
          <option value="Cash">Cash</option>
          <option value="Online">Online</option>
        </select>
      </div>
      <div className="button-group">
        <button className="cancel-button" onClick={handlePopupClose}>
          Cancel
        </button>
        <button className="submit-button" onClick={()=>handleCashInOutPopupSubmit(renderId)}>
          Submit
        </button>
          {/* {renderId} */}
      </div>
    </div>
    
  </div>
)}

      {showCashInPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Cash In</h2>
            <div className="form-group">
              <label htmlFor="amount">Amount:</label>
              <input
                type="number"
                max="100000"
                min="1"
                id="amount"
                value={amount}
                onChange={e =>
                  setAmount(Math.min(Math.max(e.target.value, 0), 100000))
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="remark">Remark:</label>
              <input
                type="text"
                id="remark"
                value={remark}
                onChange={e => setRemark(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="paymentMethod">Payment Method:</label>
              <select
                id="paymentMethod"
                value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value)}
              >
                <option value="Cash">Cash</option>
                <option value="Online">Online</option>
              </select>
            </div>
            <div className="button-group">
              <button className="cancel-button" onClick={handlePopupClose}>
                Cancel
              </button>
              <button
                className="submit-button"
                onClick={handleCashInPopupSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {showCashOutPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Cash Out</h2>
            <div className="form-group">
              <label htmlFor="amount">Amount:</label>
              <input
                type="number"
                max="100000"
                min="1"
                id="amount"
                value={amount}
                onChange={e =>
                  setAmount(Math.min(Math.max(e.target.value, 0), 100000))
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="remark">Remark:</label>
              <input
                type="text"
                id="remark"
                value={remark}
                onChange={e => setRemark(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="paymentMethod">Payment Method:</label>
              <select
                id="paymentMethod"
                value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value)}
              >
                <option value="Cash">Cash</option>
                <option value="Online">Online</option>
              </select>
            </div>
            <div className="button-group">
              <button className="cancel-button" onClick={handlePopupClose}>
                Cancel
              </button>
              <button
                className="submit-button"
                onClick={handleCashOutPopupSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {showSharePopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Share</h2>
            <div className="share-content">
              <p>Scan the QR code view the table of contents.</p>
              {handleShareQRCode()}
            </div>
            <div className="button-group">
              <button className="cancel-button" onClick={handleSharePopupClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="App">
      {showChatbot && <Chatbot />}
      <button className="chatbot-button" onClick={handleChatbotToggle}>
      <FontAwesomeIcon icon={faRobot} className="robot-icon" />
      </button>
    </div>
    </div>
  );
}

export default Cashbook;