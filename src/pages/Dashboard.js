import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import AddExpense from "../components/Modals/addExpense";
import AddIncome from "../components/Modals/addIncome";
import moment from "moment";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { query } from "firebase/firestore";
import { getDocs } from "firebase/firestore";

// import { Modal } from "antd";
const sampletransactions = [
  {
    name: "Pay day",
    type: "income",
    date: "2023-01-15",
    amount: 2000,
    tag: "salary",
  },
  {
    name: "Dinner",
    type: "expense",
    date: "2023-01-20",
    amount: 500,
    tag: "food",
  },
  {
    name: "Books",
    type: "expense",
    date: "2023-01-25",
    amount: 300,
    tag: "education",
  },
];

function Dashboard() {
  const user = useAuthState;
  const [transaction, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: moment(values.date).format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    addTransaction(newTransaction);
  };

  async function addTransaction(transaction) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);
      toast.success("Transaction Added!");
    } catch (e) {
      console.error("Error adding document: ", e);

      toast.error("Couldn't add transaction");
    }
  }

  // const calculateBalance = () => {
  //   let incomeTotal = 0;
  //   let expensesTotal = 0;

  //   transactions.forEach((transaction) => {
  //     if (transaction.type === "income") {
  //       incomeTotal += transaction.amount;
  //     } else {
  //       expensesTotal += transaction.amount;
  //     }
  //   });

  //   setIncome(incomeTotal);
  //   setExpenses(expensesTotal);
  //   setCurrentBalance(incomeTotal - expensesTotal);
  // };

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      toast.success("Transactions Fetched!");
    }
    setLoading(false);
  }

  return (
    <div>
      <Header />
      {loading ? (
        <p>Loading....</p>
      ) : (
        <>
          <Cards
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
          />
          <AddExpense
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />
          <AddIncome
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
          />
        </>
      )}
    </div>
  );
}

export default Dashboard;
