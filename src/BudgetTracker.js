import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import logo from './img/logo.jpg';
import './BudgetTracker.css';
import './navbar.css';
import Chatbot from './Chatbot';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Chart } from 'chart.js/auto';
import { Pie} from 'react-chartjs-2';

const BudgetTracker = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalCashIn, setTotalCashIn] = useState(0);
  const [totalCashOut, setTotalCashOut] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [overallBalance, setOverallBalance] = useState(0);
  const email = localStorage.getItem('email');
  const [showChatbot, setShowChatbot] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (!email) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/transactions/${email}`);
        setTransactions(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    const calculateTotals = () => {
      const cashInTransactions = transactions.filter((transaction) => transaction.type === 'Cash In');
      const cashOutTransactions = transactions.filter((transaction) => transaction.type === 'Cash Out');

      const cashInTotal = cashInTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
      const cashOutTotal = cashOutTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);

      setTotalCashIn(cashInTotal);
      setTotalCashOut(cashOutTotal);
    };

    calculateTotals();
  }, [transactions]);

  const uniqueCashInPurposes = [...new Set(transactions.filter((transaction) => transaction.type === 'Cash In').map((transaction) => transaction.purpose))];
  const uniqueCashOutPurposes = [...new Set(transactions.filter((transaction) => transaction.type === 'Cash Out').map((transaction) => transaction.purpose))];

  const getTotalSpendingByPurposeAndType = (purpose, type) => {
    const filteredTransactions = transactions.filter((transaction) => transaction.purpose === purpose && transaction.type === type);
    const totalSpending = filteredTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    return totalSpending;
  };

  const cashInChartData = {
    labels: uniqueCashInPurposes,
    datasets: [
      {
        data: uniqueCashInPurposes.map((purpose) => getTotalSpendingByPurposeAndType(purpose, 'Cash In')),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#A020F0',
          // Add more colors as needed
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#A020F0',
          // Add more colors as needed
        ],
      },
    ],
  };

  const cashOutChartData = {
    labels: uniqueCashOutPurposes,
    datasets: [
      {
        data: uniqueCashOutPurposes.map((purpose) => getTotalSpendingByPurposeAndType(purpose, 'Cash Out')),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#A020F0',
          // Add more colors as needed
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#A020F0',
          // Add more colors as needed
        ],
      },
    ],
  };

  useEffect(() => {
    const calculateTotals = () => {
      const cashInTransactions = transactions.filter(
        (transaction) => transaction.type === 'Cash In'
      );
      const cashOutTransactions = transactions.filter(
        (transaction) => transaction.type === 'Cash Out'
      );

      const cashInTotal = cashInTransactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      );
      const cashOutTotal = cashOutTransactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      );

      setTotalIncome(cashInTotal);
      setTotalExpenses(cashOutTotal);
      setOverallBalance(cashInTotal - cashOutTotal);
    };

    calculateTotals();
  }, [transactions]);

  const handleLogout = () => {
    localStorage.removeItem('email');
    navigate('/login');
  };

  const handleChatbotToggle = () => {
    setShowChatbot(!showChatbot);
  };

  return (
    <>
      <header className="header">
        <div className="navbar1">
          <p></p>
          <button className="logoutbtn" onClick={handleLogout}>
            Logout
          </button>
          <Link to="/contact">
            <p>Contact Us</p>
          </Link>
          <Link to="/About">
            <p>About Us</p>
          </Link>
          <img src={logo} alt="Logo" onClick={()=>navigate("/")}></img>
        </div>
      </header>
      <div className="tracker-hrading">
        <h2>Budget Tracker</h2>
      </div>
      <div className="budget-summary">
        <h3>Summary</h3>
        <div className="summary-item">
          <p>
            
            Total Income: <span className="amount">{totalIncome}</span>
          </p>
        </div>
        <div className="summary-item">
          <p>
            Total Expenses: <span className="amount">{totalExpenses}</span>
          </p>
        </div>
        <div className="summary-item">
          <p>
            Overall Balance: <span className={`amount ${overallBalance >= 0 ? 'positive' : 'negative'}`}>{overallBalance}</span>
          </p>
        </div>
      </div>
      <div className="budget-tracker">
        <div className="budget-sections">
          <div className="budget-container">
            <div className="budget-section cash-in-section">
              <h3>Cash In</h3>
              <div className="pie-chart">
                <Pie data={cashInChartData} />
              </div>
              {uniqueCashInPurposes.map((purpose) => (
                <div className="budget-item" key={purpose}>
                  <h4>{purpose}</h4>
                  {transactions
                    .filter((transaction) => transaction.purpose === purpose && transaction.type === 'Cash In')
                    .map((transaction) => (
                      <div className="transaction-item" key={transaction.id}>
                        <p>
                          Amount: <span className="amount">{transaction.amount}</span>
                        </p>
                        <p>
                          Date: <span>{transaction.date}</span>
                        </p>
                      </div>
                    ))}
                </div>
              ))}
            </div>
            <div className="budget-section cash-out-section">
              <h3>Cash Out</h3>
              <div className="pie-chart">
                <Pie data={cashOutChartData} />
              </div>
              {uniqueCashOutPurposes.map((purpose) => (
                <div className="budget-item" key={purpose}>
                  <h4>{purpose}</h4>
                  {transactions
                    .filter((transaction) => transaction.purpose === purpose && transaction.type === 'Cash Out')
                    .map((transaction) => (
                      <div className="transaction-item" key={transaction.id}>
                        <p>
                          Amount: <span className="amount">{transaction.amount}</span>
                        </p>
                        <p>
                          Date: <span>{transaction.date}</span>
                        </p>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="App">
      {showChatbot && <Chatbot />}
      <button className="chatbot-button" onClick={handleChatbotToggle}>
      <FontAwesomeIcon icon={faRobot} className="robot-icon" />
      </button>
    </div>
      </div>
    </>
  );
};

export default BudgetTracker;
