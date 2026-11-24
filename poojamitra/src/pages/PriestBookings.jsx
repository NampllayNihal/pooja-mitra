import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Eye,
  CheckCircle2,
  XCircle,
  Clock3,
  PlayCircle,
  Check,
} from "lucide-react";

import PriestLayout from "../components/PriestLayout";
import {
  getPriestData,
  updateBookingStatus,
} from "../utils/priestStore";

export default function PriestBookings() {
  const [data, setData] = useState(getPriestData());
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    setData(getPriestData());
  }, []);

  const tabs = [
    "All",
    "Pending",
    "Confirmed",
    "Completed",
    "Cancelled",
  ];

  const filteredBookings = useMemo(() => {
    return data.bookings.filter((booking) => {
      const matchesTab =
        activeTab === "All" ||
        booking.status === activeTab;

      const text = `
        ${booking.customer}
        ${booking.service}
        ${booking.location}
        ${booking.id}
      `.toLowerCase();

      return matchesTab && text.includes(search.toLowerCase());
    });
  }, [data.bookings, activeTab, search]);

  const changeStatus = (id, status) => {
    const updated = updateBookingStatus(id, status);
    setData(updated);

    if (selectedBooking?.id === id) {
      setSelectedBooking(
        updated.bookings.find((item) => item.id === id)
      );
    }
  };

  const getStatusClass = (status) => {
    return status.toLowerCase().replaceAll(" ", "-");
  };

  return (
    <PriestLayout
      title="Bookings"
      subtitle="Manage customer booking requests and services"
      profile={data.profile}
    >
      <div className="priest-stats-row">
        <div className="mini-stat">
          <span>Total</span>
          <strong>{data.bookings.length}</strong>
        </div>

        <div className="mini-stat">
          <span>Pending</span>
          <strong>
            {data.bookings.filter((b) => b.status === "Pending").length}
          </strong>
        </div>

        <div className="mini-stat">
          <span>Confirmed</span>
          <strong>
            {data.bookings.filter((b) => b.status === "Confirmed").length}
          </strong>
        </div>

        <div className="mini-stat">
          <span>Completed</span>
          <strong>
            {data.bookings.filter((b) => b.status === "Completed").length}
          </strong>
        </div>
      </div>

      <div className="priest-card">
        <div className="priest-card-header booking-toolbar">
          <div className="priest-tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={activeTab === tab ? "active" : ""}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="priest-search">
            <Search size={18} />
            <input
              placeholder="Search bookings..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="table-wrapper">
          <table className="priest-table">
            <thead>
              <tr>
                <th>Booking</th>
                <th>Customer</th>
                <th>Service</th>
                <th>Date & Time</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>
                    <strong>{booking.id}</strong>
                  </td>

                  <td>{booking.customer}</td>

                  <td>{booking.service}</td>

                  <td>
                    <strong>{booking.date}</strong>
                    <small>{booking.time}</small>
                  </td>

                  <td>₹{booking.amount.toLocaleString()}</td>

                  <td>
                    <span
                      className={`status-badge ${getStatusClass(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="icon-action"
                      onClick={() => setSelectedBooking(booking)}
                    >
                      <Eye size={17} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredBookings.length === 0 && (
            <div className="empty-state">
              No bookings found.
            </div>
          )}
        </div>
      </div>

      {selectedBooking && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedBooking(null)}
        >
          <div
            className="priest-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <span>Booking Details</span>
                <h2>{selectedBooking.id}</h2>
              </div>

              <button
                className="modal-close"
                onClick={() => setSelectedBooking(null)}
              >
                ×
              </button>
            </div>

            <div className="booking-detail-grid">
              <div>
                <label>Customer</label>
                <strong>{selectedBooking.customer}</strong>
              </div>

              <div>
                <label>Phone</label>
                <strong>{selectedBooking.phone}</strong>
              </div>

              <div>
                <label>Service</label>
                <strong>{selectedBooking.service}</strong>
              </div>

              <div>
                <label>Date</label>
                <strong>{selectedBooking.date}</strong>
              </div>

              <div>
                <label>Time</label>
                <strong>{selectedBooking.time}</strong>
              </div>

              <div>
                <label>Duration</label>
                <strong>{selectedBooking.duration}</strong>
              </div>

              <div className="full-detail">
                <label>Location</label>
                <strong>{selectedBooking.location}</strong>
              </div>

              <div className="full-detail">
                <label>Customer Notes</label>
                <strong>
                  {selectedBooking.notes || "No additional notes"}
                </strong>
              </div>

              <div>
                <label>Amount</label>
                <strong>₹{selectedBooking.amount}</strong>
              </div>

              <div>
                <label>Status</label>
                <span
                  className={`status-badge ${getStatusClass(
                    selectedBooking.status
                  )}`}
                >
                  {selectedBooking.status}
                </span>
              </div>
            </div>

            <div className="modal-actions">
              {selectedBooking.status === "Pending" && (
                <>
                  <button
                    className="primary-btn"
                    onClick={() =>
                      changeStatus(
                        selectedBooking.id,
                        "Confirmed"
                      )
                    }
                  >
                    <CheckCircle2 size={17} />
                    Accept Booking
                  </button>

                  <button
                    className="danger-btn"
                    onClick={() =>
                      changeStatus(
                        selectedBooking.id,
                        "Cancelled"
                      )
                    }
                  >
                    <XCircle size={17} />
                    Reject
                  </button>
                </>
              )}

              {selectedBooking.status === "Confirmed" && (
                <button
                  className="primary-btn"
                  onClick={() =>
                    changeStatus(
                      selectedBooking.id,
                      "Service In Progress"
                    )
                  }
                >
                  <PlayCircle size={17} />
                  Start Service
                </button>
              )}

              {selectedBooking.status === "Service In Progress" && (
                <button
                  className="primary-btn"
                  onClick={() =>
                    changeStatus(
                      selectedBooking.id,
                      "Completed"
                    )
                  }
                >
                  <Check size={17} />
                  Mark Completed
                </button>
              )}

              {selectedBooking.status === "Confirmed" && (
                <button
                  className="danger-btn"
                  onClick={() =>
                    changeStatus(
                      selectedBooking.id,
                      "Cancelled"
                    )
                  }
                >
                  <XCircle size={17} />
                  Cancel Booking
                </button>
              )}

              {selectedBooking.status === "Completed" && (
                <div className="completed-message">
                  <CheckCircle2 size={18} />
                  Service completed successfully.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </PriestLayout>
  );
}