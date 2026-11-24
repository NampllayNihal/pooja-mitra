import React, { useState } from "react";
import {
  CalendarDays,
  Clock3,
  Save,
} from "lucide-react";

import PriestLayout from "../components/PriestLayout";
import {
  getPriestData,
  updateAvailability,
} from "../utils/priestStore";

export default function PriestCalendar() {
  const [data, setData] = useState(getPriestData());
  const [availability, setAvailability] = useState(
    getPriestData().availability
  );

  const days = Object.keys(availability);

  const updateDay = (day, field, value) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const saveChanges = () => {
    const updated = updateAvailability(availability);
    setData(updated);

    alert("Availability updated successfully.");
  };

  return (
    <PriestLayout
      title="Calendar & Availability"
      subtitle="Manage the days and timings when customers can book you"
      profile={data.profile}
    >
      <div className="info-banner">
        <CalendarDays size={21} />
        <div>
          <strong>Booking availability</strong>
          <p>
            Customers can request bookings only during your available
            days and time slots.
          </p>
        </div>
      </div>

      <div className="priest-card">
        <div className="priest-card-title">
          <div>
            <h2>Weekly Availability</h2>
            <p>Set your regular working schedule.</p>
          </div>

          <button
            className="primary-btn"
            onClick={saveChanges}
          >
            <Save size={17} />
            Save Availability
          </button>
        </div>

        <div className="availability-list">
          {days.map((day) => {
            const item = availability[day];

            return (
              <div
                className={`availability-row ${
                  item.enabled ? "" : "disabled"
                }`}
                key={day}
              >
                <div className="day-name">
                  <strong>{day}</strong>
                </div>

                <label className="switch">
                  <input
                    type="checkbox"
                    checked={item.enabled}
                    onChange={(e) =>
                      updateDay(
                        day,
                        "enabled",
                        e.target.checked
                      )
                    }
                  />
                  <span />
                </label>

                <div className="availability-status">
                  {item.enabled ? "Available" : "Unavailable"}
                </div>

                <div className="time-input">
                  <Clock3 size={17} />

                  <input
                    type="time"
                    disabled={!item.enabled}
                    value={item.from}
                    onChange={(e) =>
                      updateDay(
                        day,
                        "from",
                        e.target.value
                      )
                    }
                  />

                  <span>to</span>

                  <input
                    type="time"
                    disabled={!item.enabled}
                    value={item.to}
                    onChange={(e) =>
                      updateDay(
                        day,
                        "to",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="calendar-note">
        <Clock3 size={19} />
        <span>
          For special dates, you can later add date-specific
          availability through the backend calendar system.
        </span>
      </div>
    </PriestLayout>
  );
}