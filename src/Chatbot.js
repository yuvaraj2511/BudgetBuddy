import React from 'react';
import './Chatbot.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

class Chatbot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      messages: [
        {
            text: 'Hello, how can I assist you?',
            sender: 'bot',
          },
      ],
    };
  }

  handleChange = (e) => {
    this.setState({ userInput: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { userInput, messages } = this.state;

    if (userInput.trim() !== '') {
      const newMessage = {
        text: userInput,
        sender: 'user',
      };

      this.setState({
        messages: [...messages, newMessage],
        userInput: '',
      });

      // Simulating chatbot response
      setTimeout(() => {
        const botMessage = {
          text: this.generateBotResponse(userInput),
          sender: 'bot',
        };

        this.setState({
          messages: [...this.state.messages, botMessage],
        });
      }, 500);
    }
  };

  generateBotResponse = (userInput) => {
    if (userInput.toLowerCase().includes('support')) {
      return 'For support, please contact us at support@budgetbuddy.com or call us at +91 8667449744.';
    } else if (userInput.toLowerCase().includes('instagram')) {
      return (
        <div>
          You can find us on Instagram at <a href="https://instagram.com/budgetbuddy">@budgetbuddy</a>
        </div>
      );
    } else if (userInput.toLowerCase().includes('twitter')) {
      return (
        <div>
          You can find us on Twitter at <a href="https://twitter.com/budgetbuddy">@budgetbuddy</a>
        </div>
      );
    } else if (userInput.toLowerCase().includes('facebook')) {
      return (
        <div>
          You can find us on Facebook at <a href="https://facebook.com/budgetbuddy">@budgetbuddy</a>.
        </div>
      );
    } else if (userInput.toLowerCase().includes('social media')) {
      return (
        <div>
          You can find us on Instagram at <a href="https://instagram.com/budgetbuddy">@budgetbuddy</a>.<br /><br />
          You can find us on Twitter at <a href="https://twitter.com/budgetbuddy">@budgetbuddy</a>.<br /><br />
          You can find us on Facebook at <a href="https://facebook.com/budgetbuddy">@budgetbuddy</a>.
        </div>
      );
    } else if (userInput.toLowerCase().includes('hello')) {
      return 'Hello! How can I assist you today?';
    } else if (userInput.toLowerCase().includes('finance')) {
      return 'Finance is the management of money and investments. It involves activities such as budgeting, saving, investing, and managing debts. How can I help you with your financial questions?';
    } else if (userInput.toLowerCase().includes('budgeting')) {
      return 'Budgeting is the process of creating a plan to spend and manage your money. It involves tracking your income and expenses and setting financial goals. Would you like tips on how to create a budget?';
    } else if (userInput.toLowerCase().includes('saving')) {
      return 'Saving money is the act of setting aside a portion of your income for future use. It is important for building an emergency fund and reaching your financial goals. How can I assist you with saving money?';
    } else if (userInput.toLowerCase().includes('investing')) {
      return 'Investing is the process of using your money to potentially earn a return or profit. It typically involves buying assets such as stocks, bonds, or real estate. What specific information are you looking for regarding investing?';
    } else if (userInput.toLowerCase().includes('budgetbuddy')) {
      return 'BudgetBuddy is a comprehensive financial management platform that helps you track expenses, create budgets, and achieve your financial goals. It offers features such as expense categorization, goal setting, and personalized insights. How can I assist you with BudgetBuddy?';
    } else if (userInput.toLowerCase().includes('debt')) {
      return 'Debt refers to money that is owed or borrowed. It can include credit card debt, student loans, mortgages, and other types of loans. Proper debt management is important for maintaining financial health. How can I assist you with managing debt?';
    }else {
      return "I apologize for the inconvenience. For further assistance, kindly contact our dedicated support team at support@budgetbuddy.com or call us at +91 8667449744.";
    }
  };

  renderMessages = () => {
    return this.state.messages.map((message, index) => (
      <div
        key={index}
        className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
      >
        {message.text}
      </div>
    ));
  };

  render() {
    return (
      <div className="chat-container">
        <div className="message-display">{this.renderMessages()}</div>
        <form onSubmit={this.handleSubmit} className="input-container">
        <input
          type="text"
          value={this.state.userInput}
          onChange={this.handleChange}
          className="user-input"
          placeholder="Type your message..."
        />
       <button type="submit" className="submit-button">
  <FontAwesomeIcon icon={faArrowRight} className="icon-white" />
</button>
      </form>
      </div>
    );
  }
}

export default Chatbot;