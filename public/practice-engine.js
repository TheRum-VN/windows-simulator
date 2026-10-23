/**
 * Windows Simulator for Education V2.1
 * Interactive File System Quests / Practice Engine
 * 15 Levels: Basic (1-5), Intermediate (6-10), Advanced (11-15)
 */

export const ROOT = 'root';
export const DESKTOP = 'desktop';
export const DOCUMENTS = 'documents';
export const DOWNLOADS = 'downloads';
export const PICTURES = 'pictures';
export const VIDEOS = 'videos';
export const RECYCLE = 'recycle';

export function createBaseSystemNodes() {
  const t = Date.now();
  return [
    {
      id: ROOT,
      name: 'This PC',
      originalName: 'This PC',
      nameHistory: ['This PC'],
      type: 'folder',
      parentId: null,
      parent: null,
      inTrash: false,
      createdBy: 'system',
      copiedFrom: null,
      movedBy: 'system',
      restored: false,
      previousParentId: null,
      deletedFrom: null,
      created: t,
      modified: t,
      system: true
    },
    {
      id: DESKTOP,
      name: 'Desktop',
      originalName: 'Desktop',
      nameHistory: ['Desktop'],
      type: 'folder',
      parentId: ROOT,
      parent: ROOT,
      inTrash: false,
      createdBy: 'system',
      copiedFrom: null,
      movedBy: 'system',
      restored: false,
      previousParentId: null,
      deletedFrom: null,
      created: t,
      modified: t,
      system: true
    },
    {
      id: DOCUMENTS,
      name: 'Tài liệu',
      originalName: 'Tài liệu',
      nameHistory: ['Tài liệu'],
      type: 'folder',
      parentId: ROOT,
      parent: ROOT,
      inTrash: false,
      createdBy: 'system',
      copiedFrom: null,
      movedBy: 'system',
      restored: false,
      previousParentId: null,
      deletedFrom: null,
      created: t,
      modified: t,
      system: true
    },
    {
      id: DOWNLOADS,
      name: 'Tải xuống',
      originalName: 'Tải xuống',
      nameHistory: ['Tải xuống'],
      type: 'folder',
      parentId: ROOT,
      parent: ROOT,
      inTrash: false,
      createdBy: 'system',
      copiedFrom: null,
      movedBy: 'system',
      restored: false,
      previousParentId: null,
      deletedFrom: null,
      created: t,
      modified: t,
      system: true
    },
    {
      id: PICTURES,
      name: 'Hình ảnh',
      originalName: 'Hình ảnh',
      nameHistory: ['Hình ảnh'],
      type: 'folder',
      parentId: ROOT,
      parent: ROOT,
      inTrash: false,
      createdBy: 'system',
      copiedFrom: null,
      movedBy: 'system',
      restored: false,
      previousParentId: null,
      deletedFrom: null,
      created: t,
      modified: t,
      system: true
    },
    {
      id: VIDEOS,
      name: 'Video',
      originalName: 'Video',
      nameHistory: ['Video'],
      type: 'folder',
      parentId: ROOT,
      parent: ROOT,
      inTrash: false,
      createdBy: 'system',
      copiedFrom: null,
      movedBy: 'system',
      restored: false,
      previousParentId: null,
      deletedFrom: null,
      created: t,
      modified: t,
      system: true
    },
    {
      id: RECYCLE,
      name: 'Recycle Bin',
      originalName: 'Recycle Bin',
      nameHistory: ['Recycle Bin'],
      type: 'folder',
      parentId: null,
      parent: null,
      inTrash: false,
      createdBy: 'system',
      copiedFrom: null,
      movedBy: 'system',
      restored: false,
      previousParentId: null,
      deletedFrom: null,
      created: t,
      modified: t,
      system: true
    }
  ];
}

export function makeNode(props) {
  const t = Date.now();
  const parent = props.parentId || props.parent || DESKTOP;
  const name = props.name || 'New Item';
  return {
    id: props.id || `node-${Math.random().toString(36).slice(2, 9)}`,
    name,
    originalName: props.originalName || name,
    nameHistory: props.nameHistory ? [...props.nameHistory] : [name],
    type: props.type || 'file', // 'folder' | 'file' | 'text'
    fileType: props.fileType || (props.type === 'folder' ? 'folder' : 'text'),
    parentId: parent,
    parent: parent,
    inTrash: parent === RECYCLE || !!props.inTrash,
    createdBy: props.createdBy || 'system',
    copiedFrom: props.copiedFrom || null,
    movedBy: props.movedBy || 'system',
    restored: !!props.restored,
    previousParentId: props.previousParentId || props.deletedFrom || null,
    deletedFrom: props.previousParentId || props.deletedFrom || null,
    content: props.content || '',
    created: props.created || t,
    modified: props.modified || t,
    system: !!props.system
  };
}

export const LEVELS = [
  // ==========================================
  // PHẦN A: CƠ BẢN — LÀM QUEN THAO TÁC (Bài 1 - 5)
  // ==========================================
  {
    id: 1,
    title: 'Mở thư mục Hình ảnh',
    difficulty: 'Cơ bản',
    badgeClass: 'badge-basic',
    description: 'Mở cửa sổ File Explorer hiển thị đúng bên trong thư mục Hình ảnh (Pictures).',
    hint: 'Nhấp đúp chuột vào biểu tượng "Hình ảnh" trên màn hình Desktop hoặc mở File Explorer và nhấp vào "Hình ảnh" ở thanh bên trái.',
    seed: () => {
      const nodes = createBaseSystemNodes();
      // Đặt thư mục Hình ảnh hiển thị trên Desktop để học sinh dễ mở
      const picturesNode = nodes.find(n => n.id === PICTURES);
      if (picturesNode) {
        picturesNode.parentId = DESKTOP;
        picturesNode.parent = DESKTOP;
      }
      return nodes;
    },
    goals: [
      {
        id: 'open_pictures_folder',
        text: 'Mở cửa sổ File Explorer bên trong thư mục "Hình ảnh"',
        evaluate: (state) => {
          return state.windows.some(
            (w) => w.app === 'explorer' && !w.minimized && (w.data?.folder === PICTURES || w.data?.folder === 'pictures')
          );
        }
      }
    ]
  },

  {
    id: 2,
    title: 'Tạo thư mục "Bài tập" trong "Học tập"',
    difficulty: 'Cơ bản',
    badgeClass: 'badge-basic',
    description: 'Mở thư mục "Học tập" trên màn hình Desktop và tạo một thư mục con mới tên là "Bài tập" bên trong đó.',
    hint: 'Nhấp đúp vào thư mục "Học tập" trên Desktop. Trong cửa sổ mở ra, bấm nút "＋ New" trên thanh lệnh hoặc bấm tổ hợp phím Ctrl + Shift + N, rồi gõ "Bài tập" và nhấn Enter.',
    seed: () => {
      const nodes = createBaseSystemNodes();
      nodes.push(
        makeNode({
          id: 'seed_hoctap_b2',
          name: 'Học tập',
          originalName: 'Học tập',
          type: 'folder',
          parentId: DESKTOP,
          createdBy: 'system'
        })
      );
      return nodes;
    },
    goals: [
      {
        id: 'open_hoctap',
        text: 'Mở thư mục "Học tập"',
        evaluate: (state) => {
          // Hoặc đang mở cửa sổ học tập, hoặc đã tạo được thư mục bên trong
          const isOpened = state.windows.some(
            (w) => w.app === 'explorer' && !w.minimized && w.data?.folder === 'seed_hoctap_b2'
          );
          const hasChild = state.nodes.some(
            (n) => n.parentId === 'seed_hoctap_b2' && n.type === 'folder'
          );
          return isOpened || hasChild;
        }
      },
      {
        id: 'create_baitap_folder',
        text: 'Tạo thư mục mới tên là "Bài tập" bên trong "Học tập"',
        evaluate: (state) => {
          return state.nodes.some(
            (n) =>
              n.type === 'folder' &&
              n.name.trim().toLowerCase() === 'bài tập' &&
              (n.parentId === 'seed_hoctap_b2' || n.parent === 'seed_hoctap_b2') &&
              !n.inTrash &&
              n.createdBy === 'user'
          );
        }
      }
    ]
  },

  {
    id: 3,
    title: 'Đổi tên "Thư mục mới" thành "Vở của em"',
    difficulty: 'Cơ bản',
    badgeClass: 'badge-basic',
    description: 'Sử dụng thao tác Đổi tên (Rename hoặc phím F2) để đổi tên thư mục có sẵn "Thư mục mới" thành "Vở của em".',
    hint: 'Nhấp chuột phải vào "Thư mục mới" chọn "✎ Rename" (hoặc chọn thư mục rồi ấn F2 trên bàn phím), gõ "Vở của em" và nhấn Enter. Không được xóa đi tạo lại!',
    seed: () => {
      const nodes = createBaseSystemNodes();
      nodes.push(
        makeNode({
          id: 'seed_folder_3',
          name: 'Thư mục mới',
          originalName: 'Thư mục mới',
          nameHistory: ['Thư mục mới'],
          type: 'folder',
          parentId: DESKTOP,
          createdBy: 'system'
        })
      );
      return nodes;
    },
    goals: [
      {
        id: 'rename_vo_cua_em',
        text: 'Đổi tên đúng thư mục "Thư mục mới" thành "Vở của em"',
        evaluate: (state) => {
          const n = state.nodes.find((x) => x.id === 'seed_folder_3');
          if (!n || n.inTrash) return false;
          const isTargetName = n.name.trim() === 'Vở của em';
          const hasHistory = Array.isArray(n.nameHistory) && n.nameHistory.includes('Thư mục mới');
          return isTargetName && hasHistory;
        }
      }
    ]
  },

  {
    id: 4,
    title: 'Đưa hai bức ảnh về thư mục "Hình ảnh"',
    difficulty: 'Cơ bản',
    badgeClass: 'badge-basic',
    description: 'Di chuyển cả 2 tệp ảnh "Phong_canh.png" và "Gia_dinh.jpg" từ màn hình Desktop vào trong thư mục "Hình ảnh".',
    hint: 'Kéo thả chuột từng tệp ảnh thả vào biểu tượng "Hình ảnh" trên Desktop, hoặc dùng chuột phải chọn Cắt (Cut / Ctrl+X) rồi Dán (Paste / Ctrl+V) vào thư mục "Hình ảnh".',
    seed: () => {
      const nodes = createBaseSystemNodes();
      const pic = nodes.find(n => n.id === PICTURES);
      if (pic) { pic.parentId = DESKTOP; pic.parent = DESKTOP; }
      nodes.push(
        makeNode({
          id: 'seed_img_1',
          name: 'Phong_canh.png',
          originalName: 'Phong_canh.png',
          type: 'file',
          fileType: 'image',
          parentId: DESKTOP,
          createdBy: 'system'
        }),
        makeNode({
          id: 'seed_img_2',
          name: 'Gia_dinh.jpg',
          originalName: 'Gia_dinh.jpg',
          type: 'file',
          fileType: 'image',
          parentId: DESKTOP,
          createdBy: 'system'
        })
      );
      return nodes;
    },
    goals: [
      {
        id: 'move_phong_canh',
        text: 'Di chuyển "Phong_canh.png" vào thư mục "Hình ảnh"',
        evaluate: (state) => {
          const n = state.nodes.find((x) => x.id === 'seed_img_1');
          return !!n && !n.inTrash && (n.parentId === PICTURES || n.parent === PICTURES);
        }
      },
      {
        id: 'move_gia_dinh',
        text: 'Di chuyển "Gia_dinh.jpg" vào thư mục "Hình ảnh"',
        evaluate: (state) => {
          const n = state.nodes.find((x) => x.id === 'seed_img_2');
          return !!n && !n.inTrash && (n.parentId === PICTURES || n.parent === PICTURES);
        }
      }
    ]
  },

  {
    id: 5,
    title: 'Đưa tệp video về thư mục "Video"',
    difficulty: 'Cơ bản',
    badgeClass: 'badge-basic',
    description: 'Di chuyển tệp "Bai_giang_Toan.mp4" từ Desktop vào trong thư mục "Video".',
    hint: 'Kéo tệp "Bai_giang_Toan.mp4" thả vào thư mục "Video", hoặc dùng phím tắt Ctrl+X để cắt và Ctrl+V để dán.',
    seed: () => {
      const nodes = createBaseSystemNodes();
      const vid = nodes.find(n => n.id === VIDEOS);
      if (vid) { vid.parentId = DESKTOP; vid.parent = DESKTOP; }
      nodes.push(
        makeNode({
          id: 'seed_video_1',
          name: 'Bai_giang_Toan.mp4',
          originalName: 'Bai_giang_Toan.mp4',
          type: 'file',
          fileType: 'video',
          parentId: DESKTOP,
          createdBy: 'system'
        })
      );
      return nodes;
    },
    goals: [
      {
        id: 'move_video_toan',
        text: 'Đưa tệp "Bai_giang_Toan.mp4" vào thư mục "Video"',
        evaluate: (state) => {
          const n = state.nodes.find((x) => x.id === 'seed_video_1');
          return !!n && !n.inTrash && (n.parentId === VIDEOS || n.parent === VIDEOS);
        }
      }
    ]
  },

  // ==========================================
  // PHẦN B: TRUNG BÌNH — QUẢN LÝ & PHƯƠNG THỨC THAO TÁC (Bài 6 - 10)
  // ==========================================
  {
    id: 6,
    title: 'Phân loại 8 tệp tin lộn xộn',
    difficulty: 'Trung bình',
    badgeClass: 'badge-intermediate',
    description: 'Phân loại 8 tệp tin trên Desktop vào đúng 3 thư mục: Hình ảnh (3 ảnh), Tài liệu (3 tài liệu), Video (2 video).',
    hint: 'Các tệp đuôi .jpg, .png đưa vào "Hình ảnh". Các tệp .docx, .pdf, .txt đưa vào "Tài liệu". Các tệp .mp4 đưa vào "Video".',
    seed: () => {
      const nodes = createBaseSystemNodes();
      const pic = nodes.find(n => n.id === PICTURES);
      if (pic) { pic.parentId = DESKTOP; pic.parent = DESKTOP; }
      const doc = nodes.find(n => n.id === DOCUMENTS);
      if (doc) { doc.parentId = DESKTOP; doc.parent = DESKTOP; }
      const vid = nodes.find(n => n.id === VIDEOS);
      if (vid) { vid.parentId = DESKTOP; vid.parent = DESKTOP; }

      // 3 ảnh
      nodes.push(
        makeNode({ id: 'b6_img1', name: 'Anh_1.jpg', type: 'file', fileType: 'image', parentId: DESKTOP }),
        makeNode({ id: 'b6_img2', name: 'Anh_2.png', type: 'file', fileType: 'image', parentId: DESKTOP }),
        makeNode({ id: 'b6_img3', name: 'Logo_truong.png', type: 'file', fileType: 'image', parentId: DESKTOP })
      );
      // 3 tài liệu
      nodes.push(
        makeNode({ id: 'b6_doc1', name: 'De_cuong.docx', type: 'file', fileType: 'doc', parentId: DESKTOP }),
        makeNode({ id: 'b6_doc2', name: 'Bai_tap.pdf', type: 'file', fileType: 'doc', parentId: DESKTOP }),
        makeNode({ id: 'b6_doc3', name: 'Ghi_chu.txt', type: 'file', fileType: 'text', parentId: DESKTOP })
      );
      // 2 video
      nodes.push(
        makeNode({ id: 'b6_vid1', name: 'Hoat_hinh.mp4', type: 'file', fileType: 'video', parentId: DESKTOP }),
        makeNode({ id: 'b6_vid2', name: 'Thuyet_trinh.mp4', type: 'file', fileType: 'video', parentId: DESKTOP })
      );
      return nodes;
    },
    goals: [
      {
        id: 'classify_images',
        text: 'Đưa đủ 3 ảnh vào thư mục "Hình ảnh"',
        evaluate: (state) => {
          return ['b6_img1', 'b6_img2', 'b6_img3'].every((id) => {
            const n = state.nodes.find((x) => x.id === id);
            return !!n && !n.inTrash && (n.parentId === PICTURES || n.parent === PICTURES);
          });
        }
      },
      {
        id: 'classify_docs',
        text: 'Đưa đủ 3 tài liệu vào thư mục "Tài liệu"',
        evaluate: (state) => {
          return ['b6_doc1', 'b6_doc2', 'b6_doc3'].every((id) => {
            const n = state.nodes.find((x) => x.id === id);
            return !!n && !n.inTrash && (n.parentId === DOCUMENTS || n.parent === DOCUMENTS);
          });
        }
      },
      {
        id: 'classify_videos',
        text: 'Đưa đủ 2 video vào thư mục "Video"',
        evaluate: (state) => {
          return ['b6_vid1', 'b6_vid2'].every((id) => {
            const n = state.nodes.find((x) => x.id === id);
            return !!n && !n.inTrash && (n.parentId === VIDEOS || n.parent === VIDEOS);
          });
        }
      }
    ]
  },

  {
    id: 7,
    title: 'Sao chép (Copy) ảnh "Hoa" sang "Hình ảnh"',
    difficulty: 'Trung bình',
    badgeClass: 'badge-intermediate',
    description: 'Sao chép (Copy -> Paste) tệp "Hoa.png" từ thư mục "Học tập" sang thư mục "Hình ảnh" sao cho bản gốc vẫn còn.',
    hint: 'Mở thư mục "Học tập", nhấp chuột phải vào "Hoa.png" chọn Copy (Ctrl+C). Sau đó mở thư mục "Hình ảnh" và chọn Paste (Ctrl+V).',
    seed: () => {
      const nodes = createBaseSystemNodes();
      const pic = nodes.find(n => n.id === PICTURES);
      if (pic) { pic.parentId = DESKTOP; pic.parent = DESKTOP; }
      nodes.push(
        makeNode({
          id: 'seed_b7_hoctap',
          name: 'Học tập',
          type: 'folder',
          parentId: DESKTOP
        }),
        makeNode({
          id: 'seed_hoa_img',
          name: 'Hoa.png',
          originalName: 'Hoa.png',
          type: 'file',
          fileType: 'image',
          parentId: 'seed_b7_hoctap'
        })
      );
      return nodes;
    },
    goals: [
      {
        id: 'keep_original_hoa',
        text: 'Giữ nguyên bản gốc "Hoa.png" trong thư mục "Học tập"',
        evaluate: (state) => {
          const n = state.nodes.find((x) => x.id === 'seed_hoa_img');
          return !!n && !n.inTrash && (n.parentId === 'seed_b7_hoctap' || n.parent === 'seed_b7_hoctap');
        }
      },
      {
        id: 'copy_hoa_to_pictures',
        text: 'Tạo bản sao "Hoa.png" bằng lệnh Copy vào "Hình ảnh"',
        evaluate: (state) => {
          return state.nodes.some(
            (n) =>
              n.id !== 'seed_hoa_img' &&
              n.name === 'Hoa.png' &&
              (n.parentId === PICTURES || n.parent === PICTURES) &&
              !n.inTrash &&
              n.copiedFrom === 'seed_hoa_img'
          );
        }
      }
    ]
  },

  {
    id: 8,
    title: 'Kéo thả (Drag & Drop) tệp "Bài tập.docx" vào "Tài liệu"',
    difficulty: 'Trung bình',
    badgeClass: 'badge-intermediate',
    description: 'Bắt buộc sử dụng thao tác Kéo & Thả chuột (Drag & Drop) để đưa tệp "Bài tập.docx" vào thư mục "Tài liệu".',
    hint: 'Nhấn giữ chuột trái vào biểu tượng "Bài tập.docx", kéo và thả chuột lên trên thư mục "Tài liệu". Không dùng lệnh Cut/Paste.',
    seed: () => {
      const nodes = createBaseSystemNodes();
      const doc = nodes.find(n => n.id === DOCUMENTS);
      if (doc) { doc.parentId = DESKTOP; doc.parent = DESKTOP; }
      nodes.push(
        makeNode({
          id: 'seed_baitap_doc',
          name: 'Bài tập.docx',
          originalName: 'Bài tập.docx',
          type: 'file',
          fileType: 'doc',
          parentId: DESKTOP
        })
      );
      return nodes;
    },
    goals: [
      {
        id: 'drag_baitap_doc',
        text: 'Dùng thao tác Kéo & Thả chuột (Drag & Drop) tệp vào "Tài liệu"',
        evaluate: (state) => {
          const n = state.nodes.find((x) => x.id === 'seed_baitap_doc');
          return (
            !!n &&
            !n.inTrash &&
            (n.parentId === DOCUMENTS || n.parent === DOCUMENTS) &&
            n.movedBy === 'drag'
          );
        }
      }
    ]
  },

  {
    id: 9,
    title: 'Xóa và Khôi phục (Restore) tệp "Bài hát" từ Thùng rác',
    difficulty: 'Trung bình',
    badgeClass: 'badge-intermediate',
    description: 'Xóa tệp "Bài hát.mp3" vào Recycle Bin, sau đó mở Recycle Bin và khôi phục (Restore) tệp trở lại màn hình Desktop.',
    hint: 'Nhấp chuột phải vào "Bài hát.mp3" chọn Delete (hoặc phím Delete). Sau đó mở "Recycle Bin", chọn tệp "Bài hát.mp3" và bấm nút "Restore" trên thanh công cụ.',
    seed: () => {
      const nodes = createBaseSystemNodes();
      nodes.push(
        makeNode({
          id: 'seed_song_mp3',
          name: 'Bài hát.mp3',
          originalName: 'Bài hát.mp3',
          type: 'file',
          fileType: 'audio',
          parentId: DESKTOP,
          inTrash: false
        })
      );
      return nodes;
    },
    goals: [
      {
        id: 'trash_song',
        text: 'Bước 1: Xóa tệp "Bài hát.mp3" vào Recycle Bin',
        evaluate: (state) => {
          const n = state.nodes.find((x) => x.id === 'seed_song_mp3');
          return !!n && (n.inTrash || n.restored || !!n.previousParentId || !!n.deletedFrom);
        }
      },
      {
        id: 'restore_song',
        text: 'Bước 2: Mở Recycle Bin và Khôi phục (Restore) tệp về Desktop',
        evaluate: (state) => {
          const n = state.nodes.find((x) => x.id === 'seed_song_mp3');
          return (
            !!n &&
            !n.inTrash &&
            (n.parentId === DESKTOP || n.parent === DESKTOP) &&
            n.restored === true
          );
        }
      }
    ]
  },

  {
    id: 10,
    title: 'Chuỗi thao tác tổng hợp (Tạo ➔ Đổi tên ➔ Phân loại)',
    difficulty: 'Trung bình',
    badgeClass: 'badge-intermediate',
    description: 'Tạo thư mục "Bài tập" trên Desktop, đổi tên thành "Góc học tập", đưa 2 tài liệu vào đó và đưa 2 ảnh vào "Hình ảnh".',
    hint: 'Bước 1: Nhấp chuột phải vào màn hình Desktop -> New folder -> gõ tên "Bài tập". Bước 2: Nhấn F2 đổi tên thành "Góc học tập". Bước 3: Di chuyển Toan_hoc.docx và Tieng_Viet.txt vào "Góc học tập". Bước 4: Di chuyển 2 bức ảnh vào "Hình ảnh".',
    seed: () => {
      const nodes = createBaseSystemNodes();
      const pic = nodes.find(n => n.id === PICTURES);
      if (pic) { pic.parentId = DESKTOP; pic.parent = DESKTOP; }
      nodes.push(
        makeNode({ id: 'b10_doc1', name: 'Toan_hoc.docx', type: 'file', fileType: 'doc', parentId: DESKTOP }),
        makeNode({ id: 'b10_doc2', name: 'Tieng_Viet.txt', type: 'file', fileType: 'text', parentId: DESKTOP }),
        makeNode({ id: 'b10_img1', name: 'Truong_em.jpg', type: 'file', fileType: 'image', parentId: DESKTOP }),
        makeNode({ id: 'b10_img2', name: 'Lop_hoc.png', type: 'file', fileType: 'image', parentId: DESKTOP })
      );
      return nodes;
    },
    goals: [
      {
        id: 'create_and_rename_goc_hoc_tap',
        text: 'Tạo thư mục "Bài tập" rồi đổi tên thành "Góc học tập"',
        evaluate: (state) => {
          const folder = state.nodes.find(
            (n) =>
              n.type === 'folder' &&
              n.name === 'Góc học tập' &&
              (n.parentId === DESKTOP || n.parent === DESKTOP) &&
              !n.inTrash &&
              n.createdBy === 'user'
          );
          return (
            !!folder &&
            Array.isArray(folder.nameHistory) &&
            folder.nameHistory.some((h) => h.toLowerCase() === 'bài tập')
          );
        }
      },
      {
        id: 'move_docs_to_goc_hoc_tap',
        text: 'Đưa 2 tệp tài liệu vào "Góc học tập"',
        evaluate: (state) => {
          const folder = state.nodes.find(
            (n) =>
              n.type === 'folder' &&
              n.name === 'Góc học tập' &&
              (n.parentId === DESKTOP || n.parent === DESKTOP) &&
              !n.inTrash
          );
          if (!folder) return false;
          return ['b10_doc1', 'b10_doc2'].every((id) => {
            const n = state.nodes.find((x) => x.id === id);
            return !!n && !n.inTrash && (n.parentId === folder.id || n.parent === folder.id);
          });
        }
      },
      {
        id: 'move_images_to_pictures',
        text: 'Đưa 2 tệp ảnh vào "Hình ảnh"',
        evaluate: (state) => {
          return ['b10_img1', 'b10_img2'].every((id) => {
            const n = state.nodes.find((x) => x.id === id);
            return !!n && !n.inTrash && (n.parentId === PICTURES || n.parent === PICTURES);
          });
        }
      }
    ]
  },

  // ==========================================
  // PHẦN C: NÂNG CAO — TƯ DUY TỔ CHỨC & ỨNG DỤNG THỰC TẾ (Bài 11 - 15)
  // ==========================================
  {
    id: 11,
    title: 'Tổ chức cây thư mục đa cấp (Nested Folders)',
    difficulty: 'Nâng cao',
    badgeClass: 'badge-advanced',
    description: 'Bên trong thư mục "Học tập", tạo 2 thư mục con "Môn Toán" và "Môn Tin". Phân loại các tệp tương ứng vào từng môn.',
    hint: 'Mở thư mục "Học tập", tạo 2 thư mục con: "Môn Toán" và "Môn Tin". Sau đó di chuyển các tệp có chữ "Toan" vào "Môn Toán", các tệp có chữ "Tin" vào "Môn Tin".',
    seed: () => {
      const nodes = createBaseSystemNodes();
      nodes.push(
        makeNode({ id: 'seed_b11_hoctap', name: 'Học tập', type: 'folder', parentId: DESKTOP }),
        makeNode({ id: 'b11_f1', name: 'Bai_1_Toan.docx', type: 'file', fileType: 'doc', parentId: 'seed_b11_hoctap' }),
        makeNode({ id: 'b11_f2', name: 'Hinh_ve_Toan.png', type: 'file', fileType: 'image', parentId: 'seed_b11_hoctap' }),
        makeNode({ id: 'b11_f3', name: 'Bai_1_Tin.docx', type: 'file', fileType: 'doc', parentId: 'seed_b11_hoctap' }),
        makeNode({ id: 'b11_f4', name: 'Thuc_hanh_Tin.txt', type: 'file', fileType: 'text', parentId: 'seed_b11_hoctap' })
      );
      return nodes;
    },
    goals: [
      {
        id: 'create_subfolders',
        text: 'Tạo 2 thư mục "Môn Toán" và "Môn Tin" bên trong "Học tập"',
        evaluate: (state) => {
          const mToan = state.nodes.find(
            (n) =>
              n.type === 'folder' &&
              (n.parentId === 'seed_b11_hoctap' || n.parent === 'seed_b11_hoctap') &&
              n.name.trim().toLowerCase() === 'môn toán' &&
              !n.inTrash
          );
          const mTin = state.nodes.find(
            (n) =>
              n.type === 'folder' &&
              (n.parentId === 'seed_b11_hoctap' || n.parent === 'seed_b11_hoctap') &&
              n.name.trim().toLowerCase() === 'môn tin' &&
              !n.inTrash
          );
          return !!(mToan && mTin);
        }
      },
      {
        id: 'move_toan_files',
        text: 'Đưa 2 tệp Toán vào thư mục "Môn Toán"',
        evaluate: (state) => {
          const mToan = state.nodes.find(
            (n) =>
              n.type === 'folder' &&
              (n.parentId === 'seed_b11_hoctap' || n.parent === 'seed_b11_hoctap') &&
              n.name.trim().toLowerCase() === 'môn toán' &&
              !n.inTrash
          );
          if (!mToan) return false;
          return ['b11_f1', 'b11_f2'].every((id) => {
            const n = state.nodes.find((x) => x.id === id);
            return !!n && !n.inTrash && (n.parentId === mToan.id || n.parent === mToan.id);
          });
        }
      },
      {
        id: 'move_tin_files',
        text: 'Đưa 2 tệp Tin vào thư mục "Môn Tin"',
        evaluate: (state) => {
          const mTin = state.nodes.find(
            (n) =>
              n.type === 'folder' &&
              (n.parentId === 'seed_b11_hoctap' || n.parent === 'seed_b11_hoctap') &&
              n.name.trim().toLowerCase() === 'môn tin' &&
              !n.inTrash
          );
          if (!mTin) return false;
          return ['b11_f3', 'b11_f4'].every((id) => {
            const n = state.nodes.find((x) => x.id === id);
            return !!n && !n.inTrash && (n.parentId === mTin.id || n.parent === mTin.id);
          });
        }
      }
    ]
  },

  {
    id: 12,
    title: 'Soạn thảo văn bản với Notepad và lưu đúng thư mục',
    difficulty: 'Nâng cao',
    badgeClass: 'badge-advanced',
    description: 'Mở ứng dụng Notepad, gõ ít nhất một dòng nội dung bất kỳ và lưu tệp với tên "Ghi_chu.txt" vào thư mục "Góc học tập".',
    hint: 'Nhấp biểu tượng Notepad trên thanh Taskbar hoặc Start Menu. Gõ nội dung bài làm của em. Bấm nút "Save as" (hoặc Ctrl+S), chọn thư mục "Góc học tập" và nhập tên "Ghi_chu.txt".',
    seed: () => {
      const nodes = createBaseSystemNodes();
      nodes.push(
        makeNode({
          id: 'seed_b12_gochoctap',
          name: 'Góc học tập',
          type: 'folder',
          parentId: DESKTOP
        })
      );
      return nodes;
    },
    goals: [
      {
        id: 'type_content',
        text: 'Tạo hoặc soạn thảo tệp văn bản có nội dung (không để trống)',
        evaluate: (state) => {
          return state.nodes.some(
            (n) =>
              (n.type === 'text' || n.type === 'file') &&
              !n.inTrash &&
              (n.content || '').trim().length > 0 &&
              (n.name.toLowerCase() === 'ghi_chu.txt' || n.name.toLowerCase() === 'ghi_chu')
          );
        }
      },
      {
        id: 'save_to_gochoctap',
        text: 'Lưu tệp "Ghi_chu.txt" bên trong thư mục "Góc học tập"',
        evaluate: (state) => {
          return state.nodes.some(
            (n) =>
              (n.type === 'text' || n.type === 'file') &&
              (n.parentId === 'seed_b12_gochoctap' || n.parent === 'seed_b12_gochoctap') &&
              !n.inTrash &&
              (n.name.toLowerCase() === 'ghi_chu.txt' || n.name.toLowerCase() === 'ghi_chu') &&
              (n.content || '').trim().length > 0
          );
        }
      }
    ]
  },

  {
    id: 13,
    title: 'Tạo bản sao lưu (Backup) và đổi tên bản sao',
    difficulty: 'Nâng cao',
    badgeClass: 'badge-advanced',
    description: 'Sao chép "Danh_sach_lop.txt" từ "Tài liệu" sang "Sao lưu", sau đó đổi tên bản sao thành "Danh_sach_lop_du_phong.txt".',
    hint: 'Mở thư mục "Tài liệu". Nhấp chuột phải vào "Danh_sach_lop.txt" chọn Copy. Mở thư mục "Sao lưu", chọn Paste. Sau đó nhấn F2 trên bản sao và đổi tên thành "Danh_sach_lop_du_phong.txt".',
    seed: () => {
      const nodes = createBaseSystemNodes();
      const doc = nodes.find(n => n.id === DOCUMENTS);
      if (doc) { doc.parentId = DESKTOP; doc.parent = DESKTOP; }
      nodes.push(
        makeNode({
          id: 'seed_dslop',
          name: 'Danh_sach_lop.txt',
          originalName: 'Danh_sach_lop.txt',
          type: 'file',
          fileType: 'text',
          parentId: DOCUMENTS,
          content: '1. Nguyễn Văn A\n2. Trần Thị B\n3. Lê Văn C'
        }),
        makeNode({
          id: 'seed_saoluu',
          name: 'Sao lưu',
          originalName: 'Sao lưu',
          type: 'folder',
          parentId: DOCUMENTS
        })
      );
      return nodes;
    },
    goals: [
      {
        id: 'keep_original_dslop',
        text: 'Bản gốc "Danh_sach_lop.txt" vẫn giữ nguyên trong "Tài liệu"',
        evaluate: (state) => {
          const n = state.nodes.find((x) => x.id === 'seed_dslop');
          return !!n && !n.inTrash && (n.parentId === DOCUMENTS || n.parent === DOCUMENTS) && n.name === 'Danh_sach_lop.txt';
        }
      },
      {
        id: 'backup_and_rename',
        text: 'Sao chép vào "Sao lưu" và đổi tên thành "Danh_sach_lop_du_phong.txt"',
        evaluate: (state) => {
          return state.nodes.some(
            (n) =>
              n.id !== 'seed_dslop' &&
              (n.parentId === 'seed_saoluu' || n.parent === 'seed_saoluu') &&
              !n.inTrash &&
              n.copiedFrom === 'seed_dslop' &&
              n.name === 'Danh_sach_lop_du_phong.txt' &&
              Array.isArray(n.nameHistory) &&
              n.nameHistory.includes('Danh_sach_lop.txt')
          );
        }
      }
    ]
  },

  {
    id: 14,
    title: 'Giải cứu tệp xóa nhầm & Dọn sạch Thùng rác',
    difficulty: 'Nâng cao',
    badgeClass: 'badge-advanced',
    description: 'Khôi phục "De_thi_hoc_ky.docx" từ Thùng rác về "Tài liệu", xóa tệp rác "tam_thoi.tmp" và dọn sạch Thùng rác (Empty Recycle Bin).',
    hint: 'Mở Recycle Bin -> chọn "De_thi_hoc_ky.docx" -> bấm Restore. Ra ngoài Desktop, xóa tệp "tam_thoi.tmp". Cuối cùng, vào Recycle Bin bấm nút "Empty Recycle Bin" (Dọn sạch thùng rác).',
    seed: () => {
      const nodes = createBaseSystemNodes();
      const doc = nodes.find(n => n.id === DOCUMENTS);
      if (doc) { doc.parentId = DESKTOP; doc.parent = DESKTOP; }
      nodes.push(
        // Tệp quan trọng bị xóa nhầm nằm trong Thùng rác
        makeNode({
          id: 'seed_dethi',
          name: 'De_thi_hoc_ky.docx',
          originalName: 'De_thi_hoc_ky.docx',
          type: 'file',
          fileType: 'doc',
          parentId: RECYCLE,
          inTrash: true,
          previousParentId: DOCUMENTS,
          deletedFrom: DOCUMENTS
        }),
        // 3 tệp rác trong thùng rác
        makeNode({ id: 'seed_rac1', name: 'rac_01.tmp', type: 'file', fileType: 'junk', parentId: RECYCLE, inTrash: true }),
        makeNode({ id: 'seed_rac2', name: 'rac_02.tmp', type: 'file', fileType: 'junk', parentId: RECYCLE, inTrash: true }),
        makeNode({ id: 'seed_qc', name: 'quang_cao.txt', type: 'file', fileType: 'junk', parentId: RECYCLE, inTrash: true }),
        // 1 tệp rác còn trên desktop
        makeNode({ id: 'seed_tamthoi', name: 'tam_thoi.tmp', type: 'file', fileType: 'junk', parentId: DESKTOP, inTrash: false })
      );
      return nodes;
    },
    goals: [
      {
        id: 'restore_dethi',
        text: 'Khôi phục "De_thi_hoc_ky.docx" về thư mục "Tài liệu"',
        evaluate: (state) => {
          const n = state.nodes.find((x) => x.id === 'seed_dethi');
          return (
            !!n &&
            !n.inTrash &&
            n.restored === true &&
            (n.parentId === DOCUMENTS || n.parent === DOCUMENTS)
          );
        }
      },
      {
        id: 'trash_tamthoi',
        text: 'Xóa tệp rác "tam_thoi.tmp" trên Desktop vào Thùng rác',
        evaluate: (state) => {
          const n = state.nodes.find((x) => x.id === 'seed_tamthoi');
          return !n || n.inTrash || n.parentId === RECYCLE || n.parent === RECYCLE;
        }
      },
      {
        id: 'empty_recycle_bin',
        text: 'Dọn sạch Thùng rác (Empty Recycle Bin) xóa vĩnh viễn tệp rác',
        evaluate: (state) => {
          const junkIds = ['seed_rac1', 'seed_rac2', 'seed_qc', 'seed_tamthoi'];
          const anyJunkLeft = state.nodes.some((n) => junkIds.includes(n.id));
          const trashItems = state.nodes.filter(
            (n) => (n.parentId === RECYCLE || n.parent === RECYCLE || n.inTrash) && !n.system
          );
          return !anyJunkLeft && trashItems.length === 0;
        }
      }
    ]
  },

  {
    id: 15,
    title: 'Thử thách Tổng hợp — Dọn dẹp Máy tính Cuối tuần',
    difficulty: 'Nâng cao',
    badgeClass: 'badge-advanced',
    description: 'Thử thách Master kết hợp 5 kỹ năng: Đổi tên, Kéo thả, Sao chép & Di chuyển, Khôi phục từ Thùng rác, và Dọn sạch Thùng rác.',
    hint: '1. Đổi tên thư mục "Chưa đặt tên" thành "Dự án nhóm".\n2. Kéo thả (Drag) "Ke_hoach.docx" vào "Dự án nhóm".\n3. Copy "Anh_bia.png" vào "Dự án nhóm", rồi di chuyển bản gốc về "Hình ảnh".\n4. Mở Recycle Bin khôi phục "Bai_thuyet_trinh.mp4" rồi chuyển về "Video".\n5. Dọn sạch Thùng rác (Empty Recycle Bin).',
    seed: () => {
      const nodes = createBaseSystemNodes();
      const pic = nodes.find(n => n.id === PICTURES);
      if (pic) { pic.parentId = DESKTOP; pic.parent = DESKTOP; }
      const vid = nodes.find(n => n.id === VIDEOS);
      if (vid) { vid.parentId = DESKTOP; vid.parent = DESKTOP; }
      nodes.push(
        // Desktop items
        makeNode({
          id: 'seed_b15_chuadatten',
          name: 'Chưa đặt tên',
          originalName: 'Chưa đặt tên',
          nameHistory: ['Chưa đặt tên'],
          type: 'folder',
          parentId: DESKTOP
        }),
        makeNode({
          id: 'seed_b15_kehoach',
          name: 'Ke_hoach.docx',
          originalName: 'Ke_hoach.docx',
          type: 'file',
          fileType: 'doc',
          parentId: DESKTOP
        }),
        makeNode({
          id: 'seed_b15_anhbia',
          name: 'Anh_bia.png',
          originalName: 'Anh_bia.png',
          type: 'file',
          fileType: 'image',
          parentId: DESKTOP
        }),
        makeNode({
          id: 'seed_b15_tam1',
          name: 'tam_01.tmp',
          type: 'file',
          fileType: 'junk',
          parentId: DESKTOP
        }),
        makeNode({
          id: 'seed_b15_tam2',
          name: 'tam_02.tmp',
          type: 'file',
          fileType: 'junk',
          parentId: DESKTOP
        }),
        // In Recycle Bin
        makeNode({
          id: 'seed_b15_thuyettrinh',
          name: 'Bai_thuyet_trinh.mp4',
          originalName: 'Bai_thuyet_trinh.mp4',
          type: 'file',
          fileType: 'video',
          parentId: RECYCLE,
          inTrash: true,
          previousParentId: DESKTOP,
          deletedFrom: DESKTOP
        }),
        makeNode({
          id: 'seed_b15_raccu',
          name: 'rac_cu.tmp',
          type: 'file',
          fileType: 'junk',
          parentId: RECYCLE,
          inTrash: true
        })
      );
      return nodes;
    },
    goals: [
      {
        id: 'rename_du_an_nhom',
        text: '1. Đổi tên thư mục "Chưa đặt tên" thành "Dự án nhóm"',
        evaluate: (state) => {
          const n = state.nodes.find((x) => x.id === 'seed_b15_chuadatten');
          return (
            !!n &&
            !n.inTrash &&
            n.name === 'Dự án nhóm' &&
            Array.isArray(n.nameHistory) &&
            n.nameHistory.includes('Chưa đặt tên')
          );
        }
      },
      {
        id: 'drag_ke_hoach',
        text: '2. Kéo thả (Drag) tệp "Ke_hoach.docx" vào "Dự án nhóm"',
        evaluate: (state) => {
          const n = state.nodes.find((x) => x.id === 'seed_b15_kehoach');
          return (
            !!n &&
            !n.inTrash &&
            (n.parentId === 'seed_b15_chuadatten' || n.parent === 'seed_b15_chuadatten') &&
            n.movedBy === 'drag'
          );
        }
      },
      {
        id: 'copy_and_move_anh_bia',
        text: '3. Copy "Anh_bia.png" vào "Dự án nhóm" và đưa bản gốc về "Hình ảnh"',
        evaluate: (state) => {
          const copy = state.nodes.find(
            (n) =>
              n.copiedFrom === 'seed_b15_anhbia' &&
              (n.parentId === 'seed_b15_chuadatten' || n.parent === 'seed_b15_chuadatten') &&
              !n.inTrash &&
              n.name === 'Anh_bia.png'
          );
          const orig = state.nodes.find((n) => n.id === 'seed_b15_anhbia');
          return (
            !!copy &&
            !!orig &&
            !orig.inTrash &&
            (orig.parentId === PICTURES || orig.parent === PICTURES)
          );
        }
      },
      {
        id: 'restore_thuyet_trinh',
        text: '4. Khôi phục "Bai_thuyet_trinh.mp4" từ Thùng rác rồi chuyển về "Video"',
        evaluate: (state) => {
          const n = state.nodes.find((x) => x.id === 'seed_b15_thuyettrinh');
          return (
            !!n &&
            !n.inTrash &&
            n.restored === true &&
            (n.parentId === VIDEOS || n.parent === VIDEOS)
          );
        }
      },
      {
        id: 'clean_recycle_bin',
        text: '5. Dọn sạch toàn bộ Thùng rác (Empty Recycle Bin)',
        evaluate: (state) => {
          const inTrash = state.nodes.filter(
            (n) => (n.parentId === RECYCLE || n.parent === RECYCLE || n.inTrash) && !n.system
          );
          return inTrash.length === 0;
        }
      }
    ]
  }
];

export function evaluateSimulationGoals(state, level) {
  if (!level || !Array.isArray(level.goals)) {
    return { completed: false, progress: 0, goals: [] };
  }
  const evaluated = level.goals.map((g) => ({
    id: g.id,
    text: g.text,
    passed: !!g.evaluate(state)
  }));
  const passedCount = evaluated.filter((g) => g.passed).length;
  const progress = Math.round((passedCount / evaluated.length) * 100);
  const completed = passedCount === evaluated.length;
  return { completed, progress, goals: evaluated };
}

const STORAGE_KEY = 'windows-sim-practice-v2';

export function loadPracticeState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { currentLevel: 1, completedLevels: [], practiceMode: true };
    }
    const parsed = JSON.parse(raw);
    return {
      currentLevel: Math.max(1, Math.min(15, Number(parsed.currentLevel) || 1)),
      completedLevels: Array.isArray(parsed.completedLevels) ? parsed.completedLevels : [],
      practiceMode: parsed.practiceMode !== false
    };
  } catch {
    return { currentLevel: 1, completedLevels: [], practiceMode: true };
  }
}

export function savePracticeState(practiceState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(practiceState));
  } catch (err) {
    console.error('Failed to save practice state', err);
  }
}

export function resetAllPractice() {
  const fresh = { currentLevel: 1, completedLevels: [], practiceMode: true };
  savePracticeState(fresh);
  return fresh;
}
