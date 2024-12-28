import React, { useEffect, useState } from 'react';
import { ChartBox, ChartSection, Header,StatsBox, StatsContainer, TableSection } from './Styled';
import { FaClipboardList, FaDollarSign, FaSearch, FaUser } from 'react-icons/fa';
import Chart from 'react-apexcharts';
import * as AdminService from '../../services/AdminService'

const AdminDashboard = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [monthlyCustomers, setMonthlyCustomers] = useState([]);
  console.log('first', monthlyCustomers)
  const [revenueDistribution, setrevenueDistribution] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(null);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getToken = () => {
    const storedUserData = localStorage.getItem('userData');
    const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
    return parsedUserData ? parsedUserData.token : null;
  };

  useEffect(() => {
    const token = getToken();

    const fetchMonthlySalesReport = async () => {
      try {
        const data = await AdminService.getMonthlyRevenue(token); // Sử dụng hàm để lấy doanh thu hàng tháng
        console.log('Data d:', data);
        setRevenueData(data.data); // Giả sử API trả về { success: true, data: [...] }
      } catch (err) {
        setError(err.message);
      }
    };
    const fetchMonthlyCustomers = async () => {
      try {
        const data = await AdminService.getMonthlyCustomers(token);
        console.log('Dữ liệu trả về từ API:', data); // Kiểm tra toàn bộ phản hồi từ API

        // Kiểm tra nếu 'data' có 'monthlyCustomers'
        if (data && data.success && Array.isArray(data.monthlyCustomers)) {
          setMonthlyCustomers(data.monthlyCustomers); // Cập nhật state với dữ liệu hợp lệ
        } else {
          console.error('Dữ liệu không hợp lệ hoặc không có monthlyCustomers:', data);
          setMonthlyCustomers([]); // Đặt giá trị mặc định nếu dữ liệu không hợp lệ
        }
      } catch (err) {
        console.error('Lỗi khi gọi API:', err.message);
        setMonthlyCustomers([]); // Đặt giá trị mặc định nếu có lỗi
      }
    };

    const fetchSalesReport = async () => {
      try {
        const data = await AdminService.getSalesReport(token);
        console.log('Data doanh thu:', data);
        setTotalRevenue(data.totalRevenue);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchTotalOrders = async () => {
      try {
        const Response = await AdminService.getTotalOrders(token);
        console.log("Tổng số đơn hàng:", totalOrders);
        setTotalOrders(Response.totalOrders); // Cập nhật state tổng số đơn hàng
      } catch (error) {
        console.error("Lỗi khi lấy tổng số đơn hàng:", error);
        setError(error.message); // Lưu thông báo lỗi
      }
    };
    const fetchTotalMembers = async () => {
      try {
        const Response = await AdminService.getTotalMembers(token);
        setTotalMembers(Response.totalMembers); // Cập nhật state tổng số đơn hàng
      } catch (error) {
        console.error("Lỗi khi lấy tổng số member:", error);
        setError(error.message); // Lưu thông báo lỗi
      }
    };
    const fetchRevenueDistribution = async () => {
      try {
        const data = await AdminService.getRevenueDistribution(token);
        console.log('Dữ liệu phân bổ doanh thu:', data);
        setrevenueDistribution(data.revenueDistribution); // Giả sử API trả về { success: true, revenueDistribution: [...] }
      } catch (err) {
        console.error('Lỗi khi lấy phân bổ doanh thu:', err);
        setError(err.message);
      }
    };


    const fetchData = async () => {
      await Promise.all([fetchSalesReport(), fetchMonthlyCustomers(), fetchMonthlySalesReport(), fetchTotalOrders(), fetchTotalMembers(), fetchRevenueDistribution(),]);
      setLoading(false); // Đặt loading thành false sau khi hoàn thành cả hai hàm
    };

    fetchData();
  }, []); // Chạy lại khi token thay đổi


  const barChartOptions = {
    chart: {
      toolbar: { show: false },
      background: '#f5f5f5',
    },
    xaxis: {
      // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      categories: revenueData.map(item => {
        const [year, month] = item.month.split('-');
        return new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(year, month - 1));
      }), // Chuyển "2024-01" -> "Jan"

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
    name: 'Revenue',
    data: revenueData.map(item => parseFloat(item.revenue)),
  }];

  const donutChartOptions = {
    chart: {
      type: 'donut',
      background: '#f5f5f5',
    },
    labels: revenueDistribution.map(item => item.prod_name),
    colors: ['#FF4560', '#008FFB', '#00E396', '#775DD0'],
    title: {
      text: 'Sales Distribution',
      align: 'center',
      style: { fontSize: '18px', color: '#333' },
    },
  };
 const donutChartSeries = revenueDistribution.map(item => item.revenue);


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
      categories: revenueData.map(item => {
        const [year, month] = item.month.split('-');
        return new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(year, month - 1));
      }),
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
    data: monthlyCustomers.map(item => item.customerCount),
  }];

  const downloadAllReports = () => {
    // Chuyển đổi các đối tượng thành chuỗi JSON
    const allData = {
      totalRevenue,
      totalOrders,
      totalMembers,
      revenueData: JSON.stringify(revenueData),  // Chuyển revenueData thành chuỗi JSON
      monthlyCustomers: JSON.stringify(monthlyCustomers),  // Chuyển monthlyCustomers thành chuỗi JSON
      revenueDistribution: JSON.stringify(revenueDistribution)  // Chuyển revenueDistribution thành chuỗi JSON
    };

    // Tạo CSV với nhiều bảng (sections) cho dễ nhìn
    let csvData = '=== Tổng Quan ===\n';
    csvData += 'totalRevenue,totalOrders,totalMembers\n';
    csvData += `${allData.totalRevenue},${allData.totalOrders},${allData.totalMembers}\n\n`;

    csvData += '=== Doanh Thu Theo Tháng ===\n';
    csvData += 'revenueData\n';
    csvData += `${allData.revenueData}\n\n`;

    csvData += '=== Khách Hàng Tháng Này ===\n';
    csvData += 'monthlyCustomers\n';
    csvData += `${allData.monthlyCustomers}\n\n`;

    csvData += '=== Phân Bổ Doanh Thu ===\n';
    csvData += 'revenueDistribution\n';
    csvData += `${allData.revenueDistribution}\n`;

    // Tạo một đối tượng Blob với dữ liệu CSV
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    // Tạo một liên kết tải về
    if (navigator.msSaveBlob) { // Dành cho IE
      navigator.msSaveBlob(blob, 'dashboard_report.csv');
    } else {
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'dashboard_report.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };


  return (
    <div>
      <Header style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
        <button
          onClick={downloadAllReports}
          style={{
            cursor: 'pointer',
            backgroundColor: 'rgba(77, 182, 172, 0.85)', // Màu nền của nút
            height: '40px', // Đặt chiều cao cho nút
            padding: '0 20px', // Thêm khoảng cách bên trong nút
            borderRadius: '20px', // Bo góc mềm mại hơn
            color: 'white', // Màu chữ trắng
            fontSize: '16px', // Kích thước chữ
            fontWeight: '600', // Đậm chữ
            border: 'none', // Không có viền
            transition: 'all 0.3s ease', // Hiệu ứng chuyển động mượt mà khi hover
            boxShadow: '0 4px 8px rgba(0, 227, 150, 0.3)', // Đổ bóng nhẹ cho nút
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(77, 182, 172, 0.85)'; // Thay đổi màu khi hover
            e.target.style.boxShadow = '0 6px 12px rgba(0, 200, 130, 0.4)'; // Hiệu ứng đổ bóng khi hover
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'rgba(77, 182, 172, 0.85)'; // Khôi phục màu nền khi rời khỏi hover
            e.target.style.boxShadow = '0 4px 8px rgba(0, 227, 150, 0.3)'; // Khôi phục hiệu ứng đổ bóng
          }}
        >
          Download Reports
        </button>
      </Header>

      <StatsContainer>
        <StatsBox>
          <h3><FaDollarSign /> Total Sales</h3>
          <p>${totalRevenue ? totalRevenue.toFixed(2) : 0}</p>
        </StatsBox>
        <StatsBox>
          <h3><FaClipboardList /> Total Orders</h3>
          <p>{totalOrders}</p>
        </StatsBox>
        <StatsBox>
          <h3><FaUser /> Total members</h3>
          <p>{totalMembers}</p>
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
        {/* <ChartBox>
          <Chart
            options={lineChartOptions}
            series={lineChartSeries}
            type="line"
            height="300"
          />
        </ChartBox> */}
        <ChartBox>
          <Chart
            options={customerChartOptions}
            series={customerChartSeries}
            type="bar"
            height="300"
          />
        </ChartBox>
      </ChartSection>
{/* 
      <TableSection>
     
      </TableSection> */}
    </div>
  );
};

export default AdminDashboard;
