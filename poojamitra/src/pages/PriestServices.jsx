import React, { useState } from "react";
import {
  Plus,
  Edit3,
  Power,
  Save,
  X,
} from "lucide-react";

import PriestLayout from "../components/PriestLayout";
import {
  getPriestData,
  updateServices,
} from "../utils/priestStore";

export default function PriestServices() {
  const initial = getPriestData();

  const [data, setData] = useState(initial);
  const [services, setServices] = useState(initial.services);
  const [editing, setEditing] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  const [form, setForm] = useState({
    name: "",
    category: "Pooja",
    duration: "2 Hours",
    price: "",
    description: "",
  });

  const editService = (service) => {
    setEditing(service.id);
    setForm(service);
  };

  const saveEdit = () => {
    const updatedServices = services.map((service) =>
      service.id === editing
        ? {
            ...service,
            ...form,
            price: Number(form.price),
          }
        : service
    );

    setServices(updatedServices);
    setData(updateServices(updatedServices));
    setEditing(null);
  };

  const toggleService = (id) => {
    const updatedServices = services.map((service) =>
      service.id === id
        ? {
            ...service,
            active: !service.active,
          }
        : service
    );

    setServices(updatedServices);
    setData(updateServices(updatedServices));
  };

  const addService = () => {
    if (!form.name || !form.price) {
      alert("Please enter service name and price.");
      return;
    }

    const newService = {
      id: Date.now(),
      ...form,
      price: Number(form.price),
      active: true,
    };

    const updatedServices = [
      ...services,
      newService,
    ];

    setServices(updatedServices);
    setData(updateServices(updatedServices));

    setForm({
      name: "",
      category: "Pooja",
      duration: "2 Hours",
      price: "",
      description: "",
    });

    setShowAdd(false);
  };

  return (
    <PriestLayout
      title="My Services"
      subtitle="Manage the pooja and religious services you provide"
      profile={data.profile}
    >
      <div className="service-top-bar">
        <div>
          <h2>Services Offered</h2>
          <p>
            Active services will be visible to customers.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={() => setShowAdd(true)}
        >
          <Plus size={18} />
          Add Service
        </button>
      </div>

      <div className="service-grid">
        {services.map((service) => (
          <div
            className={`service-card ${
              service.active ? "" : "inactive"
            }`}
            key={service.id}
          >
            <div className="service-card-top">
              <div className="service-icon">
                ॐ
              </div>

              <span
                className={`status-badge ${
                  service.active
                    ? "confirmed"
                    : "cancelled"
                }`}
              >
                {service.active
                  ? "Active"
                  : "Inactive"}
              </span>
            </div>

            <h3>{service.name}</h3>

            <span className="service-category">
              {service.category}
            </span>

            <p>{service.description}</p>

            <div className="service-meta">
              <span>{service.duration}</span>
              <strong>
                ₹{service.price.toLocaleString()}
              </strong>
            </div>

            <div className="service-actions">
              <button
                className="secondary-btn"
                onClick={() => editService(service)}
              >
                <Edit3 size={16} />
                Edit
              </button>

              <button
                className="secondary-btn"
                onClick={() =>
                  toggleService(service.id)
                }
              >
                <Power size={16} />
                {service.active
                  ? "Disable"
                  : "Enable"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {(editing || showAdd) && (
        <div
          className="modal-overlay"
          onClick={() => {
            setEditing(null);
            setShowAdd(false);
          }}
        >
          <div
            className="priest-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <span>
                  {editing
                    ? "Edit Service"
                    : "Add New Service"}
                </span>
                <h2>
                  {editing
                    ? "Service Details"
                    : "New Service"}
                </h2>
              </div>

              <button
                className="modal-close"
                onClick={() => {
                  setEditing(null);
                  setShowAdd(false);
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="form-grid">
              <div className="form-group full">
                <label>Service Name</label>
                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  placeholder="Example: Durga Pooja"
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      category: e.target.value,
                    })
                  }
                >
                  <option>Pooja</option>
                  <option>Ceremony</option>
                  <option>Homam</option>
                  <option>Havan</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Duration</label>
                <select
                  value={form.duration}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      duration: e.target.value,
                    })
                  }
                >
                  <option>1 Hour</option>
                  <option>2 Hours</option>
                  <option>3 Hours</option>
                  <option>4 Hours</option>
                  <option>5 Hours</option>
                </select>
              </div>

              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      price: e.target.value,
                    })
                  }
                  placeholder="₹"
                />
              </div>

              <div className="form-group full">
                <label>Description</label>
                <textarea
                  rows="4"
                  value={form.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: e.target.value,
                    })
                  }
                  placeholder="Describe the service..."
                />
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="secondary-btn"
                onClick={() => {
                  setEditing(null);
                  setShowAdd(false);
                }}
              >
                Cancel
              </button>

              <button
                className="primary-btn"
                onClick={editing ? saveEdit : addService}
              >
                <Save size={17} />
                {editing
                  ? "Save Changes"
                  : "Add Service"}
              </button>
            </div>
          </div>
        </div>
      )}
    </PriestLayout>
  );
}