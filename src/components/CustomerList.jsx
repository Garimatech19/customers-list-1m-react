import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import { generateCustomers } from '../utils/generateData';
import { useDebounce } from '../hooks/useDebounce';

// This is our dummy database, holding all records.
const allCustomers = generateCustomers();
const PAGE_SIZE = 30; // Define the number of items per page.

// The main component rendering the customer list with search, sort, and infinite scroll.
const CustomerList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 250);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'none' });
  const [showFilters, setShowFilters] = useState(false);
  
  // State to manage pagination and loading
  const [visibleCustomers, setVisibleCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Memoized list serves as the filtered/sorted source for our pages.
  const processedCustomers = useMemo(() => {
    let customers = [...allCustomers];
    if (debouncedSearchTerm) { // Apply search filtering
      const lowercasedTerm = debouncedSearchTerm.toLowerCase();
      // Filter based on name, email, or phone.
      customers = customers.filter(customer =>
        customer.name.toLowerCase().includes(lowercasedTerm) ||
        customer.email.toLowerCase().includes(lowercasedTerm) ||
        customer.phone.includes(lowercasedTerm)
      );
    }

    // Apply sorting if specified.
    if (sortConfig.key) {
      customers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return customers;
  }, [debouncedSearchTerm, sortConfig]);

  // Function to load the next page of items.
  const loadMoreItems = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    // Simulate a network request
    setTimeout(() => {
      const start = currentPage * PAGE_SIZE; // Inclusive start index
      const end = start + PAGE_SIZE; // Non-inclusive end index
      const newItems = processedCustomers.slice(start, end); // Get the next page of items

      setVisibleCustomers(prevItems => [...prevItems, ...newItems]); // Append new items
      setCurrentPage(prevPage => prevPage + 1); // Move to the next page
      setHasMore(end < processedCustomers.length); // Check if more items are available
      setIsLoading(false);
    }, 500); // 500ms delay to simulate loading
  }, [currentPage, isLoading, hasMore, processedCustomers]);
  
  // Effect to load initial data and reset when filters/sort change.
  useEffect(() => {
    setVisibleCustomers([]);
    setCurrentPage(0);
    setHasMore(true);
  }, [processedCustomers]); 

  // This effect triggers the first page load after a reset.
  useEffect(() => {
    if (currentPage === 0 && hasMore) {
        loadMoreItems();
    }
  }, [currentPage, hasMore, loadMoreItems]);

  // This callback from react-window tells us when to load more.
  const onItemsRendered = ({ visibleStopIndex }) => {
    if (visibleStopIndex >= visibleCustomers.length - 5 && hasMore && !isLoading) {
      loadMoreItems();
    }
  };

  // The Row component that react-window will render for each item.
  const Row = ({ index, style }) => {
    // If it's the last item and there's more to load, show a loading message.
    if (index === visibleCustomers.length) {
      return <div style={style} className="loading-indicator">Loading more items...</div>;
    }
     // Otherwise, render the customer row.
    const customer = visibleCustomers[index];
    if (!customer) return null;

    return (
      <div className="table-row" style={style}>
        <div><input type="checkbox" /></div>
        <div className="customer-info">
          <img src={customer.avatar} alt="avatar" className="customer-avatar" />
          <div>
            <div className="customer-name">{customer.name}</div>
            <div className="customer-phone">{customer.phone}</div>
          </div>
        </div>
        <div>{customer.score}</div>
        <div>{customer.email}</div>
        <div>{new Date(customer.lastMessageAt).toLocaleDateString()}</div>
        <div>{customer.addedBy}</div>
      </div>
    );
  };
  
  // Handle sorting logic
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
 
  // Get sort indicator for column headers
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? ' ▲' : ' ▼';
  };

  return (
    <div>
      <div className="toolbar">
        <input
          type="text"
          placeholder="Search Customers (Name, Email, Phone)"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div style={{ position: 'relative' }}>
          <button className="filter-button" onClick={() => setShowFilters(!showFilters)}>
            Add Filters
          </button>
          {showFilters && (
            <div className="filters-dropdown">
              <div>Filter 1</div>
              <div>Filter 2</div>
              <div>Filter 3</div>
              <div>Filter 4</div>
            </div>
          )}
        </div>
      </div>
      
      <div className="table-container">
        <div className="table-header">
          <div><input type="checkbox" /></div>
          <div onClick={() => handleSort('name')}>Customer{getSortIndicator('name')}</div>
          <div onClick={() => handleSort('score')}>Score{getSortIndicator('score')}</div>
          <div onClick={() => handleSort('email')}>Email{getSortIndicator('email')}</div>
          <div onClick={() => handleSort('lastMessageAt')}>Last message sent at{getSortIndicator('lastMessageAt')}</div>
          <div onClick={() => handleSort('addedBy')}>Added by{getSortIndicator('addedBy')}</div>
        </div>
        
        <List
          height={600} // The height of the scrollable area
          itemCount={hasMore ? visibleCustomers.length + 1 : visibleCustomers.length} // Add one extra row for loading indicator if more to load
          itemSize={65}  // The height of each row in pixels
          width="100%"
          onItemsRendered={onItemsRendered} // Callback to track rendered items
        >
          {Row}
        </List>
      </div>
    </div>
  );
};

export default CustomerList;