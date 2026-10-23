# Windows Simulator for Education V2.1

Bản sửa lỗi và nâng độ trung thực cho Windows 10 / Windows 11 Simulator dành cho học sinh làm quen thao tác máy tính.

## Chạy nhanh

1. Cài **Node.js 18+**.
2. Giải nén ZIP.
3. Nhấp đúp `run-local.bat`.
4. Mở `http://localhost:5173` nếu trình duyệt chưa tự mở.

Không cần `npm install`; dự án không phụ thuộc package ngoài.

## Điểm sửa quan trọng ở V2.1

- Sửa lỗi **Windows 10 Start menu / Power menu** gây khối trắng lớn như ảnh phản hồi.
- Windows 10 và Windows 11 **không còn dùng chung icon**.
- Tách thành hai bộ tài nguyên độc lập:
  - `public/assets/win10/icons/`
  - `public/assets/win11/icons/`
- Mỗi bộ hiện có SVG riêng cho Start, Search, File Explorer, Folder, Text Document, Notepad, Calculator, Settings, This PC, Recycle Bin, Power, Wi‑Fi, Volume và Chevron.
- Khi đổi hệ điều hành trong Settings/Teacher Panel, toàn bộ icon Desktop, Taskbar, Start, cửa sổ ứng dụng và Explorer được đổi theo hệ điều hành đang chọn.
- Taskbar Windows 10 chuyển về chiều cao 40 px và giao diện phẳng, vuông hơn.
- Start menu Windows 10 tự co theo chiều cao viewport để tránh tràn/cắt giao diện trên màn hình thấp.
- Bổ sung cache-busting cho CSS/JS để cập nhật bản sửa lỗi ngay khi chạy lại local server.

## Tính năng chính

- Desktop và Window Manager: chọn, double-click, chuột phải, kéo cửa sổ, resize, minimize, maximize, close.
- Virtual File System: New Folder/Text Document, Rename, Copy, Cut, Paste, Delete, Restore, Empty Recycle Bin, Properties, drag & drop.
- File Explorer: Back, Forward, Up, breadcrumb, sidebar, search, Details/Large Icons.
- Notepad: mở/sửa/lưu `.txt`, Save, Save As, Ctrl+S.
- Calculator và Settings.
- Start → Power: Sleep, Restart, Shut down.
- Phím tắt: F2, Delete, Enter, Ctrl+C/X/V/A, Ctrl+Shift+N, Alt+F4, Ctrl+S.
- Teacher Panel: `Ctrl + Shift + T`.
- Dữ liệu thực hành lưu trong `localStorage`; không tác động file thật của máy.

## Hệ thống 15 Bài luyện tập Thực hành Tệp & Thư mục (Quests Engine)

Bộ máy thực hành chống gian lận đối chiếu trực tiếp trên Virtual File System (VFS) Tree, Window Manager State và Provenance Metadata (`nameHistory`, `copiedFrom`, `movedBy: 'drag'`, `restored: true`, `createdBy`):
- **Phần A (Cơ bản - Bài 1 đến 5)**: Mở thư mục Hình ảnh, Tạo thư mục trong Học tập, Đổi tên "Thư mục mới" thành "Vở của em", Chuyển 2 bức ảnh vào Hình ảnh, Chuyển tệp video vào Video.
- **Phần B (Trung bình - Bài 6 đến 10)**: Phân loại 8 tệp tin lộn xộn, Sao chép (Copy) ảnh giữ nguyên bản gốc, Kéo thả chuột (Drag & Drop) tệp vào Tài liệu, Xóa và Khôi phục (Restore) tệp từ Recycle Bin, Chuỗi thao tác tổng hợp (Tạo ➔ Đổi tên ➔ Phân loại).
- **Phần C (Nâng cao - Bài 11 đến 15)**: Tổ chức cây thư mục đa cấp (Nested Folders), Soạn thảo văn bản với Notepad và lưu đúng thư mục, Tạo bản sao lưu (Backup) và đổi tên, Giải cứu tệp xóa nhầm & Dọn sạch Thùng rác, Thử thách Tổng hợp Cuối tuần (Master Challenge).
- **Bảng nhiệm vụ nổi (Mission HUD)**: Có thể di chuyển khắp màn hình, thu nhỏ/mở rộng, checklist thời gian thực (tích xanh tự động), gợi ý chi tiết (💡), nút làm lại bài và chuyển bài tiếp theo.
- **Màn hình Hoàn thành Xuất sắc**: Trao cúp vinh danh khi hoàn thành 15/15 bài kèm nút **Làm lại từ đầu (Reset All Progress)**.
- **Tích hợp Teacher Panel (`Ctrl + Shift + T`)**: Giáo viên có thể bật/tắt chế độ luyện tập, chọn nhảy nhanh đến bất kỳ bài nào từ Bài 1 đến Bài 15 để trình chiếu giảng dạy.

## Cấu trúc icon V2.1

```text
public/assets/
├─ win10/
│  └─ icons/
│     ├─ start.svg
│     ├─ explorer.svg
│     ├─ folder.svg
│     └─ ...
├─ win11/
│  └─ icons/
│     ├─ start.svg
│     ├─ explorer.svg
│     ├─ folder.svg
│     └─ ...
└─ wallpapers/
```

## Lưu ý

Đây là môi trường mô phỏng giáo dục chạy trong trình duyệt, không phải Windows thật. Các SVG trong dự án được dựng riêng để mô phỏng hình thức Windows 10/11 và hoạt động offline; không trích xuất tài nguyên trực tiếp từ DLL/bộ cài Windows.
