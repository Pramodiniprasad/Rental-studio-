import React from "react";
import "./CreateBooking.css"; 

function CreateBooking() {
  return (
    <div className="create-booking-container">
      <div className="breadcrumb">Home &gt; <span>Create Booking</span></div>

      <h2 className="heading">Create Booking</h2>

      <div className="booking-form">
        <div className="form-section left">
          <div className="input-row">
            <input type="text" placeholder="Customer Name" />
            <input type="text" placeholder="Mobile No." />
            <input type="text" placeholder="Alternate No." />
            <select>
              <option>Select Booking Type</option>
              <option>Online</option>
              <option>Offline</option>
            </select>
          </div>

          <div className="product-row">
            <select>
              <option>Select a product</option>
              <option>PRWBLAKBLAZER-0 : BLACK GOWN</option>
              <option>PRW-0 : GOWN BLUE</option>
              <option>PRW-34 : RED</option>
            </select>
            <input type="number" placeholder="Amount" />
            <input type="date" />
            <input type="date" />
            <button>+ Add Item</button>
          </div>
        </div>

        <div className="form-section right">
          <input type="text" placeholder="Deposit (₹)" />
          <input type="text" placeholder="Advance Payment (₹)" />
          <select>
            <option>Select Payment Mode</option>
            <option>Cash</option>
            <option>Online</option>
          </select>

          <div className="discount-toggle">
            <label>
              <input type="radio" name="discount" defaultChecked />
              Flat (₹)
            </label>
            <label>
              <input type="radio" name="discount" />
              Percentage (%)
            </label>
          </div>

          <input type="text" placeholder="Discount ₹" />
          <textarea placeholder="Notes (max 500 characters)" maxLength={500} />

          <div className="summary-box">
            <div>Amount: ₹0</div>
            <div>Deposit: ₹0</div>
            <div>Total: ₹0</div>
          </div>

          <div className="actions">
            <button className="cancel-btn">Cancel</button>
            <button className="book-btn">Book Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBooking;
