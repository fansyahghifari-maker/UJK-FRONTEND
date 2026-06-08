import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

function CreateSiswa() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    
    // 1. Sesuaikan state dengan nama kolom yang ada di database MySQL kamu
    const [form, setForm] = useState({
        kode_siswa: "",
        nama_siswa: "",
        tanggal_lahir: "",
        alamat_siswa: "",
        jurusan_siswa: ""
    })
    
    // Fungsi mencatat perubahan input form
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    
    // Fungsi submit murni untuk TAMBAH DATA BARU (POST)
    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        
        // Menembak ke backend lokal port 5000 dengan method POST
        axios.post('http://localhost:5000/siswa', form)
        .then((res) => {
            alert(res.data.message || "Data Berhasil ditambah!")
            setIsLoading(false)
            // Redirect ke halaman tabel data siswa yang benar
            navigate("/data-siswa") 
        })
        .catch((err) => {
            setIsLoading(false)
            console.error("Gagal tambah data:", err)
            alert("Terjadi kesalahan saat menambah data")
        })
    }

    return (
        <>
            <h3 className="mt-4 text-center">Masukan Data Siswa Baru</h3>
            <div className="container card mt-3 p-4 bg-dark text-white fw-bold">
                <form className="row g-3" onSubmit={handleSubmit}>
                    
                    {/* INPUT KODE SISWA */}
                    <div className="col-md-6">
                        <label htmlFor="kodeSiswa" className="form-label">Kode Siswa</label>
                        <input type="text" name="kode_siswa" placeholder="Contoh: S001" onChange={handleChange} className="form-control" value={form.kode_siswa} id="kodeSiswa" required />
                    </div>

                    {/* INPUT NAMA SISWA */}
                    <div className="col-md-6">
                        <label htmlFor="namaSiswa" className="form-label">Nama Siswa</label>
                        <input type="text" name="nama_siswa" placeholder="Ucup Nasrullah" onChange={handleChange} className="form-control" value={form.nama_siswa} id="namaSiswa" required />
                    </div>

                    {/* INPUT TANGGAL LAHIR */}
                    <div className="col-md-6">
                        <label htmlFor="tanggalLahir" className="form-label">Tanggal Lahir</label>
                        <input type="date" name="tanggal_lahir" onChange={handleChange} className="form-control" value={form.tanggal_lahir} id="tanggalLahir" required />
                    </div>

                    {/* INPUT JURUSAN SISWA */}
                    <div className="col-md-6">
                        <label htmlFor="jurusanSiswa" className="form-label">Jurusan</label>
                        <input type="text" name="jurusan_siswa" placeholder="Rekayasa Perangkat Lunak" onChange={handleChange} className="form-control" value={form.jurusan_siswa} id="jurusanSiswa" required />
                    </div>

                    {/* INPUT ALAMAT SISWA */}
                    <div className="col-12">
                        <label htmlFor="alamatSiswa">Alamat</label>
                        <textarea className="form-control" name="alamat_siswa" value={form.alamat_siswa} placeholder="Jln. Agung Sedayu No. 12" onChange={handleChange} id="alamatSiswa" style={{ height: "100px" }} required></textarea>
                    </div>

                    {/* TOMBOL AKSI */}
                    <div className="col-12 d-flex gap-3 mt-4">
                        <Link className="btn btn-secondary btn-lg" to="/data-siswa">Back</Link>
                        <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading}>
                            {isLoading ? (
                                <div>
                                    <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                                    <span>sabar woii!!</span>
                                </div>
                            ) : (
                                <span>Simpan</span>
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default CreateSiswa;