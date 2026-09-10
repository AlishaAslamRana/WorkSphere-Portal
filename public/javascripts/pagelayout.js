// Logout 
document.querySelectorAll('a[href="/logout"]').forEach(a => {
    a.addEventListener('click', e => {
      if (!confirm('Are you sure you want to log out?')) {
        e.preventDefault();
      } else {
        localStorage.clear();
        sessionStorage.clear();
      }
    });
  });
// DropDown Menu Profile Setting 
const profileLink = document.querySelector('a[href="/profile"]');

if (profileLink) {
  profileLink.addEventListener('click', (e) => {
    // Agar redirect se pehle notification/alert dikhana ho:
    alert("Navigating to Profile Settings...");
  });
}
// Dropdown Menu 


document.addEventListener('DOMContentLoaded', () => {
    const userBtn = document.querySelector('.user-btn');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    // Button click toggle
    userBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('show');
    });

    // Outside click close
    document.addEventListener('click', (e) => {
        if (!userBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.remove('show');
        }
    });
});

// Dashboard Page
// Donut Chart
const donutCtx = document.getElementById('donutChart').getContext('2d');
new Chart(donutCtx, {
    type: 'doughnut',
    data: {
      labels:  ['Completed Orders', 'Pending Orders', 'Cancelled Orders'],
      datasets: [{
        data:[120, 35, 15],
        backgroundColor: ['#10b981', '#f59e0b', '#ef4444'], // Green, Red, Yellow
        borderWidth: 2
      }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    }
});
// Pie Chart 
const pieCtx = document.getElementById('pieChart').getContext('2d');
new Chart(pieCtx, {
    type: 'pie',
    data: {
        labels: ['Active Users', 'Inactive Users', 'Pending Users'],
        datasets: [{
            data: [65, 20, 6],
            backgroundColor: ['#0284c7', '#64748b', '#38bdf8'],
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    }
});

// Orders Page 
document.getElementById('searchInput').addEventListener('keyup', function() {
    const filter = this.value.toLowerCase();
    const rows = document.querySelectorAll('#ordersTableBody tr');
    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(filter) ? '' : 'none';
    });
});

// Order Modal 
var activeEditingRow = null;

// DISPLAY HELPERS
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'flex';
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
}

function closeModal(modalId) {
    hideModal(modalId);
}

// VIEW MODAL
function openViewModal(btn) {
    document.getElementById('viewId').innerText = btn.getAttribute('data-id') || '';
    document.getElementById('viewName').innerText = btn.getAttribute('data-name') || '';
    document.getElementById('viewEmail').innerText = btn.getAttribute('data-email') || '';
    document.getElementById('viewPrice').innerText = btn.getAttribute('data-price') || '';
    document.getElementById('viewStatus').innerText = btn.getAttribute('data-status') || '';
    showModal('viewModal');
}

// EDIT MODAL (Row reference capture)
function openEditModal(btn) {
    activeEditingRow = btn.closest('tr');

    document.getElementById('editId').value = btn.getAttribute('data-id') || '';
    document.getElementById('editName').value = btn.getAttribute('data-name') || '';
    document.getElementById('editEmail').value = btn.getAttribute('data-email') || '';
    document.getElementById('editPrice').value = btn.getAttribute('data-price') || '';
    document.getElementById('editStatus').value = btn.getAttribute('data-status') || '';
    
    showModal('editModal');
}

// DIRECT SAVE FUNCTION (Form Submit ke bajaye direct click par chalay ga)
function saveOrderChanges() {
    const newName = document.getElementById('editName').value.trim();
    const newEmail = document.getElementById('editEmail').value.trim();
    const newPrice = document.getElementById('editPrice').value.trim();
    const newStatus = document.getElementById('editStatus').value.trim();

    if (!newName || !newEmail || !newPrice) {
        alert('Please fill out all fields.');
        return;
    }

    if (activeEditingRow) {
        // Direct Table Row Update
        activeEditingRow.cells[1].innerText = newName;
        activeEditingRow.cells[2].innerText = newEmail;
        activeEditingRow.cells[3].innerText = '$' + newPrice.replace('$', '');
        activeEditingRow.cells[4].innerHTML = `<span class="badge">${newStatus}</span>`;

        // Update Data Attributes for buttons inside row
        const buttons = activeEditingRow.querySelectorAll('.btn-action');
        buttons.forEach(btn => {
            btn.setAttribute('data-name', newName);
            btn.setAttribute('data-email', newEmail);
            btn.setAttribute('data-price', newPrice.replace('$', ''));
            btn.setAttribute('data-status', newStatus);
        });

        hideModal('editModal');
    } else {
        alert('Error: Could not find table row.');
    }
}

// DELETE MODAL
function openDeleteModal(btn) {
    window.currentDeletingRow = btn.closest('tr');
    document.getElementById('deleteId').innerText = btn.getAttribute('data-id') || '';
    document.getElementById('deleteName').innerText = btn.getAttribute('data-name') || '';
    showModal('deleteModal');
}

function confirmDelete() {
    if (window.currentDeletingRow) {
        window.currentDeletingRow.remove();
        window.currentDeletingRow = null;
        alert('Order deleted successfully!');
    }
    hideModal('deleteModal');
}

// SEARCH FUNCTION
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    const filter = searchInput.value.toLowerCase().trim();
    const rows = document.querySelectorAll('#ordersTableBody tr');

    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(filter) ? '' : 'none';
    });
}

// DOM LOADED EVENTS
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', performSearch);
    }
});

// OVERLAY CLICK CLOSE
window.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('modal-overlay')) {
        e.target.style.display = 'none';
    }
});
