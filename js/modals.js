// ============================
// MODALS & COUNTRY CODES
// ============================

const countries = [
    { name: "Afghanistan", code: "+93" }, { name: "Albania", code: "+355" },
    { name: "Algeria", code: "+213" }, { name: "Australia", code: "+61" },
    { name: "Austria", code: "+43" }, { name: "Bangladesh", code: "+880" },
    { name: "Belgium", code: "+32" }, { name: "Brazil", code: "+55" },
    { name: "Canada", code: "+1" }, { name: "China", code: "+86" },
    { name: "Cyprus", code: "+357" }, { name: "Denmark", code: "+45" },
    { name: "Egypt", code: "+20" }, { name: "Finland", code: "+358" },
    { name: "France", code: "+33" }, { name: "Georgia", code: "+995" },
    { name: "Germany", code: "+49" }, { name: "Ghana", code: "+233" },
    { name: "Greece", code: "+30" }, { name: "India", code: "+91" },
    { name: "Indonesia", code: "+62" }, { name: "Ireland", code: "+353" },
    { name: "Italy", code: "+39" }, { name: "Japan", code: "+81" },
    { name: "Kenya", code: "+254" }, { name: "Malaysia", code: "+60" },
    { name: "Netherlands", code: "+31" }, { name: "New Zealand", code: "+64" },
    { name: "Nigeria", code: "+234" }, { name: "Norway", code: "+47" },
    { name: "Pakistan", code: "+92" }, { name: "Poland", code: "+48" },
    { name: "Portugal", code: "+351" }, { name: "Russia", code: "+7" },
    { name: "Singapore", code: "+65" }, { name: "South Africa", code: "+27" },
    { name: "Spain", code: "+34" }, { name: "Sweden", code: "+46" },
    { name: "Switzerland", code: "+41" }, { name: "Turkey", code: "+90" },
    { name: "Uganda", code: "+256" }, { name: "United Kingdom", code: "+44" },
    { name: "United States", code: "+1" }, { name: "Zimbabwe", code: "+263" }
];
countries.sort((a, b) => a.name.localeCompare(b.name));

function populateCountryDropdown(dropdown, filter = "") {
    dropdown.innerHTML = "";
    const filtered = countries.filter(c => 
        c.name.toLowerCase().includes(filter.toLowerCase()) || c.code.includes(filter)
    );
    filtered.forEach(c => {
        const opt = document.createElement('div');
        opt.className = 'country-code-option';
        opt.textContent = `${c.name} (${c.code})`;
        opt.addEventListener('click', () => {
            const inputId = dropdown.id.replace('-dropdown', '');
            const input = document.getElementById(inputId);
            if (input) { input.value = c.code; dropdown.classList.remove('active'); }
        });
        dropdown.appendChild(opt);
    });
}

function initializeCountryCodeDropdowns() {
    document.querySelectorAll('input[id$="country-code"]').forEach(input => {
        const dropdown = document.getElementById(input.id + '-dropdown');
        if (!dropdown) return;
        populateCountryDropdown(dropdown);
        input.addEventListener('focus', () => dropdown.classList.add('active'));
        input.addEventListener('input', (e) => populateCountryDropdown(dropdown, e.target.value));
        document.addEventListener('click', (e) => {
            if (!input.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    });
}

function openConsultationModal() {
    const modal = document.getElementById('consultation-modal');
    if (modal) { modal.classList.add('active'); document.body.style.overflow = 'hidden'; }
}

function openApplicationModal() {
    const modal = document.getElementById('application-modal');
    if (!modal) return;
    const preselected = sessionStorage.getItem('preselectedDestination');
    if (preselected) {
        setTimeout(() => {
            const select = document.getElementById('application-study-destination');
            if (select) {
                for (let i = 0; i < select.options.length; i++) {
                    if (select.options[i].value === preselected) {
                        select.value = preselected; break;
                    }
                }
            }
            sessionStorage.removeItem('preselectedDestination');
        }, 100);
    }
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) { modal.classList.remove('active'); document.body.style.overflow = ''; }
}

function handleConsultationForm(e) {
    e.preventDefault();
    const data = {
        fullName: document.getElementById('consultation-full-name').value,
        email: document.getElementById('consultation-email').value,
        countryCode: document.getElementById('consultation-country-code').value,
        phone: document.getElementById('consultation-phone').value,
        countryResidence: document.getElementById('consultation-country-residence').value,
        nationality: document.getElementById('consultation-nationality').value,
        course: document.getElementById('consultation-course').value,
        destination: document.getElementById('consultation-study-destination').value,
        level: document.getElementById('consultation-study-level').value,
        year: document.getElementById('consultation-study-year').value,
        month: document.getElementById('consultation-intake-month').value
    };

    // Format with numbered list and emoji header
    const msg = `📋 BOOKING CONSULTATION

1. *Full Name:* ${data.fullName}
2. *Email:* ${data.email}
3. *Mobile:* ${data.countryCode} ${data.phone}
4. *Residence:* ${data.countryResidence}
5. *Nationality:* ${data.nationality}
6. *Course:* ${data.course}
7. *Destination:* ${data.destination}
8. *Level:* ${data.level}
9. *Year:* ${data.year}
10. *Intake:* ${data.month}`;

    closeModal('consultation-modal');
    window.open(`https://wa.me/917696286326?text=${encodeURIComponent(msg)}`, '_blank');
}

function handleApplicationForm(e) {
    e.preventDefault();
    const data = {
        fullName: document.getElementById('application-full-name').value,
        email: document.getElementById('application-email').value,
        countryCode: document.getElementById('application-country-code').value,
        phone: document.getElementById('application-phone').value,
        countryResidence: document.getElementById('application-country-residence').value,
        nationality: document.getElementById('application-nationality').value,
        course: document.getElementById('application-course').value,
        destination: document.getElementById('application-study-destination').value,
        level: document.getElementById('application-study-level').value,
        year: document.getElementById('application-study-year').value,
        month: document.getElementById('application-intake-month').value
    };

    // Format with numbered list and emoji header
    const msg = `📋 APPLICATION

1. *Full Name:* ${data.fullName}
2. *Email:* ${data.email}
3. *Mobile:* ${data.countryCode} ${data.phone}
4. *Residence:* ${data.countryResidence}
5. *Nationality:* ${data.nationality}
6. *Course:* ${data.course}
7. *Destination:* ${data.destination}
8. *Level:* ${data.level}
9. *Year:* ${data.year}
10. *Intake:* ${data.month}`;

    closeModal('application-modal');
    window.open(`https://wa.me/917696286326?text=${encodeURIComponent(msg)}`, '_blank');
}

function initializeModals() {
    initializeCountryCodeDropdowns();
    document.querySelectorAll('.consultation-btn, .get-started-btn').forEach(b => b.addEventListener('click', openConsultationModal));
    document.querySelectorAll('.apply-now-btn').forEach(b => b.addEventListener('click', openApplicationModal));
    document.querySelectorAll('.close-modal').forEach(b => b.addEventListener('click', function() {
        const modal = this.closest('.modal-overlay');
        if (modal) closeModal(modal.id);
    }));
    document.querySelectorAll('.modal-overlay').forEach(m => m.addEventListener('click', function(e) {
        if (e.target === this) closeModal(this.id);
    }));
    document.getElementById('consultation-form')?.addEventListener('submit', handleConsultationForm);
    document.getElementById('application-form')?.addEventListener('submit', handleApplicationForm);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initializeModals);
else initializeModals();
