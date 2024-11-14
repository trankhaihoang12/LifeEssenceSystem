import React, { useState } from 'react';
import { Container, Header, CardContainer, Card, SearchContainer, TableContainer, Status, TrashIcon, DropdownMenu, DropdownItem, WrapperPagination } from './Style';


const customerData = [
  { id: 'TTB30280001', name: 'Neil Collins', email: 'ryan.dyer@toner.com', country: 'Brazil', date: '13 May, 2022 10:45 AM', amount: '$415.96', status: 'Paid' },
  { id: 'TTB30280002', name: 'Alfred Hurst', email: 'alfredH@toner.com', country: 'Brazil', date: '29 Dec, 2022 8:34 AM', amount: '$875', status: 'Unpaid' },
  { id: 'TTB30280003', name: 'Tommy Carey', email: 'careytommy@toner.com', country: 'Brazil', date: '19 Apr, 2022 8:34 PM', amount: '$875', status: 'Paid' },
  { id: 'TTB30280004', name: 'Cassius Brock', email: 'brock@toner.com', country: 'Brazil', date: '22 Jun, 2022 8:48 PM', amount: '$875', status: 'Paid' },
  { id: 'TTB30280005', name: 'Camilla Winters', email: 'camilla@toner.com', country: 'Brazil', date: '23 Feb, 2021 11:00 AM', amount: '$875', status: 'Refund' },
  { id: 'TTB30280006', name: 'Gabrielle Holden', email: 'gabrielle@toner.com', country: 'Brazil', date: '29 Mar, 2022 9:58 PM', amount: '$875', status: 'Paid' },
  { id: 'TTB30280007', name: 'Kristina Hooper', email: 'kristina@toner.com', country: 'Brazil', date: '21 Mar, 2022 9:58 PM', amount: '$875', status: 'Cancel' },
  { id: 'TTB30280008', name: 'Alina Holland', email: 'hollandalina@toner.com', country: 'Brazil', date: '29 Mar, 2021 9:58 PM', amount: '$875', status: 'Paid' },
  { id: 'TTB30280009', name: 'Christian Cardenas', email: 'id.erat@aol.org', country: 'Brazil', date: '17 Jan, 2022 9:58 PM', amount: '$875', status: 'Paid' },
  { id: 'TTB30280010', name: 'Edward Rogers', email: 'edwardro@toner.com', country: 'Brazil', date: '15 Mar, 2021 6:12 AM', amount: '$875', status: 'Paid' },
  { id: 'TTB30280011', name: 'Hilel Gillespie', email: 'enim.nunc@yahoo.edu', country: 'Brazil', date: '14 Mar, 2021 9:58 PM', amount: '$875', status: 'Paid' },
  { id: 'TTB30280012', name: 'Randall Stafford', email: 'eget.lacus@outlook.org', country: 'Brazil', date: '14 Mar, 2021 9:58 PM', amount: '$875', status: 'Paid' },
  { id: 'TTB30280013', name: 'Fletcher Jones', email: 'sapien.cursus@google.couk', country: 'Brazil', date: '14 Mar, 2021 9:58 PM', amount: '$875', status: 'Paid' },
  { id: 'TTB30280014', name: 'Donovan Sparks', email: 'urna.convallis@yahoo.net', country: 'Brazil', date: '14 Mar, 2021 9:58 PM', amount: '$875', status: 'Paid' },
  { id: 'TTB30280015', name: 'Sage Gardner', email: 'consequat.enim@google.com', country: 'Brazil', date: '14 Mar, 2021 9:58 PM', amount: '$875', status: 'Paid' },
  { id: 'TTB30280016', name: 'Paki Grimes', email: 'ante.lectus.convallis@google.com', country: 'Brazil', date: '14 Mar, 2021 9:58 PM', amount: '$875', status: 'Paid' }
];

const AdminInvoiceComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedIds, setSelectedIds] = useState([]); // Track selected customer IDs

  const [isMenuOpen, setIsMenuOpen] = useState(null); // Track which menu is open
  const customersPerPage = 5;
  const totalPages = Math.ceil(customerData.length / customersPerPage);

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customerData.slice(indexOfFirstCustomer, indexOfLastCustomer);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle select/unselect all customers
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedIds(currentCustomers.map(customer => customer.id));
    } else {
      setSelectedIds([]);
    }
  };

  // Handle individual customer selection
  const handleSelectCustomer = (id) => {
    setSelectedIds((prevSelected) => 
      prevSelected.includes(id) 
        ? prevSelected.filter(item => item !== id)
        : [...prevSelected, id]
    );
  };

  // Handle delete selected customers
  const handleDeleteSelected = () => {
    setSelectedIds([]); // Clear selected IDs
    alert('Deleted selected customers!');
  };

  // Toggle dropdown menu for actions
  const toggleMenu = (id) => {
    setIsMenuOpen(isMenuOpen === id ? null : id);
  };

  return (
    <Container>
      <Header>
        <h1>Invoice List</h1>
      </Header>
      <CardContainer>
        <Card className="sent">
          <h2>INVOICES SENT</h2>
          <div className="amount">$559.25k</div>
          <div className="details">6,258 Invoices sent</div>
          <div className="icon"><i className="fas fa-paper-plane"></i></div>
        </Card>
        <Card className="paid">
          <h2>PAID INVOICES</h2>
          <div className="amount">$409.66k</div>
          <div className="details">2,451 Paid by clients</div>
          <div className="icon"><i className="fas fa-check-circle"></i></div>
        </Card>
        <Card className="unpaid">
          <h2>UNPAID INVOICES</h2>
          <div className="amount">$136.98k</div>
          <div className="details">720 Unpaid by clients</div>
          <div className="icon"><i className="fas fa-clock"></i></div>
        </Card>
        <Card className="cancelled">
          <h2>CANCELLED INVOICES</h2>
          <div className="amount">$84.2k</div>
          <div className="details">502 Cancelled by clients</div>
          <div className="icon"><i className="fas fa-trash-alt"></i></div>
        </Card>
      </CardContainer>
      <SearchContainer>
        <input type="text" placeholder="Search for customer, email, country, status or something..." />
        <select>
          <option>All</option>
        </select>
        <button>+ Create Invoice</button>
        <button>Filters</button>
      </SearchContainer>
      <TableContainer>
        <table>
          <thead>
            <tr>
              <th>
                <input 
                  type="checkbox" 
                  onChange={handleSelectAll} 
                  checked={selectedIds.length === currentCustomers.length} 
                />
              </th>
              <th>ID</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Country</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Payment Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map((customer) => (
              <tr key={customer.id}>
                <td>
                  <input 
                    type="checkbox" 
                    checked={selectedIds.includes(customer.id)} 
                    onChange={() => handleSelectCustomer(customer.id)} 
                  />
                </td>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.country}</td>
                <td>{customer.date}</td>
                <td>{customer.amount}</td>
                <td><Status className={customer.status.toLowerCase()}>{customer.status}</Status></td>
                <td>
                  <div className="action-menu">
                    <button onClick={() => toggleMenu(customer.id)} className="dots-button">...</button>
                    {isMenuOpen === customer.id && (
                      <DropdownMenu>
                        <DropdownItem>View</DropdownItem>
                        <DropdownItem>Edit</DropdownItem>
                        <DropdownItem>Download</DropdownItem>
                        <DropdownItem onClick={() => alert('Deleted!')}>Delete</DropdownItem>
                      </DropdownMenu>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>
      {selectedIds.length > 0 && (
        <TrashIcon onClick={handleDeleteSelected}>
          <i className="fas fa-trash-alt"></i>
        </TrashIcon>
      )}
 <WrapperPagination>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        <div className="page-number">
          {Array.from({ length: totalPages }, (_, i) => (
            <span
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={currentPage === i + 1 ? 'active' : ''}
            >
              {i + 1}
            </span>
          ))}
        </div>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      </WrapperPagination>
    </Container>
  );
};

export default AdminInvoiceComponent;

