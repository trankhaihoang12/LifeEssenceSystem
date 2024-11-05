import React, { useState } from 'react';
import { Container, ButtonCustom, Table, Pagination, ButtonGroup } from './Style';
import { FaPlus, FaFilePdf, FaPen, FaTrash } from 'react-icons/fa';
import { LuSearch } from 'react-icons/lu';

const AdminOrdersComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const orders = [
    {
      id: '5146845648465',
      customerName: 'Quynh Nhu',
      date: '2/19/24 11:26 PM',
      paymentStatus: 'Paid',
      amount: '$120.00',
      paymentMethod: 'VNPAY',
      orderStatus: 'Shipped',
    },
    {
      id: '5467819467348',
      customerName: 'Xuan Quyen',
      date: '5/7/24 04:26 PM',
      paymentStatus: 'Paid',
      amount: '$5103.00',
      paymentMethod: 'PayPal',
      orderStatus: 'Processing',
    },
    {
      id: '134570954546',
      customerName: 'Khai Hoang',
      date: '9/18/24 11:26 PM',
      paymentStatus: 'COD',
      amount: '$114.00',
      paymentMethod: 'COD',
      orderStatus: 'Processing',
    },
    {
      id: '5440754979',
      customerName: 'Phuoc Quanh',
      date: '2/11/24 11:26 PM',
      paymentStatus: 'Paid',
      amount: '$98.00',
      paymentMethod: 'VNPAY',
      orderStatus: 'Processing',
    },
    {
      id: '1243457894543',
      customerName: 'Van Lan',
      date: '9/18/24 11:26 PM',
      paymentStatus: 'Paid',
      amount: '$223.00',
      paymentMethod: 'COD',
      orderStatus: 'Shipped',
    },
    {
      id: '845414649707',
      customerName: 'Tien Manh',
      date: '1/28/24 11:26 PM',
      paymentStatus: 'COD',
      amount: '$231.00',
      paymentMethod: 'COD',
      orderStatus: 'Processing',
    },
    {
      id: '210514640451',
      customerName: 'Nguyen Khanh',
      date: '5/27/24 11:26 PM',
      paymentStatus: 'Paid',
      amount: '$99.00',
      paymentMethod: 'PayPal',
      orderStatus: 'Shipped',
    },
    {
      id: '043910464504',
      customerName: 'Hoang Mai',
      date: '8/2/24 11:26 PM',
      paymentStatus: 'Refund',
      amount: '$156.00',
      paymentMethod: 'PayPal',
      orderStatus: 'Delivered',
    },
  ];

  const handleAddOrder = () => {
    alert('Add Order');
  };
  
  const handleDownloadReport = () => {
    alert('Download PDF Report');
  };

  const handleEditOrder = (id) => {
    alert(`Edit order with ID: ${id}`);
  };

  const handleDeleteOrder = (id) => {
    alert(`Delete order with ID: ${id}`);
  };

  const filteredOrders = orders.filter(order =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.includes(searchTerm)
  );

  const getPaymentStatusStyle = (status) => {
    switch (status) {
      case 'Paid':
        return { color: 'green', fontWeight: 'bold' };
      case 'COD':
        return { color: 'blue', fontWeight: 'bold' };
      case 'Refund':
        return { color: 'red', fontWeight: 'bold' };
      default:
        return {};
    }
  };

  return (
    <Container>
      <h1>Order Management</h1>
      <ButtonGroup>
        <div style={{ marginRight: 'auto' }}>
          <ButtonCustom onClick={handleAddOrder}>
            <FaPlus style={{ fontSize: '2rem' }} /> Add Order
          </ButtonCustom>
        </div>
        <ButtonCustom onClick={handleDownloadReport}>
          <FaFilePdf style={{ fontSize: '2rem' }} /> Download PDF Report
        </ButtonCustom>
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

      <Table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10rem' }}>
        <thead>
          <tr>
            <th style={{ border: '2px solid #ccc', padding: '20px' }}>Order ID</th>
            <th style={{ border: '2px solid #ccc', padding: '20px' }}>Customer Name</th>
            <th style={{ border: '2px solid #ccc', padding: '20px' }}>Date</th>
            <th style={{ border: '2px solid #ccc', padding: '20px' }}>Payment Status</th>
            <th style={{ border: '2px solid #ccc', padding: '20px' }}>Amount</th>
            <th style={{ border: '2px solid #ccc', padding: '20px' }}>Payment Method</th>
            <th style={{ border: '2px solid #ccc', padding: '20px' }}>Order Status</th>
            <th style={{ border: '2px solid #ccc', padding: '20px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map(order => (
            <tr key={order.id}>
              <td style={{ border: '2px solid #ccc', padding: '20px' }}>{order.id}</td>
              <td style={{ border: '2px solid #ccc', padding: '20px' }}>{order.customerName}</td>
              <td style={{ border: '2px solid #ccc', padding: '20px' }}>{order.date}</td>
              <td style={{ border: '2px solid #ccc', padding: '20px', ...getPaymentStatusStyle(order.paymentStatus) }}>
                {order.paymentStatus}
              </td>
              <td style={{ border: '2px solid #ccc', padding: '20px' }}>{order.amount}</td>
              <td style={{ border: '2px solid #ccc', padding: '20px' }}>{order.paymentMethod}</td>
              <td style={{ border: '2px solid #ccc', padding: '20px' }}>
                <span className={`badge-${order.orderStatus.toLowerCase()}`}>
                  {order.orderStatus}
                </span>
              </td>
              <td style={{ border: '2px solid #ccc', padding: '20px' }}>
                <FaPen onClick={() => handleEditOrder(order.id)} style={{ cursor: 'pointer', color: '#6366F1', marginRight: '15px', fontSize: '2rem' }} />
                <FaTrash onClick={() => handleDeleteOrder(order.id)} style={{ cursor: 'pointer', color: '#E53E3E', fontSize: '2rem' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <ul className="pagination">
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
        </ul>
      </Pagination>
    </Container>
  );
};

export default AdminOrdersComponent;
