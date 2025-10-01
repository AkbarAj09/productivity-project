// Gunakan sintaks CommonJS 'require' secara konsisten
const express = require('express');
const path = require('path'); // Impor modul 'path' untuk menangani path direktori

const app = express();
// Vercel akan mengatur port, jadi kita siapkan fallback ke 3000 untuk lokal
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

// ✅ Atur view engine dan lokasi folder 'views'
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rute GET utama
app.get('/', (req, res) => {
    const today = new Date();
    const day = today.getDay(); // 0 = Minggu, 6 = Sabtu
    let dataType, advice;

    if (day === 0 || day === 6) {
        dataType = 'a Weekend';
        advice = 'Happy weekend!';
    } else {
        dataType = 'a Weekday';
        advice = 'Stay productive!';
    }

    // Render file 'index.ejs' dari folder 'views' yang sudah diatur
    // Kirim objek 'locals' agar template tidak error saat pertama kali dimuat
    res.render('index', {
        dataType,
        advice,
        locals: { numberOfLetters: null } // Kirim null atau nilai default
    });
});

// Rute POST untuk menangani submit form
app.post('/', (req, res) => {
    const name = req.body.name || ''; // Default ke string kosong jika tidak ada nama
    const numLetters = name.length;
    
    // Kita butuh data 'dataType' dan 'advice' lagi di sini
    const today = new Date();
    const day = today.getDay();
    let dataType, advice;

    if (day === 0 || day === 6) {
        dataType = 'a Weekend';
        advice = 'Happy weekend!';
    } else {
        dataType = 'a Weekday';
        advice = 'Stay productive!';
    }
    
    // Render ulang halaman dengan data hasil kalkulasi huruf
    res.render('index', {
        dataType,
        advice,
        locals: { numberOfLetters: numLetters }
    });
});


// Bagian ini hanya untuk development lokal. Vercel tidak menggunakannya.
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
      console.log(`Server is running locally on port ${port}`);
    });
}
  
// ✅ Ekspor 'app' agar Vercel bisa menggunakannya
module.exports = app;