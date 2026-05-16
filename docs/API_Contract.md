# API Contract — MERN E-commerce ShopCart
**Mã dự án:** SHOPCART_2025
**Phiên bản:** 1.0.0
**Ngày cập nhật:** 2026-05-09

---

## Tổng quan

Base URL: `http://localhost:5000` (development)

### Authentication

> **Lưu ý quan trọng:** Hệ thống sử dụng JWT token trong header `Authorization: <jwt_token>`. Tuy nhiên, **authMiddleware hiện chưa được áp dụng cho bất kỳ route nào** — tất cả các endpoint đang ở trạng thái public (không yêu cầu xác thực thực tế). Cần bổ sung middleware trong các phiên bản tiếp theo.

- **Format token:** `Authorization: <jwt_token>`
- **Expire:** 10 ngày
- **Payload:** `{ userId }`
- **Thư viện:** jsonwebtoken

### Quy ước Response

```json
// Success
{ "data": { ... }, "message": "..." }

// Error
{ "message": "Mô tả lỗi" }
```

---

## 1. Seller Endpoints

### 1.1 POST /SellerRegister

**Mô tả:** Đăng ký tài khoản seller mới.
**Auth yêu cầu:** Không

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required)",
  "password": "string (required)",
  "shopName": "string (required)"
}
```

**Response 201 — Thành công:**
```json
{
  "seller": {
    "_id": "ObjectId",
    "name": "Nguyễn Văn A",
    "email": "seller@example.com",
    "role": "Seller",
    "shopName": "Shop ABC"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response lỗi:**
| Status | Trường hợp | Message |
|--------|------------|---------|
| 400 | Email đã tồn tại | `"Email already exists"` |
| 400 | shopName đã tồn tại | `"Shop Name already exists"` |
| 500 | Lỗi server | `"Internal server error"` |

---

### 1.2 POST /SellerLogin

**Mô tả:** Đăng nhập tài khoản seller.
**Auth yêu cầu:** Không

**Request Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response 200 — Thành công:**
```json
{
  "seller": {
    "_id": "ObjectId",
    "name": "Nguyễn Văn A",
    "email": "seller@example.com",
    "role": "Seller",
    "shopName": "Shop ABC"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response lỗi:**
| Status | Trường hợp | Message |
|--------|------------|---------|
| 400 | Email không tồn tại | `"Invalid email or password"` |
| 400 | Sai mật khẩu | `"Invalid email or password"` |
| 500 | Lỗi server | `"Internal server error"` |

---

## 2. Product Endpoints

### 2.1 POST /ProductCreate

**Mô tả:** Tạo sản phẩm mới cho seller.
**Auth yêu cầu:** Không (chưa áp dụng middleware)

**Request Body:**
```json
{
  "productName": "string (required)",
  "price": {
    "mrp": "Number (required)",
    "cost": "Number (required)",
    "discountPercent": "Number (required)"
  },
  "subcategory": "string",
  "productImage": "string (base64 hoặc URL)",
  "category": "string",
  "description": "string",
  "tagline": "string",
  "quantity": "Number",
  "seller": "ObjectId (ref sellers)"
}
```

**Response 201 — Thành công:**
```json
{
  "product": {
    "_id": "ObjectId",
    "productName": "Áo thun nam",
    "price": { "mrp": 300000, "cost": 200000, "discountPercent": 10 },
    "subcategory": "Áo",
    "productImage": "https://...",
    "category": "Thời trang",
    "description": "Mô tả sản phẩm",
    "tagline": "Chất lượng cao",
    "quantity": 50,
    "seller": "ObjectId",
    "reviews": [],
    "createdAt": "2026-05-09T00:00:00.000Z",
    "updatedAt": "2026-05-09T00:00:00.000Z"
  }
}
```

**Response lỗi:**
| Status | Trường hợp | Message |
|--------|------------|---------|
| 500 | Lỗi server | `"Internal server error"` |

---

### 2.2 GET /getSellerProducts/:id

**Mô tả:** Lấy tất cả sản phẩm của một seller theo `sellerId`.
**Auth yêu cầu:** Không

**Path Parameter:**
- `id` — ObjectId của seller

**Response 200 — Thành công:**
```json
[
  {
    "_id": "ObjectId",
    "productName": "Áo thun nam",
    "price": { "mrp": 300000, "cost": 200000, "discountPercent": 10 },
    "category": "Thời trang",
    "quantity": 50,
    "seller": "ObjectId"
  }
]
```

**Response lỗi:**
| Status | Trường hợp | Message |
|--------|------------|---------|
| 404 | Không tìm thấy seller | `"Seller not found"` |
| 500 | Lỗi server | `"Internal server error"` |

---

### 2.3 GET /getProducts

**Mô tả:** Lấy toàn bộ danh sách sản phẩm. Populate thêm `seller.shopName`.
**Auth yêu cầu:** Không

**Response 200 — Thành công:**
```json
[
  {
    "_id": "ObjectId",
    "productName": "Áo thun nam",
    "price": { "mrp": 300000, "cost": 200000, "discountPercent": 10 },
    "category": "Thời trang",
    "seller": {
      "_id": "ObjectId",
      "shopName": "Shop ABC"
    }
  }
]
```

**Response lỗi:**
| Status | Trường hợp | Message |
|--------|------------|---------|
| 500 | Lỗi server | `"Internal server error"` |

---

### 2.4 GET /getProductDetail/:id

**Mô tả:** Lấy chi tiết một sản phẩm. Populate `seller.shopName` và `reviews.reviewer.name`.
**Auth yêu cầu:** Không

**Path Parameter:**
- `id` — ObjectId của product

**Response 200 — Thành công:**
```json
{
  "_id": "ObjectId",
  "productName": "Áo thun nam",
  "price": { "mrp": 300000, "cost": 200000, "discountPercent": 10 },
  "description": "Mô tả chi tiết",
  "reviews": [
    {
      "_id": "ObjectId",
      "rating": 5,
      "comment": "Rất tốt",
      "reviewer": {
        "_id": "ObjectId",
        "name": "Khách hàng A"
      },
      "date": "2026-05-09T00:00:00.000Z"
    }
  ],
  "seller": {
    "_id": "ObjectId",
    "shopName": "Shop ABC"
  }
}
```

**Response lỗi:**
| Status | Trường hợp | Message |
|--------|------------|---------|
| 404 | Không tìm thấy sản phẩm | `"Product not found"` |
| 500 | Lỗi server | `"Internal server error"` |

---

### 2.5 GET /getInterestedCustomers/:id

**Mô tả:** Lấy danh sách khách hàng đang có sản phẩm này trong giỏ hàng.
**Auth yêu cầu:** Không

**Path Parameter:**
- `id` — ObjectId của product

**Response 200 — Thành công:**
```json
[
  {
    "customerName": "Khách hàng A",
    "customerID": "ObjectId",
    "quantity": 2
  }
]
```

**Response lỗi:**
| Status | Trường hợp | Message |
|--------|------------|---------|
| 404 | Không tìm thấy sản phẩm | `"Product not found"` |
| 500 | Lỗi server | `"Internal server error"` |

---

### 2.6 GET /getAddedToCartProducts/:id

**Mô tả:** Lấy danh sách sản phẩm của seller đang được thêm vào giỏ hàng của khách.
**Auth yêu cầu:** Không

**Path Parameter:**
- `id` — ObjectId của seller

**Response 200 — Thành công:**
```json
[
  {
    "productName": "Áo thun nam",
    "quantity": 3,
    "category": "Thời trang",
    "subcategory": "Áo",
    "productID": "ObjectId"
  }
]
```

**Response lỗi:**
| Status | Trường hợp | Message |
|--------|------------|---------|
| 500 | Lỗi server | `"Internal server error"` |

---

### 2.7 PUT /ProductUpdate/:id

**Mô tả:** Cập nhật thông tin sản phẩm.
**Auth yêu cầu:** Không (chưa áp dụng middleware)

**Path Parameter:**
- `id` — ObjectId của product

**Request Body:** Các field cần cập nhật (tất cả optional):
```json
{
  "productName": "string",
  "price": {
    "mrp": "Number",
    "cost": "Number",
    "discountPercent": "Number"
  },
  "subcategory": "string",
  "productImage": "string",
  "category": "string",
  "description": "string",
  "tagline": "string",
  "quantity": "Number"
}
```

**Response 200 — Thành công:**
```json
{
  "_id": "ObjectId",
  "productName": "Áo thun nam (updated)",
  "updatedAt": "2026-05-09T00:00:00.000Z"
}
```

**Response lỗi:**
| Status | Trường hợp | Message |
|--------|------------|---------|
| 404 | Không tìm thấy sản phẩm | `"Product not found"` |
| 500 | Lỗi server | `"Internal server error"` |

---

### 2.8 PUT /addReview/:id

**Mô tả:** Thêm đánh giá cho sản phẩm. Mỗi khách hàng chỉ được review một lần.
**Auth yêu cầu:** Không (chưa áp dụng middleware)

**Path Parameter:**
- `id` — ObjectId của product

**Request Body:**
```json
{
  "rating": "Number (required)",
  "comment": "string",
  "reviewer": "ObjectId (customerId, required)"
}
```

**Response 200 — Thành công:**
```json
{
  "_id": "ObjectId",
  "productName": "Áo thun nam",
  "reviews": [
    {
      "_id": "ObjectId",
      "rating": 5,
      "comment": "Sản phẩm tốt",
      "reviewer": "ObjectId",
      "date": "2026-05-09T00:00:00.000Z"
    }
  ]
}
```

**Response lỗi:**
| Status | Trường hợp | Message |
|--------|------------|---------|
| 400 | Khách hàng đã review trước đó | `"You have already reviewed this product"` |
| 404 | Không tìm thấy sản phẩm | `"Product not found"` |
| 500 | Lỗi server | `"Internal server error"` |

---

### 2.9 GET /searchProduct/:key

**Mô tả:** Tìm kiếm sản phẩm theo từ khóa. Tìm trong các trường `productName`, `category`, `subcategory` (regex, case-insensitive).
**Auth yêu cầu:** Không

**Path Parameter:**
- `key` — Từ khóa tìm kiếm (string)

**Response 200 — Thành công:**
```json
[
  {
    "_id": "ObjectId",
    "productName": "Áo thun nam",
    "category": "Thời trang",
    "subcategory": "Áo"
  }
]
```

**Response lỗi:**
| Status | Trường hợp | Message |
|--------|------------|---------|
| 500 | Lỗi server | `"Internal server error"` |

---

### 2.10 GET /searchProductbyCategory/:key

**Mô tả:** Tìm kiếm sản phẩm theo `category` (regex, case-insensitive).
**Auth yêu cầu:** Không

**Path Parameter:**
- `key` — Tên category

**Response 200 — Thành công:**
```json
[
  {
    "_id": "ObjectId",
    "productName": "Áo thun nam",
    "category": "Thời trang"
  }
]
```

---

### 2.11 GET /searchProductbySubCategory/:key

**Mô tả:** Tìm kiếm sản phẩm theo `subcategory` (regex, case-insensitive).
**Auth yêu cầu:** Không

**Path Parameter:**
- `key` — Tên subcategory

**Response 200 — Thành công:**
```json
[
  {
    "_id": "ObjectId",
    "productName": "Áo thun nam",
    "subcategory": "Áo"
  }
]
```

---

### 2.12 DELETE /DeleteProduct/:id

**Mô tả:** Xóa một sản phẩm. Đồng thời xóa sản phẩm này khỏi `cartDetails` của tất cả khách hàng.
**Auth yêu cầu:** Không (chưa áp dụng middleware)

**Path Parameter:**
- `id` — ObjectId của product

**Response 200 — Thành công:**
```json
{
  "message": "Product deleted successfully"
}
```

**Response lỗi:**
| Status | Trường hợp | Message |
|--------|------------|---------|
| 404 | Không tìm thấy sản phẩm | `"Product not found"` |
| 500 | Lỗi server | `"Internal server error"` |

---

### 2.13 DELETE /DeleteProducts/:id

**Mô tả:** Xóa tất cả sản phẩm của một seller. Đồng thời xóa các sản phẩm này khỏi `cartDetails` của tất cả khách hàng.
**Auth yêu cầu:** Không (chưa áp dụng middleware)

**Path Parameter:**
- `id` — ObjectId của seller

**Response 200 — Thành công:**
```json
{
  "message": "All products deleted successfully"
}
```

**Response lỗi:**
| Status | Trường hợp | Message |
|--------|------------|---------|
| 500 | Lỗi server | `"Internal server error"` |

---

### 2.14 PUT /deleteProductReview/:id

**Mô tả:** Xóa một review cụ thể khỏi sản phẩm.
**Auth yêu cầu:** Không (chưa áp dụng middleware)

**Path Parameter:**
- `id` — ObjectId của product

**Request Body:**
```json
{
  "reviewId": "ObjectId (required)"
}
```

**Response 200 — Thành công:**
```json
{
  "_id": "ObjectId",
  "productName": "Áo thun nam",
  "reviews": []
}
```

**Response lỗi:**
| Status | Trường hợp | Message |
|--------|------------|---------|
| 404 | Không tìm thấy sản phẩm | `"Product not found"` |
| 404 | Không tìm thấy review | `"Review not found"` |
| 500 | Lỗi server | `"Internal server error"` |

---

### 2.15 DELETE /deleteAllProductReviews/:id

**Mô tả:** Xóa tất cả reviews của một sản phẩm.
**Auth yêu cầu:** Không (chưa áp dụng middleware)

**Path Parameter:**
- `id` — ObjectId của product

**Response 200 — Thành công:**
```json
{
  "message": "All reviews deleted successfully"
}
```

**Response lỗi:**
| Status | Trường hợp | Message |
|--------|------------|---------|
| 404 | Không tìm thấy sản phẩm | `"Product not found"` |
| 500 | Lỗi server | `"Internal server error"` |

---

## 3. Customer Endpoints

### 3.1 POST /CustomerRegister

**Mô tả:** Đăng ký tài khoản khách hàng mới.
**Auth yêu cầu:** Không

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response 201 — Thành công:**
```json
{
  "customer": {
    "_id": "ObjectId",
    "name": "Khách hàng A",
    "email": "customer@example.com",
    "role": "Customer",
    "cartDetails": [],
    "shippingData": {}
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response lỗi:**
| Status | Trường hợp | Message |
|--------|------------|---------|
| 400 | Email đã tồn tại | `"Email already exists"` |
| 500 | Lỗi server | `"Internal server error"` |

---

### 3.2 POST /CustomerLogin

**Mô tả:** Đăng nhập tài khoản khách hàng.
**Auth yêu cầu:** Không

**Request Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response 200 — Thành công:**
```json
{
  "customer": {
    "_id": "ObjectId",
    "name": "Khách hàng A",
    "email": "customer@example.com",
    "role": "Customer",
    "cartDetails": [],
    "shippingData": {}
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response lỗi:**
| Status | Trường hợp | Message |
|--------|------------|---------|
| 400 | Email không tồn tại | `"Invalid email or password"` |
| 400 | Sai mật khẩu | `"Invalid email or password"` |
| 500 | Lỗi server | `"Internal server error"` |

---

### 3.3 GET /getCartDetail/:id

**Mô tả:** Lấy danh sách giỏ hàng (`cartDetails`) của khách hàng theo `customerId`.
**Auth yêu cầu:** Không

**Path Parameter:**
- `id` — ObjectId của customer

**Response 200 — Thành công:**
```json
{
  "cartDetails": [
    {
      "productName": "Áo thun nam",
      "price": { "mrp": 300000, "cost": 200000, "discountPercent": 10 },
      "category": "Thời trang",
      "subcategory": "Áo",
      "productImage": "https://...",
      "description": "Mô tả",
      "tagline": "Chất lượng cao",
      "quantity": 2,
      "seller": "ObjectId"
    }
  ]
}
```

**Response lỗi:**
| Status | Trường hợp | Message |
|--------|------------|---------|
| 404 | Không tìm thấy customer | `"Customer not found"` |
| 500 | Lỗi server | `"Internal server error"` |

---

### 3.4 PUT /CustomerUpdate/:id

**Mô tả:** Cập nhật thông tin khách hàng, thường dùng để cập nhật `cartDetails`.
**Auth yêu cầu:** Không (chưa áp dụng middleware)

**Path Parameter:**
- `id` — ObjectId của customer

**Request Body:**
```json
{
  "cartDetails": [
    {
      "productName": "string",
      "price": { "mrp": "Number", "cost": "Number", "discountPercent": "Number" },
      "subcategory": "string",
      "productImage": "string",
      "category": "string",
      "description": "string",
      "tagline": "string",
      "quantity": "Number",
      "seller": "ObjectId"
    }
  ]
}
```

**Response 200 — Thành công:**
```json
{
  "cartDetails": [
    {
      "productName": "Áo thun nam",
      "quantity": 3
    }
  ]
}
```

**Response lỗi:**
| Status | Trường hợp | Message |
|--------|------------|---------|
| 404 | Không tìm thấy customer | `"Customer not found"` |
| 500 | Lỗi server | `"Internal server error"` |

---

## 4. Order Endpoints

### 4.1 POST /newOrder

**Mô tả:** Tạo đơn hàng mới.
**Auth yêu cầu:** Không (chưa áp dụng middleware)

**Request Body:**
```json
{
  "buyer": "ObjectId (customerId, required)",
  "shippingData": {
    "address": "string (required)",
    "city": "string (required)",
    "state": "string (required)",
    "country": "string (required)",
    "pinCode": "Number (required)",
    "phoneNo": "Number (required)"
  },
  "orderedProducts": [
    {
      "productName": "Áo thun nam",
      "price": { "mrp": 300000, "cost": 200000, "discountPercent": 10 },
      "category": "Thời trang",
      "quantity": 2,
      "productImage": "https://..."
    }
  ],
  "paymentInfo": {
    "id": "string (required)",
    "status": "string (required)"
  },
  "productsQuantity": "Number (required)",
  "totalPrice": "Number (required)"
}
```

**Response 201 — Thành công:**
```json
{
  "order": {
    "_id": "ObjectId",
    "buyer": "ObjectId",
    "shippingData": { "address": "123 Đường ABC", "city": "HCM", ... },
    "orderedProducts": [...],
    "paymentInfo": { "id": "pay_123", "status": "paid" },
    "paidAt": "2026-05-09T00:00:00.000Z",
    "productsQuantity": 2,
    "totalPrice": 400000,
    "orderStatus": "Processing",
    "createdAt": "2026-05-09T00:00:00.000Z"
  }
}
```

**Response lỗi:**
| Status | Trường hợp | Message |
|--------|------------|---------|
| 400 | Thiếu field bắt buộc | `"Missing required fields"` |
| 500 | Lỗi server | `"Internal server error"` |

---

### 4.2 GET /getOrderedProductsByCustomer/:id

**Mô tả:** Lấy tất cả đơn hàng đã đặt bởi một khách hàng.
**Auth yêu cầu:** Không

**Path Parameter:**
- `id` — ObjectId của customer (buyer)

**Response 200 — Thành công:**
```json
[
  {
    "_id": "ObjectId",
    "buyer": "ObjectId",
    "orderedProducts": [...],
    "totalPrice": 400000,
    "orderStatus": "Processing",
    "createdAt": "2026-05-09T00:00:00.000Z"
  }
]
```

**Response lỗi:**
| Status | Trường hợp | Message |
|--------|------------|---------|
| 404 | Không tìm thấy đơn hàng | `"No orders found"` |
| 500 | Lỗi server | `"Internal server error"` |

---

### 4.3 GET /getOrderedProductsBySeller/:id

**Mô tả:** Lấy tất cả sản phẩm đã được đặt hàng của một seller. Nếu cùng `productId` xuất hiện nhiều lần (từ nhiều đơn hàng), **merge lại và cộng dồn quantity**.
**Auth yêu cầu:** Không

**Path Parameter:**
- `id` — ObjectId của seller

**Response 200 — Thành công:**
```json
[
  {
    "productName": "Áo thun nam",
    "productID": "ObjectId",
    "category": "Thời trang",
    "quantity": 10,
    "totalRevenue": 2000000
  }
]
```

> **Lưu ý:** Kết quả đã được merge: các đơn hàng khác nhau có cùng `productId` sẽ được gộp lại thành 1 entry duy nhất với `quantity` là tổng cộng.

**Response lỗi:**
| Status | Trường hợp | Message |
|--------|------------|---------|
| 500 | Lỗi server | `"Internal server error"` |

---

## Bảng tóm tắt tất cả endpoints

| # | Method | URL | Mô tả | Auth |
|---|--------|-----|--------|------|
| 1 | POST | /SellerRegister | Đăng ký seller | Không |
| 2 | POST | /SellerLogin | Đăng nhập seller | Không |
| 3 | POST | /ProductCreate | Tạo sản phẩm | Không* |
| 4 | GET | /getSellerProducts/:id | Products của seller | Không |
| 5 | GET | /getProducts | Tất cả products | Không |
| 6 | GET | /getProductDetail/:id | Chi tiết product | Không |
| 7 | GET | /getInterestedCustomers/:id | Customers có product trong cart | Không |
| 8 | GET | /getAddedToCartProducts/:id | Products của seller trong cart | Không |
| 9 | PUT | /ProductUpdate/:id | Cập nhật product | Không* |
| 10 | PUT | /addReview/:id | Thêm review | Không* |
| 11 | GET | /searchProduct/:key | Tìm kiếm tổng hợp | Không |
| 12 | GET | /searchProductbyCategory/:key | Tìm theo category | Không |
| 13 | GET | /searchProductbySubCategory/:key | Tìm theo subcategory | Không |
| 14 | DELETE | /DeleteProduct/:id | Xóa 1 product | Không* |
| 15 | DELETE | /DeleteProducts/:id | Xóa tất cả products của seller | Không* |
| 16 | PUT | /deleteProductReview/:id | Xóa 1 review | Không* |
| 17 | DELETE | /deleteAllProductReviews/:id | Xóa tất cả reviews | Không* |
| 18 | POST | /CustomerRegister | Đăng ký customer | Không |
| 19 | POST | /CustomerLogin | Đăng nhập customer | Không |
| 20 | GET | /getCartDetail/:id | Lấy giỏ hàng | Không |
| 21 | PUT | /CustomerUpdate/:id | Cập nhật customer/cart | Không* |
| 22 | POST | /newOrder | Tạo đơn hàng | Không* |
| 23 | GET | /getOrderedProductsByCustomer/:id | Orders của customer | Không |
| 24 | GET | /getOrderedProductsBySeller/:id | Orders của seller | Không |

> (*) Các endpoint này **nên** yêu cầu auth nhưng authMiddleware chưa được áp dụng.

---

*Tài liệu được tạo tự động cho dự án SHOPCART_2025 — Ngày 2026-05-09*
