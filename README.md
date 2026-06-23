# 📚 E-Library - Sistem Informasi Rental Buku Digital

**Nama:** Surya Putra Darma Jaya  
**NIM:** 312410405  
**Mata Kuliah:** Pemrograman Web 2  
**Tema:** Sistem Informasi Rental Buku / Komik Digital (E-Library)

---

## 📖 Deskripsi Proyek

E-Library adalah aplikasi web berbasis arsitektur **Decoupled (Terpisah)** yang memisahkan antara Backend API dan Frontend SPA. Aplikasi ini berfungsi untuk mengelola data buku digital, kategori genre, serta informasi stok dan status ketersediaan buku.

---

## 🛠️ Teknologi yang Digunakan

| Layer | Teknologi |
|---|---|
| Backend | CodeIgniter 4 (RESTful API) |
| Frontend | VueJS 3 (SPA via CDN) |
| UI Framework | TailwindCSS via CDN |
| HTTP Client | Axios |
| Database | MySQL / MariaDB (XAMPP) |
| Routing | Vue Router 4 |

---

## 🗄️ Struktur Database

### Tabel `users`
| Field | Tipe | Keterangan |
|---|---|---|
| id | INT (PK, AI) | Primary Key |
| username | VARCHAR(100) | Username unik |
| password | VARCHAR(255) | Password terenkripsi |
| token | VARCHAR(255) | Token autentikasi |
| created_at | DATETIME | Waktu dibuat |

### Tabel `kategori`
| Field | Tipe | Keterangan |
|---|---|---|
| id | INT (PK, AI) | Primary Key |
| nama_genre | VARCHAR(100) | Nama genre buku |
| deskripsi | TEXT | Deskripsi genre |
| created_at | DATETIME | Waktu dibuat |

### Tabel `buku`
| Field | Tipe | Keterangan |
|---|---|---|
| id | INT (PK, AI) | Primary Key |
| judul | VARCHAR(200) | Judul buku |
| penulis | VARCHAR(150) | Nama penulis |
| kategori_id | INT (FK) | Relasi ke tabel kategori |
| stok | INT | Jumlah stok buku |
| status | ENUM | tersedia / habis |
| created_at | DATETIME | Waktu dibuat |

> **Relasi:** Tabel `buku` berelasi ke tabel `kategori` melalui `kategori_id` (Foreign Key)

---

## 📸 Screenshot Aplikasi

### 1. Skema Relasi Tabel Database (phpMyAdmin)
> Screenshot skema relasi tabel dari phpMyAdmin

### 2. Halaman Login
> ![Login Page](screenshoot/login.png)
> Halaman login dengan form username dan password menggunakan TailwindCSS

### 3. Halaman Dashboard Admin
> ![Dashboard](screenshoot/dashboard.png)
> Dashboard admin menampilkan total kategori dan total buku

### 4. Halaman Manajemen Kategori
> ![Kategori](screenshoot/kategori.png)
> Tabel data kategori dengan tombol tambah, edit, dan hapus

### 5. Halaman Manajemen Buku
> ![Buku](screenshoot/buku.png)
> Tabel data buku dengan informasi judul, penulis, genre, stok, dan status

### 6. Uji Coba API Gagal (Error 401) via Postman
![Buku](screenshoot/postman.png)


---

## 🔗 RESTful API Endpoints

### Auth
| Method | Endpoint | Keterangan | Auth |
|---|---|---|---|
| POST | /api/login | Login admin | ❌ |
| POST | /api/logout | Logout admin | ✅ |

### Kategori
| Method | Endpoint | Keterangan | Auth |
|---|---|---|---|
| GET | /api/kategori | Ambil semua kategori | ❌ |
| GET | /api/kategori/{id} | Ambil kategori by ID | ❌ |
| POST | /api/kategori | Tambah kategori | ✅ |
| PUT | /api/kategori/{id} | Edit kategori | ✅ |
| DELETE | /api/kategori/{id} | Hapus kategori | ✅ |

### Buku
| Method | Endpoint | Keterangan | Auth |
|---|---|---|---|
| GET | /api/buku | Ambil semua buku | ❌ |
| GET | /api/buku/{id} | Ambil buku by ID | ❌ |
| POST | /api/buku | Tambah buku | ✅ |
| PUT | /api/buku/{id} | Edit buku | ✅ |
| DELETE | /api/buku/{id} | Hapus buku | ✅ |

> ✅ = Membutuhkan Bearer Token di Header Authorization

---

## 📁 Struktur Folder Repository

```
UAS_Web2_312410405_SuryaPutraDarmaJaya/
├── backend-api/          # CodeIgniter 4 REST API
│   ├── app/
│   │   ├── Config/
│   │   │   ├── Database.php
│   │   │   ├── Filters.php
│   │   │   ├── Routes.php
│   │   │   └── Cors.php
│   │   ├── Controllers/
│   │   │   ├── AuthController.php
│   │   │   ├── KategoriController.php
│   │   │   └── BukuController.php
│   │   └── Filters/
│   │       └── AuthFilter.php
│   └── ...
└── frontend-spa/         # VueJS 3 SPA
    ├── index.html
    └── components/
        ├── Login.js
        ├── Dashboard.js
        ├── Kategori.js
        └── Buku.js
```

---

## ⚙️ Cara Menjalankan Proyek

### Prasyarat
- XAMPP (Apache + MySQL)
- Browser modern

### Backend (CodeIgniter 4)
1. Clone repository ini
2. Copy folder `backend-api` ke `C:\xampp\htdocs\`
3. Import database:
   - Buka `http://localhost/phpmyadmin`
   - Buat database `elibrary_db`
   - Jalankan SQL berikut:
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    token VARCHAR(255) DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE kategori (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_genre VARCHAR(100) NOT NULL,
    deskripsi TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE buku (
    id INT AUTO_INCREMENT PRIMARY KEY,
    judul VARCHAR(200) NOT NULL,
    penulis VARCHAR(150) NOT NULL,
    kategori_id INT NOT NULL,
    stok INT DEFAULT 0,
    status ENUM('tersedia', 'habis') DEFAULT 'tersedia',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (kategori_id) REFERENCES kategori(id) ON DELETE CASCADE
);

INSERT INTO users (username, password) VALUES 
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');
```
4. Sesuaikan konfigurasi database di `app/Config/Database.php`
5. Akses backend di: `http://localhost/backend-api/public`

### Frontend (VueJS SPA)
1. Copy folder `frontend-spa` ke `C:\xampp\htdocs\`
2. Akses frontend di: `http://localhost/frontend-spa/index.html`
3. Login dengan:
   - **Username:** admin
   - **Password:** password

---

## 🔐 Akun Default

| Role | Username | Password |
|---|---|---|
| Administrator | admin | password |

---

## 🎯 Fitur Aplikasi

- ✅ Login & Logout dengan token autentikasi
- ✅ Navigation Guard (halaman admin terlindungi)
- ✅ Axios Request Interceptor (auto inject token)
- ✅ Axios Response Interceptor (tangkap error 401)
- ✅ CRUD Kategori Genre Buku
- ✅ CRUD Data Buku
- ✅ Tampilan responsif dengan TailwindCSS
- ✅ Modal form tambah & edit data
- ✅ Proteksi endpoint API dengan Bearer Token
- ✅ CORS dikonfigurasi untuk akses lintas origin

---

## 🎥 Demo & Presentasi

- 🔗 **Link Demo:** `http://localhost/frontend-spa/index.html`
- 🎬 **Link Video Presentasi:** *(isi setelah upload ke YouTube)*

---

## 👨‍💻 Developer

**Surya Putra Darma Jaya**  
NIM: 312410405  
Mata Kuliah: Pemrograman Web 2
