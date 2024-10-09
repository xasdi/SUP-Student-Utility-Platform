import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js';
import 'https://code.jquery.com/jquery-3.5.1.min.js';
import 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.3/dist/umd/popper.min.js';



document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();

    // Dodawanie event listenerów
    document.getElementById('toggleSidebar').addEventListener('click', function() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        sidebar.classList.toggle('active');
        overlay.style.display = sidebar.classList.contains('active') ? 'block' : 'none';
    });

    document.getElementById('closeSidebar').addEventListener('click', function() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        sidebar.classList.remove('active');
        overlay.style.display = 'none';
    });

    document.getElementById('overlay').addEventListener('click', function() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        sidebar.classList.remove('active');
        overlay.style.display = 'none';
    });
});

// Funkcja do sprawdzenia, czy użytkownik jest zalogowany
function checkLoginStatus() {
    fetch('/session-status')
        .then(response => {
            if (!response.ok) throw new Error('Not logged in');
            return response.json();
        })
        .then(data => {
            const dropdownMenu = document.getElementById('dropdown-menu');
            dropdownMenu.innerHTML = data.loggedIn
                ? `<li>Zalogowano jako ${data.username}</li>
                   <a class="sidebar-link p-2" href="/dashboard.html"><li>Dashboard</li></a>
                   <a class="sidebar-link p-2" href="/upload.html"><li>Upload Files</li></a>
                   <hr>
                   <a class="sidebar-link p-2" href="/logout"><li>Logout</li></a>`
                : `<li style='color: white'>Login to unlock all features</li>
                   <hr>
                   <a class="sidebar-link p-2" href="/login"><li>Login</li></a>`;
        })
        .catch(error => console.error('Error:', error));
}
