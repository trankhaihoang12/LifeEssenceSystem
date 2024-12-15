import React, { useEffect, useState } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { ExportButton, StatusBadge, WrapperButton, WrapperContainer, WrapperHeader, WrapperInput, WrapperPagination, WrapperTable, WrapperTableData, WrapperTableHeader, WrapperTableRow } from './Style';
import { LuSearch } from 'react-icons/lu';
import { EditFormContainer, EditForm, Input, EditFormButton, CancelButton } from './Style'; // Thêm vào các styled-component cho form chỉnh sửa
import * as AdminService from '../../services/AdminService'; // Sửa từ UserService thành BlogService


const AdminBlogsComponnent = () => {
    const [blogs, setBlogs] = useState([]);
    console.log(blogs)
    const [selectedBlogs, setSelectedBlogs] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editBlog, setEditBlog] = useState(null);
    const [showDetailForm, setShowDetailForm] = useState(false); // Hiển thị form chi tiết
    const [detailBlog, setDetailBlog] = useState(null); // Blog đang xem chi tiết
    console.log('dêtai', detailBlog)
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 10;
    const totalPages = Math.ceil(blogs.length / blogsPerPage);

    const getToken = () => {
        const storedUserData = localStorage.getItem('userData');
        const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
        return parsedUserData ? parsedUserData.token : null;
    };

    useEffect(() => {
        const token = getToken();

        if (token) {
            const fetchBlogs = async () => {
                try {
                    const fetchedBlogs = await AdminService.getAllBlogAdmin(token);
                    console.log("Dữ liệu API trả về:", fetchedBlogs);

                    // Kiểm tra dữ liệu trả về từ API
                    if (fetchedBlogs?.data && Array.isArray(fetchedBlogs.data)) {
                        setBlogs(fetchedBlogs.data); // Lưu dữ liệu bài blog vào state
                    } else {
                        console.error("Dữ liệu API không hợp lệ hoặc có lỗi:", fetchedBlogs);
                        setBlogs([]); // Nếu có lỗi, set state là mảng rỗng
                    }
                } catch (error) {
                    console.error("Lỗi khi lấy danh sách blog:", error);
                    setBlogs([]); // Nếu có lỗi, set state là mảng rỗng
                }
            };

            fetchBlogs();
        } else {
            console.error("Không tìm thấy token trong localStorage.");
        }
    }, []);

    const handleExport = () => {
        alert('Xuất file Excel');
    };


    const handleDelete = async (id) => {
        const token = getToken();
        if (!token) {
            console.error("Token không tồn tại, không thể xóa blog.");
            return;
        }

        if (window.confirm("Bạn có chắc chắn muốn xóa bài viết này không?")) {
            try {
                const response = await AdminService.deleteBlog(id, token);
                console.log("Xóa thành công:", response);

                setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
                alert("Bài viết đã được xóa thành công!");
            } catch (error) {
                console.error("Lỗi khi xóa bài viết:", error);
                alert("Có lỗi xảy ra khi xóa bài viết.");
            }
        }
    };

    const handleViewDetail = (blog) => {
        console.log("Blog được chọn để xem chi tiết:", blog); 
        setDetailBlog(blog); // Cập nhật thông tin blog đang xem
        setShowDetailForm(true); // Hiển thị form chi tiết
    };

    const handleApprove = async (blogId) => {
        const token = getToken(); // Lấy token từ localStorage
        if (!token) {
            console.error("Token không tồn tại, không thể duyệt blog.");
            return;
        }

        try {
            const response = await AdminService.approveBlog(blogId, token);
            console.log("Duyệt blog thành công:", response);

            setBlogs((prevBlogs) =>
                prevBlogs.map((blog) =>
                    blog.id === blogId ? { ...blog, is_approved: true } : blog
                )
            );
            alert("Bài viết đã được duyệt thành công!");
        } catch (error) {
            console.error("Lỗi khi duyệt blog:", error);
            alert("Có lỗi xảy ra khi duyệt bài viết.");
        }
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedBlogs(blogs.map(blog => blog.id));
        } else {
            setSelectedBlogs([]);
        }
    };

    const handleSelectBlog = (id) => {
        setSelectedBlogs(prevSelected => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter(blogId => blogId !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const displayedBlogs = blogs.slice(
        (currentPage - 1) * blogsPerPage,
        currentPage * blogsPerPage
    );
    console.log('displayedBlogs', displayedBlogs)

    const handleCancelEdit = () => {
        setShowEditForm(false);
    };

    const getImageUrl = (path) => {
        const BASE_URL = "http://localhost:4000/";
        return path ? `${BASE_URL}${path.replace(/\\/g, '/')}` : null;
    };
    console.log("Image URL:", getImageUrl(detailBlog?.image_url));

    return (
        <WrapperContainer>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '20px', width: '750px', height: '44px', marginBottom: '20px' }}>
                    <WrapperInput type="text" placeholder="Tìm kiếm..." />
                    <WrapperButton>
                        <span style={{ fontSize: '20px', color: '#fff' }}><LuSearch /></span>
                    </WrapperButton>
                </div>
            </div>
            <WrapperHeader>
                <h2>Blogs Management</h2>
                <span>{blogs.length} blogs</span>
            </WrapperHeader>
            <ExportButton onClick={handleExport}>
                Export Excel
            </ExportButton>

            {/* Form hiển thị chi tiết bài viết */}
            {showDetailForm && detailBlog && (
                <EditFormContainer>
                    <EditForm style={{ maxWidth: '900px', margin: 'auto', padding: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h3 style={{ display: 'flex',justifyContent: 'center', textAlign: 'center', marginBottom: '20px', fontSize: '24px', fontWeight: '600' }}>Blog Detail</h3>

                        {/* Title Input */}
                        <div style={{ marginBottom: '20px' }}>
                            <Input
                                type="text"
                                value={detailBlog?.title || ''}
                                readOnly
                                placeholder="Title"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    backgroundColor: '#f7fafc',
                                    borderRadius: '8px',
                                    border: '1px solid #e2e8f0',
                                }}
                            />
                        </div>
                            {/* Blog Image */}
                            {detailBlog?.image_url && (
                                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                                    <h4 style={{ marginBottom: '10px' }}>Image</h4>
                                    <img
                                    src={getImageUrl(detailBlog?.image_url)}
                                        alt="Blog"
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '300px',
                                            objectFit: 'cover',
                                            borderRadius: '8px',
                                            border: '1px solid #e2e8f0',
                                        }}
                                    />
                                </div>
                            )}

                        {/* Content Input */}
                        <div style={{ marginBottom: '20px' }}>
                            <Input
                                type="text"
                                value={detailBlog?.content || ''}
                                readOnly
                                placeholder="Content"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    fontSize: '16px',
                                    backgroundColor: '#f7fafc',
                                    borderRadius: '8px',
                                    border: '1px solid #e2e8f0',
                                    height: '150px',
                                    resize: 'none',
                                }}
                            />
                        </div>


                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            marginTop: '20px',
                            padding: '10px 0',
                            borderTop: '1px solid #E2E8F0', // Tạo đường phân cách trên cùng
                            borderBottom: '1px solid #E2E8F0', // Tạo đường phân cách dưới cùng
                        }}>
                            {/* Hiển thị trạng thái duyệt */}
                            <div style={{ flex: '1' }}>
                                <h4>Status</h4>
                                <StatusBadge status={detailBlog?.is_approved ? 'approved' : 'pending'}>
                                    {detailBlog?.is_approved ? 'Approved' : 'Pending'}
                                </StatusBadge>
                            </div>

                            {/* Hiển thị ngày tạo bài viết */}
                            <div style={{ flex: '1', textAlign: 'right' }}>
                                <h4>Created At</h4>
                                <p>{new Date(detailBlog?.created_at).toLocaleString()}</p>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', gap: '15px' }}>
                            {/* Close Button */}
                            <CancelButton
                                onClick={() => setShowDetailForm(false)}
                                style={{
                                    backgroundColor: '#e2e8f0',
                                    color: '#4a5568',
                                    padding: '12px 25px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontWeight: '500',
                                    transition: '0.3s',
                                }}
                            >
                                Close
                            </CancelButton>

                            {/* Approve Button */}
                            {!detailBlog?.is_approved && (
                                <EditFormButton
                                    onClick={() => handleApprove(detailBlog.id)}
                                    style={{
                                        backgroundColor: '#38A169', // Green for approved
                                        color: '#fff',
                                        padding: '12px 25px',
                                        borderRadius: '8px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontWeight: '500',
                                        transition: '0.3s',
                                    }}
                                >
                                    Approve
                                </EditFormButton>
                            )}
                        </div>

                    </EditForm>
                </EditFormContainer>

            )}

            <WrapperTable>
                <thead>
                    <tr>
                        <WrapperTableHeader>
                            <input
                                type="checkbox"
                                checked={selectedBlogs.length === blogs.length}
                                onChange={handleSelectAll}
                            />
                        </WrapperTableHeader>
                        <WrapperTableHeader>Id</WrapperTableHeader>
                        <WrapperTableHeader>Created</WrapperTableHeader>
                        <WrapperTableHeader>Title</WrapperTableHeader>
                        <WrapperTableHeader>Status</WrapperTableHeader>
                        <WrapperTableHeader>Actions</WrapperTableHeader>
                    </tr>
                </thead>
                <tbody>
                    {displayedBlogs.map((blog) => (
                        <WrapperTableRow key={blog.id}>
                            <WrapperTableData>
                                <input
                                    type="checkbox"
                                    checked={selectedBlogs.includes(blog.id)}
                                    onChange={() => handleSelectBlog(blog.id)}
                                />
                            </WrapperTableData>
                            <WrapperTableData>{blog.id}</WrapperTableData>
                            <WrapperTableData>{blog.created_at ? new Date(blog.created_at).toLocaleDateString() : 'N/A'}</WrapperTableData>
                            <WrapperTableData>{blog.title}</WrapperTableData>
                            <WrapperTableData><StatusBadge status={blog.is_approved ? 'approved' : 'pending'}>{blog.is_approved ? 'Approved' : 'Pending'}</StatusBadge></WrapperTableData>
                            <WrapperTableData>
                                <FaPen onClick={() => handleViewDetail(blog)} style={{ cursor: 'pointer', color: '#6366F1' }} />
                                <FaTrash onClick={() => handleDelete(blog.id)} style={{ cursor: 'pointer', color: '#E53E3E', marginLeft: '8px' }} />
                                {!blog.is_approved && (
                                    <button onClick={() => handleApprove(blog.id)} style={{ marginLeft: '8px', color: '#38A169' }}>Approve</button>
                                )}
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
        </WrapperContainer>
    );
};

export default AdminBlogsComponnent;
