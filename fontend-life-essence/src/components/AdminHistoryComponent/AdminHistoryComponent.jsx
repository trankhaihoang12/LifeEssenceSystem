import React from 'react';
import { FaDownload } from 'react-icons/fa';
import { 
  Container, 
  Header, 
  Title, 
  Button, 
  ChartContainer, 
  SummaryCard, 
  ChartWrapper, 
  SideStats, 
  TableContainer 
} from './Style';
import Chart from 'react-apexcharts';
const AdminHistoryComponent = () => {
  const barChartOptions = {
    chart: { toolbar: { show: false }, background: '#f9f9f9' },
    xaxis: { categories: ['Q1', 'Q2', 'Q3', 'Q4'] },
    colors: ['#7367F0'],
    dataLabels: { enabled: false },
    title: {
      text: 'Revenue by Quarter',
      align: 'left',
      style: { fontSize: '16px', color: '#333' },
    },
  };
  const barChartSeries = [{ name: 'Revenue', data: [12000, 18000, 15000, 22000] }];
  return (
    <Container>
      <Header>
        <Title>History Overview</Title>
        <Button>
          <FaDownload /> Download Reports
        </Button>
      </Header>
      <ChartContainer>
        <ChartWrapper>
          <Chart
            options={barChartOptions}
            series={barChartSeries}
            type="bar"
            height="250"
          />
        </ChartWrapper>
        <SideStats>
          <SummaryCard>
            <h4>Total Orders</h4>
            <p>5,000</p>
          </SummaryCard>
          <SummaryCard>
            <h4>Total Revenue</h4>
            <p>$98,245</p>
          </SummaryCard>
        </SideStats>
      </ChartContainer>
      <TableContainer>
        <h3>Recent Orders</h3>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#12345</td>
              <td>John Doe</td>
              <td>$500</td>
              <td>Completed</td>
            </tr>
            <tr>
              <td>#12346</td>
              <td>Jane Smith</td>
              <td>$320</td>
              <td>Pending</td>
            </tr>
          </tbody>
        </table>
      </TableContainer>
    </Container>
  );
};
export default AdminHistoryComponent;