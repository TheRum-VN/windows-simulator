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
