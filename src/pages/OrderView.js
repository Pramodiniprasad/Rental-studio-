import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiPrinter, FiDownload, FiCopy } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import "./OrderView.css";

export default function OrderView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const order = {
    id,
    customer: "Erer",
    mobile: "1234567890",
    bookingDate: "27 Sept, 2025",
    products: [
      {
        id: 1,
        name: "PRWBLAKBLAZER-0 : BLACK GOWN",
        deliveryDate: "27/09/2025",
        returnDate: "28/09/2025",
        amount: 2000,
      },
    ],
  };

  return (
    <div className="order-view-container">
      <div className="breadcrumb">
        <span className="link" onClick={() => navigate("/orders")}>Orders</span> &gt; <span>View</span>
      </div>

      <div className="header-actions">
        <button className="whatsapp-btn">
          <FaWhatsapp /> Share on Whatsapp
        </button>
        <button><FiCopy /> Copy</button>
        <button><FiPrinter /> Print Invoice</button>
        <button className="download-btn"><FiDownload /> Download</button>
      </div>

      <div className="invoice-card">
        <div className="invoice-header">
          <h3>Invoice # {order.id}</h3>
        </div>

        <div className="customer-section">
          <div>
            <h4>{order.customer}</h4>
            <p>{order.mobile}</p>
          </div>
          <span className="date-tag">{order.bookingDate}</span>
        </div>

        <table className="product-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Delivery Date</th>
              <th>Return Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {order.products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.deliveryDate}</td>
                <td>{p.returnDate}</td>
                <td>₹{p.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
