let layananDipilih = "";

let pesanan =
JSON.parse(localStorage.getItem("pesanan")) || [];

let pekerjaData =
JSON.parse(localStorage.getItem("pekerjaData")) || [];

function login(){

    let pass =
    document.getElementById("password").value;

    let user =
    document.getElementById("username").value;

    document.getElementById("loginPage")
    .classList.add("hidden");

    // ADMIN
    if(pass == "123"){
        document.getElementById("adminPage")
        .classList.remove("hidden");

        hitungPemasukan();
        return;
    }

    // PELANGGAN
    if(pass == "1234"){
        document.getElementById("pelangganPage")
        .classList.remove("hidden");
        return;
    }

    // 👷 PEKERJA LOGIN BARU (INI YANG DIPAKAI)
    let pekerja = pekerjaData.find(p =>
        p.nama.toLowerCase() == user.toLowerCase() &&
        p.password == pass
    );

    if(pekerja){

    document.getElementById("pekerjaPage")
    .classList.remove("hidden");

    document.getElementById("daftarPekerjaBox")
    .classList.add("hidden");

    tampilDashboardPekerja(pekerja);

    return true;
}

    if(pass == "12345"){

    document.getElementById("pekerjaPage")
    .classList.remove("hidden");

    document.getElementById("daftarPekerjaBox")
    .classList.remove("hidden");

    return;
}



    alert("Password salah!");
    location.reload();
}

function pilihLayanan(nama){

    layananDipilih = nama;

    document.getElementById("judulLayanan")
    .innerHTML = "Pesan " + nama;

    if(nama == "Bersih Rumah"){

        document.getElementById("boxPekerjaanRumah")
        .classList.remove("hidden");

        document.getElementById("jumlah")
        .style.display = "block";

    }

    else if(nama == "Jemput Sampah"){

        document.getElementById("boxPekerjaanRumah")
        .classList.add("hidden");

        document.getElementById("jumlah")
        .style.display = "none";

    }

    else{

        document.getElementById("boxPekerjaanRumah")
        .classList.add("hidden");

        document.getElementById("jumlah")
        .style.display = "block";

    }

}

function cekPembayaran(){

    let bayar =
    document.getElementById("pembayaran").value;

    if(bayar == "transfer"){

        document.getElementById("qrBox")
        .classList.remove("hidden");

    }

    else{

        document.getElementById("qrBox")
        .classList.add("hidden");

    }

}

function buatPesanan(){

    let jumlah =
    parseInt(document.getElementById("jumlah").value);

    let jarak =
    parseInt(document.getElementById("jarak").value);

    let kerja =
    document.getElementById("pekerjaanRumah").value;

    let nama =
    document.getElementById("nama").value;

    let telepon =
    document.getElementById("telepon").value;

    let alamat =
    document.getElementById("alamat").value;

    let total = 0;

    if(layananDipilih == "Antar Galon"){

        total = (4000 * jumlah) + (1000 * jarak);

    }

    else if(layananDipilih == "Jemput Sampah"){

        total = 3000 * jarak;

    }

    else if(layananDipilih == "Bersih Rumah"){

        total = 15000 * jumlah;

    }

    let data = {

        nama:nama,
        telepon:telepon,
        alamat:alamat,
        layanan:layananDipilih,
        kerja:kerja,
        total:total,
        status:"Masuk"

    };

    pesanan.push(data);

    localStorage.setItem(
        "pesanan",
        JSON.stringify(pesanan)
    );

    hitungPemasukan();

    document.getElementById("hasilPesanan")
    .innerHTML =

    `
    <div class="card">

        <h2>✅ Pesanan Berhasil</h2>

        <p><b>Nama :</b> ${nama}</p>

        <p><b>Layanan :</b> ${layananDipilih}</p>

        <p><b>Total :</b> Rp ${total}</p>

        <span class="status masuk">
            Pesanan Masuk
        </span>

        <button onclick="pesanLagi()">
            Pesan Lagi
        </button>

        <button onclick="logout()">
            Keluar
        </button>

    </div>
    `;

}

function pesanLagi(){

    document.getElementById("hasilPesanan")
    .innerHTML = "";

    document.getElementById("jumlah").value = "";

    document.getElementById("jarak").value = "";

    document.getElementById("pekerjaanRumah").value = "";

    document.getElementById("nama").value = "";

    document.getElementById("telepon").value = "";

    document.getElementById("alamat").value = "";

}

function ambilKerja(){

    let nama =
    document.getElementById("namaPekerja").value;

    let telepon =
    document.getElementById("teleponPekerja").value;

    let alamat =
    document.getElementById("alamatPekerja").value;

    let bidang =
    document.getElementById("jobPekerja").value;

    let angka = Math.floor(10 + Math.random() * 90);
    let passwordBaru = nama.toLowerCase() + angka;

    let data = {
        nama:nama,
        telepon:telepon,
        alamat:alamat,
        bidang:bidang,
        password:passwordBaru
    };

    pekerjaData.push(data);

    localStorage.setItem(
        "pekerjaData",
        JSON.stringify(pekerjaData)
    );

    alert(
    "Pendaftaran berhasil!\n\n" +
    "Nama: " + nama + "\n" +
    "Password login kamu: " + passwordBaru + "\n\n" +
    "Simpan password ini untuk login pekerja!"
    );

    let lanjut = confirm("Login sekarang?");

    if(lanjut){
        document.getElementById("loginPage").classList.remove("hidden");
    } else {
        location.reload();
    }
}

function tampilPesanan(){

    let html = "";

    pesanan.forEach((item)=>{

        html +=

        `
        <div class="card">

            <h3>${item.layanan}</h3>

            <p>Nama : ${item.nama}</p>

            <p>Telepon : ${item.telepon}</p>

            <p>Alamat : ${item.alamat}</p>

            <p>Total : Rp ${item.total}</p>

            <p>Status : ${item.status}</p>

        </div>
        `;

    });

    if(html == ""){

        html =

        `
        <div class="card">

            <h3>Belum Ada Pesanan</h3>

        </div>
        `;

    }

    document.getElementById("adminPesanan")
    .innerHTML = html;

}

function tampilPekerjaAdmin(){

    let html = "";

    pekerjaData.forEach((item)=>{

        html += `
        <div class="card">

            <h3>${item.nama}</h3>

            <p>Bidang : ${item.bidang}</p>

            <p>Telepon : ${item.telepon}</p>

            <p>Alamat : ${item.alamat}</p>

            <p><b>Password Login:</b> ${item.password}</p>

        </div>
        `;
    });

    if(html == ""){
        html = `
        <div class="card">
            <h3>Belum Ada Pekerja</h3>
        </div>
        `;
    }

    document.getElementById("adminPesanan").innerHTML = html;
}


function hitungPemasukan(){

    let total = 0;

    pesanan.forEach((item)=>{

        total += item.total;

    });

    document.getElementById("totalPemasukan")
    .innerHTML =

    "Total Pemasukan : Rp " + total;

}

function logout(){

    location.reload();

}

function resetDataAdmin(){

    let konfirmasi = confirm("Yakin mau hapus SEMUA data pelanggan, pesanan, dan pekerja?");

    if(!konfirmasi) return;

    let password = prompt("Masukkan password admin:");

    if(password !== "123"){
        alert("Password salah!");
        return;
    }

    // HAPUS SEMUA DATA
    localStorage.removeItem("pesanan");
    localStorage.removeItem("pekerjaData");

    alert("Semua data berhasil dihapus oleh admin!");

    location.reload();
}

function tampilDashboardPekerja(pekerja){

    let html = "";

    pesanan.forEach((item)=>{

        if(item.status == "Masuk"){

            let upah = item.total * 0.7;

            html += `
            <div class="card">

                <h3>${item.layanan}</h3>

                <p>Nama Pelanggan: ${item.nama}</p>

                <p>Telepon: ${item.telepon}</p>

                <p>Alamat: ${item.alamat}</p>

                <p><b>Total:</b> Rp ${item.total}</p>

                <p><b>Upah kamu:</b> Rp ${upah}</p>

                <span class="status masuk">
                    Pesanan Masuk
                </span>

            </div>
            `;
        }
    });

    if(html == ""){
        html = `
        <div class="card">
            <h3>Tidak ada pesanan masuk</h3>
        </div>
        `;
    }

    document.getElementById("dataKerja").innerHTML = `
        <div class="card">

            <h2>Dashboard Pekerja</h2>

            <p>Nama: ${pekerja.nama}</p>

            <p>Bidang: ${pekerja.bidang}</p>

            <button onclick="logout()">Logout</button>

        </div>
    ` + html;
}

function loginPekerjaBaru(){

    let user =
    document.getElementById("username").value;

    let pass =
    document.getElementById("password").value;

    let pekerja = pekerjaData.find(p =>
        p.nama.toLowerCase() == user.toLowerCase() &&
        p.password == pass
    );

    if(pekerja){

        document.getElementById("pekerjaPage")
        .classList.remove("hidden");

        tampilDashboardPekerja(pekerja);

        return true;
    }

    return false;
}