// WebCraft Learner Profile & Graduation Certificate Controller (with Local Photo Upload & Official Seal)
document.addEventListener('DOMContentLoaded', () => {
  WebCraftApp.init('profile');

  const profileAvatarEl = document.getElementById('profileAvatarDisplay');
  const profileNameEl = document.getElementById('profileNameDisplay');
  const profileLevelTitleEl = document.getElementById('profileLevelTitle');
  const profileJoinedDateEl = document.getElementById('profileJoinedDate');
  const overallProgressPercentEl = document.getElementById('overallProgressPercent');
  const overallProgressBarEl = document.getElementById('overallProgressBar');

  // Breakdown progress bars
  const htmlProgFill = document.getElementById('htmlProgressFill');
  const htmlProgText = document.getElementById('htmlProgressText');
  const cssProgFill = document.getElementById('cssProgressFill');
  const cssProgText = document.getElementById('cssProgressText');
  const jsProgFill = document.getElementById('jsProgressFill');
  const jsProgText = document.getElementById('jsProgressText');

  // Edit Profile Elements
  const editProfileBtn = document.getElementById('editProfileBtn');
  const editModal = document.getElementById('editProfileModal');
  const editNameInput = document.getElementById('editNameInput');
  const saveProfileBtn = document.getElementById('saveProfileBtn');
  const cancelProfileBtn = document.getElementById('cancelProfileBtn');
  const avatarButtons = document.querySelectorAll('.avatar-select-btn');
  
  // File Upload Elements (Laptop Files / Mobile Gallery)
  const avatarFileInput = document.getElementById('avatarFileInput');
  const uploadPhotoBtn = document.getElementById('uploadPhotoBtn');
  const removePhotoBtn = document.getElementById('removePhotoBtn');
  const photoPreviewWrap = document.getElementById('photoPreviewWrap');
  const photoPreviewImg = document.getElementById('photoPreviewImg');

  // Certificate Elements
  const printCertBtn = document.getElementById('printCertBtn');
  const certNameEl = document.getElementById('certName');
  const certDateEl = document.getElementById('certDate');
  const certIdEl = document.getElementById('certId');
  const certAvatarEl = document.getElementById('certAvatarPhoto');

  let chosenAvatar = 'WC';
  let uploadedPhotoBase64 = null;

  function renderProfile() {
    const stats = WebCraftStorage.getStats();
    const user = stats.user;

    // Render Avatar Display on Profile Card
    if (user.photo) {
      profileAvatarEl.innerHTML = `<img src="${user.photo}" alt="${escapeHtml(user.name)}" style="width:100%; height:100%; object-fit:cover; border-radius:50%;" />`;
    } else {
      profileAvatarEl.innerHTML = `<span style="font-size:24px; font-weight:800; color:#2563EB;">${user.avatar || 'WC'}</span>`;
    }

    profileNameEl.innerText = user.name || 'Web Explorer';
    profileLevelTitleEl.innerText = `Level ${stats.level.currentLevel}: ${stats.level.title}`;
    profileJoinedDateEl.innerText = `Member since ${user.joinedDate || '2026'}`;

    overallProgressPercentEl.innerText = `${stats.overallPercentage}% Complete`;
    overallProgressBarEl.style.width = `${stats.overallPercentage}%`;

    // Category bars
    const htmlPercent = Math.round((stats.htmlLessonsCount / 10) * 100);
    htmlProgFill.style.width = `${htmlPercent}%`;
    htmlProgText.innerText = `${stats.htmlLessonsCount} / 10 Modules (${htmlPercent}%)`;

    const cssPercent = Math.round((stats.cssLessonsCount / 10) * 100);
    cssProgFill.style.width = `${cssPercent}%`;
    cssProgText.innerText = `${stats.cssLessonsCount} / 10 Modules (${cssPercent}%)`;

    const jsPercent = Math.round((stats.jsLessonsCount / 12) * 100);
    jsProgFill.style.width = `${jsPercent}%`;
    jsProgText.innerText = `${stats.jsLessonsCount} / 12 Modules (${jsPercent}%)`;

    // Render Official Certificate Data
    if (certNameEl) certNameEl.innerText = user.name || 'Web Explorer';
    if (certDateEl) certDateEl.innerText = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    if (certIdEl) certIdEl.innerText = user.certId || 'WC-2026-0814';

    // Certificate Avatar Photo
    if (certAvatarEl) {
      if (user.photo) {
        certAvatarEl.innerHTML = `<img src="${user.photo}" alt="${escapeHtml(user.name)}" style="width:100%; height:100%; object-fit:cover; border-radius:50%;" />`;
      } else {
        certAvatarEl.innerHTML = `<span style="font-weight:800; color:#2563EB; font-size:16px;">${user.avatar || 'WC'}</span>`;
      }
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // Compress image before saving to localStorage (<40KB)
  function compressImage(file, callback) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement('canvas');
        const maxSize = 180;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxSize) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        callback(dataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  // Open edit modal
  editProfileBtn?.addEventListener('click', () => {
    const user = WebCraftStorage.getUser();
    editNameInput.value = user.name;
    chosenAvatar = user.avatar || 'WC';
    uploadedPhotoBase64 = user.photo || null;

    if (uploadedPhotoBase64) {
      photoPreviewImg.src = uploadedPhotoBase64;
      photoPreviewWrap.style.display = 'block';
    } else {
      photoPreviewWrap.style.display = 'none';
    }

    avatarButtons.forEach(btn => {
      btn.style.border = btn.getAttribute('data-avatar') === chosenAvatar ? '2px solid var(--primary-blue)' : '1.5px solid var(--border-light)';
    });

    editModal.classList.add('active');
    WebCraftAudio.click();
  });

  // Photo Upload Trigger (Works on both Laptop File System & Mobile Gallery/Camera)
  uploadPhotoBtn?.addEventListener('click', () => {
    avatarFileInput.click();
  });

  avatarFileInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert("Please select a valid image file.");
        return;
      }
      compressImage(file, (base64) => {
        uploadedPhotoBase64 = base64;
        photoPreviewImg.src = base64;
        photoPreviewWrap.style.display = 'block';
        WebCraftAudio.success();
      });
    }
  });

  removePhotoBtn?.addEventListener('click', () => {
    uploadedPhotoBase64 = null;
    photoPreviewWrap.style.display = 'none';
    avatarFileInput.value = '';
    WebCraftAudio.click();
  });

  avatarButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      chosenAvatar = btn.getAttribute('data-avatar');
      avatarButtons.forEach(b => b.style.border = '1.5px solid var(--border-light)');
      btn.style.border = '2px solid var(--primary-blue)';
      WebCraftAudio.click();
    });
  });

  saveProfileBtn?.addEventListener('click', () => {
    const newName = editNameInput.value.trim();
    if (!newName || newName.length < 2) {
      alert("Please enter a valid name (at least 2 characters).");
      return;
    }
    WebCraftStorage.setUser({
      name: newName,
      avatar: chosenAvatar,
      photo: uploadedPhotoBase64
    });
    editModal.classList.remove('active');
    renderProfile();
    WebCraftApp.updateStats();
    WebCraftApp.toast('Profile & Certificate updated successfully!', 'success', 'check');
    WebCraftAudio.success();
  });

  cancelProfileBtn?.addEventListener('click', () => {
    editModal.classList.remove('active');
  });

  // Print Certificate as PDF
  printCertBtn?.addEventListener('click', () => {
    WebCraftAudio.success();
    window.print();
  });

  renderProfile();
});
