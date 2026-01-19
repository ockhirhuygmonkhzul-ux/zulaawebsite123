// --- Authentication Logic ---
let currentUser = null;

function login() {
    const user = document.getElementById('login-user').value.toLowerCase();
    const pass = document.getElementById('login-pass').value;

    if (pass === "123") {
        // Хэрэглэгчийн үүрэг тогтоох
        let role = 'user';
        if (user === 'admin') role = 'admin';
        else if (user === 'staff') role = 'staff';
        else if (user === 'company') role = 'company';

        currentUser = { username: user, role: role };
        alert("Амжилттай нэвтэрлээ: " + user.toUpperCase());
        setupUI();
    } else {
        alert("Нууц үг буруу! (Нууц үг: 123)");
    }
}

function setupUI() {
    // Нэвтрэх хэсгийг нуух
    document.getElementById('home').style.display = 'none';
    document.getElementById('user-info').innerText = `Нэвтэрсэн: ${currentUser.username.toUpperCase()} (${currentUser.role})`;
    
    // Цэсүүдийг цэвэрлэх
    document.getElementById('nav-user').style.display = 'none';
    document.getElementById('nav-admin').style.display = 'none';

    // Эрхээр нь цэс харуулах
    if (currentUser.role === 'admin' || currentUser.role === 'staff') {
        document.getElementById('nav-admin').style.display = 'block';
        showSection('admin-dashboard');
        renderAdminRequests(); // Хүсэлтүүдийг ачаалах
        renderChart();         // График зурах
    } else {
        document.getElementById('nav-user').style.display = 'block';
        showSection('request-form');
        renderProfile();
    }
}

// Секц солих функц (Цэс ажиллуулах гол функц)
function showSection(id) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(s => {
        s.style.display = 'none';
        s.classList.remove('active');
    });
    
    const activeSection = document.getElementById(id);
    if (activeSection) {
        activeSection.style.display = 'block';
        activeSection.classList.add('active');
    }
}

function logout() {
    if(confirm("Системээс гарах уу?")) {
        location.reload();
    }
}

// --- Admin / Staff Functions ---
function renderAdminRequests() {
    const tableBody = document.getElementById('admin-req-table');
    tableBody.innerHTML = ''; // Хуучин өгөгдлийг цэвэрлэх

    const dummyReqs = [
        {id: 101, user: 'Болд', type: 'Company', work: 'Server Update', status: 'Pending', color: '#ffb300'},
        {id: 102, user: 'Сараа', type: 'User', work: 'Laptop repair', status: 'Completed', color: '#4caf50'},
        {id: 103, user: 'Цэцгээ', type: 'User', work: 'Windows install', status: 'Cancelled', color: '#ff4081'}
    ];

    dummyReqs.forEach(req => {
        const row = `
            <tr>
                <td>${req.id}</td>
                <td>${req.type}</td>
                <td>${req.work}</td>
                <td><b style="color: ${req.color}">${req.status}</b></td>
                <td>
                    <button onclick="manageRequest(${req.id})" style="padding: 5px 10px; font-size: 12px;">Удирдах</button>
                </td>
            </tr>`;
        tableBody.innerHTML += row;
    });
}

function manageRequest(id) {
    const action = prompt(`Хүсэлт #${id}: \n1 - Зөвшөөрөх\n2 - Цуцлах\n3 - Дуусгах`);
    if (action === "1") alert("Хүсэлтийг зөвшөөрч, ажилтанд хуваарилсан.");
    else if (action === "2") alert("Хүсэлтийг цуцаллаа.");
    else if (action === "3") alert("Засвар дууссан төлөвт шилжлээ.");
}

// --- User Functions ---
function renderProfile() {
    const container = document.getElementById('profile-data');
    if (currentUser.role === 'company') {
        container.innerHTML = `
            <div style="line-height: 2;">
                <p><b>Байгууллагын нэр:</b> Мобиком ХХК</p>
                <p><b>Регистр:</b> 2054631</p>
                <p><b>Имейл:</b> contact@mobicom.mn</p>
                <p><b>Утас:</b> 11-311111</p>
            </div>`;
    } else {
        container.innerHTML = `
            <div style="line-height: 2;">
                <p><b>Хэрэглэгчийн нэр:</b> ${currentUser.username}</p>
                <p><b>Овог нэр:</b> Бат овогтой Болд</p>
                <p><b>Хүйс:</b> Эр</p>
                <p><b>Утас:</b> 9900-1122</p>
            </div>`;
    }
}

// --- Chart.js Graph ---
function renderChart() {
    const ctx = document.getElementById('satisfactionChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['10-р сар', '11-р сар', '12-р сар', '1-р сар'],
            datasets: [{
                label: 'Сэтгэл ханамжийн хувь (%)',
                data: [75, 82, 80, 95],
                borderColor: '#4fc3f7',
                backgroundColor: 'rgba(79, 195, 247, 0.2)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            plugins: { legend: { labels: { color: 'white' } } },
            scales: {
                y: { ticks: { color: 'white' }, grid: { color: '#37474f' } },
                x: { ticks: { color: 'white' }, grid: { color: '#37474f' } }
            }
        }
    });
}