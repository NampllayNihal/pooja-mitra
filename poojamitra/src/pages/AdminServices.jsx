import { useMemo, useState } from "react";

import {
  LayoutDashboard,
  Users,
  UserCheck,
  UserRound,
  CalendarDays,
  BriefcaseBusiness,
  Video,
  CreditCard,
  FileText,
  Bell,
  Settings,
  LogOut,
  Search,
  Plus,
  Edit3,
  Trash2,
  Eye,
  X,
  Menu,
  ArrowLeft,
  IndianRupee,
  Clock3,
  CheckCircle2,
  XCircle,
  MapPin,
  Receipt,
  Power,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import "../styles/adminServices.css";

function AdminServices() {
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [search, setSearch] = useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [showViewModal, setShowViewModal] =
    useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [selectedService, setSelectedService] =
    useState(null);

  const [services, setServices] = useState([
    {
      id: "PM-SRV-1001",
      name: "Satyanarayana Swamy Pooja",
      category: "Pooja",
      priest: "Sri Ramesh Sharma",
      price: 2500,
      duration: "2 Hours",
      location: "Hyderabad",
      status: "Active",
      bookings: 42,
      description:
        "Traditional Satyanarayana Swamy Pooja performed according to prescribed rituals.",
    },

    {
      id: "PM-SRV-1002",
      name: "Griha Pravesh Pooja",
      category: "House Pooja",
      priest: "Sri Venkatesh Rao",
      price: 4500,
      duration: "3 Hours",
      location: "Hyderabad",
      status: "Active",
      bookings: 28,
      description:
        "Complete housewarming pooja and traditional Griha Pravesh rituals.",
    },

    {
      id: "PM-SRV-1003",
      name: "Lakshmi Pooja",
      category: "Pooja",
      priest: "Sri Anand Kumar",
      price: 1800,
      duration: "1.5 Hours",
      location: "Hyderabad",
      status: "Active",
      bookings: 35,
      description:
        "Lakshmi Pooja performed for prosperity, wealth and household well-being.",
    },

    {
      id: "PM-SRV-1004",
      name: "Ganesh Pooja",
      category: "Pooja",
      priest: "Sri Suresh Acharya",
      price: 1500,
      duration: "1 Hour",
      location: "Hyderabad",
      status: "Active",
      bookings: 51,
      description:
        "Lord Ganesha Pooja performed for removing obstacles and starting new activities.",
    },

    {
      id: "PM-SRV-1005",
      name: "Durga Pooja",
      category: "Special Pooja",
      priest: "Sri Krishna Murthy",
      price: 2200,
      duration: "2 Hours",
      location: "Hyderabad",
      status: "Inactive",
      bookings: 19,
      description:
        "Traditional Durga Pooja performed with devotional rituals and offerings.",
    },

    {
      id: "PM-SRV-1006",
      name: "Navagraha Pooja",
      category: "Astrology",
      priest: "Sri Hari Prasad",
      price: 3200,
      duration: "2.5 Hours",
      location: "Hyderabad",
      status: "Active",
      bookings: 24,
      description:
        "Navagraha Pooja performed to seek blessings and reduce planetary obstacles.",
    },
  ]);

  const [newService, setNewService] =
    useState({
      name: "",
      category: "Pooja",
      priest: "",
      price: "",
      duration: "",
      location: "Hyderabad",
      description: "",
    });

  const categories = [
    "All",
    "Pooja",
    "House Pooja",
    "Special Pooja",
    "Astrology",
  ];

  const filteredServices = useMemo(() => {
    const searchText =
      search.toLowerCase().trim();

    return services.filter((service) => {
      const matchesSearch =
        service.name
          .toLowerCase()
          .includes(searchText) ||
        service.id
          .toLowerCase()
          .includes(searchText) ||
        service.priest
          .toLowerCase()
          .includes(searchText) ||
        service.location
          .toLowerCase()
          .includes(searchText) ||
        service.category
          .toLowerCase()
          .includes(searchText);

      const matchesCategory =
        categoryFilter === "All" ||
        service.category === categoryFilter;

      const matchesStatus =
        statusFilter === "All" ||
        service.status === statusFilter;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [
    services,
    search,
    categoryFilter,
    statusFilter,
  ]);

  const activeServices = services.filter(
    (service) =>
      service.status === "Active"
  ).length;

  const inactiveServices = services.filter(
    (service) =>
      service.status === "Inactive"
  ).length;

  const totalBookings = services.reduce(
    (total, service) =>
      total + service.bookings,
    0
  );

  const totalCategories = new Set(
    services.map(
      (service) => service.category
    )
  ).size;

  const handleNavigation = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  const handleView = (service) => {
    setSelectedService(service);
    setShowViewModal(true);
  };

  const handleEdit = (service) => {
    setSelectedService({
      ...service,
    });

    setShowViewModal(false);
    setShowEditModal(true);
  };

  const handleDelete = (service) => {
    if (service.bookings > 0) {
      const confirmed = window.confirm(
        `${service.name} has ${service.bookings} existing bookings.\n\nIt is safer to deactivate this service instead of deleting it.\n\nDo you still want to permanently delete it?`
      );

      if (!confirmed) return;
    } else {
      const confirmed = window.confirm(
        `Are you sure you want to delete "${service.name}"?`
      );

      if (!confirmed) return;
    }

    setServices((current) =>
      current.filter(
        (item) => item.id !== service.id
      )
    );

    if (
      selectedService?.id === service.id
    ) {
      setSelectedService(null);
      setShowViewModal(false);
      setShowEditModal(false);
    }
  };

  const handleToggleStatus = (id) => {
    setServices((current) =>
      current.map((service) =>
        service.id === id
          ? {
              ...service,
              status:
                service.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : service
      )
    );

    setSelectedService((current) =>
      current?.id === id
        ? {
            ...current,
            status:
              current.status === "Active"
                ? "Inactive"
                : "Active",
          }
        : current
    );
  };

  const generateServiceId = () => {
    const numbers = services
      .map((service) =>
        Number(
          service.id.replace(
            "PM-SRV-",
            ""
          )
        )
      )
      .filter((number) =>
        Number.isFinite(number)
      );

    const nextNumber =
      numbers.length > 0
        ? Math.max(...numbers) + 1
        : 1001;

    return `PM-SRV-${nextNumber}`;
  };

  const handleAddService = (event) => {
    event.preventDefault();

    if (
      !newService.name.trim() ||
      !newService.price ||
      !newService.duration.trim()
    ) {
      alert(
        "Please fill all required fields."
      );
      return;
    }

    const service = {
      id: generateServiceId(),
      name: newService.name.trim(),
      category: newService.category,
      priest:
        newService.priest.trim() ||
        "Not Assigned",
      price: Number(newService.price),
      duration:
        newService.duration.trim(),
      location:
        newService.location.trim() ||
        "Hyderabad",
      status: "Active",
      bookings: 0,
      description:
        newService.description.trim(),
    };

    setServices((current) => [
      ...current,
      service,
    ]);

    setNewService({
      name: "",
      category: "Pooja",
      priest: "",
      price: "",
      duration: "",
      location: "Hyderabad",
      description: "",
    });

    setShowAddModal(false);
  };

  const handleUpdateService = (event) => {
    event.preventDefault();

    if (
      !selectedService.name.trim() ||
      !selectedService.price ||
      !selectedService.duration.trim()
    ) {
      alert(
        "Please fill all required fields."
      );
      return;
    }

    const updatedService = {
      ...selectedService,
      name: selectedService.name.trim(),
      priest:
        selectedService.priest.trim() ||
        "Not Assigned",
      location:
        selectedService.location.trim() ||
        "Hyderabad",
      duration:
        selectedService.duration.trim(),
      price: Number(
        selectedService.price
      ),
      description:
        selectedService.description?.trim() ||
        "",
    };

    setServices((current) =>
      current.map((service) =>
        service.id ===
        updatedService.id
          ? updatedService
          : service
      )
    );

    setSelectedService(updatedService);
    setShowEditModal(false);
  };

  const resetFilters = () => {
    setSearch("");
    setCategoryFilter("All");
    setStatusFilter("All");
  };

  const handleViewBookings = (service) => {
    navigate("/admin-bookings", {
      state: {
        service: {
          id: service.id,
          name: service.name,
        },
      },
    });
  };

  const handleViewPayments = (service) => {
    navigate("/admin-payments", {
      state: {
        service: {
          id: service.id,
          name: service.name,
        },
      },
    });
  };

  return (
    <div className="admin-services-page">

      {/* MOBILE HEADER */}
      <div className="admin-mobile-header">

        <button
          type="button"
          className="admin-icon-button"
          onClick={() =>
            setMobileMenuOpen(true)
          }
          aria-label="Open admin menu"
        >
          <Menu size={22} />
        </button>

        <div className="admin-mobile-brand">
          PoojaMitra
        </div>

        <div className="admin-mobile-spacer" />

      </div>

      {/* OVERLAY */}
      {mobileMenuOpen && (
        <button
          type="button"
          className="admin-sidebar-overlay"
          onClick={() =>
            setMobileMenuOpen(false)
          }
          aria-label="Close admin menu"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`admin-sidebar ${
          mobileMenuOpen
            ? "admin-sidebar-open"
            : ""
        }`}
      >

        <div className="admin-sidebar-header">

          <div className="admin-brand">
            PoojaMitra
          </div>

          <button
            type="button"
            className="admin-mobile-close"
            onClick={() =>
              setMobileMenuOpen(false)
            }
            aria-label="Close menu"
          >
            <X size={20} />
          </button>

        </div>

        <nav className="admin-sidebar-nav">

          <button
            type="button"
            onClick={() =>
              handleNavigation(
                "/admin-dashboard"
              )
            }
            className="admin-nav-item"
          >
            <LayoutDashboard size={19} />
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            onClick={() =>
              handleNavigation(
                "/admin-priest-applications"
              )
            }
            className="admin-nav-item"
          >
            <UserCheck size={19} />
            <span>
              Priest Applications
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              handleNavigation(
                "/admin-approved-priests"
              )
            }
            className="admin-nav-item"
          >
            <Users size={19} />
            <span>
              Approved Priests
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              handleNavigation(
                "/admin-customers"
              )
            }
            className="admin-nav-item"
          >
            <UserRound size={19} />
            <span>Customers</span>
          </button>

          <button
            type="button"
            onClick={() =>
              handleNavigation(
                "/admin-bookings"
              )
            }
            className="admin-nav-item"
          >
            <CalendarDays size={19} />
            <span>Bookings</span>
          </button>

          <button
            type="button"
            className="admin-nav-item active"
          >
            <BriefcaseBusiness size={19} />
            <span>Services</span>
          </button>

          <button
            type="button"
            onClick={() =>
              handleNavigation(
                "/admin-interviews"
              )
            }
            className="admin-nav-item"
          >
            <Video size={19} />
            <span>Interviews</span>
          </button>

          <button
            type="button"
            onClick={() =>
              handleNavigation(
                "/admin-payments"
              )
            }
            className="admin-nav-item"
          >
            <CreditCard size={19} />
            <span>Payments</span>
          </button>

          <button
            type="button"
            onClick={() =>
              handleNavigation(
                "/admin-reports"
              )
            }
            className="admin-nav-item"
          >
            <FileText size={19} />
            <span>Reports</span>
          </button>

          <button
            type="button"
            onClick={() =>
              handleNavigation(
                "/admin-notifications"
              )
            }
            className="admin-nav-item"
          >
            <Bell size={19} />
            <span>Notifications</span>
          </button>

          <button
            type="button"
            onClick={() =>
              handleNavigation(
                "/admin-settings"
              )
            }
            className="admin-nav-item"
          >
            <Settings size={19} />
            <span>Settings</span>
          </button>

        </nav>

        <button
          type="button"
          className="admin-logout-button"
          onClick={() =>
            handleNavigation("/login")
          }
        >
          <LogOut size={19} />
          <span>Logout</span>
        </button>

      </aside>

      {/* MAIN */}
      <main className="admin-main-content">

        <div className="admin-page-topbar">

          <button
            type="button"
            className="admin-back-button"
            onClick={() =>
              navigate("/admin-dashboard")
            }
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </button>

        </div>

        <div className="admin-page-heading">

          <div>
            <h1>Services</h1>

            <p>
              Manage PoojaMitra services and
              pooja offerings.
            </p>
          </div>

          <button
            type="button"
            className="admin-primary-button"
            onClick={() =>
              setShowAddModal(true)
            }
          >
            <Plus size={18} />
            Add Service
          </button>

        </div>

        {/* STATS */}
        <section className="admin-stats-grid">

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <BriefcaseBusiness
                size={21}
              />
            </div>

            <div>
              <span>
                Total Services
              </span>

              <strong>
                {services.length}
              </strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <CheckCircle2 size={21} />
            </div>

            <div>
              <span>
                Active Services
              </span>

              <strong>
                {activeServices}
              </strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <XCircle size={21} />
            </div>

            <div>
              <span>
                Inactive Services
              </span>

              <strong>
                {inactiveServices}
              </strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <CalendarDays size={21} />
            </div>

            <div>
              <span>
                Total Bookings
              </span>

              <strong>
                {totalBookings}
              </strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <BriefcaseBusiness
                size={21}
              />
            </div>

            <div>
              <span>Categories</span>

              <strong>
                {totalCategories}
              </strong>
            </div>
          </div>

        </section>

        {/* FILTERS */}
        <section className="admin-services-toolbar">

          <div className="admin-search-box">

            <Search size={19} />

            <input
              type="text"
              placeholder="Search service, ID, priest, category or location..."
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
            />

          </div>

          <div className="admin-filter-group">

            <select
              value={categoryFilter}
              onChange={(event) =>
                setCategoryFilter(
                  event.target.value
                )
              }
            >
              {categories.map(
                (category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category === "All"
                      ? "All Categories"
                      : category}
                  </option>
                )
              )}
            </select>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value
                )
              }
            >
              <option value="All">
                All Status
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>

            {(search ||
              categoryFilter !== "All" ||
              statusFilter !== "All") && (
              <button
                type="button"
                className="admin-reset-button"
                onClick={resetFilters}
              >
                Reset
              </button>
            )}

          </div>

        </section>

        {/* SERVICE DIRECTORY */}
        <section className="admin-services-table-wrapper">

          <div className="admin-section-header">

            <div>
              <h2>
                Service Directory
              </h2>

              <p>
                Showing{" "}
                {filteredServices.length}{" "}
                of {services.length} services
              </p>
            </div>

          </div>

          {filteredServices.length ===
          0 ? (
            <div className="admin-empty-state">

              <BriefcaseBusiness
                size={42}
              />

              <h3>
                No services found
              </h3>

              <p>
                Try changing your search or
                filters.
              </p>

            </div>
          ) : (
            <div className="admin-table-scroll">

              <table className="admin-services-table">

                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Category</th>
                    <th>Priest</th>
                    <th>Price</th>
                    <th>Duration</th>
                    <th>Bookings</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredServices.map(
                    (service) => (
                      <tr key={service.id}>

                        <td>

                          <div className="service-name-cell">

                            <div className="service-icon">
                              <BriefcaseBusiness
                                size={18}
                              />
                            </div>

                            <div>

                              <strong>
                                {service.name}
                              </strong>

                              <span>
                                {service.id}
                              </span>

                            </div>

                          </div>

                        </td>

                        <td>
                          {service.category}
                        </td>

                        <td>
                          {service.priest}
                        </td>

                        <td>

                          <div className="price-cell">

                            <IndianRupee
                              size={14}
                            />

                            {service.price.toLocaleString(
                              "en-IN"
                            )}

                          </div>

                        </td>

                        <td>

                          <div className="duration-cell">

                            <Clock3 size={15} />

                            {service.duration}

                          </div>

                        </td>

                        <td>
                          {service.bookings}
                        </td>

                        <td>

                          <button
                            type="button"
                            className={`service-status ${
                              service.status ===
                              "Active"
                                ? "active"
                                : "inactive"
                            }`}
                            onClick={() =>
                              handleToggleStatus(
                                service.id
                              )
                            }
                            title={
                              service.status ===
                              "Active"
                                ? "Deactivate service"
                                : "Activate service"
                            }
                          >
                            {service.status ===
                            "Active" ? (
                              <CheckCircle2
                                size={14}
                              />
                            ) : (
                              <XCircle
                                size={14}
                              />
                            )}

                            {service.status}
                          </button>

                        </td>

                        <td>

                          <div className="service-actions">

                            <button
                              type="button"
                              title="View"
                              onClick={() =>
                                handleView(
                                  service
                                )
                              }
                            >
                              <Eye size={17} />
                            </button>

                            <button
                              type="button"
                              title="Edit"
                              onClick={() =>
                                handleEdit(
                                  service
                                )
                              }
                            >
                              <Edit3 size={17} />
                            </button>

                            <button
                              type="button"
                              title="Delete"
                              className="delete-action"
                              onClick={() =>
                                handleDelete(
                                  service
                                )
                              }
                            >
                              <Trash2
                                size={17}
                              />
                            </button>

                          </div>

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>
          )}

        </section>

        {/* MOBILE SERVICE CARDS */}
        <section className="admin-services-mobile-list">

          {filteredServices.length ===
          0 ? (
            <div className="admin-empty-state">

              <BriefcaseBusiness
                size={42}
              />

              <h3>
                No services found
              </h3>

              <p>
                Try changing your search or
                filters.
              </p>

            </div>
          ) : (
            filteredServices.map(
              (service) => (
                <div
                  className="admin-service-card"
                  key={service.id}
                >

                  <div className="admin-service-card-header">

                    <div className="service-name-cell">

                      <div className="service-icon">
                        <BriefcaseBusiness
                          size={18}
                        />
                      </div>

                      <div>

                        <strong>
                          {service.name}
                        </strong>

                        <span>
                          {service.id}
                        </span>

                      </div>

                    </div>

                    <button
                      type="button"
                      className={`service-status ${
                        service.status ===
                        "Active"
                          ? "active"
                          : "inactive"
                      }`}
                      onClick={() =>
                        handleToggleStatus(
                          service.id
                        )
                      }
                    >
                      {service.status}
                    </button>

                  </div>

                  <div className="admin-service-card-details">

                    <div>
                      <span>Category</span>
                      <strong>
                        {service.category}
                      </strong>
                    </div>

                    <div>
                      <span>Priest</span>
                      <strong>
                        {service.priest}
                      </strong>
                    </div>

                    <div>
                      <span>Price</span>
                      <strong>
                        ₹
                        {service.price.toLocaleString(
                          "en-IN"
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>Duration</span>
                      <strong>
                        {service.duration}
                      </strong>
                    </div>

                    <div>
                      <span>Bookings</span>
                      <strong>
                        {service.bookings}
                      </strong>
                    </div>

                    <div>
                      <span>Location</span>
                      <strong>
                        {service.location}
                      </strong>
                    </div>

                  </div>

                  <div className="admin-service-card-actions">

                    <button
                      type="button"
                      onClick={() =>
                        handleView(service)
                      }
                    >
                      <Eye size={16} />
                      View
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleEdit(service)
                      }
                    >
                      <Edit3 size={16} />
                      Edit
                    </button>

                    <button
                      type="button"
                      className="delete-action"
                      onClick={() =>
                        handleDelete(service)
                      }
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>

                  </div>

                </div>
              )
            )
          )}

        </section>

      </main>

      {/* ADD SERVICE MODAL */}
      {showAddModal && (
        <div
          className="admin-modal-overlay"
          onClick={() =>
            setShowAddModal(false)
          }
        >

          <div
            className="admin-modal admin-service-form-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="admin-modal-header">

              <div>
                <h2>
                  Add New Service
                </h2>

                <p>
                  Create a new PoojaMitra
                  service.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowAddModal(false)
                }
              >
                <X size={20} />
              </button>

            </div>

            <form
              onSubmit={handleAddService}
            >

              <div className="admin-form-grid">

                <div className="admin-form-group full-width">

                  <label>
                    Service Name{" "}
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    value={newService.name}
                    onChange={(event) =>
                      setNewService({
                        ...newService,
                        name: event.target.value,
                      })
                    }
                    placeholder="Enter service name"
                  />

                </div>

                <div className="admin-form-group">

                  <label>
                    Category
                  </label>

                  <select
                    value={
                      newService.category
                    }
                    onChange={(event) =>
                      setNewService({
                        ...newService,
                        category:
                          event.target.value,
                      })
                    }
                  >
                    <option>
                      Pooja
                    </option>

                    <option>
                      House Pooja
                    </option>

                    <option>
                      Special Pooja
                    </option>

                    <option>
                      Astrology
                    </option>
                  </select>

                </div>

                <div className="admin-form-group">

                  <label>Priest</label>

                  <input
                    type="text"
                    value={
                      newService.priest
                    }
                    onChange={(event) =>
                      setNewService({
                        ...newService,
                        priest:
                          event.target.value,
                      })
                    }
                    placeholder="Assign priest"
                  />

                </div>

                <div className="admin-form-group">

                  <label>
                    Price{" "}
                    <span>*</span>
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={newService.price}
                    onChange={(event) =>
                      setNewService({
                        ...newService,
                        price:
                          event.target.value,
                      })
                    }
                    placeholder="Enter price"
                  />

                </div>

                <div className="admin-form-group">

                  <label>
                    Duration{" "}
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    value={
                      newService.duration
                    }
                    onChange={(event) =>
                      setNewService({
                        ...newService,
                        duration:
                          event.target.value,
                      })
                    }
                    placeholder="e.g. 2 Hours"
                  />

                </div>

                <div className="admin-form-group">

                  <label>
                    Location
                  </label>

                  <input
                    type="text"
                    value={
                      newService.location
                    }
                    onChange={(event) =>
                      setNewService({
                        ...newService,
                        location:
                          event.target.value,
                      })
                    }
                    placeholder="Service location"
                  />

                </div>

                <div className="admin-form-group full-width">

                  <label>
                    Description
                  </label>

                  <textarea
                    rows="4"
                    value={
                      newService.description
                    }
                    onChange={(event) =>
                      setNewService({
                        ...newService,
                        description:
                          event.target.value,
                      })
                    }
                    placeholder="Enter service description"
                  />

                </div>

              </div>

              <div className="admin-modal-footer">

                <button
                  type="button"
                  className="admin-secondary-button"
                  onClick={() =>
                    setShowAddModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="admin-primary-button"
                >
                  <Plus size={17} />
                  Add Service
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* VIEW SERVICE MODAL */}
      {showViewModal &&
        selectedService && (
          <div
            className="admin-modal-overlay"
            onClick={() =>
              setShowViewModal(false)
            }
          >

            <div
              className="admin-modal admin-view-service-modal"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              <div className="admin-modal-header">

                <div>
                  <h2>
                    Service Details
                  </h2>

                  <p>
                    {selectedService.id}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowViewModal(false)
                  }
                >
                  <X size={20} />
                </button>

              </div>

              <div className="service-detail-icon">
                <BriefcaseBusiness
                  size={28}
                />
              </div>

              <h3 className="service-detail-title">
                {selectedService.name}
              </h3>

              <span
                className={`service-status detail-status ${
                  selectedService.status ===
                  "Active"
                    ? "active"
                    : "inactive"
                }`}
              >
                {selectedService.status}
              </span>

              <div className="service-detail-grid">

                <div>
                  <span>
                    Category
                  </span>

                  <strong>
                    {
                      selectedService.category
                    }
                  </strong>
                </div>

                <div>
                  <span>
                    Priest
                  </span>

                  <strong>
                    {
                      selectedService.priest
                    }
                  </strong>
                </div>

                <div>
                  <span>
                    Price
                  </span>

                  <strong>
                    ₹
                    {selectedService.price.toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>

                <div>
                  <span>
                    Duration
                  </span>

                  <strong>
                    {
                      selectedService.duration
                    }
                  </strong>
                </div>

                <div>
                  <span>
                    Location
                  </span>

                  <strong>
                    <MapPin size={14} />
                    {
                      selectedService.location
                    }
                  </strong>
                </div>

                <div>
                  <span>
                    Total Bookings
                  </span>

                  <strong>
                    {
                      selectedService.bookings
                    }
                  </strong>
                </div>

              </div>

              <div className="service-description">

                <span>
                  Description
                </span>

                <p>
                  {selectedService.description ||
                    "No description available."}
                </p>

              </div>

              {/* SERVICE ACTIONS */}
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  flexWrap: "wrap",
                  marginTop: "18px",
                }}
              >

                <button
                  type="button"
                  className="admin-secondary-button"
                  onClick={() =>
                    handleViewBookings(
                      selectedService
                    )
                  }
                >
                  <CalendarDays
                    size={16}
                  />
                  Bookings
                </button>

                <button
                  type="button"
                  className="admin-secondary-button"
                  onClick={() =>
                    handleViewPayments(
                      selectedService
                    )
                  }
                >
                  <Receipt size={16} />
                  Payments
                </button>

                <button
                  type="button"
                  className="admin-secondary-button"
                  onClick={() =>
                    handleToggleStatus(
                      selectedService.id
                    )
                  }
                >
                  <Power size={16} />
                  {selectedService.status ===
                  "Active"
                    ? "Deactivate"
                    : "Activate"}
                </button>

              </div>

              <div className="admin-modal-footer">

                <button
                  type="button"
                  className="admin-secondary-button"
                  onClick={() =>
                    setShowViewModal(false)
                  }
                >
                  Close
                </button>

                <button
                  type="button"
                  className="admin-primary-button"
                  onClick={() =>
                    handleEdit(
                      selectedService
                    )
                  }
                >
                  <Edit3 size={17} />
                  Edit Service
                </button>

              </div>

            </div>

          </div>
        )}

      {/* EDIT SERVICE MODAL */}
      {showEditModal &&
        selectedService && (
          <div
            className="admin-modal-overlay"
            onClick={() =>
              setShowEditModal(false)
            }
          >

            <div
              className="admin-modal admin-service-form-modal"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              <div className="admin-modal-header">

                <div>
                  <h2>
                    Edit Service
                  </h2>

                  <p>
                    {selectedService.id}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowEditModal(false)
                  }
                >
                  <X size={20} />
                </button>

              </div>

              <form
                onSubmit={
                  handleUpdateService
                }
              >

                <div className="admin-form-grid">

                  <div className="admin-form-group full-width">

                    <label>
                      Service Name
                    </label>

                    <input
                      type="text"
                      value={
                        selectedService.name
                      }
                      onChange={(event) =>
                        setSelectedService({
                          ...selectedService,
                          name: event.target.value,
                        })
                      }
                    />

                  </div>

                  <div className="admin-form-group">

                    <label>
                      Category
                    </label>

                    <select
                      value={
                        selectedService.category
                      }
                      onChange={(event) =>
                        setSelectedService({
                          ...selectedService,
                          category:
                            event.target.value,
                        })
                      }
                    >
                      <option>
                        Pooja
                      </option>

                      <option>
                        House Pooja
                      </option>

                      <option>
                        Special Pooja
                      </option>

                      <option>
                        Astrology
                      </option>
                    </select>

                  </div>

                  <div className="admin-form-group">

                    <label>
                      Priest
                    </label>

                    <input
                      type="text"
                      value={
                        selectedService.priest
                      }
                      onChange={(event) =>
                        setSelectedService({
                          ...selectedService,
                          priest:
                            event.target.value,
                        })
                      }
                    />

                  </div>

                  <div className="admin-form-group">

                    <label>
                      Price
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={
                        selectedService.price
                      }
                      onChange={(event) =>
                        setSelectedService({
                          ...selectedService,
                          price: Number(
                            event.target.value
                          ),
                        })
                      }
                    />

                  </div>

                  <div className="admin-form-group">

                    <label>
                      Duration
                    </label>

                    <input
                      type="text"
                      value={
                        selectedService.duration
                      }
                      onChange={(event) =>
                        setSelectedService({
                          ...selectedService,
                          duration:
                            event.target.value,
                        })
                      }
                    />

                  </div>

                  <div className="admin-form-group">

                    <label>
                      Location
                    </label>

                    <input
                      type="text"
                      value={
                        selectedService.location
                      }
                      onChange={(event) =>
                        setSelectedService({
                          ...selectedService,
                          location:
                            event.target.value,
                        })
                      }
                    />

                  </div>

                  <div className="admin-form-group">

                    <label>
                      Status
                    </label>

                    <select
                      value={
                        selectedService.status
                      }
                      onChange={(event) =>
                        setSelectedService({
                          ...selectedService,
                          status:
                            event.target.value,
                        })
                      }
                    >
                      <option>
                        Active
                      </option>

                      <option>
                        Inactive
                      </option>
                    </select>

                  </div>

                  <div className="admin-form-group full-width">

                    <label>
                      Description
                    </label>

                    <textarea
                      rows="4"
                      value={
                        selectedService.description
                      }
                      onChange={(event) =>
                        setSelectedService({
                          ...selectedService,
                          description:
                            event.target.value,
                        })
                      }
                    />

                  </div>

                </div>

                <div className="admin-modal-footer">

                  <button
                    type="button"
                    className="admin-secondary-button"
                    onClick={() =>
                      setShowEditModal(false)
                    }
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="admin-primary-button"
                  >
                    <Edit3 size={17} />
                    Save Changes
                  </button>

                </div>

              </form>

            </div>

          </div>
        )}

    </div>
  );
}

export default AdminServices;