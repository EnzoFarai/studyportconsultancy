// ============================
// HEADER & FOOTER LOADER
// ============================

function loadHeaderFooter() {
    const currentPath = window.location.pathname;
    const isInSubfolder = currentPath.includes('/pages/') || currentPath.includes('/blog-articles/');
    const basePath = isInSubfolder ? '../' : './';

    // Load Header
    fetch(basePath + 'header.html')
        .then(response => response.text())
        .then(data => {
            let headerHtml = data;
            if (isInSubfolder) {
                headerHtml = headerHtml.replace(/href="([^"#][^"]*)"/g, 'href="../$1"');
                headerHtml = headerHtml.replace(/src="([^"#][^"]*)"/g, 'src="../$1"');
            }
            document.getElementById('header-placeholder').innerHTML = headerHtml;
            initializeHeader();
        })
        .catch(() => console.log('Header load skipped'));

    // Load Footer
    fetch(basePath + 'footer.html')
        .then(response => response.text())
        .then(data => {
            let footerHtml = data;
            if (isInSubfolder) {
                footerHtml = footerHtml.replace(/href="([^"#][^"]*)"/g, 'href="../$1"');
            }
            document.getElementById('footer-placeholder').innerHTML = footerHtml;
        })
        .catch(() => console.log('Footer load skipped'));

    // Load Modals
    loadModals(basePath);
}

function loadModals(basePath) {
    fetch(basePath + 'consultation-modal.html')
        .then(response => response.text())
        .then(data => {
            const container = document.getElementById('modals-placeholder');
            if (container) container.innerHTML += data;
        })
        .catch(() => console.log('Consultation modal skipped'));

    fetch(basePath + 'application-modal.html')
        .then(response => response.text())
        .then(data => {
            const container = document.getElementById('modals-placeholder');
            if (container) container.innerHTML += data;
            setTimeout(initializeModals, 100);
        })
        .catch(() => console.log('Application modal skipped'));
}

function initializeHeader() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => navMenu.classList.toggle('active'));
    }
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
        });
    });
}

document.addEventListener('DOMContentLoaded', loadHeaderFooter);
