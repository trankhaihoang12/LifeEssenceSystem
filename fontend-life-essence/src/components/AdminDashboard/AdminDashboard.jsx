import React from 'react';
import { ChartBox, ChartSection, Header, SearchContainer, StatsBox, StatsContainer, TableSection } from './Styled';
import { FaClipboardList, FaDollarSign, FaSearch, FaUser } from 'react-icons/fa';
import Chart from 'react-apexcharts';

const AdminDashboard = () => {
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
    <div>
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '20px', width: '750px', height: '44px', margin: '0 auto' }}>
            <input type="text" placeholder="Search" style={{
              padding: '10px 15px',
              border: 'none',
              borderRadius: '20px',
              flex: 1,
              fontSize: '16px',
              height: '100%',
            }} />
            <button style={{
              backgroundColor: '#4DB6AC',
              border: 'none',
              borderRadius: '20px',
              padding: '0 15px',
              cursor: 'pointer',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <FaSearch style={{ fontSize: '20px', color: '#fff' }} />
            </button>
          </div>
        </div>
        <button style={{ marginLeft: '20px', alignSelf: 'flex-end' }}>Download Reports</button>
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
          <h3><FaUser /> Daily Visitors</h3>
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
    </div>
  );
};

export default AdminDashboard;
