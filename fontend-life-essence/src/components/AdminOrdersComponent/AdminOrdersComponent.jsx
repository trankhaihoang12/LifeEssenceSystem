import React, { useEffect, useState } from 'react';
import { Container, ButtonGroup, WrapperTable, WrapperTableHeader, WrapperTableData, WrapperTableRow, StatusBadge, WrapperPagination, ExportButton, AddButton, WrapperDetailModal, WrapperModalContent, Title, Text, Strong, ProductList, ProductItem, CloseButton, CloseButtonContainer, WrapperButton } from './Style';
import { FaPlus, FaPen, FaTrash } from 'react-icons/fa';
import { LuSearch } from 'react-icons/lu';
import * as AdminService from '../../services/AdminService'
const AdminOrdersComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;


  // States for editing order status
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [newOrderStatus, setNewOrderStatus] = useState('');
  const [showStatusModal, setShowStatusModal] = useState(false);

  // New States for Order Details
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);


  const getToken = () => {
    const storedUserData = localStorage.getItem('userData');
    const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
    return parsedUserData ? parsedUserData.token : null;
  };

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const token = getToken();  // Giả sử token lưu trong localStorage
        const response = await AdminService.getAllOrders(token);
        console.log('ressss', response)
        setOrders(response.data);  // Lưu danh sách đơn hàng vào state
      } catch (err) {
        setError(err.message || 'Có lỗi xảy ra khi tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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

  const handleEditOrderStatus = (id, currentStatus) => {
    setSelectedOrderId(id);
    setNewOrderStatus(currentStatus);  // Set the current status for the order
    setShowStatusModal(true);  // Open the modal to change the status
  };

  const handleUpdateOrderStatus = async () => {
    try {
      const token = getToken();
      await AdminService.updateOrderStatus(selectedOrderId, newOrderStatus, token);
      // Update the status in the orders list without reloading the page
      setOrders(orders.map(order =>
        order.id === selectedOrderId ? { ...order, orderStatus: newOrderStatus } : order
      ));
      setShowStatusModal(false); // Close the modal after update
      alert('Cập nhật trạng thái thành công!');
    } catch (err) {
      alert('Cập nhật trạng thái thất bại!');
    }
  };

  const handleCloseStatusModal = () => {
    setShowStatusModal(false);
  };

  const handleDeleteOrder = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        const token = getToken();
        await AdminService.deleteOrder(id, token); // Call the delete API
        setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id)); // Update the state
        alert('Order deleted successfully');
      } catch (error) {
        alert(`Failed to delete order: ${error.message}`);
      }
    }
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const filteredOrders = orders.filter(order =>
    (order.customerName && order.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (order.id && order.id.includes(searchTerm))
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'progress':
        return '#FFD700'; // Gold
      case 'pending':
        return '#FF8C00'; // Dark Orange
      case 'shipping':
        return '#1E90FF'; // Dodger Blue
      case 'completed':
        return '#32CD32'; // Lime Green
      case 'confirmed':
        return '#4CAF50'; // Green
      case 'resolved':
        return '#6A5ACD'; // Slate Blue
      case 'canceled':
        return '#E53E3E'; // Red
      default:
        return '#A9A9A9'; // Default Gray
    }
  };
  const handleViewOrderDetails = async (id) => {
    try {
      const token = getToken();
      const orderDetails = await AdminService.getOrderById(id, token); // Fetch order details by ID
      setSelectedOrder(orderDetails);
      setShowOrderDetails(true);
    } catch (err) {
      alert('Failed to fetch order details.');
    }
  };

  const handleCloseOrderDetails = () => {
    setShowOrderDetails(false);
    setSelectedOrder(null);
  };


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
          {filteredOrders.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage).map(order => (
            <WrapperTableRow key={order.id}>
              <WrapperTableData onClick={() => handleViewOrderDetails(order.id)} style={{ cursor: 'pointer', color: '#007BFF' }}>
                {order.id}
              </WrapperTableData>
              {/* <WrapperTableData>{order.id}</WrapperTableData> */}
              <WrapperTableData>{order.name}</WrapperTableData>
              <WrapperTableData>{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</WrapperTableData>
              <WrapperTableData>
                <WrapperTableData>
                  <StatusBadge paymentStatus={order.is_payment ? 'Paid' : 'Unpaid'}>
                    {order.is_payment ? 'Paid' : 'Unpaid'}
                  </StatusBadge>
                </WrapperTableData>
              </WrapperTableData>
              <WrapperTableData>{order.total}</WrapperTableData>
              <WrapperTableData>{order.paymentMethods}</WrapperTableData>
              <WrapperTableData>
                <span
                  style={{
                    backgroundColor: getStatusColor(order.orderStatus),
                    color: 'white',
                    padding: '3px 6px',
                    borderRadius: '50px',
                    textTransform: 'capitalize',
                    fontSize: '12px'
                  }}
                >
                  {order.orderStatus}
                </span>
              </WrapperTableData>
              <WrapperTableData>
                <FaPen onClick={() => handleEditOrderStatus(order.id, order.orderStatus)} style={{ cursor: 'pointer', color: '#6366F1', marginRight: '15px', fontSize: '2rem' }} />
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
      {/* Modal for Order Status Update */}
      {showStatusModal && (
        // <ModalOverlay>
        <WrapperDetailModal>
          <WrapperModalContent>
            <Title>Update Order Status</Title>
            <Text>
              <Strong>Order ID:</Strong> {selectedOrderId}
            </Text>
            <Text>
              <Strong>Current Status:</Strong> {newOrderStatus}
            </Text>
            <div>
                <Strong>Select New Status: </Strong>
              <select
                value={newOrderStatus}
                onChange={(e) => setNewOrderStatus(e.target.value)}
              >
                <option value="progress">In Progress</option>
                <option value="pending">Pending</option>
                <option value="shipping">Shipping</option>
                <option value="completed">Completed</option>
                <option value="confirmed">Confirmed</option>
                <option value="resolved">Resolved</option>
                <option value="canceled">Canceled</option>
              </select>
            </div>
            <CloseButtonContainer>
              <WrapperButton onClick={handleUpdateOrderStatus}>Update</WrapperButton>
              <CloseButton onClick={handleCloseStatusModal}>Close</CloseButton>
            </CloseButtonContainer>
          </WrapperModalContent>
        </WrapperDetailModal>
        // </ModalOverlay>
      )}

      {/* Modal for Order Details */}
      {showOrderDetails && selectedOrder && (
        <WrapperDetailModal>
          <WrapperModalContent>
            <Title>Order Details</Title>
            <Text><Strong>Order ID:</Strong> {selectedOrder.id}</Text>
            <Text><Strong>Customer:</Strong> {selectedOrder.User.name} ({selectedOrder.User.email})</Text>
            <Text><Strong>Phone:</Strong> {selectedOrder.User.phone}</Text>
            <Text><Strong>Address:</Strong> {selectedOrder.address}</Text>
            <Text><Strong>Payment Status:</Strong> {selectedOrder.is_payment ? 'Paid' : 'Unpaid'}</Text>
            <Text><Strong>Order Status:</Strong> {selectedOrder.orderStatus}</Text>
            <Text><Strong>Products:</Strong></Text>
            <ProductList>
              {selectedOrder.products.map((product, index) => (
                <ProductItem key={index}>{product.prod_name} (x{product.quantity})</ProductItem>
              ))}
            </ProductList>
            <CloseButtonContainer>
              <CloseButton onClick={handleCloseOrderDetails}>Close</CloseButton>
            </CloseButtonContainer>
          </WrapperModalContent>

        </WrapperDetailModal>
      )}
    </Container>
  );
};
export default AdminOrdersComponent;