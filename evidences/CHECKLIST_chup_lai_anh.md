# CHECKLIST CHỤP LẠI ẢNH BẰNG CHỨNG TEST CASE — SHOPCART_2025

> Rà soát toàn bộ 66 ảnh UC trong `evidences/`. Có **2 nhóm vấn đề**: (a) ảnh **trùng hệt nhau** (cùng md5) dùng cho 2 test case khác nhau; (b) ảnh **sai nội dung** (không đúng màn hình/thao tác test case yêu cầu).
>
> ⚠️ Các ảnh này cũng chính là ảnh nhúng trong file `03.KetQua_Tong_Hop.xlsx` (cột "Hình ảnh mô tả") → sau khi chụp lại phải **chèn lại vào file Excel** cho khớp.

Tổng số ảnh cần chụp lại: **~22 ảnh**.

---

## 7 CẶP ẢNH TRÙNG HỆT NHAU (xác nhận bằng md5)

| Cặp trùng | Ảnh hiện tại thực chất là | Giữ cho | Chụp lại |
|---|---|---|---|
| AUTH_02 = AUTH_08 | Trang chủ đã đăng nhập | AUTH_08 | **AUTH_02** |
| PROD_01 = PROD_04 | Trang chủ, slide carousel #2 | PROD_01 | **PROD_04** |
| PROD_05 = SRCH_09 | Trang /Products dạng grid | PROD_05 | **SRCH_09** |
| CART_02 = CART_03 | Drawer giỏ, quantity=1 | CART_02 | **CART_03** |
| CART_06 = CART_07 | Checkout Stepper bước 1 (form rỗng) | CART_07 | CART_06 (ưu tiên thấp) |
| CART_08 = CART_09 | Checkout bước 2 "Review your order" | CART_09 | **CART_08** |
| REVW_01 = REVW_02 | Reviews + list, có icon 3 chấm | REVW_01 | REVW_02 (chụp riêng) |

---

## DANH SÁCH CHỤP LẠI THEO MODULE

### AUTH (Đăng ký / Đăng nhập) — 2 ảnh
- [ ] **AUTH_02** — Đăng ký Customer THÀNH CÔNG: chụp toast/thông báo "Register successful" hoặc màn hình redirect ngay sau khi submit form Customer Register hợp lệ (để phân biệt với AUTH_08 đăng nhập). *Hiện đang trùng ảnh với AUTH_08.*
- [ ] **AUTH_17** — Đăng xuất thành công: chụp menu dropdown Avatar đang mở có nút **Logout**, và/hoặc trạng thái **sau khi logout** (header quay về "SIGN IN"). *Hiện đang là trang chủ lúc CÒN đăng nhập.*

### PROD (Sản phẩm) — 6 ảnh
- [ ] **PROD_02** — Màn hình loading thật: Newton's Cradle loader + text "Please Wait A Second". *Hiện đang là ảnh trắng.*
- [ ] **PROD_03** — Empty-state thật (DB không sản phẩm): chỉ hiện "No products found right now", KHÔNG còn carousel sản phẩm phía sau. *Hiện là overlay "simulated" đè lên trang có sản phẩm.*
- [ ] **PROD_04** — Auto-play carousel: chụp một slide KHÁC (dot active khác PROD_01). *Hiện trùng hệt PROD_01.*
- [ ] **PROD_09** — Sản phẩm CÓ danh sách review thật (≥1 review hiển thị). *Hiện là "No Reviews Found".*
- [ ] **PROD_12** — Thêm sản phẩm thành công: chụp popup/toast **"Done Successfully"**. *Hiện chỉ là form đã điền, chưa có popup.*
- [ ] **PROD_13** — (API) Postman thật: POST `/ProductCreate` KHÔNG kèm token + response (HTTP 200 thay vì 401). *Hiện là overlay chữ trên trang chủ.*

### SRCH (Tìm kiếm) — 4 ảnh
- [ ] **SRCH_07** — Mobile: sau khi bấm SearchIcon → hiển thị trang **/Search** (giao diện mobile). *Hiện chỉ là trang chủ mobile.*
- [ ] **SRCH_08** — Trang /Search đang gõ từ khóa và có kết quả hiện **realtime**. *Hiện thanh tìm trống, không kết quả.*
- [ ] **SRCH_09** — Lọc theo **danh mục chính** thật: chọn 1 danh mục (vd Electronics), kết quả chỉ còn sản phẩm danh mục đó (thấy danh mục active / URL category). *Hiện trùng PROD_05 (danh sách thường).*
- [ ] **SRCH_10** — Lọc theo **danh mục con (subcategory)** thật: chọn 1 subcategory, hiển thị sản phẩm đã lọc. *Hiện chỉ là dropdown CATEGORIES chính mở trên trang chủ.*

### CART (Giỏ hàng / Đặt hàng) — 4 ảnh
- [ ] **CART_03** — Sau khi bấm +1: drawer với **Quantity = 2**, Total/Price cập nhật. *Hiện trùng CART_02 (quantity=1).*
- [ ] **CART_04** — Sau khi bấm -1 về 0: drawer giỏ rỗng (emptyCart) hoặc sản phẩm đã bị xóa. *Hiện là trang chi tiết sản phẩm bình thường.*
- [ ] **CART_08** — Bước 1 nhập địa chỉ giao hàng (form Address/City... đang nhập). *Hiện trùng CART_09 (bước 2 Review).*
- [ ] **CART_11** — Thao tác nút **Back** quay lại bước trước (nên có ảnh trước/sau hoặc highlight nút Back). *Hiện là bước 1 với nút CHANGE+NEXT, không có Back.*
- [ ] CART_06 *(ưu tiên thấp)* — Giỏ hàng có nút **Buy All** trước khi bấm (để phân biệt với CART_07).

### REVW (Đánh giá / Dashboard) — 5 ảnh
- [ ] **REVW_02** — Chụp riêng (không trùng REVW_01): mở menu 3 chấm (MoreVert) thấy tùy chọn Delete/Edit trên review của mình.
- [ ] **REVW_05** — Seller xem sản phẩm ĐÃ BÁN: tab **COMPLETED ORDERS** CÓ dữ liệu. *Hiện là tab ADDED TO CART rỗng (05/06 bị đảo).*
- [ ] **REVW_06** — Seller xem sản phẩm trong GIỎ KHÁCH: tab **ADDED TO CART** có dữ liệu. *Hiện là trang dashboard (nội dung của REVW_08).*
- [ ] **REVW_09** — (API) Postman thật: PUT `/addReview/<id>` không token + response (HTTP 200 thay vì 401). *Hiện là overlay chữ trên trang chủ.*
- [ ] **REVW_10** — (API) Postman thật: PUT `/deleteProductReview/<id>` xóa review sản phẩm người khác + response (HTTP 200 thay vì 403). *Hiện là overlay chữ trên trang chủ.*

---

## ⚠️ VẤN ĐỀ NHẤT QUÁN CẦN THỐNG NHẤT (các test case API/bảo mật)

Các ca kiểm thử API (AUTH_12/15/16/18, PROD_13, SRCH_05/06, REVW_09/10) hiện dùng **overlay chữ chèn trên trang chủ** làm bằng chứng, KHÔNG phải ảnh Postman thật. Trong đó AUTH_12/15/16/18 và SRCH_05/06 có ghi đủ request/response nên tạm chấp nhận, nhưng PROD_13/REVW_09/REVW_10 thì sơ sài.

**Khuyến nghị:** thống nhất 1 chuẩn cho toàn bộ ca API — nên **chụp Postman thật** (request + response status + body) cho tất cả để đồng bộ và thuyết phục khi demo.

---

## Ghi chú kỹ thuật
- Sau khi có ảnh mới, cần: (1) thay file trong `evidences/`, (2) chèn lại ảnh tương ứng vào các sheet trong `03.KetQua_Tong_Hop.xlsx`.
- Tài khoản seed để chụp: Seller `demo@shop.com` / `demo123`; Customer tự đăng ký qua UI.
- Lưu ý: 7 sản phẩm rác `example.com` (HackerProduct/PerfTest) do test tạo ra vẫn nằm trong DB — nên dọn trước khi chụp để ảnh sạch.
