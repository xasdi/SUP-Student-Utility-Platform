import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js';
import 'https://code.jquery.com/jquery-3.5.1.slim.min.js';
import 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.3/dist/umd/popper.min.js';
import 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js';



window.onload = function() {
    checkLoginStatus();
};



// Funkcja do sprawdzenia, czy użytkownik jest zalogowany
function checkLoginStatus() {
    // Możesz użyć fetch do pobrania informacji o sesji użytkownika
    fetch('/session-status') // Endpoint do sprawdzenia statusu sesji
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Not logged in');
            }
        })
        .then(data => {
            const dropdownMenu = document.getElementById('dropdown-menu');
            

            if (data.loggedIn) {
                // Jeśli użytkownik jest zalogowany
                dropdownMenu.innerHTML = `
                    <li>Zalogowano jako ${data.username}</li>
                    <a class="sidebar-link p-2" href="/dashboard.html"><li>Dashboard</li></a>
                    <a class="sidebar-link p-2" href="/upload.html"> <li>Upload Files</li></a>
                    <hr>
                    <a class="sidebar-link p-2" href="/logout"> <li>Logout</li></a>
                `;
            } else {
                // Jeśli użytkownik nie jest zalogowany
                dropdownMenu.innerHTML = `
                    <li style='color: white'>Login to unlock all features</li>
                    <hr>
                    <a class="sidebar-link p-2" href="/login"> <li>Login</li></a>
                `;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

 // Obsługa kliknięcia w przycisk Menu
 document.getElementById('toggleSidebar').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    sidebar.classList.toggle('active'); // Przełączanie klasy
    overlay.style.display = sidebar.classList.contains('active') ? 'block' : 'none'; // Pokazanie lub ukrycie overlay
});

// Obsługa kliknięcia w przycisk zamknięcia
document.getElementById('closeSidebar').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    sidebar.classList.remove('active'); // Usunięcie klasy aktywnej
    overlay.style.display = 'none'; // Ukrycie overlay
});

// Obsługa kliknięcia poza panelem
document.getElementById('overlay').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    sidebar.classList.remove('active'); // Usunięcie klasy aktywnej
    overlay.style.display = 'none'; // Ukrycie overlay
});
// Wywołaj funkcję przy załadowaniu strony



window.onload = checkLoginStatus;