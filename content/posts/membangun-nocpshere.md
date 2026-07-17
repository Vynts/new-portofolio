---
title: "Langkah Setelah Kelulusan: Merintis Nocsphere dan Seni Berjuang Sendiri"
date: "2026-06-15"
description: "Kisah di balik ide awal membangun Nocsphere pasca kelulusan sekolah. Sebuah refleksi tentang peluang bisnis infrastruktur, tantangan mengembangkan proyek startup secara solo, dan komitmen untuk terus berjalan."
tags: ["Startup", "Nocsphere", "Backend", "Systems", "Ongoing"]
---

Momen kelulusan sekolah sering kali dipenuhi dengan pertanyaan klasik: *\"Ke mana langkah setelah ini?\"* Bagi sebagian orang, jalurnya mungkin langsung mencari pekerjaan atau melanjutkan studi. Namun bagi saya, kelulusan adalah garis start untuk merealisasikan sebuah mimpi yang sudah lama saya simpan: membangun startup teknologi saya sendiri yang diberi nama **Nocsphere**.

Nocsphere lahir dari sebuah keresahan sekaligus peluang menarik yang saya amati di industri penyedia infrastruktur jaringan lokal dan billing server.


## 1. Inspirasi di Balik Nocsphere: Dari Reseller Server ke Billing RT/RW Net

Ide awal Nocsphere sebenarnya terinspirasi dari model bisnis berbagai platform penyedia server (*hosting/game server provider*) yang ada di internet. Banyak dari layanan tersebut sebenarnya tidak mengelola infrastruktur fisik mereka sendiri dari nol, melainkan bertindak sebagai pihak ketiga yang mengemas kembali layanan dari provider besar dengan optimasi dan sistem otomatisasi yang ramah pengguna.

Terinspirasi dari konsep tersebut, saya melihat adanya peluang besar untuk menerapkannya di skala lokal melalui **Nocsphere**. 

Nocsphere dirancang sebagai **sistem billing MikroTik otomatis untuk jaringan RT/RW Net**. Tujuannya adalah membantu para pengelola jaringan lokal mengotomatisasi pencatatan pembayaran pengguna, mengintegrasikannya dengan payment gateway, serta mengontrol akses jaringan PPPoE pada router MikroTik secara *real-time* tanpa perlu manajemen manual yang merepotkan.


## 2. Realitas Pahit: Ketika Tim Harus Berjalan Sendiri

Pada awalnya, saya tidak merencanakan proyek ini sebagai *solo project*. Saya sempat memulai langkah bersama seorang rekan untuk bertukar pikiran dan membagi beban pengembangan. Namun, realitas kehidupan pasca-kelulusan berkata lain. Rekan saya mulai dihadapkan pada berbagai kesibukan pribadi dan prioritas lain yang mendesak, hingga akhirnya ia tidak bisa lagi aktif berkontribusi.

Kehilangan rekan di fase awal membangun startup memaksa saya untuk memikul semua tanggung jawab sendirian. Di sinilah perjuangan teknis dan mental yang sesungguhnya dimulai.

Menjadi *single fighter* berarti saya harus berperan ganda. Di satu sisi saya harus merancang arsitektur database relasional yang rumit, membangun API integrasi yang cepat menggunakan FastAPI/Flask, hingga mempelajari dokumentasi API RouterOS MikroTik yang sangat spesifik. Di sisi lain, saya harus memikirkan bagaimana mengintegrasikannya dengan WhatsApp gateway, bot Telegram, dan payment gateway agar semua transaksi berjalan otomatis. Kepala saya rasanya tidak pernah berhenti berpikir, bahkan saat mencoba untuk memejamkan mata di malam hari.


## 3. Menghargai Proses yang Masih Berjalan (Ongoing)

Menghadapi tumpukan eror, kegagalan *deploy*, dan kebuntuan logika sendirian sering kali memicu kejenuhan yang luar biasa. Tidak jarang saya merasa lelah secara mental karena tidak memiliki teman diskusi untuk memecahkan masalah arsitektur sistem yang sedang saya hadapi. Namun, setiap kali rasa ingin menyerah itu muncul, saya selalu teringat pada potensi besar dari sistem ini jika berhasil diselesaikan.

Saat ini, status pengembangan Nocsphere masih berada dalam tahap **Ongoing**. Meskipun proses pengembangannya melambat karena saya harus mengeksekusi setiap baris kode, pengujian jaringan, hingga keamanan sistemnya sendirian, saya memilih untuk tidak berhenti. 

Setiap modul billing yang berhasil terintegrasi dan setiap otomatisasi PPPoE yang berhasil mengeksekusi perintah di MikroTik adalah bukti nyata dari dedikasi saya. Nocsphere bukan lagi sekadar proyek aplikasi biasa; ia adalah pembuktian atas komitmen, ketahanan mental, dan kecintaan mendalam saya pada arsitektur sistem. Perjalanan ini masih panjang, namun saya akan terus berjalan hingga Nocsphere siap mengudara.