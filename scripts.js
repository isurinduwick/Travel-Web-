document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('authModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.querySelector('.close-btn');
    const tabs = document.querySelectorAll('.tab');
    const panels = document.querySelectorAll('.tab-panel');

    // Open modal
    openModalBtn?.addEventListener('click', () => {
        modal.classList.add('show');
    });

    // Close modal
    closeModalBtn?.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    // Close when clicking outside modal-content
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

    // Switch between tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            panels.forEach(panel => {
                panel.classList.remove('active');
            });

            const target = tab.getAttribute('data-tab');
            document.getElementById(target)?.classList.add('active');
        });
    });
});
