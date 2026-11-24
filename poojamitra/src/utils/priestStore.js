const STORAGE_KEY = "poojamitra_priest_portal";

const defaultData = {
  profile: {
    id: "PM-PRI-1001",
    name: "Ravi Kumar",
    phone: "+91 9876543210",
    email: "ravikumar@example.com",
    priestType: "Vedic Priest",
    specialization: "Vedic Pooja",
    experience: 8,
    languages: ["Telugu", "Hindi", "English"],
    city: "Hyderabad",
    locality: "Kukatpally",
    serviceRadius: "15 KM",
    qualification: "Vedic Scholar",
    bio: "Experienced Vedic priest providing traditional Hindu pooja and religious services.",
    status: "Approved",
    rating: 4.8,
    reviews: 126,
  },

  bookings: [
    {
      id: "PMB-1001",
      customer: "Ananya Reddy",
      service: "Ganapathi Pooja",
      date: "2026-10-08",
      time: "09:00 AM",
      duration: "2 Hours",
      location: "Kondapur, Hyderabad",
      amount: 2500,
      status: "Pending",
      phone: "+91 9000000001",
      notes: "Please bring pooja items list.",
    },
    {
      id: "PMB-1002",
      customer: "Rahul Sharma",
      service: "Satyanarayana Swamy Pooja",
      date: "2026-10-09",
      time: "10:30 AM",
      duration: "3 Hours",
      location: "Madhapur, Hyderabad",
      amount: 3500,
      status: "Confirmed",
      phone: "+91 9000000002",
      notes: "Family pooja for 8 members.",
    },
    {
      id: "PMB-1003",
      customer: "Sravani Rao",
      service: "Gruhapravesham",
      date: "2026-10-12",
      time: "07:00 AM",
      duration: "4 Hours",
      location: "Gachibowli, Hyderabad",
      amount: 5000,
      status: "Confirmed",
      phone: "+91 9000000003",
      notes: "New apartment housewarming.",
    },
    {
      id: "PMB-1004",
      customer: "Kiran Kumar",
      service: "Lakshmi Pooja",
      date: "2026-10-04",
      time: "06:00 PM",
      duration: "2 Hours",
      location: "Miyapur, Hyderabad",
      amount: 2200,
      status: "Completed",
      phone: "+91 9000000004",
      notes: "",
    },
    {
      id: "PMB-1005",
      customer: "Meghana",
      service: "Navagraha Pooja",
      date: "2026-09-28",
      time: "08:00 AM",
      duration: "3 Hours",
      location: "Kukatpally, Hyderabad",
      amount: 3000,
      status: "Completed",
      phone: "+91 9000000005",
      notes: "",
    },
  ],

  services: [
    {
      id: 1,
      name: "Ganapathi Pooja",
      category: "Pooja",
      duration: "2 Hours",
      price: 2500,
      active: true,
      description: "Traditional Ganapathi pooja performed according to Vedic procedures.",
    },
    {
      id: 2,
      name: "Satyanarayana Swamy Pooja",
      category: "Pooja",
      duration: "3 Hours",
      price: 3500,
      active: true,
      description: "Traditional Satyanarayana Swamy Vratham and pooja.",
    },
    {
      id: 3,
      name: "Gruhapravesham",
      category: "Ceremony",
      duration: "4 Hours",
      price: 5000,
      active: true,
      description: "Complete housewarming ceremony with required rituals.",
    },
    {
      id: 4,
      name: "Lakshmi Pooja",
      category: "Pooja",
      duration: "2 Hours",
      price: 2200,
      active: true,
      description: "Traditional Lakshmi Devi pooja.",
    },
  ],

  availability: {
    Monday: { enabled: true, from: "07:00", to: "20:00" },
    Tuesday: { enabled: true, from: "07:00", to: "20:00" },
    Wednesday: { enabled: true, from: "07:00", to: "20:00" },
    Thursday: { enabled: true, from: "07:00", to: "20:00" },
    Friday: { enabled: true, from: "07:00", to: "20:00" },
    Saturday: { enabled: true, from: "07:00", to: "18:00" },
    Sunday: { enabled: false, from: "08:00", to: "18:00" },
  },

  reviews: [
    {
      id: 1,
      customer: "Ananya Reddy",
      rating: 5,
      date: "2026-10-02",
      service: "Ganapathi Pooja",
      comment: "Very knowledgeable and performed the pooja beautifully.",
    },
    {
      id: 2,
      customer: "Rahul Sharma",
      rating: 5,
      date: "2026-09-25",
      service: "Satyanarayana Pooja",
      comment: "Excellent priest. Explained every ritual clearly.",
    },
    {
      id: 3,
      customer: "Sravani Rao",
      rating: 4,
      date: "2026-09-18",
      service: "Lakshmi Pooja",
      comment: "Good experience and very punctual.",
    },
  ],

  notifications: [
    {
      id: 1,
      title: "New Booking Request",
      message: "You received a new Ganapathi Pooja booking request.",
      type: "booking",
      date: "Today",
      read: false,
    },
    {
      id: 2,
      title: "Booking Confirmed",
      message: "Your Satyanarayana Swamy Pooja booking has been confirmed.",
      type: "booking",
      date: "Yesterday",
      read: false,
    },
    {
      id: 3,
      title: "Payment Received",
      message: "Payment of ₹3,500 has been received.",
      type: "payment",
      date: "2 days ago",
      read: true,
    },
    {
      id: 4,
      title: "Profile Approved",
      message: "Your priest profile has been approved by PoojaMitra admin.",
      type: "system",
      date: "5 days ago",
      read: true,
    },
  ],

  settings: {
    bookingNotifications: true,
    paymentNotifications: true,
    reviewNotifications: true,
    smsNotifications: true,
    emailNotifications: true,
    autoAccept: false,
    language: "English",
  },
};

export function getPriestData() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    return defaultData;
  }

  try {
    return JSON.parse(saved);
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    return defaultData;
  }
}

export function savePriestData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
}

export function updatePriestData(updates) {
  const current = getPriestData();

  const updated = {
    ...current,
    ...updates,
  };

  savePriestData(updated);

  return updated;
}

export function updateProfile(profile) {
  const data = getPriestData();

  data.profile = {
    ...data.profile,
    ...profile,
  };

  savePriestData(data);

  return data;
}

export function updateBookingStatus(id, status) {
  const data = getPriestData();

  data.bookings = data.bookings.map((booking) =>
    booking.id === id
      ? {
          ...booking,
          status,
        }
      : booking
  );

  savePriestData(data);

  return data;
}

export function updateAvailability(availability) {
  const data = getPriestData();

  data.availability = availability;

  savePriestData(data);

  return data;
}

export function updateServices(services) {
  const data = getPriestData();

  data.services = services;

  savePriestData(data);

  return data;
}

export function updateSettings(settings) {
  const data = getPriestData();

  data.settings = {
    ...data.settings,
    ...settings,
  };

  savePriestData(data);

  return data;
}

export function markNotificationRead(id) {
  const data = getPriestData();

  data.notifications = data.notifications.map((item) =>
    item.id === id
      ? {
          ...item,
          read: true,
        }
      : item
  );

  savePriestData(data);

  return data;
}

export function markAllNotificationsRead() {
  const data = getPriestData();

  data.notifications = data.notifications.map((item) => ({
    ...item,
    read: true,
  }));

  savePriestData(data);

  return data;
}

export function addNotification(notification) {
  const data = getPriestData();

  data.notifications.unshift({
    id: Date.now(),
    ...notification,
  });

  savePriestData(data);

  return data;
}