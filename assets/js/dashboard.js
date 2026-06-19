/* ==========================================================================
   AURA DESIGN STUDIO - Client Portal & Admin Dashboard Javascript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initTabs();
  initMaterialApprovals();
  initPortalChat();
  initMilestoneAdjustments();
  initDashboardValidation();
});

/* ---------- Sidebar Toggle (Mobile) ---------- */
function initSidebar() {
  const toggleBtn = document.querySelector('.sidebar-toggle');
  const sidebar = document.getElementById('sidebar');

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = sidebar.classList.toggle('open');
      if (isOpen) {
        sidebar.classList.remove('-translate-x-full');
      } else {
        sidebar.classList.add('-translate-x-full');
      }
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (window.innerWidth < 1024 && !sidebar.contains(e.target) && e.target !== toggleBtn) {
        sidebar.classList.remove('open');
        sidebar.classList.add('-translate-x-full');
      }
    });
  }
}

/* ---------- Tab Navigation ---------- */
function initTabs() {
  const tabLinks = document.querySelectorAll('[data-tab]');
  const tabPanels = document.querySelectorAll('.tab-panel');

  if (tabLinks.length === 0) return;

  tabLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.dataset.tab;

      // Update active link state using Tailwind classes
      tabLinks.forEach(l => {
        l.classList.remove(
          'sidebar__link--active',
          'bg-accent/10',
          'text-accent',
          'dark:bg-accent/20'
        );
        l.removeAttribute('aria-current');
      });
      link.classList.add(
        'sidebar__link--active',
        'bg-accent/10',
        'text-accent',
        'dark:bg-accent/20'
      );
      link.setAttribute('aria-current', 'page');

      // Update active tab panel state
      tabPanels.forEach(panel => {
        if (panel.id === targetId) {
          panel.classList.add('active');
          panel.classList.remove('hidden');
        } else {
          panel.classList.remove('active');
          panel.classList.add('hidden');
        }
      });

      // Update Topbar Title
      const topbarTitle = document.querySelector('.dashboard-topbar__title');
      if (topbarTitle) {
        topbarTitle.textContent = link.textContent.trim();
      }

      // Close mobile sidebar after tab selection
      const sidebar = document.getElementById('sidebar');
      if (sidebar && window.innerWidth < 1024) {
        sidebar.classList.remove('open');
        sidebar.classList.add('-translate-x-full');
      }
    });
  });
}

/* ---------- Material Approvals States ---------- */
function initMaterialApprovals() {
  const approvalCards = document.querySelectorAll('.material-card');

  approvalCards.forEach(card => {
    const approveBtn = card.querySelector('.btn-approve');
    const declineBtn = card.querySelector('.btn-decline');
    const statusBadge = card.querySelector('.material-status');

    if (approveBtn && declineBtn && statusBadge) {
      // Approve Button
      approveBtn.addEventListener('click', () => {
        updateBadge(statusBadge, 'Approved', 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300');
        disableButtons(approveBtn, declineBtn);
      });

      // Request Changes Button
      declineBtn.addEventListener('click', () => {
        const comment = prompt("Specify your requested alterations for this material selection:");
        if (comment !== null) {
          updateBadge(statusBadge, 'Changes Requested', 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300');
          disableButtons(approveBtn, declineBtn);
          
          // Show simulated designer feedback request
          if (comment.trim()) {
            addSimulatedDesignerComment(card, comment);
          }
        }
      });
    }
  });
}

function updateBadge(badge, text, classes) {
  badge.textContent = text;
  badge.className = 'material-status px-2.5 py-1 text-xs font-semibold rounded-full ' + classes;
}

function disableButtons(btn1, btn2) {
  btn1.disabled = true;
  btn2.disabled = true;
  btn1.classList.add('opacity-40', 'cursor-not-allowed');
  btn2.classList.add('opacity-40', 'cursor-not-allowed');
}

function addSimulatedDesignerComment(card, text) {
  const container = card.querySelector('.material-comments');
  if (container) {
    const commentHtml = `
      <div class="mt-3 pt-3 border-t border-black/10 dark:border-white/10 text-xs text-gray-500 dark:text-gray-400">
        <strong class="text-gray-900 dark:text-white">Your Note:</strong> "${text}"
      </div>
    `;
    container.insertAdjacentHTML('beforeend', commentHtml);
  }
}

/* ---------- Direct Chat Simulation ---------- */
function initPortalChat() {
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');

  if (!chatForm || !chatInput || !chatMessages) return;

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const messageText = chatInput.value.trim();
    if (!messageText) return;

    // Post Client Message
    postMessage('client', messageText);
    chatInput.value = '';

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simulate Designer Response
    setTimeout(() => {
      const designerReplies = [
        "That sounds beautiful. I will adjust the layout to fit that sofa model.",
        "Understood. Let me contact our stone supplier in Carrara to verify block availability.",
        "Perfect, I'll update the material board with the new brass hardware selections today.",
        "Excellent. I have updated the project timeline to reflect that structural approval date.",
        "I'm on it. I'll sketch a revised detail for the master walk-in wardrobe and share it tomorrow."
      ];
      const randomReply = designerReplies[Math.floor(Math.random() * designerReplies.length)];
      postMessage('designer', randomReply);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1500);
  });
}

function postMessage(sender, text) {
  const chatMessages = document.getElementById('chat-messages');
  if (!chatMessages) return;

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  let msgHtml = '';
  if (sender === 'client') {
    msgHtml = `
      <div class="flex items-start gap-3 justify-end">
        <div class="flex flex-col items-end gap-1 max-w-[75%]">
          <div class="bg-accent text-white dark:text-gray-900 text-sm px-4 py-2.5 rounded-2xl rounded-tr-none">
            ${text}
          </div>
          <span class="text-[10px] text-gray-400 dark:text-gray-500">${timeStr} · You</span>
        </div>
        <div class="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-bold shrink-0">
          EC
        </div>
      </div>
    `;
  } else {
    msgHtml = `
      <div class="flex items-start gap-3">
        <div class="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10 text-gray-800 dark:text-white flex items-center justify-center text-xs font-bold shrink-0">
          AH
        </div>
        <div class="flex flex-col gap-1 max-w-[75%]">
          <div class="bg-gray-100 dark:bg-white/5 text-gray-800 dark:text-gray-200 text-sm px-4 py-2.5 rounded-2xl rounded-tl-none border border-gray-200/50 dark:border-white/5">
            ${text}
          </div>
          <span class="text-[10px] text-gray-400 dark:text-gray-500">${timeStr} · Aura (Designer)</span>
        </div>
      </div>
    `;
  }

  chatMessages.insertAdjacentHTML('beforeend', msgHtml);
}

/* ---------- Admin Milestone Sliders ---------- */
function initMilestoneAdjustments() {
  const rangeInputs = document.querySelectorAll('.milestone-slider');
  
  rangeInputs.forEach(input => {
    const valDisplay = input.parentElement.querySelector('.milestone-value');
    if (valDisplay) {
      input.addEventListener('input', () => {
        valDisplay.textContent = input.value + '%';
      });
    }
  });
}

/* ---------- Form Validation ---------- */
function initDashboardValidation() {
  const forms = document.querySelectorAll('form[data-validate]');
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const inputs = form.querySelectorAll('input, select, textarea');

      inputs.forEach(input => {
        const errorSpan = input.parentElement.querySelector('.form-error');
        if (!errorSpan) return;

        errorSpan.textContent = '';
        input.classList.remove('border-red-500');

        if (input.hasAttribute('required') && !input.value.trim()) {
          errorSpan.textContent = `${getLabelText(input)} is required`;
          input.classList.add('border-red-500');
          isValid = false;
        }
        else if (input.type === 'email' && input.value.trim() && !emailRe.test(input.value.trim())) {
          errorSpan.textContent = 'Enter a valid email address';
          input.classList.add('border-red-500');
          isValid = false;
        }
        else if (input.minLength > 0 && input.value.trim().length < input.minLength) {
          errorSpan.textContent = `${getLabelText(input)} must be at least ${input.minLength} characters`;
          input.classList.add('border-red-500');
          isValid = false;
        }
      });

      if (isValid) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.textContent : 'Save';
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Saving...';
          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Saved!';
            setTimeout(() => {
              submitBtn.textContent = originalText;
            }, 1500);
          }, 1000);
        }
      }
    });
  });
}

function getLabelText(input) {
  const label = input.parentElement.querySelector('label');
  return label ? label.textContent.replace(':', '').trim() : 'This field';
}
