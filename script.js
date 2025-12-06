// small utility script for years, modal preview, smooth anchor behavior
document.addEventListener('DOMContentLoaded', () => {
  // set year placeholders
  const y = new Date().getFullYear();
  ['year','year-2','year-3','year-4','year-5'].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.textContent = y;
  });

  // file card modal preview
  const modalBackdrop = document.createElement('div');
  modalBackdrop.className = 'modal-backdrop';
  modalBackdrop.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true">
      <div class="modal-header">
        <strong class="modal-title"></strong>
        <button class="modal-close" aria-label="Close">✕</button>
      </div>
      <div class="modal-body"><iframe src=""></iframe></div>
    </div>
  `;
  document.body.appendChild(modalBackdrop);

  function openModal(title, fileUrl) {
    modalBackdrop.querySelector('.modal-title').textContent = title;
    modalBackdrop.querySelector('iframe').src = fileUrl;
    modalBackdrop.style.display = 'flex';
  }
  function closeModal() {
    modalBackdrop.style.display = 'none';
    modalBackdrop.querySelector('iframe').src = '';
  }
  modalBackdrop.addEventListener('click', (e) => {
    if(e.target === modalBackdrop || e.target.classList.contains('modal-close')) closeModal();
  });

  document.querySelectorAll('.file-card').forEach(card => {
    card.addEventListener('click', () => {
      const file = card.dataset.file;
      const title = card.dataset.title || 'Document';
      // if the file is a PDF in assets, open it in the iframe
      openModal(title, file);
    });

    // hover preview: on hover, set iframe src to show quick preview (optional)
    card.addEventListener('mouseover', () => {
      const previewUrl = card.dataset.file;
      // set data-preview for quick hover if desired (skip heavy actions)
      card.dataset.preview = previewUrl;
    });
  });

  // smooth scrolling for same-page anchors (if on same page)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      const el = document.querySelector(href);
      if(el) {
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });
});
