# Interview Fullstack NestJS Dengan Topik LaundryDashboard

Sistem Dashboard Laundry yang dibangun dengan arsitektur **Clean Code**, **Security-First**

## Fitur Utama
- **CRUD Pelanggan & Transaksi:** Manajemen data lengkap.
- **JWT Authentication:** Keamanan tingkat tinggi menggunakan HTTP-Only Cookies.
- **Audit Logging:** Pencatatan otomatis setiap perubahan data (Create, Update, Delete).
- **Centralized Error Handling:** Penanganan error terpusat yang selalu mengembalikan halaman Error

## Dependency & TechStack yang dipakai
- **Framework:** NestJS (Node.js)
- **ORM:** Prisma with PostgreSQL
- **Template View Engine:** Handlebars (HBS)
- **Security:** Passport.js, JWT, Bcrypt
- **Styling:** Tailwind CSS

## Langkah Setup dan Instalasi
1. Clone repositori ini.
2. Install dependensi:
   ```bash
   npm install
  
   buat file .env dan isi 2 VARIABLE yang bernama SECRET_KEY dan Database URL

   npx prisma migrate dev --name (nama_init) untuk buat log migration awal nya
   npx prisma generate untuk client nya agar tidak error typescript 
  
   Untuk menjalankan npm run start (NestJS)
   npx prisma studio (Prisma Studio)

## Peringatan Penting!
Perlu di ketahui untuk Nest ini menggunakan Bantuan View HBS Sehingga untuk Outputnya berupa view
HTML Dan tidak JSON Layaknya RestfulAPI

Memisahkan Setiap Layer Domain sesuai kebutuhan nya masing masing! memudahkan maintanable

## Design Database
![Design Database Simpel](./assets/Schema%20Database%20ERD.png)

Menggunakan 4 Tabel Customers untuk Data pelanggan Dan Transaction di gunakan untuk Melihat data
Transaksi Laundry yang berelasi one to many dengan Customers

Serta ada Log untuk Memudahkan Admin melihat Log System nya, (keperluan Track Record)

## DISARANKAN TESTING MENGGUNAKAN POSTMAN!
