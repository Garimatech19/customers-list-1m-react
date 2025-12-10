# 📌 Customers List 

A high-performance **React + Vite** application that displays **1 million customer records** with smooth infinite scrolling, search, and sorting — built using **plain CSS** and optimized for speed.

---

## 🚀 Features

### 🔹 1M Records Generation
- Records generated dynamically at runtime (no API).
- Each customer includes:
  - `id`, `name`, `email`, `phone`
  - `score`, `lastMessageAt`
  - `addedBy`, `avatar`

### 🔹 Infinite Scroll (30 rows per batch)
- Loads 30 rows at a time.
- Smooth scrolling (no UI freeze).
- Optimized table rendering.

### 🔹 Search (Debounced 250ms)
- Filters by **name**, **email**, or **phone**.
- Partial & case-insensitive match.
- Efficient on large datasets.

### 🔹 Sorting
- Click any column to toggle:
  - Ascending  
  - Descending  
- Visual sort indicators.

### 🔹 Filters Dropdown (Static)
- Opens/closes on click.
- No filtering logic (as per assignment).

### 🔹 UI Experience
- Sticky table header.
- Row hover state.
- Responsive layout.
- Smooth user interactions with large data.

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| **React + Vite** | Fast bundling & development |
| **JavaScript (ESM)** | Application logic |
| **Plain CSS** | Styling (no Tailwind/Bootstrap allowed) |
| **IndexedDB / in-memory** | Data storage handling |
| **Node 22+** | Runtime requirement |

---

## 🧪 What This App Demonstrates

- Efficient handling of **1,000,000+ rows**
- Infinite scrolling with windowing / lazy loading
- Optimized rendering for large datasets
- Clean and structured React architecture
- Smooth and responsive UX under heavy load
- Frontend interview–level problem solving


## ✔️ Acceptance Criteria Checklist

| Feature                         | Status |
|---------------------------------|--------|
| Smooth scrolling across 1M rows | ✅     |
| Search with 250ms debounce      | ✅     |
| Sorting toggle works            | ✅     |
| Static filters dropdown         | ✅     |
| Sticky table header             | ✅     |
| Clean, readable code            | ✅     |


