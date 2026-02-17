import { useState } from "react";
import Axios from "axios";
import { FaSpinner } from "react-icons/fa";
import "./App.css";

function App() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const payHandler = async (e) => {
    e.preventDefault();

    if (!phoneNumber || !amount) {
      setMessage("Please fill in all fields");
      setShowPopup(true);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const formattedPhone = phoneNumber.replace(/^0/, "254");

      await Axios.post("https://stk-push-project-1.onrender.com/api", {
        phoneNumber: formattedPhone,
        amount,
      });

      setMessage("STK Push sent! Check your phone to enter PIN.");
    } catch (error) {
      setMessage("Payment failed. Please try again.");
    }

    setLoading(false);
    setShowPopup(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      {/* Payment Card */}
      <div className="bg-white shadow-xl rounded-2xl p-8 w-96 text-center">

        <h1 className="text-2xl font-semibold mb-6">
          Pay with <span className="text-green-600 font-bold">M-Pesa</span>
        </h1>

        <form onSubmit={payHandler} className="flex flex-col space-y-4">

          <input
            type="tel"
            placeholder="Phone Number (07XXXXXXXX)"
            className="border rounded-lg p-3 text-center focus:outline-green-500"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <input
            type="number"
            placeholder="Amount (KES)"
            className="border rounded-lg p-3 text-center focus:outline-green-500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? (
              <span className="flex justify-center items-center gap-2">
                <FaSpinner className="animate-spin" />
                Processing...
              </span>
            ) : (
              "Pay Now"
            )}
          </button>
        </form>

      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center w-80">

            <h2 className="text-lg font-semibold mb-3">Payment Status</h2>

            <p className="mb-5">{message}</p>

            <button
              onClick={() => setShowPopup(false)}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              OK
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

export default App;
