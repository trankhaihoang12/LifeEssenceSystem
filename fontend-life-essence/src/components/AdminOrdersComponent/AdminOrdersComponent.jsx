import React, { useState } from 'react';
import { Container,ButtonGroup, WrapperTable, WrapperTableHeader, WrapperTableData, WrapperTableRow, StatusBadge, WrapperPagination, ExportButton, AddButton } from './Style';
import { FaPlus, FaPen, FaTrash } from 'react-icons/fa';
import { LuSearch } from 'react-icons/lu';

const AdminOrdersComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const orders = [
    { id: '5146845648465', customerName: 'Quynh Nhu', date: '2/19/24 11:26 PM', paymentStatus: 'Paid', amount: '$120.00', paymentMethod: 'VNPAY', orderStatus: 'Shipped' },
    { id: '5467819467348', customerName: 'Xuan Quyen', date: '5/7/24 04:26 PM', paymentStatus: 'Paid', amount: '$5103.00', paymentMethod: 'PayPal', orderStatus: 'Processing' },
    { id: '134570954546', customerName: 'Khai Hoang', date: '9/18/24 11:26 PM', paymentStatus: 'COD', amount: '$114.00', paymentMethod: 'COD', orderStatus: 'Processing' },
    { id: '5440754979', customerName: 'Phuoc Quanh', date: '2/11/24 11:26 PM', paymentStatus: 'Paid', amount: '$98.00', paymentMethod: 'VNPAY', orderStatus: 'Processing' },
    { id: '1243457894543', customerName: 'Van Lan', date: '9/18/24 11:26 PM', paymentStatus: 'Paid', amount: '$223.00', paymentMethod: 'COD', orderStatus: 'Shipped' },
    { id: '845414649707', customerName: 'Tien Manh', date: '1/28/24 11:26 PM', paymentStatus: 'COD', amount: '$231.00', paymentMethod: 'COD', orderStatus: 'Processing' },
    { id: '210514640451', customerName: 'Nguyen Khanh', date: '5/27/24 11:26 PM', paymentStatus: 'Paid', amount: '$99.00', paymentMethod: 'PayPal', orderStatus: 'Shipped' },
    { id: '043910464504', customerName: 'Hoang Mai', date: '8/2/24 11:26 PM', paymentStatus: 'COD', amount: '$156.00', paymentMethod: 'PayPal', orderStatus: 'Delivered' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const handleAddOrder = () => {
    alert('Add Order');
  };
  
  const handleExport = () => {
    alert('Xuất file Excel');
  };

  const handleEditOrder = (id) => {
    alert(`Edit order with ID: ${id}`);
  };

  const handleDeleteOrder = (id) => {
    alert(`Delete order with ID: ${id}`);
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredOrders = orders.filter(order =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.includes(searchTerm)
  );



  return (
    <Container>
      <h1>Order Management</h1>
      <ButtonGroup>
        <div style={{ marginRight: 'auto' }}>
          <AddButton onClick={handleAddOrder}>
            <FaPlus style={{ fontSize: '2rem' }} /> Add Order
          </AddButton>
        </div>
        <ExportButton onClick={handleExport}>
          Export Excel
        </ExportButton>
      </ButtonGroup>

      {/* Thanh tìm kiếm đã được cập nhật */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '20px', width: '750px', height: '44px', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '10px 15px',
              border: 'none',
              borderRadius: '20px',
              flex: 1,
              fontSize: '16px',
              height: '100%', // Đảm bảo chiều cao đầy đủ
            }}
          />
          <button style={{
            backgroundColor: '#4DB6AC', // Màu nền giống như thanh điều hướng
            border: 'none',
            borderRadius: '20px',
            padding: '0 15px',
            cursor: 'pointer',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ fontSize: '20px', color: '#fff' }}><LuSearch /></span>
          </button>
        </div>
      </div>

      <WrapperTable>
        <thead>
          <tr>
            <WrapperTableHeader>Order ID</WrapperTableHeader>
            <WrapperTableHeader>Customer Name</WrapperTableHeader>
            <WrapperTableHeader>Date</WrapperTableHeader>
            <WrapperTableHeader>Payment Status</WrapperTableHeader>
            <WrapperTableHeader>Amount</WrapperTableHeader>
            <WrapperTableHeader>Payment Method</WrapperTableHeader>
            <WrapperTableHeader>Order Status</WrapperTableHeader>
            <WrapperTableHeader>Actions</WrapperTableHeader>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map(order => (
            <WrapperTableRow key={order.id}>
              <WrapperTableData>{order.id}</WrapperTableData>
              <WrapperTableData>{order.customerName}</WrapperTableData>
              <WrapperTableData>{order.date}</WrapperTableData>
              <WrapperTableData><StatusBadge paymentStatus={order.paymentStatus}>{order.paymentStatus}</StatusBadge></WrapperTableData>
              <WrapperTableData>{order.amount}</WrapperTableData>
              <WrapperTableData>{order.paymentMethod}</WrapperTableData>
              <WrapperTableData>
                <span className={`badge-${order.orderStatus.toLowerCase()}`}>
                  {order.orderStatus}
                </span>
              </WrapperTableData>
              <WrapperTableData>
                <FaPen onClick={() => handleEditOrder(order.id)} style={{ cursor: 'pointer', color: '#6366F1', marginRight: '15px', fontSize: '2rem' }} />
                <FaTrash onClick={() => handleDeleteOrder(order.id)} style={{ cursor: 'pointer', color: '#E53E3E', fontSize: '2rem' }} />
              </WrapperTableData>
            </WrapperTableRow>
          ))}
        </tbody>
      </WrapperTable>

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

export default AdminOrdersComponent;
