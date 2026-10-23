import { LEVELS, evaluateSimulationGoals, DESKTOP, DOCUMENTS, PICTURES, VIDEOS, RECYCLE } from './public/practice-engine.js';

console.log('=== TEST SUITE: 15 INTERACTIVE FILE SYSTEM QUESTS ===\n');

let passCount = 0;
let failCount = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`  [PASS] ${testName}`);
    passCount++;
  } else {
    console.error(`  [FAIL] ${testName}`);
    failCount++;
  }
}

// ----------------------------------------------------
// BÀI 1: Mở thư mục Hình ảnh
// ----------------------------------------------------
console.log('Test Bài 1: Mở thư mục Hình ảnh');
{
  const lvl = LEVELS[0];
  const state = { nodes: lvl.seed(), windows: [] };
  assert(!evaluateSimulationGoals(state, lvl).completed, 'Initial state: incomplete');
  
  // Hành động: Mở File Explorer ở thư mục Hình ảnh
  state.windows.push({ app: 'explorer', minimized: false, data: { folder: 'pictures' } });
  assert(evaluateSimulationGoals(state, lvl).completed, 'After opening pictures folder in Explorer: completed');
}

// ----------------------------------------------------
// BÀI 2: Tạo thư mục "Bài tập" trong "Học tập"
// ----------------------------------------------------
console.log('\nTest Bài 2: Tạo thư mục "Bài tập" trong "Học tập"');
{
  const lvl = LEVELS[1];
  const state = { nodes: lvl.seed(), windows: [] };
  assert(!evaluateSimulationGoals(state, lvl).completed, 'Initial state: incomplete');

  // Gian lận: Tạo ngoài Desktop thay vì trong Học tập
  state.nodes.push({ type: 'folder', name: 'Bài tập', parentId: DESKTOP, inTrash: false, createdBy: 'user' });
  assert(!evaluateSimulationGoals(state, lvl).completed, 'Anti-cheat: Creating in Desktop fails');

  // Hành động đúng: Tạo trong 'seed_hoctap_b2'
  state.nodes.push({ type: 'folder', name: 'Bài tập', parentId: 'seed_hoctap_b2', inTrash: false, createdBy: 'user' });
  assert(evaluateSimulationGoals(state, lvl).completed, 'Creating in Học tập: completed');
}

// ----------------------------------------------------
// BÀI 3: Đổi tên "Thư mục mới" thành "Vở của em"
// ----------------------------------------------------
console.log('\nTest Bài 3: Đổi tên "Thư mục mới" thành "Vở của em"');
{
  const lvl = LEVELS[2];
  const state = { nodes: lvl.seed(), windows: [] };
  assert(!evaluateSimulationGoals(state, lvl).completed, 'Initial state: incomplete');

  // Gian lận: Xóa đi tạo mới
  const fakeNodes = state.nodes.filter(n => n.id !== 'seed_folder_3');
  fakeNodes.push({ id: 'fake_new', name: 'Vở của em', parentId: DESKTOP, inTrash: false, createdBy: 'user', nameHistory: ['Vở của em'] });
  assert(!evaluateSimulationGoals({ nodes: fakeNodes }, lvl).completed, 'Anti-cheat: Deleting and recreating fails');

  // Hành động đúng: Đổi tên node gốc
  const node = state.nodes.find(n => n.id === 'seed_folder_3');
  node.nameHistory.push('Vở của em');
  node.name = 'Vở của em';
  assert(evaluateSimulationGoals(state, lvl).completed, 'Proper rename preserving original node: completed');
}

// ----------------------------------------------------
// BÀI 4: Đưa hai bức ảnh về thư mục "Hình ảnh"
// ----------------------------------------------------
console.log('\nTest Bài 4: Đưa hai bức ảnh về thư mục "Hình ảnh"');
{
  const lvl = LEVELS[3];
  const state = { nodes: lvl.seed(), windows: [] };
  assert(!evaluateSimulationGoals(state, lvl).completed, 'Initial state: incomplete');

  // Di chuyển 1 ảnh
  state.nodes.find(n => n.id === 'seed_img_1').parentId = PICTURES;
  assert(!evaluateSimulationGoals(state, lvl).completed, 'Only 1 image moved: incomplete');

  // Di chuyển ảnh 2
  state.nodes.find(n => n.id === 'seed_img_2').parentId = PICTURES;
  assert(evaluateSimulationGoals(state, lvl).completed, 'Both images moved to pictures: completed');
}

// ----------------------------------------------------
// BÀI 5: Đưa tệp video về thư mục "Video"
// ----------------------------------------------------
console.log('\nTest Bài 5: Đưa tệp video về thư mục "Video"');
{
  const lvl = LEVELS[4];
  const state = { nodes: lvl.seed(), windows: [] };
  assert(!evaluateSimulationGoals(state, lvl).completed, 'Initial state: incomplete');

  state.nodes.find(n => n.id === 'seed_video_1').parentId = VIDEOS;
  assert(evaluateSimulationGoals(state, lvl).completed, 'Video moved to videos: completed');
}

// ----------------------------------------------------
// BÀI 6: Phân loại 8 tệp tin lộn xộn
// ----------------------------------------------------
console.log('\nTest Bài 6: Phân loại 8 tệp tin lộn xộn');
{
  const lvl = LEVELS[5];
  const state = { nodes: lvl.seed(), windows: [] };
  assert(!evaluateSimulationGoals(state, lvl).completed, 'Initial state: incomplete');

  // Phân loại 3 ảnh
  ['b6_img1', 'b6_img2', 'b6_img3'].forEach(id => state.nodes.find(n => n.id === id).parentId = PICTURES);
  // Phân loại 3 tài liệu
  ['b6_doc1', 'b6_doc2', 'b6_doc3'].forEach(id => state.nodes.find(n => n.id === id).parentId = DOCUMENTS);
  // Phân loại 2 video
  ['b6_vid1', 'b6_vid2'].forEach(id => state.nodes.find(n => n.id === id).parentId = VIDEOS);

  assert(evaluateSimulationGoals(state, lvl).completed, 'All 8 files classified correctly: completed');
}

// ----------------------------------------------------
// BÀI 7: Sao chép (Copy) ảnh "Hoa" sang "Hình ảnh"
// ----------------------------------------------------
console.log('\nTest Bài 7: Sao chép (Copy) ảnh "Hoa" sang "Hình ảnh"');
{
  const lvl = LEVELS[6];
  const state = { nodes: lvl.seed(), windows: [] };
  assert(!evaluateSimulationGoals(state, lvl).completed, 'Initial state: incomplete');

  // Gian lận: Cắt (Move) thay vì Copy -> bản gốc mất
  const orig = state.nodes.find(n => n.id === 'seed_hoa_img');
  orig.parentId = PICTURES;
  assert(!evaluateSimulationGoals(state, lvl).completed, 'Anti-cheat: Cut-pasting losing original fails');

  // Khôi phục bản gốc và tạo bản copy chuẩn
  orig.parentId = 'seed_b7_hoctap';
  state.nodes.push({
    id: 'copy_hoa',
    name: 'Hoa.png',
    parentId: PICTURES,
    copiedFrom: 'seed_hoa_img',
    inTrash: false
  });
  assert(evaluateSimulationGoals(state, lvl).completed, 'Original kept + copiedFrom verified: completed');
}

// ----------------------------------------------------
// BÀI 8: Kéo thả (Drag & Drop) tệp "Bài tập.docx" vào "Tài liệu"
// ----------------------------------------------------
console.log('\nTest Bài 8: Kéo thả (Drag & Drop) tệp "Bài tập.docx" vào "Tài liệu"');
{
  const lvl = LEVELS[7];
  const state = { nodes: lvl.seed(), windows: [] };
  assert(!evaluateSimulationGoals(state, lvl).completed, 'Initial state: incomplete');

  // Gian lận: Dùng cut-paste
  const doc = state.nodes.find(n => n.id === 'seed_baitap_doc');
  doc.parentId = DOCUMENTS;
  doc.movedBy = 'cut-paste';
  assert(!evaluateSimulationGoals(state, lvl).completed, 'Anti-cheat: cut-paste instead of drag fails');

  // Thao tác đúng: movedBy === 'drag'
  doc.movedBy = 'drag';
  assert(evaluateSimulationGoals(state, lvl).completed, 'movedBy === "drag" verified: completed');
}

// ----------------------------------------------------
// BÀI 9: Xóa và Khôi phục (Restore) tệp "Bài hát"
// ----------------------------------------------------
console.log('\nTest Bài 9: Xóa và Khôi phục (Restore) tệp "Bài hát"');
{
  const lvl = LEVELS[8];
  const state = { nodes: lvl.seed(), windows: [] };
  assert(!evaluateSimulationGoals(state, lvl).completed, 'Initial state: incomplete');

  const song = state.nodes.find(n => n.id === 'seed_song_mp3');
  // Bước 1: Xóa vào recycle
  song.parentId = RECYCLE;
  song.inTrash = true;
  song.deletedFrom = DESKTOP;
  song.previousParentId = DESKTOP;
  assert(!evaluateSimulationGoals(state, lvl).completed, 'Step 1 done, step 2 incomplete');

  // Bước 2: Khôi phục
  song.parentId = DESKTOP;
  song.inTrash = false;
  song.restored = true;
  assert(evaluateSimulationGoals(state, lvl).completed, 'restored === true & back on Desktop: completed');
}

// ----------------------------------------------------
// BÀI 10: Chuỗi thao tác tổng hợp (Tạo -> Đổi tên -> Phân loại)
// ----------------------------------------------------
console.log('\nTest Bài 10: Chuỗi thao tác tổng hợp (Tạo -> Đổi tên -> Phân loại)');
{
  const lvl = LEVELS[9];
  const state = { nodes: lvl.seed(), windows: [] };
  assert(!evaluateSimulationGoals(state, lvl).completed, 'Initial state: incomplete');

  // Tạo thư mục Bài tập rồi đổi tên thành Góc học tập
  const folderId = 'user_folder_b10';
  state.nodes.push({
    id: folderId,
    name: 'Góc học tập',
    originalName: 'Bài tập',
    nameHistory: ['New folder', 'Bài tập', 'Góc học tập'],
    type: 'folder',
    parentId: DESKTOP,
    inTrash: false,
    createdBy: 'user'
  });

  // Đưa 2 tài liệu vào Góc học tập
  state.nodes.find(n => n.id === 'b10_doc1').parentId = folderId;
  state.nodes.find(n => n.id === 'b10_doc2').parentId = folderId;

  // Đưa 2 ảnh vào Hình ảnh
  state.nodes.find(n => n.id === 'b10_img1').parentId = PICTURES;
  state.nodes.find(n => n.id === 'b10_img2').parentId = PICTURES;

  assert(evaluateSimulationGoals(state, lvl).completed, 'Created, renamed with history, and classified: completed');
}

// ----------------------------------------------------
// BÀI 11: Cây thư mục đa cấp (Nested Folders)
// ----------------------------------------------------
console.log('\nTest Bài 11: Cây thư mục đa cấp (Nested Folders)');
{
  const lvl = LEVELS[10];
  const state = { nodes: lvl.seed(), windows: [] };
  assert(!evaluateSimulationGoals(state, lvl).completed, 'Initial state: incomplete');

  // Tạo 2 thư mục con
  state.nodes.push(
    { id: 'sub_toan', name: 'Môn Toán', type: 'folder', parentId: 'seed_b11_hoctap', inTrash: false, createdBy: 'user' },
    { id: 'sub_tin', name: 'Môn Tin', type: 'folder', parentId: 'seed_b11_hoctap', inTrash: false, createdBy: 'user' }
  );

  // Đưa file Toán vào Môn Toán
  state.nodes.find(n => n.id === 'b11_f1').parentId = 'sub_toan';
  state.nodes.find(n => n.id === 'b11_f2').parentId = 'sub_toan';

  // Đưa file Tin vào Môn Tin
  state.nodes.find(n => n.id === 'b11_f3').parentId = 'sub_tin';
  state.nodes.find(n => n.id === 'b11_f4').parentId = 'sub_tin';

  assert(evaluateSimulationGoals(state, lvl).completed, 'Nested folders and files classified: completed');
}

// ----------------------------------------------------
// BÀI 12: Soạn thảo văn bản với Notepad và lưu đúng thư mục
// ----------------------------------------------------
console.log('\nTest Bài 12: Soạn thảo Notepad và lưu đúng thư mục');
{
  const lvl = LEVELS[11];
  const state = { nodes: lvl.seed(), windows: [] };
  assert(!evaluateSimulationGoals(state, lvl).completed, 'Initial state: incomplete');

  // Gian lận: Tệp rỗng
  state.nodes.push({
    id: 'empty_note',
    name: 'Ghi_chu.txt',
    type: 'text',
    parentId: 'seed_b12_gochoctap',
    content: '   ',
    inTrash: false
  });
  assert(!evaluateSimulationGoals(state, lvl).completed, 'Anti-cheat: Empty file fails');

  // Thao tác đúng: có nội dung và trong Góc học tập
  state.nodes.find(n => n.id === 'empty_note').content = 'Em đã làm xong bài tập tin học.';
  assert(evaluateSimulationGoals(state, lvl).completed, 'File with content in Góc học tập: completed');
}

// ----------------------------------------------------
// BÀI 13: Tạo bản sao lưu (Backup) và đổi tên bản sao
// ----------------------------------------------------
console.log('\nTest Bài 13: Tạo bản sao lưu (Backup) và đổi tên bản sao');
{
  const lvl = LEVELS[12];
  const state = { nodes: lvl.seed(), windows: [] };
  assert(!evaluateSimulationGoals(state, lvl).completed, 'Initial state: incomplete');

  // Tạo bản sao trong 'seed_saoluu' và đổi tên có nameHistory
  state.nodes.push({
    id: 'copy_backup',
    name: 'Danh_sach_lop_du_phong.txt',
    nameHistory: ['Danh_sach_lop.txt', 'Danh_sach_lop_du_phong.txt'],
    parentId: 'seed_saoluu',
    copiedFrom: 'seed_dslop',
    inTrash: false
  });

  assert(evaluateSimulationGoals(state, lvl).completed, 'Original intact + copy renamed with history: completed');
}

// ----------------------------------------------------
// BÀI 14: Giải cứu tệp xóa nhầm & Dọn sạch Thùng rác
// ----------------------------------------------------
console.log('\nTest Bài 14: Giải cứu tệp xóa nhầm & Dọn sạch Thùng rác');
{
  const lvl = LEVELS[13];
  const state = { nodes: lvl.seed(), windows: [] };
  assert(!evaluateSimulationGoals(state, lvl).completed, 'Initial state: incomplete');

  // 1. Khôi phục De_thi_hoc_ky.docx
  const dethi = state.nodes.find(n => n.id === 'seed_dethi');
  dethi.parentId = DOCUMENTS;
  dethi.parent = DOCUMENTS;
  dethi.inTrash = false;
  dethi.restored = true;

  // 2. Xóa tam_thoi.tmp
  const tamthoi = state.nodes.find(n => n.id === 'seed_tamthoi');
  tamthoi.parentId = RECYCLE;
  tamthoi.inTrash = true;

  // 3. Dọn sạch Thùng rác (xóa vĩnh viễn rác)
  state.nodes = state.nodes.filter(n => !['seed_rac1', 'seed_rac2', 'seed_qc', 'seed_tamthoi'].includes(n.id));

  assert(evaluateSimulationGoals(state, lvl).completed, 'Restored doc + junk deleted permanently: completed');
}

// ----------------------------------------------------
// BÀI 15: Thử thách Tổng hợp (Master Challenge)
// ----------------------------------------------------
console.log('\nTest Bài 15: Thử thách Tổng hợp (Master Challenge)');
{
  const lvl = LEVELS[14];
  const state = { nodes: lvl.seed(), windows: [] };
  assert(!evaluateSimulationGoals(state, lvl).completed, 'Initial state: incomplete');

  // 1. Đổi tên Chưa đặt tên -> Dự án nhóm
  const f = state.nodes.find(n => n.id === 'seed_b15_chuadatten');
  f.name = 'Dự án nhóm';
  f.nameHistory.push('Dự án nhóm');

  // 2. Drag Ke_hoach.docx vào Dự án nhóm
  const plan = state.nodes.find(n => n.id === 'seed_b15_kehoach');
  plan.parentId = 'seed_b15_chuadatten';
  plan.movedBy = 'drag';

  // 3. Copy Anh_bia.png vào Dự án nhóm & đưa bản gốc về Hình ảnh
  const cover = state.nodes.find(n => n.id === 'seed_b15_anhbia');
  cover.parentId = PICTURES;
  state.nodes.push({
    id: 'copy_anhbia',
    name: 'Anh_bia.png',
    parentId: 'seed_b15_chuadatten',
    copiedFrom: 'seed_b15_anhbia',
    inTrash: false
  });

  // 4. Khôi phục Bai_thuyet_trinh.mp4 rồi đưa về Video
  const video = state.nodes.find(n => n.id === 'seed_b15_thuyettrinh');
  video.parentId = VIDEOS;
  video.parent = VIDEOS;
  video.inTrash = false;
  video.restored = true;

  // 5. Dọn sạch Thùng rác
  state.nodes = state.nodes.filter(n => n.parentId !== RECYCLE && n.parent !== RECYCLE && !n.inTrash);

  assert(evaluateSimulationGoals(state, lvl).completed, 'Master Challenge all 5 criteria passed: completed');
}

console.log(`\n==========================================`);
console.log(`TEST SUMMARY: ${passCount} Passed, ${failCount} Failed.`);
console.log(`==========================================`);
if (failCount > 0) process.exit(1);
