<div align="center">

# 🖥️ Windows Simulator for Education (v2.1)

**Môi trường mô phỏng Windows 10 & Windows 11 trực quan trên trình duyệt, giúp học sinh thực hành thao tác máy tính cơ bản một cách an toàn.**

[![Version](https://img.shields.io/badge/version-2.1.0-blue.svg)](https://github.com/TheRum-VN/windows-simulator)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Dependencies](https://img.shields.io/badge/dependencies-zero-brightgreen.svg)](#)
[![Platform](https://img.shields.io/badge/platform-Web%20%7C%20Offline-orange.svg)](#)

</div>

---

## 📖 Giới thiệu

**Windows Simulator for Education** là công cụ hỗ trợ giảng dạy Tin học, cho phép học sinh làm quen với giao diện, cách quản lý cửa sổ, tệp tin và thư mục trên **Windows 10** và **Windows 11** ngay trong trình duyệt web. 

* **An toàn tuyệt đối:** Mọi thao tác tạo, sửa, xóa tệp đều diễn ra trong bộ nhớ ảo (`localStorage`), không tác động đến hệ điều hành hay dữ liệu thật của máy tính phòng máy.
* **Siêu nhẹ & Chạy Offline:** Không phụ thuộc vào thư viện ngoài (Zero-dependency), không cần chạy `npm install`, hoạt động mượt mà ngay cả khi không có kết nối Internet.

---

## 🚀 Hướng dẫn chạy nhanh (Quick Start)

### Yêu cầu hệ thống
* Máy tính đã cài đặt **[Node.js 18+](https://nodejs.org/)**.

### Cách 1: Tải file ZIP (Dành cho Giáo viên / Phòng máy)
1. Tải mã nguồn dự án về máy dưới dạng `.ZIP` và giải nén.
2. Nhấp đúp vào file **`run-local.bat`** để khởi động máy chủ nội bộ.
3. Trình duyệt sẽ tự động mở tại địa chỉ `http://localhost:5173` (nếu chưa tự mở, hãy truy cập đường dẫn này trên trình duyệt).

### Cách 2: Sử dụng Git (Dành cho Lập trình viên)
```bash
git clone https://github.com/TheRum-VN/windows-simulator.git
cd windows-simulator
run-local.bat
```

---

## ✨ Điểm mới nổi bật ở phiên bản V2.1

Phiên bản **V2.1** tập trung nâng cấp độ chân thực của giao diện và khắc phục triệt để các lỗi hiển thị từ phản hồi thực tế:

* **Tách biệt hoàn toàn bộ Icon Windows 10 & Windows 11:** 
  * Không còn dùng chung tài nguyên. Hai hệ điều hành hiện sở hữu hai bộ SVG độc lập tại `public/assets/win10/icons/` và `public/assets/win11/icons/`.
  * Bao gồm đầy đủ biểu tượng riêng biệt cho: *Start, Search, File Explorer, Folder, Text Document, Notepad, Calculator, Settings, This PC, Recycle Bin, Power, Wi‑Fi, Volume* và *Chevron*.
  * Khi chuyển đổi hệ điều hành trong **Settings** hoặc **Teacher Panel**, toàn bộ icon trên Desktop, Taskbar, Start Menu, cửa sổ ứng dụng và File Explorer sẽ đồng bộ tức thì.
* **Chuẩn hóa giao diện Windows 10:**
  * Đưa chiều cao Taskbar Windows 10 về chuẩn **40px** với thiết kế phẳng, góc cạnh đặc trưng.
  * Khắc phục triệt để lỗi **Start Menu / Power Menu** tạo khối trắng lớn trên màn hình.
  * Start Menu của Windows 10 hiện tự động co giãn theo chiều cao màn hình (viewport), không còn bị tràn hoặc cắt khuất trên các màn hình độ phân giải thấp.
* **Tối ưu kỹ thuật:**
  * Bổ sung cơ chế **Cache-busting** cho CSS/JS, giúp trình duyệt tự động nhận diện và tải ngay các bản sửa lỗi mới nhất mỗi khi khởi động lại server mà không cần xóa cache thủ công.

---

## 🛠️ Tính năng chính

### 1. Quản lý Màn hình chính & Cửa sổ (Desktop & Window Manager)
* Thao tác chuột chuẩn xác: Chọn đơn, nhấp đúp (double-click), menu chuột phải (context menu).
* Quản lý cửa sổ linh hoạt: Kéo thả di chuyển, thay đổi kích thước (resize), thu nhỏ (minimize), phóng to (maximize) và đóng (close).
* Mô phỏng trạng thái nguồn (**Start → Power**): *Sleep, Restart, Shut down*.

### 2. Hệ thống Tệp tin Ảo (Virtual File System)
* Tạo mới thư mục (**New Folder**) và tệp văn bản (**Text Document**).
* Đầy đủ thao tác quản lý: Đổi tên (*Rename*), Sao chép (*Copy*), Cắt (*Cut*), Dán (*Paste*), Xóa (*Delete*) và Xem thuộc tính (*Properties*).
* Hỗ trợ kéo & thả (**Drag & Drop**) tệp tin trực tiếp.
* Quản lý Thùng rác (**Recycle Bin**): Khôi phục tệp đã xóa (*Restore*) hoặc dọn sạch thùng rác (*Empty Recycle Bin*).

### 3. Trình quản lý tệp (File Explorer)
* Điều hướng trực quan với nút *Back, Forward, Up*, thanh đường dẫn (*Breadcrumb*) và thanh bên (*Sidebar*).
* Hỗ trợ tìm kiếm tệp nhanh và chuyển đổi chế độ xem (*Details* / *Large Icons*).

### 4. Ứng dụng tích hợp
* **Notepad:** Mở, soạn thảo và lưu tệp `.txt` với đầy đủ chức năng *Save, Save As*.
* **Calculator & Settings:** Máy tính bỏ túi và bảng cài đặt hệ thống trực quan.
* **Teacher Panel:** Bảng điều khiển chuyên biệt dành cho giáo viên để cấu hình nhanh môi trường bài học.

---

## ⌨️ Hệ thống Phím tắt hỗ trợ

| Tổ hợp phím | Chức năng |
| :--- | :--- |
| `Ctrl + Shift + T` | **Mở Teacher Panel (Bảng điều khiển dành cho Giáo viên)** |
| `Ctrl + Shift + N` | Tạo nhanh thư mục mới (New Folder) |
| `F2` | Đổi tên tệp hoặc thư mục đang chọn (Rename) |
| `Delete` | Chuyển tệp hoặc thư mục vào Thùng rác |
| `Enter` | Mở tệp, thư mục hoặc ứng dụng đang chọn |
| `Ctrl + C` / `Ctrl + X` | Sao chép (Copy) / Cắt (Cut) mục đang chọn |
| `Ctrl + V` | Dán (Paste) mục đã sao chép hoặc cắt |
| `Ctrl + A` | Chọn tất cả các mục trong cửa sổ hiện tại |
| `Ctrl + S` | Lưu tệp văn bản đang mở trong Notepad |
| `Alt + F4` | Đóng cửa sổ ứng dụng đang hoạt động |

---

## 📂 Cấu trúc tài nguyên (V2.1)

```text
public/assets/
├─ win10/
│  └─ icons/
│     ├─ start.svg
│     ├─ explorer.svg
│     ├─ folder.svg
│     └─ ... (Bộ icon chuẩn phong cách phẳng Windows 10)
├─ win11/
│  └─ icons/
│     ├─ start.svg
│     ├─ explorer.svg
│     ├─ folder.svg
│     └─ ... (Bộ icon chuẩn phong cách Fluent Design Windows 11)
└─ wallpapers/
```

---

## ⚠️ Lưu ý bản quyền & Mục đích sử dụng

> **Tuyên bố miễn trừ trách nhiệm:** Đây là môi trường mô phỏng phục vụ mục đích giáo dục chạy trên nền tảng web, **không phải** hệ điều hành Windows thực tế. Toàn bộ hình ảnh vector (SVG) trong dự án đều được vẽ và dựng lại độc lập nhằm mô phỏng hình thức giao diện và đảm bảo khả năng hoạt động offline — hoàn toàn không trích xuất tài nguyên trực tiếp từ tệp DLL hay bộ cài đặt của Microsoft Windows.
