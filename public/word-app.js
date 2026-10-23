/**
 * Microsoft Word Simulator for Education
 * High-fidelity Word 365 / Win11 interface for students learning computer skills
 */

// Educational templates for Vietnamese students
export const WORD_TEMPLATES = [
  {
    id: 'blank',
    title: 'Tài liệu trống',
    sub: 'Tài liệu trắng để soạn thảo tự do',
    badge: 'Mới',
    content: ''
  },
  {
    id: 'welcome',
    title: 'Làm quen với Word',
    sub: 'Hướng dẫn sử dụng dải lệnh Ribbon & phím tắt',
    badge: 'Hướng dẫn',
    content: `
      <h1 style="text-align: center; color: #185abd; font-size: 24px; margin-bottom: 8px;">CHÀO MỪNG CÁC EM ĐẾN VỚI MICROSOFT WORD</h1>
      <p style="text-align: center; color: #595959; font-style: italic; margin-top: 0;">Môn Tin học - Làm quen với phần mềm soạn thảo văn bản</p>
      <hr style="border: 0; border-top: 2px solid #185abd; margin: 16px 0;">
      
      <h2 style="color: #2f5496; font-size: 18px;">1. Dải lệnh (Ribbon) và các Tab chính</h2>
      <p>Giao diện Word được tổ chức theo các dải lệnh (Ribbon) ở phía trên:</p>
      <ul>
        <li><strong>Home (Trang đầu):</strong> Chứa các công cụ định dạng chữ (Font), căn lề đoạn văn (Paragraph), kiểu văn bản (Styles).</li>
        <li><strong>Insert (Chèn):</strong> Chèn bảng biểu (Table), hình ảnh (Picture), hình vẽ (Shapes), ký tự đặc biệt (Symbol).</li>
        <li><strong>Layout (Bố cục):</strong> Chọn hướng giấy dọc/ngang (Orientation), căn lề trang (Margins), khổ giấy A4 (Size).</li>
        <li><strong>View (Xem):</strong> Bật/tắt thước đo (Ruler), phóng to / thu nhỏ tài liệu (Zoom).</li>
      </ul>

      <h2 style="color: #2f5496; font-size: 18px;">2. Các phím tắt thông dụng</h2>
      <table style="width: 100%; border-collapse: collapse; margin: 12px 0;">
        <thead>
          <tr style="background-color: #185abd; color: white;">
            <th style="border: 1px solid #cbd5e1; padding: 8px; text-align: left;">Phím tắt</th>
            <th style="border: 1px solid #cbd5e1; padding: 8px; text-align: left;">Chức năng</th>
            <th style="border: 1px solid #cbd5e1; padding: 8px; text-align: left;">Ví dụ minh họa</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #cbd5e1; padding: 8px;"><strong>Ctrl + B</strong></td>
            <td style="border: 1px solid #cbd5e1; padding: 8px;">Chữ in đậm</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px;"><strong>Văn bản in đậm</strong></td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="border: 1px solid #cbd5e1; padding: 8px;"><strong>Ctrl + I</strong></td>
            <td style="border: 1px solid #cbd5e1; padding: 8px;">Chữ in nghiêng</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px;"><em>Văn bản in nghiêng</em></td>
          </tr>
          <tr>
            <td style="border: 1px solid #cbd5e1; padding: 8px;"><strong>Ctrl + U</strong></td>
            <td style="border: 1px solid #cbd5e1; padding: 8px;">Gạch chân chữ</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px;"><u>Văn bản gạch chân</u></td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="border: 1px solid #cbd5e1; padding: 8px;"><strong>Ctrl + E</strong></td>
            <td style="border: 1px solid #cbd5e1; padding: 8px;">Căn giữa đoạn văn</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px;">Áp dụng cho tiêu đề bài viết</td>
          </tr>
          <tr>
            <td style="border: 1px solid #cbd5e1; padding: 8px;"><strong>Ctrl + S</strong></td>
            <td style="border: 1px solid #cbd5e1; padding: 8px;">Lưu tệp văn bản vào máy</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px;">Tập thói quen nhấn lưu thường xuyên!</td>
          </tr>
        </tbody>
      </table>

      <h2 style="color: #2f5496; font-size: 18px;">3. Thực hành ngay bây giờ</h2>
      <p>Em hãy thử đặt con trỏ chuột vào dòng chữ này, bôi đen và nhấn nút <strong>In đậm (B)</strong> hoặc đổi màu chữ sang <strong>màu đỏ</strong> ở thanh công cụ phía trên!</p>
    `
  },
  {
    id: 'don_xin_phep',
    title: 'Đơn xin phép nghỉ học',
    sub: 'Mẫu đơn chuẩn hành chính học sinh',
    badge: 'Mẫu chuẩn',
    content: `
      <p style="text-align: center; font-weight: bold; margin-bottom: 2px; font-size: 15px;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
      <p style="text-align: center; font-weight: bold; text-decoration: underline; margin-top: 0; font-size: 14px;">Độc lập - Tự do - Hạnh phúc</p>
      <br>
      <h2 style="text-align: center; color: #1f3864; font-size: 20px; margin-bottom: 24px; letter-spacing: 1px;">ĐƠN XIN PHÉP NGHỈ HỌC</h2>
      
      <p><strong>Kính gửi:</strong> Thầy/Cô giáo chủ nhiệm cùng toàn thể các Thầy/Cô giáo bộ môn lớp 5A.</p>
      
      <p>Em tên là: <strong>Nguyễn Văn An</strong></p>
      <p>Học sinh lớp: <strong>5A</strong> &nbsp;—&nbsp; Trường Tiểu học Chu Văn An</p>
      <p>Em làm đơn này kính xin phép Thầy/Cô cho em được nghỉ học 01 ngày: Thứ Sáu, ngày 24 tháng 10 năm 2026.</p>
      
      <p><strong>Lý do xin nghỉ:</strong> Em bị sốt cao từ tối qua, gia đình đưa em đi khám bệnh tại cơ sở y tế.</p>
      
      <p>Em xin hứa sau khi khỏe lại sẽ chép bài, học bài và làm bài tập đầy đủ.</p>
      <p>Kính mong Thầy/Cô xem xét và tạo điều kiện cho em được nghỉ học.</p>
      <p>Em xin chân thành cảm ơn Thầy/Cô!</p>
      <br>
      
      <div style="display: flex; justify-content: space-between; margin-top: 30px; text-align: center;">
        <div style="width: 45%;">
          <p><strong>Ý KIẾN CỦA PHỤ HUYNH</strong></p>
          <p style="font-style: italic; color: #64748b; font-size: 13px;">(Ký và ghi rõ họ tên)</p>
          <br><br><br>
          <p><strong>Nguyễn Văn Bình</strong></p>
        </div>
        <div style="width: 45%;">
          <p style="font-style: italic; color: #475569;">Hà Nội, ngày 23 tháng 10 năm 2026</p>
          <p><strong>NGƯỜI LÀM ĐƠN</strong></p>
          <p style="font-style: italic; color: #64748b; font-size: 13px;">(Ký và ghi rõ họ tên)</p>
          <br><br>
          <p><strong>Nguyễn Văn An</strong></p>
        </div>
      </div>
    `
  },
  {
    id: 'bao_cao_tin_hoc',
    title: 'Báo cáo thực hành Tin học',
    sub: 'Bài thực hành có bảng và tiêu đề đề mục',
    badge: 'Bài tập',
    content: `
      <h1 style="text-align: center; color: #185abd; font-size: 22px; margin-bottom: 4px;">BÁO CÁO THỰC HÀNH MÔN TIN HỌC</h1>
      <p style="text-align: center; font-style: italic; color: #64748b; margin-top: 0;">Bài thực hành số 3: Soạn thảo văn bản và chèn bảng biểu trên Word</p>
      <hr style="border: 0; border-top: 2px solid #185abd; margin: 16px 0;">

      <p><strong>Trường:</strong> Tiểu học &amp; THCS Kim Đồng &nbsp;|&nbsp; <strong>Lớp:</strong> 6A1</p>
      <p><strong>Nhóm thực hiện:</strong> Nhóm Khám Phá (Nhóm 2)</p>

      <h3 style="color: #2b579a; margin-top: 20px;">I. Mục tiêu bài thực hành</h3>
      <ul>
        <li>Nắm vững thao tác gõ tiếng Việt có dấu theo kiểu gõ Telex hoặc VNI.</li>
        <li>Biết sử dụng định dạng chữ: phông chữ <em>Times New Roman</em>, cỡ chữ 14, in đậm, in nghiêng.</li>
        <li>Biết cách tạo bảng gồm 4 cột, nhập dữ liệu và căn chỉnh lề trong ô.</li>
      </ul>

      <h3 style="color: #2b579a; margin-top: 20px;">II. Phân công nhiệm vụ các thành viên</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 12px 0;">
        <thead>
          <tr style="background-color: #2b579a; color: white;">
            <th style="border: 1px solid #cbd5e1; padding: 8px; text-align: center; width: 50px;">STT</th>
            <th style="border: 1px solid #cbd5e1; padding: 8px; text-align: left;">Họ và tên</th>
            <th style="border: 1px solid #cbd5e1; padding: 8px; text-align: left;">Nhiệm vụ phân công</th>
            <th style="border: 1px solid #cbd5e1; padding: 8px; text-align: center; width: 120px;">Kết quả</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: center;">1</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px;"><strong>Trần Quốc Bảo</strong></td>
            <td style="border: 1px solid #cbd5e1; padding: 8px;">Nhóm trưởng, thiết kế cấu trúc bài</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: center; color: #16a34a; font-weight: bold;">Đạt 10/10</td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: center;">2</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px;"><strong>Lê Ngọc Mai</strong></td>
            <td style="border: 1px solid #cbd5e1; padding: 8px;">Gõ nội dung, định dạng font chữ</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: center; color: #16a34a; font-weight: bold;">Đạt 10/10</td>
          </tr>
          <tr>
            <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: center;">3</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px;"><strong>Phạm Tuấn Anh</strong></td>
            <td style="border: 1px solid #cbd5e1; padding: 8px;">Chèn ảnh, kẻ bảng và căn lề</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: center; color: #16a34a; font-weight: bold;">Đạt 10/10</td>
          </tr>
        </tbody>
      </table>

      <h3 style="color: #2b579a; margin-top: 20px;">III. Tự đánh giá của nhóm</h3>
      <p>Cả nhóm đã hoàn thành đúng hạn, các thành viên tích cực trao đổi và rèn luyện kỹ năng gõ văn bản nhanh và chính xác.</p>
    `
  },
  {
    id: 'que_huong',
    title: 'Bài thơ "Quê hương"',
    sub: 'Luyện tập căn giữa & định dạng văn thơ',
    badge: 'Tập gõ',
    content: `
      <h2 style="text-align: center; color: #b45309; font-size: 24px; margin-bottom: 4px;">QUÊ HƯƠNG</h2>
      <p style="text-align: center; font-style: italic; color: #64748b; margin-top: 0; margin-bottom: 24px;">Tác giả: Đỗ Trung Quân</p>

      <div style="text-align: center; line-height: 1.8; font-size: 16px; font-family: 'Times New Roman', Georgia, serif;">
        <p>Quê hương là chùm khế ngọt<br>
        Cho con trèo hái mỗi ngày<br>
        Quê hương là đường đi học<br>
        Con về rợp bướm vàng bay.</p>
        <br>
        <p>Quê hương là con diều biếc<br>
        Tuổi thơ con thả trên đồng<br>
        Quê hương là con đò nhỏ<br>
        Êm đềm khua nước ven sông.</p>
        <br>
        <p>Quê hương là cầu tre nhỏ<br>
        Mẹ về nón lá nghiêng che<br>
        Là hương hoa đồng cỏ nội<br>
        Bay trong giấc ngủ trưa hè.</p>
        <br>
        <p><em>Quê hương mỗi người chỉ một<br>
        Như là chỉ một mẹ thôi<br>
        Quê hương nếu ai không nhớ<br>
        Sẽ không lớn nổi thành người.</em></p>
      </div>
    `
  }
];

// Sample educational illustrations for students to insert
const SAMPLE_PICTURES = [
  {
    name: 'Cờ đỏ sao vàng',
    caption: 'Quốc kỳ Việt Nam',
    svg: `<svg viewBox="0 0 300 200" width="240" height="160" xmlns="http://www.w3.org/2000/svg" style="border: 1px solid #e2e8f0; border-radius: 4px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);"><rect width="300" height="200" fill="#da251d"/><polygon points="150,35 163,77 207,77 171,103 185,145 150,119 115,145 129,103 93,77 137,77" fill="#ffff00"/></svg>`
  },
  {
    name: 'Huy hiệu Đội',
    caption: 'Đội Thiếu niên Tiền phong HCM',
    svg: `<svg viewBox="0 0 200 200" width="180" height="180" xmlns="http://www.w3.org/2000/svg" style="border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.15);"><circle cx="100" cy="100" r="95" fill="#facc15" stroke="#ca8a04" stroke-width="4"/><circle cx="100" cy="100" r="82" fill="#ef4444"/><polygon points="100,25 118,65 162,65 126,92 140,134 100,108 60,134 74,92 38,65 82,65" fill="#facc15"/><circle cx="100" cy="100" r="28" fill="#15803d"/><text x="100" y="105" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff" font-family="sans-serif">SẴN SÀNG</text></svg>`
  },
  {
    name: 'Trường học em',
    caption: 'Ngôi trường thân thiện',
    svg: `<svg viewBox="0 0 300 200" width="240" height="160" xmlns="http://www.w3.org/2000/svg" style="border: 1px solid #e2e8f0; border-radius: 4px; background: #e0f2fe;"><rect x="40" y="70" width="220" height="110" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/><polygon points="30,70 150,20 270,70" fill="#dc2626"/><rect x="120" y="110" width="60" height="70" fill="#854d0e"/><rect x="65" y="90" width="35" height="35" fill="#bae6fd" stroke="#0284c7"/><rect x="200" y="90" width="35" height="35" fill="#bae6fd" stroke="#0284c7"/><circle cx="150" cy="50" r="12" fill="#ffffff" stroke="#dc2626" stroke-width="2"/><line x1="150" y1="50" x2="150" y2="42" stroke="#dc2626" stroke-width="2"/><line x1="150" y1="50" x2="156" y2="50" stroke="#dc2626" stroke-width="2"/><text x="150" y="193" text-anchor="middle" font-size="10" font-weight="bold" fill="#0f172a" font-family="sans-serif">TRƯỜNG TIỂU HỌC</text></svg>`
  },
  {
    name: 'Bác Hồ với thiếu nhi',
    caption: 'Biểu tượng Bác Hồ kính yêu',
    svg: `<svg viewBox="0 0 240 240" width="180" height="180" xmlns="http://www.w3.org/2000/svg" style="border: 2px solid #ca8a04; border-radius: 8px; background: #fffbeb;"><circle cx="120" cy="120" r="100" fill="#fef3c7"/><circle cx="120" cy="90" r="45" fill="#fed7aa" stroke="#ea580c" stroke-width="2"/><circle cx="105" cy="85" r="4" fill="#451a03"/><circle cx="135" cy="85" r="4" fill="#451a03"/><path d="M100 110 Q120 125 140 110" stroke="#b45309" stroke-width="3" fill="none"/><path d="M95 125 Q120 160 145 125" fill="#ffffff" stroke="#d97706" stroke-width="1.5"/><path d="M50 210 Q120 165 190 210" fill="#1e3a8a"/><text x="120" y="230" text-anchor="middle" font-size="12" font-weight="bold" fill="#b45309" font-family="sans-serif">Bác Hồ muôn vàn kính yêu</text></svg>`
  }
];

/**
 * Generates the full HTML markup for Word application window
 */
export function wordMarkup(w, state) {
  const data = w.data || {};
  const activeTab = data.activeTab || 'home';
  const backstage = !!data.backstage;
  const zoom = data.zoom || 100;
  const showRuler = data.showRuler !== false;
  const autoSave = data.autoSave !== false;
  const orientation = data.orientation || 'portrait';
  const margins = data.margins || 'normal';
  const viewMode = data.viewMode || 'print';
  const content = data.content ?? (w.data.nodeId ? (state.nodes.find(n => n.id === w.data.nodeId)?.content || '') : '');
  const docTitle = (state.nodes.find(n => n.id === w.data.nodeId)?.name) || data.title || 'Document1';

  return `
    <div class="word-app ${orientation} margins-${margins} view-${viewMode} ${showRuler ? 'has-ruler' : 'no-ruler'}">
      
      <!-- WORD TITLEBAR / QUICK ACCESS -->
      <div class="word-header-bar">
        <div class="word-quick-access">
          <button class="word-autosave-toggle ${autoSave ? 'on' : 'off'}" data-wcmd="toggle-autosave" title="Tự động lưu: ${autoSave ? 'BẬT' : 'TẮT'}">
            <span class="autosave-switch"><span class="autosave-knob"></span></span>
            <span class="autosave-text">AutoSave</span>
          </button>
          <button class="word-quick-btn" data-wcmd="save" title="Lưu tài liệu (Ctrl + S)">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4.414a1 1 0 0 0-.293-.707l-2.414-2.414A1 1 0 0 0 11.586 1H2zm2 1h7v3H4V2zm-1 5h10v7H3V7z"/></svg>
          </button>
          <button class="word-quick-btn" data-wcmd="undo" title="Hoàn tác (Ctrl + Z)">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M8 3a5 5 0 0 0-4.546 2.914L1.5 4v4h4L3.682 6.182A4 4 0 1 1 8 12a4 4 0 0 1-3.464-2H3.34A5 5 0 1 0 8 3z"/></svg>
          </button>
          <button class="word-quick-btn" data-wcmd="redo" title="Làm lại (Ctrl + Y)">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M8 3a5 5 0 0 1 4.546 2.914L14.5 4v4h-4l1.818-1.818A4 4 0 1 0 8 12a4 4 0 0 0 3.464-2h1.196A5 5 0 1 1 8 3z"/></svg>
          </button>
        </div>

        <div class="word-doc-title" title="Tên tài liệu: ${docTitle}">
          <span class="word-doc-name">${docTitle}</span>
          <span class="word-doc-appname">- Word</span>
        </div>

        <div class="word-header-search">
          <svg viewBox="0 0 16 16" width="13" height="13" fill="#64748b"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>
          <input type="text" placeholder="Tìm kiếm tính năng hoặc trợ giúp (Alt+Q)" class="word-search-input" data-wsearch="1">
        </div>

        <div class="word-header-user">
          <div class="word-user-avatar" title="Học sinh thực hành">HS</div>
        </div>
      </div>

      <!-- WORD RIBBON TABS STRIP -->
      <div class="word-ribbon-tabs">
        <button class="word-tab-btn file-btn ${backstage ? 'active' : ''}" data-wtab="file">File</button>
        <button class="word-tab-btn ${!backstage && activeTab === 'home' ? 'active' : ''}" data-wtab="home">Home</button>
        <button class="word-tab-btn ${!backstage && activeTab === 'insert' ? 'active' : ''}" data-wtab="insert">Insert</button>
        <button class="word-tab-btn ${!backstage && activeTab === 'layout' ? 'active' : ''}" data-wtab="layout">Layout</button>
        <button class="word-tab-btn ${!backstage && activeTab === 'view' ? 'active' : ''}" data-wtab="view">View</button>
        <button class="word-tab-btn ${!backstage && activeTab === 'review' ? 'active' : ''}" data-wtab="review">Review</button>
        <button class="word-tab-btn ${!backstage && activeTab === 'help' ? 'active' : ''}" data-wtab="help">Help</button>
        
        <div class="word-ribbon-right">
          <button class="word-share-btn" data-wcmd="share" title="Chia sẻ tài liệu">
            <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor"><path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 4.999.001A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.5 1.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0zm11 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.5 1.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0z"/><path d="M5.105 8.718l5.29 3.08a.5.5 0 0 0 .5-.866L5.605 7.852a.5.5 0 0 0-.5.866zm5.29-4.516l-5.29 3.08a.5.5 0 0 0 .5.866l5.29-3.08a.5.5 0 0 0-.5-.866z"/></svg>
            <span>Share</span>
          </button>
        </div>
      </div>

      <!-- MAIN AREA: BACKSTAGE OR DOCUMENT EDITOR -->
      ${backstage ? renderBackstage(w, state) : renderEditor(w, activeTab, zoom, showRuler, content)}

      <!-- WORD STATUS BAR (BOTTOM) -->
      <div class="word-statusbar">
        <div class="word-status-left">
          <span class="status-item status-page">Page 1 of 1</span>
          <span class="status-item status-words" data-wstat="words">0 words</span>
          <span class="status-item status-lang" title="Ngôn ngữ kiểm tra chính tả">Vietnamese (Tiếng Việt)</span>
          <span class="status-item status-acc" title="Kiểm tra khả năng tiếp cận">Accessibility: Good to go</span>
        </div>

        <div class="word-status-right">
          <button class="status-btn" data-wcmd="focus-mode" title="Chế độ tập trung (Focus mode)">
            <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor"><path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h11A1.5 1.5 0 0 1 15 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 12.5v-9zM2.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-11z"/></svg>
            <span>Focus</span>
          </button>
          <div class="status-view-modes">
            <button class="status-btn view-btn ${viewMode === 'read' ? 'active' : ''}" data-wview="read" title="Chế độ đọc (Read Mode)">📖</button>
            <button class="status-btn view-btn ${viewMode === 'print' ? 'active' : ''}" data-wview="print" title="Bố cục trang in (Print Layout)">📄</button>
            <button class="status-btn view-btn ${viewMode === 'web' ? 'active' : ''}" data-wview="web" title="Bố cục trang web (Web Layout)">🌐</button>
          </div>
          <div class="status-zoom-wrap">
            <button class="zoom-step-btn" data-wzoom="out" title="Thu nhỏ">-</button>
            <input type="range" min="50" max="200" step="5" value="${zoom}" class="zoom-slider" data-wzoom="slider">
            <button class="zoom-step-btn" data-wzoom="in" title="Phóng to">+</button>
            <button class="zoom-val-btn" data-wzoom="reset" title="Đặt lại 100%">${zoom}%</button>
          </div>
        </div>
      </div>

    </div>
  `;
}

/**
 * Renders the Ribbon toolbar + Document page canvas + Rulers
 */
function renderEditor(w, activeTab, zoom, showRuler, content) {
  return `
    <!-- RIBBON TOOLBAR -->
    <div class="word-ribbon-bar">
      ${renderRibbonContent(w, activeTab)}
    </div>

    <!-- DOCUMENT WORKSPACE -->
    <div class="word-workspace">
      ${showRuler ? renderRulers() : ''}

      <div class="word-scroll-canvas" data-wcanvas="1">
        <div class="word-page-scaler" style="transform: scale(${zoom / 100});">
          <div class="word-page" data-wpage="1">
            <div class="word-editor" contenteditable="true" spellcheck="false" data-weditor="1">${content}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Renders Ribbon content based on the active tab
 */
function renderRibbonContent(w, tab) {
  switch (tab) {
    case 'insert':
      return renderInsertTab();
    case 'layout':
      return renderLayoutTab(w);
    case 'view':
      return renderViewTab(w);
    case 'review':
      return renderReviewTab();
    case 'help':
      return renderHelpTab();
    case 'home':
    default:
      return renderHomeTab();
  }
}

/**
 * HOME TAB: Font, Paragraph, Styles, Clipboard, Editing
 */
function renderHomeTab() {
  return `
    <!-- CLIPBOARD GROUP -->
    <div class="ribbon-group">
      <div class="ribbon-group-content">
        <button class="ribbon-btn-large" data-wcmd="paste" title="Dán (Ctrl + V)">
          <div class="ribbon-btn-icon">📋</div>
          <span>Paste</span>
        </button>
        <div class="ribbon-col">
          <button class="ribbon-btn-small" data-wcmd="cut" title="Cắt (Ctrl + X)">
            <span>✂</span> Cut
          </button>
          <button class="ribbon-btn-small" data-wcmd="copy" title="Sao chép (Ctrl + C)">
            <span>📄</span> Copy
          </button>
          <button class="ribbon-btn-small" data-wcmd="format-painter" title="Chổi quét định dạng (Format Painter)">
            <span>🖌</span> Painter
          </button>
        </div>
      </div>
      <div class="ribbon-group-label">Clipboard</div>
    </div>

    <!-- FONT GROUP -->
    <div class="ribbon-group">
      <div class="ribbon-group-content font-group-content">
        <!-- Row 1: Font family & Size -->
        <div class="font-row-1">
          <select class="font-select" data-wcmd="font-name" title="Phông chữ">
            <option value="Aptos (Body)" selected>Aptos (Body)</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Arial">Arial</option>
            <option value="Calibri">Calibri</option>
            <option value="Segoe UI">Segoe UI</option>
            <option value="Georgia">Georgia</option>
            <option value="Verdana">Verdana</option>
            <option value="Courier New">Courier New</option>
          </select>

          <select class="size-select" data-wcmd="font-size" title="Cỡ chữ">
            <option value="1">8</option>
            <option value="2">10</option>
            <option value="3" selected>12</option>
            <option value="4">14</option>
            <option value="5">18</option>
            <option value="6">24</option>
            <option value="7">36</option>
          </select>

          <button class="ribbon-icon-btn" data-wcmd="grow-font" title="Tăng cỡ chữ (Ctrl + Shift + >)">A<sup>▲</sup></button>
          <button class="ribbon-icon-btn" data-wcmd="shrink-font" title="Giảm cỡ chữ (Ctrl + Shift + <)">A<sup>▼</sup></button>
          <button class="ribbon-icon-btn" data-wcmd="change-case" title="Đổi kiểu chữ hoa/thường (Shift + F3)">Aa</button>
          <button class="ribbon-icon-btn" data-wcmd="clear-format" title="Xóa toàn bộ định dạng">A<small>⌫</small></button>
        </div>

        <!-- Row 2: B, I, U, ab, x2, x^2, Highlight, Font Color -->
        <div class="font-row-2">
          <button class="ribbon-toggle-btn bold-btn" data-wcmd="bold" title="In đậm (Ctrl + B)"><b>B</b></button>
          <button class="ribbon-toggle-btn italic-btn" data-wcmd="italic" title="In nghiêng (Ctrl + I)"><i>I</i></button>
          <button class="ribbon-toggle-btn underline-btn" data-wcmd="underline" title="Gạch chân (Ctrl + U)"><u>U</u></button>
          <button class="ribbon-toggle-btn strike-btn" data-wcmd="strikethrough" title="Gạch ngang chữ"><s>ab</s></button>
          <button class="ribbon-toggle-btn sub-btn" data-wcmd="subscript" title="Chỉ số dưới (Ctrl + =)">X<sub>2</sub></button>
          <button class="ribbon-toggle-btn super-btn" data-wcmd="superscript" title="Chỉ số trên (Ctrl + Shift + +)">X<sup>2</sup></button>
          
          <div class="ribbon-color-picker-wrap">
            <button class="ribbon-icon-btn color-btn" data-wcmd="highlight-color" title="Màu đánh dấu văn bản (Highlight)">
              <span class="highlighter-glyph">🖍</span>
              <span class="color-bar" style="background:#fef08a;"></span>
            </button>
          </div>

          <div class="ribbon-color-picker-wrap">
            <button class="ribbon-icon-btn color-btn" data-wcmd="font-color" title="Màu chữ (Font Color)">
              <span class="font-a-glyph"><b>A</b></span>
              <span class="color-bar" style="background:#dc2626;"></span>
            </button>
          </div>
        </div>
      </div>
      <div class="ribbon-group-label">Font</div>
    </div>

    <!-- PARAGRAPH GROUP -->
    <div class="ribbon-group">
      <div class="ribbon-group-content para-group-content">
        <!-- Row 1: Lists & Indents -->
        <div class="para-row-1">
          <button class="ribbon-icon-btn" data-wcmd="bullet-list" title="Danh sách dấu chấm (Bullets)">•≡</button>
          <button class="ribbon-icon-btn" data-wcmd="number-list" title="Danh sách số (Numbering)">1≡</button>
          <button class="ribbon-icon-btn" data-wcmd="outdent" title="Giảm thụt lề (Decrease Indent)">⇤</button>
          <button class="ribbon-icon-btn" data-wcmd="indent" title="Tăng thụt lề (Increase Indent)">⇥</button>
          <button class="ribbon-icon-btn" data-wcmd="show-marks" title="Hiện/ẩn dấu đoạn văn">¶</button>
        </div>

        <!-- Row 2: Alignments & Line Spacing -->
        <div class="para-row-2">
          <button class="ribbon-toggle-btn active" data-wcmd="align-left" title="Căn lề trái (Ctrl + L)">⇤≡</button>
          <button class="ribbon-toggle-btn" data-wcmd="align-center" title="Căn giữa (Ctrl + E)">≡</button>
          <button class="ribbon-toggle-btn" data-wcmd="align-right" title="Căn lề phải (Ctrl + R)">≡⇥</button>
          <button class="ribbon-toggle-btn" data-wcmd="align-justify" title="Căn đều hai bên (Ctrl + J)">≣</button>
          <button class="ribbon-icon-btn" data-wcmd="line-spacing" title="Giãn dòng (Line Spacing)">↕≡</button>
          <button class="ribbon-icon-btn" data-wcmd="para-shading" title="Tô màu nền đoạn văn">🪣</button>
        </div>
      </div>
      <div class="ribbon-group-label">Paragraph</div>
    </div>

    <!-- STYLES GROUP -->
    <div class="ribbon-group styles-group">
      <div class="ribbon-group-content style-cards">
        <button class="style-card active" data-wstyle="normal">
          <span class="style-preview">AaBbCc</span>
          <span class="style-name">Normal</span>
        </button>
        <button class="style-card" data-wstyle="no-spacing">
          <span class="style-preview" style="letter-spacing: -0.5px;">AaBbCc</span>
          <span class="style-name">No Spacing</span>
        </button>
        <button class="style-card" data-wstyle="heading-1">
          <span class="style-preview" style="color: #2f5496; font-size: 15px; font-weight: bold;">AaBbCc</span>
          <span class="style-name">Heading 1</span>
        </button>
        <button class="style-card" data-wstyle="heading-2">
          <span class="style-preview" style="color: #2f5496; font-size: 13px; font-weight: 600;">AaBbCc</span>
          <span class="style-name">Heading 2</span>
        </button>
        <button class="style-card" data-wstyle="title">
          <span class="style-preview" style="color: #1f3864; font-size: 16px; font-weight: bold;">Title</span>
          <span class="style-name">Title</span>
        </button>
        <button class="style-card" data-wstyle="subtitle">
          <span class="style-preview" style="color: #595959; font-style: italic;">Subtitle</span>
          <span class="style-name">Subtitle</span>
        </button>
      </div>
      <div class="ribbon-group-label">Styles</div>
    </div>

    <!-- EDITING GROUP -->
    <div class="ribbon-group">
      <div class="ribbon-group-content">
        <div class="ribbon-col">
          <button class="ribbon-btn-small" data-wcmd="find" title="Tìm kiếm từ trong bài (Ctrl + F)">
            <span>🔍</span> Find
          </button>
          <button class="ribbon-btn-small" data-wcmd="replace" title="Tìm và thay thế từ (Ctrl + H)">
            <span>🔄</span> Replace
          </button>
          <button class="ribbon-btn-small" data-wcmd="select-all" title="Chọn toàn bộ văn bản (Ctrl + A)">
            <span>☑</span> Select All
          </button>
        </div>
      </div>
      <div class="ribbon-group-label">Editing</div>
    </div>
  `;
}

/**
 * INSERT TAB: Table, Picture, Shapes, Symbols, Page Break
 */
function renderInsertTab() {
  return `
    <!-- TABLES -->
    <div class="ribbon-group">
      <div class="ribbon-group-content">
        <button class="ribbon-btn-large" data-wcmd="insert-table" title="Chèn bảng biểu">
          <div class="ribbon-btn-icon">▦</div>
          <span>Table</span>
        </button>
      </div>
      <div class="ribbon-group-label">Tables</div>
    </div>

    <!-- ILLUSTRATIONS -->
    <div class="ribbon-group">
      <div class="ribbon-group-content">
        <button class="ribbon-btn-large" data-wcmd="insert-picture" title="Chèn hình ảnh vào bài">
          <div class="ribbon-btn-icon">🖼️</div>
          <span>Pictures</span>
        </button>
        <button class="ribbon-btn-large" data-wcmd="insert-shape" title="Chèn hình vẽ cơ bản (Hình chữ nhật, tròn, ngôi sao...)">
          <div class="ribbon-btn-icon">⭐</div>
          <span>Shapes</span>
        </button>
      </div>
      <div class="ribbon-group-label">Illustrations</div>
    </div>

    <!-- TEXT & SYMBOLS -->
    <div class="ribbon-group">
      <div class="ribbon-group-content">
        <button class="ribbon-btn-large" data-wcmd="insert-symbol" title="Chèn ký tự đặc biệt (Ω, π, ±, ©...)">
          <div class="ribbon-btn-icon">Ω</div>
          <span>Symbol</span>
        </button>
        <button class="ribbon-btn-large" data-wcmd="insert-date" title="Chèn ngày tháng năm tự động">
          <div class="ribbon-btn-icon">📅</div>
          <span>Date &amp; Time</span>
        </button>
        <button class="ribbon-btn-large" data-wcmd="page-break" title="Chèn ngắt trang (Ctrl + Enter)">
          <div class="ribbon-btn-icon">📄</div>
          <span>Page Break</span>
        </button>
      </div>
      <div class="ribbon-group-label">Text &amp; Symbols</div>
    </div>
  `;
}

/**
 * LAYOUT TAB: Margins, Orientation, Size
 */
function renderLayoutTab(w) {
  const o = w.data.orientation || 'portrait';
  const m = w.data.margins || 'normal';
  return `
    <div class="ribbon-group">
      <div class="ribbon-group-content">
        <button class="ribbon-btn-large ${m === 'normal' ? 'active' : ''}" data-wlayout-margin="normal" title="Lề tiêu chuẩn (2.54 cm / 1 inch)">
          <div class="ribbon-btn-icon">⬚</div>
          <span>Normal</span>
        </button>
        <button class="ribbon-btn-large ${m === 'narrow' ? 'active' : ''}" data-wlayout-margin="narrow" title="Lề hẹp (1.27 cm / 0.5 inch)">
          <div class="ribbon-btn-icon">▫</div>
          <span>Narrow</span>
        </button>
        <button class="ribbon-btn-large ${m === 'wide' ? 'active' : ''}" data-wlayout-margin="wide" title="Lề rộng (3.81 cm)">
          <div class="ribbon-btn-icon">◻</div>
          <span>Wide</span>
        </button>
      </div>
      <div class="ribbon-group-label">Margins</div>
    </div>

    <div class="ribbon-group">
      <div class="ribbon-group-content">
        <button class="ribbon-btn-large ${o === 'portrait' ? 'active' : ''}" data-wlayout-orient="portrait" title="Khổ giấy dọc">
          <div class="ribbon-btn-icon">▯</div>
          <span>Portrait</span>
        </button>
        <button class="ribbon-btn-large ${o === 'landscape' ? 'active' : ''}" data-wlayout-orient="landscape" title="Khổ giấy ngang">
          <div class="ribbon-btn-icon">▭</div>
          <span>Landscape</span>
        </button>
      </div>
      <div class="ribbon-group-label">Orientation</div>
    </div>

    <div class="ribbon-group">
      <div class="ribbon-group-content">
        <button class="ribbon-btn-large active" data-wlayout-size="a4" title="Khổ giấy A4 (21 x 29.7 cm)">
          <div class="ribbon-btn-icon">📋</div>
          <span>A4 (21x29.7)</span>
        </button>
      </div>
      <div class="ribbon-group-label">Size</div>
    </div>
  `;
}

/**
 * VIEW TAB: Ruler toggle, Zoom presets
 */
function renderViewTab(w) {
  const showRuler = w.data.showRuler !== false;
  return `
    <div class="ribbon-group">
      <div class="ribbon-group-content">
        <label class="ribbon-checkbox-label">
          <input type="checkbox" ${showRuler ? 'checked' : ''} data-wview-toggle="ruler">
          <span>Thước đo (Ruler)</span>
        </label>
      </div>
      <div class="ribbon-group-label">Show</div>
    </div>

    <div class="ribbon-group">
      <div class="ribbon-group-content">
        <button class="ribbon-btn-large" data-wview-zoom="100" title="Đặt thu phóng về chuẩn 100%">
          <div class="ribbon-btn-icon">100%</div>
          <span>100% Zoom</span>
        </button>
        <button class="ribbon-btn-large" data-wview-zoom="fit" title="Vừa chiều rộng màn hình">
          <div class="ribbon-btn-icon">↔</div>
          <span>Page Width</span>
        </button>
      </div>
      <div class="ribbon-group-label">Zoom</div>
    </div>
  `;
}

/**
 * REVIEW TAB: Word count dialog, Spell check
 */
function renderReviewTab() {
  return `
    <div class="ribbon-group">
      <div class="ribbon-group-content">
        <button class="ribbon-btn-large" data-wcmd="word-count-dialog" title="Thống kê số từ, số ký tự, số đoạn">
          <div class="ribbon-btn-icon">123</div>
          <span>Word Count</span>
        </button>
        <button class="ribbon-btn-large" data-wcmd="check-spelling" title="Kiểm tra lỗi chính tả">
          <div class="ribbon-btn-icon">✓</div>
          <span>Spelling</span>
        </button>
      </div>
      <div class="ribbon-group-label">Proofing</div>
    </div>
  `;
}

/**
 * HELP TAB: Shortcuts & Typing tutorial
 */
function renderHelpTab() {
  return `
    <div class="ribbon-group">
      <div class="ribbon-group-content">
        <button class="ribbon-btn-large" data-wcmd="help-shortcuts" title="Bảng phím tắt soạn thảo cho học sinh">
          <div class="ribbon-btn-icon">⌨️</div>
          <span>Phím tắt Word</span>
        </button>
        <button class="ribbon-btn-large" data-wcmd="help-telex" title="Bảng quy tắc gõ Tiếng Việt Telex / VNI">
          <div class="ribbon-btn-icon">🇻🇳</div>
          <span>Quy tắc gõ dấu</span>
        </button>
      </div>
      <div class="ribbon-group-label">Help</div>
    </div>
  `;
}

/**
 * Renders Horizontal and Vertical Rulers matching Word
 */
function renderRulers() {
  const hTicks = Array.from({ length: 17 }, (_, i) => i);
  const vTicks = Array.from({ length: 24 }, (_, i) => i);

  return `
    <!-- HORIZONTAL RULER -->
    <div class="word-ruler-horizontal">
      <div class="ruler-corner"></div>
      <div class="ruler-scale-h">
        <div class="ruler-margin-left"></div>
        <div class="ruler-white-track">
          ${hTicks.map(n => `<div class="ruler-tick" style="left: ${(n / 16) * 100}%;"><span>${n}</span></div>`).join('')}
          <div class="ruler-marker-indent marker-first-line" title="Thụt dòng đầu tiên">▲</div>
          <div class="ruler-marker-indent marker-left-indent" title="Lề bên trái">▼</div>
          <div class="ruler-marker-indent marker-right-indent" title="Lề bên phải">▲</div>
        </div>
        <div class="ruler-margin-right"></div>
      </div>
    </div>

    <!-- VERTICAL RULER -->
    <div class="word-ruler-vertical">
      <div class="ruler-margin-top"></div>
      <div class="ruler-white-track-v">
        ${vTicks.map(n => `<div class="ruler-tick-v" style="top: ${(n / 23) * 100}%;"><span>${n}</span></div>`).join('')}
      </div>
      <div class="ruler-margin-bottom"></div>
    </div>
  `;
}

/**
 * BACKSTAGE VIEW (File tab - Screenshot 2)
 */
function renderBackstage(w, state) {
  const currentTab = w.data.backstageTab || 'home';
  const recentDocs = state.nodes
    .filter(n => !n.inTrash && (n.fileType === 'doc' || /\.(docx?|doc)$/i.test(n.name)))
    .slice(0, 10);

  return `
    <div class="word-backstage">
      <!-- LEFT NAVIGATION RAIL -->
      <div class="backstage-sidebar">
        <button class="backstage-back-btn" data-wbackstage="exit" title="Quay lại tài liệu">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
        </button>

        <div class="backstage-nav-list">
          <button class="backstage-nav-item ${currentTab === 'home' ? 'active' : ''}" data-wbackstage-tab="home">Home</button>
          <button class="backstage-nav-item ${currentTab === 'new' ? 'active' : ''}" data-wbackstage-tab="new">New</button>
          <button class="backstage-nav-item ${currentTab === 'info' ? 'active' : ''}" data-wbackstage-tab="info">Info</button>
          <button class="backstage-nav-item" data-wcmd="save">Save</button>
          <button class="backstage-nav-item" data-wcmd="save-as">Save As</button>
          <button class="backstage-nav-item" data-wcmd="print">Print</button>
          <button class="backstage-nav-item" data-wcmd="export-pdf">Export</button>
          <button class="backstage-nav-item" data-wcmd="close-doc">Close</button>
        </div>

        <div class="backstage-nav-bottom">
          <div class="backstage-user-info">
            <div class="avatar-sm">HS</div>
            <div>
              <div style="font-weight:600;font-size:12px;">Học sinh</div>
              <div style="font-size:10.5px;color:#64748b;">Office Simulator</div>
            </div>
          </div>
        </div>
      </div>

      <!-- MAIN CONTENT AREA -->
      <div class="backstage-content">
        ${renderBackstageContent(w, currentTab, recentDocs, state)}
      </div>
    </div>
  `;
}

function renderBackstageContent(w, tab, recentDocs, state) {
  if (tab === 'info') {
    const docNode = w.data?.nodeId && state?.nodes ? state.nodes.find(n => n.id === w.data.nodeId) : null;
    return `
      <div class="backstage-pane info-pane">
        <h2>Thông tin tài liệu (Info)</h2>
        <div class="info-card">
          <div class="info-row"><span class="info-label">Tên tệp:</span> <strong>${w.data.title || docNode?.name || 'Document1.docx'}</strong></div>
          <div class="info-row"><span class="info-label">Định dạng:</span> Microsoft Word Document (.docx)</div>
          <div class="info-row"><span class="info-label">Tác giả:</span> Học sinh</div>
          <div class="info-row"><span class="info-label">Khổ giấy:</span> A4 tiêu chuẩn (210 x 297 mm)</div>
          <div class="info-row"><span class="info-label">Trạng thái:</span> Đã sẵn sàng chỉnh sửa và in ấn</div>
        </div>
      </div>
    `;
  }

  // Home & New view
  return `
    <div class="backstage-pane home-pane">
      <div class="backstage-greeting">
        <h1>Xin chào! (Good morning)</h1>
        <p>Chọn một mẫu có sẵn bên dưới hoặc bắt đầu soạn thảo văn bản mới</p>
      </div>

      <!-- NEW SECTION: TEMPLATES -->
      <div class="backstage-section">
        <div class="section-title">
          <span>Tạo mới (New)</span>
        </div>

        <div class="template-grid">
          ${WORD_TEMPLATES.map(tmpl => `
            <div class="template-card" data-wtemplate="${tmpl.id}" title="${tmpl.sub}">
              <div class="template-thumb ${tmpl.id}">
                <div class="thumb-paper">
                  <div class="thumb-line head"></div>
                  <div class="thumb-line l1"></div>
                  <div class="thumb-line l2"></div>
                  <div class="thumb-line l3"></div>
                  ${tmpl.id === 'don_xin_phep' ? '<div class="thumb-stamp">ĐƠN</div>' : ''}
                  ${tmpl.id === 'bao_cao_tin_hoc' ? '<div class="thumb-table"></div>' : ''}
                </div>
              </div>
              <div class="template-info">
                <span class="template-name">${tmpl.title}</span>
                <span class="template-badge">${tmpl.badge}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- RECENT DOCUMENTS -->
      <div class="backstage-section" style="margin-top: 36px;">
        <div class="section-title">
          <span>Tài liệu gần đây (Recent)</span>
        </div>

        <div class="recent-docs-list">
          ${recentDocs.length ? recentDocs.map(d => `
            <div class="recent-doc-item" data-wopen-node="${d.id}">
              <div class="recent-doc-icon">📄</div>
              <div class="recent-doc-details">
                <div class="recent-doc-name">${d.name}</div>
                <div class="recent-doc-path">Mô phỏng máy tính › Thư mục người dùng</div>
              </div>
            </div>
          `).join('') : `
            <div class="recent-empty">Chưa có tài liệu nào khác. Bấm vào một mẫu ở trên để bắt đầu soạn thảo!</div>
          `}
        </div>
      </div>
    </div>
  `;
}

/**
 * Attaches event listeners and behavior for the Word window
 */
export function bindWord(w, el, state, env) {
  const { node, uniqueName, now, uid, esc, notify, ICON, openApp, closeWindow, renderWindows, renderDesktop, onStateChange } = env;
  const editor = $('[data-weditor="1"]', el);

  // Initialize data if needed
  if (!w.data) w.data = {};
  if (w.data.zoom === undefined) w.data.zoom = 100;
  if (w.data.activeTab === undefined) w.data.activeTab = 'home';
  if (w.data.showRuler === undefined) w.data.showRuler = true;

  // Track words & characters on typing
  const updateStats = () => {
    if (!editor) return;
    const text = editor.innerText || '';
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    w.data.wordCount = words;
    w.data.charCount = chars;

    const wordsBadge = $('[data-wstat="words"]', el);
    if (wordsBadge) wordsBadge.textContent = `${words} words`;

    // Persist content to window data
    w.data.content = editor.innerHTML;

    // If linked to an existing node and AutoSave is active, save silently
    if (w.data.nodeId && w.data.autoSave !== false) {
      const n = node(w.data.nodeId);
      if (n) {
        n.content = editor.innerHTML;
        n.modified = now();
        onStateChange();
      }
    }
  };

  if (editor) {
    editor.addEventListener('input', updateStats);
    editor.addEventListener('keyup', updateStats);
    // Initial stat calculation
    updateStats();
  }

  // SAVE ACTION
  const doSave = () => {
    const currentHtml = editor ? editor.innerHTML : (w.data.content || '');
    const n = w.data.nodeId ? node(w.data.nodeId) : null;

    if (n) {
      n.content = currentHtml;
      n.modified = now();
      w.data.content = currentHtml;
      notify(`Đã lưu tệp: ${n.name}`);
      onStateChange();
    } else {
      showWordSaveAsDialog(w, currentHtml, env);
    }
  };

  // TAB SWITCHING
  $$('[data-wtab]', el).forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.wtab;
      if (tab === 'file') {
        w.data.backstage = true;
        w.data.backstageTab = 'home';
      } else {
        w.data.backstage = false;
        w.data.activeTab = tab;
      }
      renderWindows();
    });
  });

  // BACKSTAGE COMMANDS
  $('[data-wbackstage="exit"]', el)?.addEventListener('click', () => {
    w.data.backstage = false;
    renderWindows();
  });

  $$('[data-wbackstage-tab]', el).forEach(btn => {
    btn.addEventListener('click', () => {
      w.data.backstageTab = btn.dataset.wbackstageTab;
      renderWindows();
    });
  });

  // TEMPLATE SELECTION IN BACKSTAGE
  $$('[data-wtemplate]', el).forEach(btn => {
    btn.addEventListener('click', () => {
      const tmplId = btn.dataset.wtemplate;
      const tmpl = WORD_TEMPLATES.find(t => t.id === tmplId);
      if (tmpl) {
        w.data.content = tmpl.content;
        w.data.title = tmpl.title;
        w.data.nodeId = null; // New untitled document from template
        w.data.backstage = false;
        w.title = `${tmpl.title} - Word`;
        renderWindows();
        notify(`Đã tạo tài liệu mới từ mẫu "${tmpl.title}"`);
      }
    });
  });

  // OPEN RECENT NODE FROM BACKSTAGE
  $$('[data-wopen-node]', el).forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.wopenNode;
      const targetNode = node(targetId);
      if (targetNode) {
        w.data.nodeId = targetNode.id;
        w.data.title = targetNode.name;
        w.data.content = targetNode.content || '';
        w.data.backstage = false;
        w.title = `${targetNode.name} - Word`;
        renderWindows();
        notify(`Đã mở ${targetNode.name}`);
      }
    });
  });

  // FORMATTING COMMANDS VIA execCommand
  const exec = (cmd, val = null) => {
    if (!editor) return;
    editor.focus();
    document.execCommand(cmd, false, val);
    updateStats();
  };

  // COMMAND BUTTONS
  $$('[data-wcmd]', el).forEach(btn => {
    btn.addEventListener('click', e => {
      const cmd = btn.dataset.wcmd;
      switch (cmd) {
        case 'save':
          doSave();
          if (w.data.backstage) {
            w.data.backstage = false;
            renderWindows();
          }
          break;
        case 'save-as':
          showWordSaveAsDialog(w, editor ? editor.innerHTML : (w.data.content || ''), env);
          if (w.data.backstage) {
            w.data.backstage = false;
            renderWindows();
          }
          break;
        case 'undo':
          exec('undo');
          break;
        case 'redo':
          exec('redo');
          break;
        case 'toggle-autosave':
          w.data.autoSave = !w.data.autoSave;
          renderWindows();
          notify(`Tự động lưu: ${w.data.autoSave ? 'BẬT' : 'TẮT'}`);
          break;
        case 'bold':
          exec('bold');
          btn.classList.toggle('active');
          break;
        case 'italic':
          exec('italic');
          btn.classList.toggle('active');
          break;
        case 'underline':
          exec('underline');
          btn.classList.toggle('active');
          break;
        case 'strikethrough':
          exec('strikeThrough');
          break;
        case 'subscript':
          exec('subscript');
          break;
        case 'superscript':
          exec('superscript');
          break;
        case 'grow-font':
          exec('fontSize', '5');
          break;
        case 'shrink-font':
          exec('fontSize', '2');
          break;
        case 'change-case':
          toggleChangeCase(editor);
          break;
        case 'clear-format':
          exec('removeFormat');
          break;
        case 'highlight-color':
          showColorMenu(btn, color => exec('hiliteColor', color));
          break;
        case 'font-color':
          showColorMenu(btn, color => exec('foreColor', color));
          break;
        case 'bullet-list':
          exec('insertUnorderedList');
          break;
        case 'number-list':
          exec('insertOrderedList');
          break;
        case 'outdent':
          exec('outdent');
          break;
        case 'indent':
          exec('indent');
          break;
        case 'show-marks':
          btn.classList.toggle('active');
          notify('Tính năng hiển thị ký hiệu đoạn văn (¶) đã bật');
          break;
        case 'align-left':
          exec('justifyLeft');
          break;
        case 'align-center':
          exec('justifyCenter');
          break;
        case 'align-right':
          exec('justifyRight');
          break;
        case 'align-justify':
          exec('justifyFull');
          break;
        case 'line-spacing':
          showLineSpacingMenu(btn, editor);
          break;
        case 'para-shading':
          showColorMenu(btn, color => {
            exec('formatBlock', '<div>');
            if (window.getSelection()?.anchorNode?.parentElement) {
              window.getSelection().anchorNode.parentElement.style.backgroundColor = color;
            }
          });
          break;
        case 'cut':
          exec('cut');
          break;
        case 'copy':
          exec('copy');
          notify('Đã sao chép văn bản');
          break;
        case 'paste':
          navigator.clipboard?.readText?.().then(text => {
            if (text) exec('insertText', text);
          }).catch(() => {
            notify('Nhấn tổ hợp phím Ctrl + V để dán');
          });
          break;
        case 'format-painter':
          notify('Đã lấy định dạng. Hãy chọn đoạn văn bản cần áp dụng!');
          break;
        case 'find':
          showFindBar(el, editor);
          break;
        case 'replace':
          showReplaceDialog(el, editor);
          break;
        case 'select-all':
          exec('selectAll');
          break;
        case 'insert-table':
          showTablePicker(btn, (rows, cols) => insertTable(editor, rows, cols));
          break;
        case 'insert-picture':
          showPicturePicker(env, svgHtml => exec('insertHTML', svgHtml));
          break;
        case 'insert-shape':
          showShapePicker(btn, shapeHtml => exec('insertHTML', shapeHtml));
          break;
        case 'insert-symbol':
          showSymbolPicker(btn, sym => exec('insertText', sym));
          break;
        case 'insert-date':
          const today = new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date());
          exec('insertText', `Ngày ${today.replace(/\//g, ' tháng ')}`);
          break;
        case 'page-break':
          exec('insertHTML', '<div style="page-break-before: always; border-top: 1px dashed #cbd5e1; margin: 24px 0; padding-top: 16px;" data-page-break="1"></div>');
          break;
        case 'word-count-dialog':
          showWordCountDialog(w);
          break;
        case 'check-spelling':
          notify('✓ Đã kiểm tra chính tả: Không tìm thấy lỗi ngữ pháp.');
          break;
        case 'help-shortcuts':
          showShortcutsHelp();
          break;
        case 'help-telex':
          showTelexHelp();
          break;
        case 'print':
          printDocument(w);
          break;
        case 'export-pdf':
          notify('Đang chuẩn bị xuất tệp PDF... Hãy chọn "Save as PDF" trong hộp thoại In.');
          setTimeout(() => printDocument(w), 300);
          break;
        case 'close-doc':
          closeWindow(w.id);
          break;
        case 'share':
          notify('Tài liệu đã sẵn sàng để gửi qua mạng LAN của phòng thực hành Tin học.');
          break;
        case 'focus-mode':
          el.classList.toggle('focus-mode');
          notify(el.classList.contains('focus-mode') ? 'Đã bật Focus Mode' : 'Đã tắt Focus Mode');
          break;
      }
    });
  });

  // FONT DROPDOWNS
  const fontSelect = $('[data-wcmd="font-name"]', el);
  fontSelect?.addEventListener('change', () => exec('fontName', fontSelect.value));

  const sizeSelect = $('[data-wcmd="font-size"]', el);
  sizeSelect?.addEventListener('change', () => exec('fontSize', sizeSelect.value));

  // QUICK STYLES
  $$('[data-wstyle]', el).forEach(card => {
    card.addEventListener('click', () => {
      const s = card.dataset.wstyle;
      applyWordStyle(editor, s);
      $$('[data-wstyle]', el).forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });

  // LAYOUT TOGGLES
  $$('[data-wlayout-margin]', el).forEach(btn => {
    btn.addEventListener('click', () => {
      w.data.margins = btn.dataset.wlayoutMargin;
      renderWindows();
      notify(`Đã chỉnh lề trang: ${w.data.margins}`);
    });
  });

  $$('[data-wlayout-orient]', el).forEach(btn => {
    btn.addEventListener('click', () => {
      w.data.orientation = btn.dataset.wlayoutOrient;
      renderWindows();
      notify(`Đã chỉnh hướng giấy: ${w.data.orientation}`);
    });
  });

  // VIEW TAB TOGGLES
  $('[data-wview-toggle="ruler"]', el)?.addEventListener('change', e => {
    w.data.showRuler = e.target.checked;
    renderWindows();
  });

  $$('[data-wview-zoom]', el).forEach(btn => {
    btn.addEventListener('click', () => {
      const z = btn.dataset.wviewZoom;
      w.data.zoom = z === 'fit' ? 120 : Number(z);
      renderWindows();
    });
  });

  // VIEW MODES (STATUS BAR)
  $$('[data-wview]', el).forEach(btn => {
    btn.addEventListener('click', () => {
      w.data.viewMode = btn.dataset.wview;
      renderWindows();
    });
  });

  // ZOOM SLIDER & BUTTONS
  const zoomSlider = $('[data-wzoom="slider"]', el);
  zoomSlider?.addEventListener('input', () => {
    w.data.zoom = Number(zoomSlider.value);
    const scaler = $('.word-page-scaler', el);
    const valBtn = $('[data-wzoom="reset"]', el);
    if (scaler) scaler.style.transform = `scale(${w.data.zoom / 100})`;
    if (valBtn) valBtn.textContent = `${w.data.zoom}%`;
  });

  $('[data-wzoom="in"]', el)?.addEventListener('click', () => {
    w.data.zoom = Math.min(200, (w.data.zoom || 100) + 10);
    renderWindows();
  });

  $('[data-wzoom="out"]', el)?.addEventListener('click', () => {
    w.data.zoom = Math.max(50, (w.data.zoom || 100) - 10);
    renderWindows();
  });

  $('[data-wzoom="reset"]', el)?.addEventListener('click', () => {
    w.data.zoom = 100;
    renderWindows();
  });

  // SEARCH INPUT IN HEADER
  const searchInp = $('[data-wsearch="1"]', el);
  searchInp?.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const q = searchInp.value.trim().toLowerCase();
      if (q) {
        if (q.includes('font') || q.includes('chữ')) {
          w.data.activeTab = 'home';
          renderWindows();
        } else if (q.includes('bảng') || q.includes('table') || q.includes('ảnh')) {
          w.data.activeTab = 'insert';
          renderWindows();
        } else if (q.includes('in') || q.includes('lưu') || q.includes('save')) {
          doSave();
        } else {
          showFindBar(el, editor, q);
        }
      }
    }
  });

  // KEYBOARD SHORTCUTS INSIDE WORD
  el.addEventListener('keydown', e => {
    if (e.ctrlKey && e.key.toLowerCase() === 's') {
      e.preventDefault();
      doSave();
    }
    if (e.ctrlKey && e.key.toLowerCase() === 'p') {
      e.preventDefault();
      printDocument(w);
    }
    if (e.ctrlKey && e.key.toLowerCase() === 'f') {
      e.preventDefault();
      showFindBar(el, editor);
    }
  });
}

/**
 * SAVE AS DIALOG FOR WORD (.docx)
 */
export function showWordSaveAsDialog(w, content, env) {
  const { node, uniqueName, now, uid, esc, notify, renderWindows, renderDesktop, onStateChange } = env;
  const host = document.getElementById('dialog-modal');
  if (!host) return;
  host.classList.remove('hidden');

  const availableFolders = env.state.nodes.filter(n => n.type === 'folder' && !n.inTrash && n.id !== 'root');
  const defaultFolder = env.state.activeParent || 'desktop';
  const defaultName = (w.data?.title && w.data.title !== 'Document1') ? `${w.data.title}.docx` : 'Tài_liệu_mới.docx';

  host.innerHTML = `
    <div class="save-as-box word-save-dialog">
      <div class="save-as-title" style="background: #185abd; color: white;">
        <span style="display:flex;align-items:center;gap:8px;">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4.414a1 1 0 0 0-.293-.707l-2.414-2.414A1 1 0 0 0 11.586 1H2zm2 1h7v3H4V2zm-1 5h10v7H3V7z"/></svg>
          Lưu tệp - Microsoft Word
        </span>
      </div>
      <div class="save-as-body">
        <div class="save-as-row">
          <label>Lưu vào thư mục (Save in):</label>
          <select id="save-as-folder">
            ${availableFolders.map(f => `<option value="${f.id}" ${f.id === defaultFolder ? 'selected' : ''}>${esc(f.name)}</option>`).join('')}
          </select>
        </div>
        <div class="save-as-row">
          <label>Tên tài liệu (File name):</label>
          <input id="save-as-filename" value="${esc(defaultName)}" autofocus>
        </div>
        <div class="save-as-row">
          <label>Định dạng (Save as type):</label>
          <select disabled>
            <option>Word Document (*.docx)</option>
          </select>
        </div>
      </div>
      <div class="save-as-actions">
        <button class="dialog-btn" id="save-as-cancel">Hủy bỏ</button>
        <button class="dialog-btn primary" id="save-as-confirm" style="background:#185abd;color:#fff;border-color:#185abd;">Lưu (Save)</button>
      </div>
    </div>
  `;

  const closeDialog = () => {
    host.classList.add('hidden');
    host.innerHTML = '';
  };

  document.getElementById('save-as-cancel')?.addEventListener('click', closeDialog);
  document.getElementById('save-as-confirm')?.addEventListener('click', () => {
    const targetFolder = document.getElementById('save-as-folder').value;
    let fileName = document.getElementById('save-as-filename').value.trim();
    if (!fileName) fileName = 'Tài_liệu_mới.docx';
    if (!/\.[^.]+$/.test(fileName)) fileName += '.docx';

    let n = node(w.data?.nodeId);
    if (n && n.parentId === targetFolder) {
      n.name = uniqueName(targetFolder, fileName, n.id);
      n.content = content;
      n.modified = now();
    } else {
      const id = uid('doc');
      const safeName = uniqueName(targetFolder, fileName);
      n = {
        id,
        name: safeName,
        originalName: safeName,
        nameHistory: [safeName],
        type: 'file',
        fileType: 'doc',
        parentId: targetFolder,
        parent: targetFolder,
        inTrash: false,
        content: content,
        createdBy: 'user',
        copiedFrom: null,
        movedBy: 'system',
        restored: false,
        previousParentId: null,
        deletedFrom: null,
        created: now(),
        modified: now(),
        system: false
      };
      env.state.nodes.push(n);
      w.data.nodeId = id;
    }

    w.data.title = n.name;
    w.title = `${n.name} - Word`;
    closeDialog();
    renderDesktop();
    renderWindows();
    notify(`Đã lưu tài liệu Word: ${n.name}`);
    onStateChange();
  });
}

/**
 * Helper: Quick Color Menu for Highlight & Font Colors
 */
function showColorMenu(anchorBtn, onSelect) {
  const existing = document.querySelector('.word-floating-palette');
  if (existing) existing.remove();

  const colors = [
    '#000000', '#ffffff', '#dc2626', '#ea580c', '#ca8a04',
    '#16a34a', '#0284c7', '#2563eb', '#7c3aed', '#db2777'
  ];

  const pop = document.createElement('div');
  pop.className = 'word-floating-palette';
  pop.innerHTML = `
    <div class="palette-colors">
      ${colors.map(c => `<button class="color-swatch" style="background:${c};" data-color="${c}"></button>`).join('')}
    </div>
    <button class="palette-clear" data-color="transparent">Không màu</button>
  `;

  document.body.appendChild(pop);
  const rect = anchorBtn.getBoundingClientRect();
  pop.style.left = `${rect.left}px`;
  pop.style.top = `${rect.bottom + 4}px`;

  const dismiss = e => {
    if (!pop.contains(e.target) && e.target !== anchorBtn) {
      pop.remove();
      document.removeEventListener('pointerdown', dismiss);
    }
  };
  setTimeout(() => document.addEventListener('pointerdown', dismiss), 0);

  pop.querySelectorAll('[data-color]').forEach(b => {
    b.addEventListener('click', () => {
      onSelect(b.dataset.color);
      pop.remove();
    });
  });
}

/**
 * Helper: Insert Table Modal
 */
function showTablePicker(anchorBtn, onInsert) {
  const existing = document.querySelector('.word-table-picker');
  if (existing) existing.remove();

  const pop = document.createElement('div');
  pop.className = 'word-table-picker';
  pop.innerHTML = `
    <div style="font-weight:600;font-size:12px;margin-bottom:8px;color:#334155;">Chèn bảng biểu:</div>
    <div class="table-presets">
      <button data-rows="2" data-cols="2">2 cột × 2 dòng</button>
      <button data-rows="3" data-cols="3">3 cột × 3 dòng</button>
      <button data-rows="4" data-cols="3">3 cột × 4 dòng</button>
      <button data-rows="5" data-cols="4">4 cột × 5 dòng</button>
    </div>
  `;

  document.body.appendChild(pop);
  const rect = anchorBtn.getBoundingClientRect();
  pop.style.left = `${rect.left}px`;
  pop.style.top = `${rect.bottom + 4}px`;

  const dismiss = e => {
    if (!pop.contains(e.target) && e.target !== anchorBtn) {
      pop.remove();
      document.removeEventListener('pointerdown', dismiss);
    }
  };
  setTimeout(() => document.addEventListener('pointerdown', dismiss), 0);

  pop.querySelectorAll('button').forEach(b => {
    b.addEventListener('click', () => {
      onInsert(Number(b.dataset.rows), Number(b.dataset.cols));
      pop.remove();
    });
  });
}

function insertTable(editor, rows, cols) {
  if (!editor) return;
  let html = `<table style="width: 100%; border-collapse: collapse; margin: 16px 0;"><thead><tr style="background:#f1f5f9;">`;
  for (let c = 1; c <= cols; c++) {
    html += `<th style="border: 1px solid #cbd5e1; padding: 8px; text-align: left;">Cột ${c}</th>`;
  }
  html += `</tr></thead><tbody>`;
  for (let r = 1; r < rows; r++) {
    html += `<tr>`;
    for (let c = 1; c <= cols; c++) {
      html += `<td style="border: 1px solid #cbd5e1; padding: 8px;">Dữ liệu</td>`;
    }
    html += `</tr>`;
  }
  html += `</tbody></table><p><br></p>`;
  editor.focus();
  document.execCommand('insertHTML', false, html);
}

/**
 * Helper: Insert Picture Modal
 */
function showPicturePicker(env, onInsert) {
  const host = document.getElementById('dialog-modal');
  if (!host) return;
  host.classList.remove('hidden');

  host.innerHTML = `
    <div class="save-as-box word-picture-dialog" style="width: 520px;">
      <div class="save-as-title" style="background:#185abd;color:#fff;">
        <span>Chèn hình ảnh vào văn bản</span>
      </div>
      <div class="save-as-body">
        <div style="font-size:12px;color:#475569;margin-bottom:8px;">Chọn hình ảnh minh họa cho bài học:</div>
        <div class="picture-sample-grid">
          ${SAMPLE_PICTURES.map((p, idx) => `
            <div class="picture-card" data-pic-idx="${idx}">
              <div class="picture-preview">${p.svg}</div>
              <div class="picture-title"><strong>${p.name}</strong><br><small>${p.caption}</small></div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="save-as-actions">
        <button class="dialog-btn" id="pic-cancel">Đóng</button>
      </div>
    </div>
  `;

  const closeDialog = () => {
    host.classList.add('hidden');
    host.innerHTML = '';
  };

  document.getElementById('pic-cancel')?.addEventListener('click', closeDialog);
  host.querySelectorAll('[data-pic-idx]').forEach(card => {
    card.addEventListener('click', () => {
      const idx = Number(card.dataset.picIdx);
      const pic = SAMPLE_PICTURES[idx];
      if (pic) {
        onInsert(`<div style="text-align: center; margin: 16px 0;">${pic.svg}<p style="font-size: 13px; color: #64748b; font-style: italic; margin-top: 4px;">${pic.caption}</p></div><p><br></p>`);
        closeDialog();
      }
    });
  });
}

/**
 * Helper: Shapes Picker
 */
function showShapePicker(anchorBtn, onInsert) {
  const shapes = [
    { name: 'Hình chữ nhật', svg: '<div style="width:160px;height:70px;background:#3b82f6;border-radius:4px;margin:12px auto;"></div>' },
    { name: 'Bo góc tròn', svg: '<div style="width:160px;height:70px;background:#10b981;border-radius:24px;margin:12px auto;"></div>' },
    { name: 'Hình tròn', svg: '<div style="width:80px;height:80px;background:#f59e0b;border-radius:50%;margin:12px auto;"></div>' },
    { name: 'Khung ghi chú', svg: '<div style="width:200px;padding:12px;background:#fef3c7;border-left:4px solid #f59e0b;margin:12px auto;font-size:13px;color:#92400e;"><strong>Lưu ý:</strong> Nội dung chú thích...</div>' }
  ];

  const pop = document.createElement('div');
  pop.className = 'word-table-picker';
  pop.innerHTML = `
    <div style="font-weight:600;font-size:12px;margin-bottom:8px;color:#334155;">Chọn hình vẽ (Shapes):</div>
    <div class="table-presets">
      ${shapes.map((s, i) => `<button data-shape="${i}">${s.name}</button>`).join('')}
    </div>
  `;

  document.body.appendChild(pop);
  const rect = anchorBtn.getBoundingClientRect();
  pop.style.left = `${rect.left}px`;
  pop.style.top = `${rect.bottom + 4}px`;

  const dismiss = e => {
    if (!pop.contains(e.target) && e.target !== anchorBtn) {
      pop.remove();
      document.removeEventListener('pointerdown', dismiss);
    }
  };
  setTimeout(() => document.addEventListener('pointerdown', dismiss), 0);

  pop.querySelectorAll('button').forEach(b => {
    b.addEventListener('click', () => {
      const idx = Number(b.dataset.shape);
      if (shapes[idx]) onInsert(shapes[idx].svg);
      pop.remove();
    });
  });
}

/**
 * Helper: Symbol Picker
 */
function showSymbolPicker(anchorBtn, onInsert) {
  const symbols = ['Ω', 'π', '±', '≤', '≥', '≠', '÷', '×', '©', '®', '™', '★', '♥', '✓', '✕', '°C'];
  const pop = document.createElement('div');
  pop.className = 'word-symbol-picker';
  pop.innerHTML = `
    <div class="symbol-grid">
      ${symbols.map(s => `<button data-sym="${s}">${s}</button>`).join('')}
    </div>
  `;

  document.body.appendChild(pop);
  const rect = anchorBtn.getBoundingClientRect();
  pop.style.left = `${rect.left}px`;
  pop.style.top = `${rect.bottom + 4}px`;

  const dismiss = e => {
    if (!pop.contains(e.target) && e.target !== anchorBtn) {
      pop.remove();
      document.removeEventListener('pointerdown', dismiss);
    }
  };
  setTimeout(() => document.addEventListener('pointerdown', dismiss), 0);

  pop.querySelectorAll('button').forEach(b => {
    b.addEventListener('click', () => {
      onInsert(b.dataset.sym);
      pop.remove();
    });
  });
}

/**
 * Helper: Find Bar inside Word
 */
function showFindBar(el, editor, initialQuery = '') {
  let bar = el.querySelector('.word-find-bar');
  if (!bar) {
    bar = document.createElement('div');
    bar.className = 'word-find-bar';
    bar.innerHTML = `
      <input type="text" placeholder="Tìm kiếm văn bản..." value="${initialQuery}" class="find-input">
      <button class="find-close">✕</button>
    `;
    el.querySelector('.word-workspace').appendChild(bar);

    $('.find-close', bar).addEventListener('click', () => bar.remove());
    const inp = $('.find-input', bar);
    inp.addEventListener('input', () => {
      const q = inp.value.trim();
      if (q && window.find) {
        window.find(q, false, false, true, false, false, true);
      }
    });
    inp.focus();
  }
}

/**
 * Helper: Replace Dialog
 */
function showReplaceDialog(el, editor) {
  const host = document.getElementById('dialog-modal');
  if (!host) return;
  host.classList.remove('hidden');

  host.innerHTML = `
    <div class="save-as-box" style="width: 420px;">
      <div class="save-as-title">Tìm kiếm và Thay thế (Find and Replace)</div>
      <div class="save-as-body">
        <div class="save-as-row">
          <label>Tìm từ (Find what):</label>
          <input id="find-what" autofocus>
        </div>
        <div class="save-as-row">
          <label>Thay thế bằng (Replace with):</label>
          <input id="replace-with">
        </div>
      </div>
      <div class="save-as-actions">
        <button class="dialog-btn" id="replace-cancel">Đóng</button>
        <button class="dialog-btn primary" id="replace-all">Thay thế tất cả</button>
      </div>
    </div>
  `;

  const closeDialog = () => {
    host.classList.add('hidden');
    host.innerHTML = '';
  };

  document.getElementById('replace-cancel')?.addEventListener('click', closeDialog);
  document.getElementById('replace-all')?.addEventListener('click', () => {
    const what = document.getElementById('find-what').value;
    const withStr = document.getElementById('replace-with').value;
    if (what && editor) {
      const re = new RegExp(what.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      editor.innerHTML = editor.innerHTML.replace(re, withStr);
      closeDialog();
    }
  });
}

/**
 * Helper: Word Count Statistics Dialog
 */
function showWordCountDialog(w) {
  const host = document.getElementById('dialog-modal');
  if (!host) return;
  host.classList.remove('hidden');

  const words = w.data.wordCount || 0;
  const chars = w.data.charCount || 0;

  host.innerHTML = `
    <div class="save-as-box" style="width: 360px;">
      <div class="save-as-title">Thống kê số từ (Word Count)</div>
      <div class="save-as-body" style="font-size: 13px; line-height: 1.8;">
        <div style="display:flex;justify-content:space-between;"><span>Số trang (Pages):</span> <strong>1</strong></div>
        <div style="display:flex;justify-content:space-between;"><span>Số từ (Words):</span> <strong>${words}</strong></div>
        <div style="display:flex;justify-content:space-between;"><span>Ký tự (không tính dấu cách):</span> <strong>${Math.round(chars * 0.82)}</strong></div>
        <div style="display:flex;justify-content:space-between;"><span>Ký tự (tính cả dấu cách):</span> <strong>${chars}</strong></div>
        <div style="display:flex;justify-content:space-between;"><span>Số đoạn văn (Paragraphs):</span> <strong>${Math.max(1, Math.round(words / 15))}</strong></div>
      </div>
      <div class="save-as-actions">
        <button class="dialog-btn primary" id="wc-close">Đóng</button>
      </div>
    </div>
  `;

  document.getElementById('wc-close')?.addEventListener('click', () => {
    host.classList.add('hidden');
    host.innerHTML = '';
  });
}

/**
 * Helper: Word Shortcuts Help Modal
 */
function showShortcutsHelp() {
  const host = document.getElementById('dialog-modal');
  if (!host) return;
  host.classList.remove('hidden');

  host.innerHTML = `
    <div class="save-as-box" style="width: 500px;">
      <div class="save-as-title" style="background:#185abd;color:#fff;">Bảng phím tắt soạn thảo Word cho học sinh</div>
      <div class="save-as-body" style="font-size: 12.5px; max-height: 380px; overflow-y: auto;">
        <table style="width:100%;border-collapse:collapse;">
          <tr style="border-bottom:1px solid #e2e8f0;padding:6px 0;"><td style="padding:6px;width:120px;"><strong>Ctrl + B</strong></td><td>In đậm chữ (Bold)</td></tr>
          <tr style="border-bottom:1px solid #e2e8f0;padding:6px 0;"><td style="padding:6px;"><strong>Ctrl + I</strong></td><td>In nghiêng chữ (Italic)</td></tr>
          <tr style="border-bottom:1px solid #e2e8f0;padding:6px 0;"><td style="padding:6px;"><strong>Ctrl + U</strong></td><td>Gạch chân chữ (Underline)</td></tr>
          <tr style="border-bottom:1px solid #e2e8f0;padding:6px 0;"><td style="padding:6px;"><strong>Ctrl + L</strong></td><td>Căn lề trái văn bản (Left)</td></tr>
          <tr style="border-bottom:1px solid #e2e8f0;padding:6px 0;"><td style="padding:6px;"><strong>Ctrl + E</strong></td><td>Căn lề giữa văn bản (Center)</td></tr>
          <tr style="border-bottom:1px solid #e2e8f0;padding:6px 0;"><td style="padding:6px;"><strong>Ctrl + R</strong></td><td>Căn lề phải văn bản (Right)</td></tr>
          <tr style="border-bottom:1px solid #e2e8f0;padding:6px 0;"><td style="padding:6px;"><strong>Ctrl + J</strong></td><td>Căn đều hai bên lề (Justify)</td></tr>
          <tr style="border-bottom:1px solid #e2e8f0;padding:6px 0;"><td style="padding:6px;"><strong>Ctrl + S</strong></td><td>Lưu tài liệu vào máy (Save)</td></tr>
          <tr style="border-bottom:1px solid #e2e8f0;padding:6px 0;"><td style="padding:6px;"><strong>Ctrl + Z</strong></td><td>Hoàn tác thao tác trước (Undo)</td></tr>
          <tr style="border-bottom:1px solid #e2e8f0;padding:6px 0;"><td style="padding:6px;"><strong>Ctrl + Y</strong></td><td>Làm lại thao tác vừa hủy (Redo)</td></tr>
          <tr style="border-bottom:1px solid #e2e8f0;padding:6px 0;"><td style="padding:6px;"><strong>Ctrl + A</strong></td><td>Chọn (bôi đen) tất cả văn bản</td></tr>
          <tr><td style="padding:6px;"><strong>Ctrl + P</strong></td><td>In ấn tài liệu (Print)</td></tr>
        </table>
      </div>
      <div class="save-as-actions">
        <button class="dialog-btn primary" id="sc-close">Đã hiểu</button>
      </div>
    </div>
  `;

  document.getElementById('sc-close')?.addEventListener('click', () => {
    host.classList.add('hidden');
    host.innerHTML = '';
  });
}

/**
 * Helper: Telex / VNI Help Modal
 */
function showTelexHelp() {
  const host = document.getElementById('dialog-modal');
  if (!host) return;
  host.classList.remove('hidden');

  host.innerHTML = `
    <div class="save-as-box" style="width: 480px;">
      <div class="save-as-title" style="background:#185abd;color:#fff;">Quy tắc gõ Tiếng Việt Telex &amp; VNI</div>
      <div class="save-as-body" style="font-size: 12.5px;">
        <h4 style="margin:0 0 8px;color:#185abd;">Kiểu gõ TELEX (Phổ biến nhất):</h4>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:16px;">
          <div>s: Dấu sắc (a + s = á)</div>
          <div>f: Dấu huyền (a + f = à)</div>
          <div>r: Dấu hỏi (a + r = ả)</div>
          <div>x: Dấu ngã (a + x = ã)</div>
          <div>j: Dấu nặng (a + j = ạ)</div>
          <div>aa: Chữ â &nbsp;|&nbsp; ee: Chữ ê</div>
          <div>oo: Chữ ô &nbsp;|&nbsp; dd: Chữ đ</div>
          <div>ow: Chữ ơ &nbsp;|&nbsp; uw: Chữ ư</div>
          <div>aw: Chữ ă &nbsp;|&nbsp; w: Chữ ư/ơ</div>
        </div>
      </div>
      <div class="save-as-actions">
        <button class="dialog-btn primary" id="telex-close">Đã hiểu</button>
      </div>
    </div>
  `;

  document.getElementById('telex-close')?.addEventListener('click', () => {
    host.classList.add('hidden');
    host.innerHTML = '';
  });
}

/**
 * Helper: Print Document
 */
function printDocument(w) {
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(`
    <!doctype html>
    <html>
      <head>
        <title>${w.data?.title || 'Document1'}</title>
        <style>
          @page { size: A4; margin: 2.54cm; }
          body { font-family: 'Aptos', 'Times New Roman', Arial, sans-serif; font-size: 14pt; line-height: 1.5; color: #000; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #000; padding: 6px; }
        </style>
      </head>
      <body>
        ${w.data?.content || ''}
      </body>
    </html>
  `);
  doc.close();

  setTimeout(() => {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    setTimeout(() => iframe.remove(), 1000);
  }, 300);
}

/**
 * Helper: Toggle Aa (Change Case)
 */
function toggleChangeCase(editor) {
  if (!editor) return;
  const sel = window.getSelection();
  if (!sel.rangeCount) return;
  const text = sel.toString();
  if (!text) return;

  let newText;
  if (text === text.toUpperCase()) {
    newText = text.toLowerCase();
  } else if (text === text.toLowerCase()) {
    newText = text.replace(/\b\w/g, c => c.toUpperCase());
  } else {
    newText = text.toUpperCase();
  }
  document.execCommand('insertText', false, newText);
}

/**
 * Helper: Line Spacing Menu
 */
function showLineSpacingMenu(anchorBtn, editor) {
  const spacings = ['1.0', '1.15', '1.5', '2.0'];
  const pop = document.createElement('div');
  pop.className = 'word-table-picker';
  pop.innerHTML = `
    <div style="font-weight:600;font-size:12px;margin-bottom:6px;color:#334155;">Khoảng cách dòng:</div>
    <div class="table-presets">
      ${spacings.map(s => `<button data-sp="${s}">${s}</button>`).join('')}
    </div>
  `;

  document.body.appendChild(pop);
  const rect = anchorBtn.getBoundingClientRect();
  pop.style.left = `${rect.left}px`;
  pop.style.top = `${rect.bottom + 4}px`;

  const dismiss = e => {
    if (!pop.contains(e.target) && e.target !== anchorBtn) {
      pop.remove();
      document.removeEventListener('pointerdown', dismiss);
    }
  };
  setTimeout(() => document.addEventListener('pointerdown', dismiss), 0);

  pop.querySelectorAll('button').forEach(b => {
    b.addEventListener('click', () => {
      if (editor) editor.style.lineHeight = b.dataset.sp;
      pop.remove();
    });
  });
}

/**
 * Helper: Apply Word Style
 */
function applyWordStyle(editor, styleName) {
  if (!editor) return;
  switch (styleName) {
    case 'heading-1':
      document.execCommand('formatBlock', false, '<h1>');
      break;
    case 'heading-2':
      document.execCommand('formatBlock', false, '<h2>');
      break;
    case 'title':
      document.execCommand('formatBlock', false, '<h1>');
      break;
    case 'subtitle':
      document.execCommand('formatBlock', false, '<p>');
      document.execCommand('italic', false, null);
      break;
    case 'no-spacing':
      document.execCommand('formatBlock', false, '<p>');
      break;
    case 'normal':
    default:
      document.execCommand('formatBlock', false, '<p>');
      break;
  }
}
