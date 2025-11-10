const books = [
    {
        id: 1,
        title: "Pendidikan Agama Kristen ",
        author: "Kemdikbud",
        category: "Buku Pelajaran",
        year: 2021
    },
    {
        id: 2,
        title: "Pendidikan Agama Islam ",
        author: "Kemdikbud",
        category: "Buku Pelajaran",
        year: 2021
    },
    {
        id: 3,
        title: "Matematika",
        author: "Kemdikbud",
        category: "Lembar Kerja Siswa",
        year: 2021
    },
    {
        id: 4,
        title: "Matematika Tingkat Lanjut",
        author: "Kemdikbud",
        category: "Lembar Kerja Siswa",
        year: 2021
    },
    {
        id: 5,
        title: "Geografi",
        author: "Kemdikbud",
        category: "Buku Panduan Guru",
        year: 2021
    },
    {
        id: 6,
        title: "Bahasa Indonesia ",
        author: "Kemdikbud",
        category: "Buku Panduan Guru",
        year: 2021
    },
    {
        id: 7,
        title: "Bahasa Inggris ",
        author: "Kemdikbud",
        category: "Buku Pelajaran",
        year: 2014
    },
    {
        id: 8,
        title: "Informatika ",
        author: "Kemdikbud",
        category: "Buku Pelajaran",
        year: 2021
    },
    {
        id: 9,
        title: "Sejarah ",
        author: "Kemdikbud",
        category: "Lembar Kerja Siswa",
        year: 2021
    },
    {
        id: 10,
        title: "Pendidikan Pancasila Kewarganegaraan",
        author: "Kemdikbud",
        category: "Lembar Kerja Siswa",
        year: 2023
    },
    {
        id: 11,
        title: "Ekonomi",
        author: "Kemdikbud",
        category: "Buku Panduan Guru",
        year: 2021
    },
    {
        id: 12,
        title: "Prakarya dan Kewirausahaan",
        author: "Kemdikbud",
        category: "Buku Panduan Guru",
        year: 2021
    }
];

function loadBooks() {
    const booksContainer = document.getElementById('booksContainer');
    if (!booksContainer) return;

    booksContainer.innerHTML = '';
    
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    
    const filteredBooks = books.filter(book => {
        const matchesCategory = !categoryFilter || book.category === categoryFilter;
        const matchesSearch = !searchTerm || 
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });

    if (filteredBooks.length === 0) {
        booksContainer.innerHTML = '<p class="no-books">No books found matching your criteria.</p>';
        return;
    }

    filteredBooks.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p class="author">by ${book.author}</p>
            <p><span class="category">${book.category}</span></p>
            <p><small>Published: ${book.year}</small></p>
        `;
        booksContainer.appendChild(bookCard);
    });
}

function searchBooks() {
    loadBooks();
}

function filterBooks() {
    loadBooks();
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('booksContainer')) {
        loadBooks();
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBooks();
            }
        });
    }
});

function updateActiveNav() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', updateActiveNav);