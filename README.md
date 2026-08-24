# Bill Buddy: Subscription Tracker & Renewal Dashboard

Bill Buddy is a personal finance dashboard that aggregates a user's recurring SaaS applications and streaming subscriptions, tracks renewal dates, and monitors monthly cash-flow burn.

---

## Key Features

### 1. Frontend UI & User Interaction
* **Entry Form:** Add new subscriptions by inputting the service name, cost (formatted as USD), billing cycle (Monthly or Yearly), and next renewal date (via a visual calendar date-picker).
* **Metrics Row:** Prominently displays two real-time digital cards:
  * **Total Monthly Burn Rate:** Excludes paused subscriptions and normalizes yearly subscriptions.
  * **Upcoming Renewals Alert Count:** Displays the number of active subscriptions renewing in the next 7 days.
* **Subscription Grid:** A structured data table showing name, cost, billing cycle, renewal date, and status.
  * **Amber Badge ("Renewing Soon"):** Triggers when an active subscription's renewal is within 7 days.
  * **Red Badge ("Overdue"):** Triggers when an active subscription's renewal date is in the past.
  * **Interactive Toggle Switch ("Active / Paused"):** Instantly flips the status, greying out the row and recalculating the Monthly Burn Rate.

### 2. Backend Logic (Strict Server-Side Engines)
* **Cost Uniformity Engine:** Automatically normalizes annual subscriptions down to a monthly cost (`cost / 12`) to compute the total monthly burn rate accurately.
* **Date Intersect Calculator:** Calculates the remaining days until the next renewal event to flag urgent or overdue active items.

---

## Tech Stack & Architecture

* **Frontend:** React.js (v19) via Vite, Tailwind CSS, Axios.
* **Backend:** Node.js (LTS), Express.js, Mongoose, Dotenv, CORS.
* **Database:** MongoDB (Atlas or Local Instance).

---

## Directory Structure

```plaintext
/Bill-Buddy
│
├── /backend
│   ├── /config          # Database configurations
│   ├── /controllers     # Business logic: Cost Uniformity & Date Calculator
│   ├── /models          # Mongoose subscription schemas
│   ├── /routes          # Express endpoints (POST /, GET /dashboard, PATCH /:id/toggle)
│   ├── .env             # Port and connection URI configurations
│   ├── server.js        # Express application entry point
│   └── package.json
│
└── /frontend
    ├── /src
    │   ├── /components  # Form.jsx, Metrics.jsx, Grid.jsx
    │   ├── /services    # api.js Axios configuration
    │   ├── App.jsx      # Root state and container component
    │   ├── index.css    # Tailwind CSS imports & Inter font
    │   └── main.jsx
    ├── tailwind.config.js
    ├── postcss.config.js
    └── package.json
```

---

## Setup & Running the Application

### Prerequisites
* [Node.js](https://nodejs.org/) installed on your machine.
* A running [MongoDB](https://www.mongodb.com/) instance (either local or MongoDB Atlas).

### 1. Setup Backend
1. Navigate into the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the environment variables by creating/updating a `.env` file in the `/backend` folder:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/bill-buddy
   ```
   *(Note: Replace `MONGO_URI` with your MongoDB Atlas connection string if running in the cloud, and ensure your IP is whitelisted).*
4. Start the backend server:
   ```bash
   node server.js
   ```
   The backend will boot up at `http://localhost:5000`.

### 2. Setup Frontend
1. Navigate into the `frontend` folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:5173/`.
