# DANH SÁCH THÀNH VIÊN NHÓM — DỰ ÁN SHOPCART SQA

> Môn: Đảm bảo chất lượng phần mềm
> Mã dự án: `SHOPCART_2025`
> Hệ thống: [SHOPCART MERN E-Commerce](https://github.com/Yogndrr/MERN-Ecommerce-Site)

---

## Danh sách thành viên

| # | Họ và tên | MSSV | Vai trò | Chức năng phụ trách |
|---|---|---|---|---|
| 1 | Nguyễn Minh Tiến | K23DTCN215 | **Trưởng nhóm** | Xác thực & Phân quyền |
| 2 | Phạm Văn Nhật | K23DTCN176 | Thành viên | Quản lý sản phẩm (Seller) |
| 3 | Hồ Thân Chính | K23DTCN086 | Thành viên | Tìm kiếm & Duyệt sản phẩm |
| 4 | Phạm Minh Tiến | K23DTCN213 | Thành viên | Giỏ hàng & Đặt hàng |
| 5 | Nguyễn Thị Thanh Thảo | K23DTCN207 | Thành viên | Review/Rating & Seller Dashboard |

---

## Phân chia phạm vi kỹ thuật

### 1. Nguyễn Minh Tiến (K23DTCN215) — Xác thực & Phân quyền

**Backend:**
- `POST /CustomerRegister`
- `POST /CustomerLogin`
- `POST /SellerRegister`
- `POST /SellerLogin`
- `middleware/authMiddleware.js`
- `utils/token.js`

**Frontend:**
- `pages/AuthenticationPage.jsx`
- `redux/userSlice.js`
- `redux/userHandle.js`
- `redux/store.js`
- `pages/Logout.jsx`

---

### 2. Phạm Văn Nhật (K23DTCN176) — Quản lý sản phẩm (Seller)

**Backend:**
- `POST /ProductCreate`
- `GET /getSellerProducts/:id`
- `PUT /ProductUpdate/:id`
- `DELETE /DeleteProduct/:id`
- `DELETE /DeleteProducts/:id`

**Frontend:**
- `pages/seller/pages/AddProduct.jsx`
- `pages/seller/pages/ShowProducts.jsx`
- `pages/seller/pages/ViewProductSeller.jsx`
- `pages/seller/pages/SellerHomePage.jsx`

---

### 3. Hồ Thân Chính (K23DTCN086) — Tìm kiếm & Duyệt sản phẩm

**Backend:**
- `GET /getProducts`
- `GET /getProductDetail/:id`
- `GET /searchProduct/:key`
- `GET /searchProductbyCategory/:key`
- `GET /searchProductbySubCategory/:key`

**Frontend:**
- `pages/Home.jsx`
- `pages/ViewProduct.jsx`
- `pages/customer/components/ProductsMenu.jsx`
- `pages/customer/components/Search.jsx`
- `pages/customer/pages/CustomerSearch.jsx`
- `components/Products.jsx`

---

### 4. Phạm Minh Tiến (K23DTCN213) — Giỏ hàng & Đặt hàng

**Backend:**
- `GET /getCartDetail/:id`
- `PUT /CustomerUpdate/:id` (cart)
- `POST /newOrder`
- `GET /getOrderedProductsByCustomer/:id`
- `GET /getOrderedProductsBySeller/:id`

**Frontend:**
- `pages/customer/components/Cart.jsx`
- `pages/customer/components/OrderSummary.jsx`
- `pages/customer/components/PaymentForm.jsx`
- `pages/customer/components/ShippingPage.jsx`
- `pages/customer/pages/CheckoutSteps.jsx`
- `pages/customer/pages/CheckoutAftermath.jsx`
- `pages/customer/pages/CustomerOrders.jsx`
- `pages/customer/pages/ViewOrder.jsx`

---

### 5. Nguyễn Thị Thanh Thảo (K23DTCN207) — Review/Rating & Seller Dashboard

**Backend:**
- `PUT /addReview/:id`
- `PUT /deleteProductReview/:id`
- `DELETE /deleteAllProductReviews/:id`
- `GET /getInterestedCustomers/:id`
- `GET /getAddedToCartProducts/:id`

**Frontend:**
- `pages/seller/SellerDashboard.jsx`
- `pages/seller/pages/SellerProfile.jsx`
- `pages/seller/pages/ShowCustomers.jsx`
- `pages/seller/pages/ShowOrders.jsx`
- `pages/seller/pages/ShopcartSpecial.jsx`
- `pages/seller/components/SalesChart.jsx`
- `pages/seller/components/SalesCard.jsx`
- `pages/seller/components/AddedToCartSection.jsx`
- `pages/seller/components/OutForDeliverySection.jsx`
- `pages/ViewProduct.jsx` (phần review/rating)

---

## Liên hệ & Công cụ nhóm

| Hạng mục | Link / Thông tin |
|---|---|
| Repo nhóm GitHub | *(cập nhật sau khi fork)* |
| Google Drive nhóm | *(cập nhật sau khi tạo)* |
| Nhóm chat | *(Zalo / Discord)* |
| Project board | *(GitHub Projects / Trello)* |
