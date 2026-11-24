import React, { useMemo, useState } from "react";
import {
  Wallet,
  TrendingUp,
  CheckCircle2,
  Clock3,
  IndianRupee,
} from "lucide-react";

import PriestLayout from "../components/PriestLayout";
import { getPriestData } from "../utils/priestStore";

export default function PriestEarnings() {
  const [data] = useState(getPriestData());

  const completed = useMemo(
    () =>
      data.bookings.filter(
        (booking) => booking.status === "Completed"
      ),
    [data.bookings]
  );

  const total = completed.reduce(
    (sum, booking) => sum + booking.amount,
    0
  );

  const commission = Math.round(total * 0.1);
  const net = total - commission;

  return (
    <PriestLayout
      title="Earnings"
      subtitle="Track your bookings, income and payment history"
      profile={data.profile}
    >
      <div className="earnings-cards">
        <div className="earnings-card">
          <div className="earnings-icon">
            <Wallet />
          </div>

          <div>
            <span>Total Earnings</span>
            <h2>₹{total.toLocaleString()}</h2>
          </div>
        </div>

        <div className="earnings-card">
          <div className="earnings-icon">
            <TrendingUp />
          </div>

          <div>
            <span>This Month</span>
            <h2>₹{net.toLocaleString()}</h2>
          </div>
        </div>

        <div className="earnings-card">
          <div className="earnings-icon">
            <CheckCircle2 />
          </div>

          <div>
            <span>Completed Services</span>
            <h2>{completed.length}</h2>
          </div>
        </div>

        <div className="earnings-card">
          <div className="earnings-icon">
            <Clock3 />
          </div>

          <div>
            <span>Pending Settlement</span>
            <h2>₹{commission.toLocaleString()}</h2>
          </div>
        </div>
      </div>

      <div className="earnings-grid">
        <div className="priest-card">
          <div className="priest-card-title">
            <div>
              <h2>Revenue Summary</h2>
              <p>Overview of your service earnings.</p>
            </div>
          </div>

          <div className="revenue-summary">
            <div>
              <span>Gross Earnings</span>
              <strong>
                ₹{total.toLocaleString()}
              </strong>
            </div>

            <div>
              <span>PoojaMitra Commission</span>
              <strong>
                - ₹{commission.toLocaleString()}
              </strong>
            </div>

            <div className="revenue-total">
              <span>Net Earnings</span>
              <strong>
                ₹{net.toLocaleString()}
              </strong>
            </div>
          </div>
        </div>

        <div className="priest-card">
          <div className="priest-card-title">
            <div>
              <h2>Payment Status</h2>
              <p>Current settlement information.</p>
            </div>
          </div>

          <div className="payment-status-box">
            <IndianRupee size={28} />

            <div>
              <strong>Settlement Cycle</strong>
              <p>
                Payments are settled according to the
                PoojaMitra payment policy.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="priest-card">
        <div className="priest-card-title">
          <div>
            <h2>Payment History</h2>
            <p>Completed booking payments.</p>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="priest-table">
            <thead>
              <tr>
                <th>Booking</th>
                <th>Service</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {completed.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.service}</td>
                  <td>{booking.date}</td>
                  <td>{booking.customer}</td>
                  <td>
                    <strong>
                      ₹{booking.amount.toLocaleString()}
                    </strong>
                  </td>
                  <td>
                    <span className="status-badge completed">
                      Paid
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PriestLayout>
  );
}