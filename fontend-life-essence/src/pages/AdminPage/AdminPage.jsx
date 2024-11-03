import React from 'react';
import AdminHistoryComponent from '../../components/AdminHistoryComponnent/AdminHistoryComponnent'; 

import {
  Container,
  Sidebar,
  Profile,
  Navigation,
  MainContent,
  Header,
  StatsContainer,
  StatsBox,
  ChartSection,
  ChartBox,
  TableSection,
  SearchContainer,
} from './Style';
import {
  FaUser,
  FaProductHunt,
  FaShoppingCart,
  FaFileInvoice,
  FaHistory,
  FaCog,
  FaSignOutAlt,
  FaTachometerAlt,
  FaSearch,
  FaDollarSign,
  FaClipboardList,
  FaUsers,
} from 'react-icons/fa';
import Chart from 'react-apexcharts';

const AdminPage = () => {
  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    alert("Bạn đã đăng xuất!"); // Thay thế bằng logic thực tế
  };

  const barChartOptions = {
    chart: {
      toolbar: { show: false },
      background: '#f5f5f5',
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    },
    colors: ['#4DB6AC'],
    dataLabels: { enabled: false },
    title: {
      text: 'Monthly Sales',
      align: 'center',
      style: { fontSize: '18px', color: '#333' },
    },
  };

  const barChartSeries = [{
    name: 'Sales',
    data: [30, 40, 45, 50, 49, 60, 70],
  }];

  const donutChartOptions = {
    chart: {
      type: 'donut',
      background: '#f5f5f5',
    },
    labels: ['Product A', 'Product B', 'Product C', 'Product D'],
    colors: ['#FF4560', '#008FFB', '#00E396', '#775DD0'],
    title: {
      text: 'Sales Distribution',
      align: 'center',
      style: { fontSize: '18px', color: '#333' },
    },
  };

  const donutChartSeries = [44, 55, 13, 43];

  const lineChartOptions = {
    chart: {
      toolbar: { show: false },
      background: '#f5f5f5',
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    colors: ['#00E396'],
    dataLabels: { enabled: false },
    title: {
      text: 'Weekly Visitors',
      align: 'center',
      style: { fontSize: '18px', color: '#333' },
    },
  };

  const lineChartSeries = [{
    name: 'Visitors',
    data: [10, 20, 15, 30, 25, 40, 35],
  }];

  const customerChartOptions = {
    chart: {
      toolbar: { show: false },
      background: '#f5f5f5',
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    },
    colors: ['#FF9800'],
    dataLabels: { enabled: false },
    title: {
      text: 'Monthly Customers',
      align: 'center',
      style: { fontSize: '18px', color: '#333' },
    },
  };

  const customerChartSeries = [{
    name: 'Customers',
    data: [100, 200, 150, 300, 250, 400, 350],
  }];

  return (
    <Container>
      {/* Sidebar */}
      <Sidebar>
        <Profile>
          <div className="avatar">A</div>
          <h2>VĂN LÂN</h2>
          <p>ADMIN</p>
        </Profile>
        <Navigation>
          <ul>
            <li><FaTachometerAlt /> Dashboard</li>
            <li><FaUser /> Customer</li>
            <li><FaProductHunt /> Products</li>
            <li><FaShoppingCart /> Orders</li>
            <li><FaFileInvoice /> Invoice</li>
            <li><FaHistory /> History</li>
            <li><FaCog /> Settings</li>
            {/* Bỏ Reports và Login */}
            <li onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </li>
          </ul>
        </Navigation>
      </Sidebar>

      {/* Main Content */}
      <MainContent>
        <Header>
          <SearchContainer>
            <input type="text" placeholder="Search" />
            <button><FaSearch /></button>
          </SearchContainer>
          <button>Download Reports</button>
        </Header>

        <StatsContainer>
          <StatsBox>
            <h3><FaDollarSign /> Total Sales</h3>
            <p>$12,426</p>
          </StatsBox>
          <StatsBox>
            <h3><FaClipboardList /> Total Orders</h3>
            <p>84,382</p>
          </StatsBox>
          <StatsBox>
            <h3><FaUsers /> Daily Visitors</h3>
            <p>33,493</p>
          </StatsBox>
        </StatsContainer>

        <ChartSection>
          <ChartBox>
            <Chart
              options={barChartOptions}
              series={barChartSeries}
              type="bar"
              height="300"
            />
          </ChartBox>
          <ChartBox>
            <Chart
              options={donutChartOptions}
              series={donutChartSeries}
              type="donut"
              height="300"
            />
          </ChartBox>
        </ChartSection>

        <ChartSection>
          <ChartBox>
            <Chart
              options={lineChartOptions}
              series={lineChartSeries}
              type="line"
              height="300"
            />
          </ChartBox>
          <ChartBox>
            <Chart
              options={customerChartOptions}
              series={customerChartSeries}
              type="bar"
              height="300"
            />
          </ChartBox>
        </ChartSection>

        <TableSection>
          <h3>Recently Order</h3>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Product</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>123456</td>
                <td>Quynh Nhu</td>
                <td>$120.00</td>
                <td>Product A</td>
                <td>Paid</td>
              </tr>
              {/* Other rows */}
            </tbody>
          </table>
        </TableSection>

        {/* Thêm AdminHistoryComponent vào đây */}
        <AdminHistoryComponent />
        
      </MainContent>
    </Container>
  );
};

export default AdminPage;
