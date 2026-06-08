import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditSiswa() {
    const navigate = useNavigate();
    const { id } = useParams(); // Mengambil kode_siswa dari parameter URL
    const [isLoading, setIsLoading] = useState(false);
    
    // 1. FIX: Sesuaikan state dengan kolom database MySQL lokal kamu
    const [form, setForm] = useState({
        kode_siswa: "",
        nama_siswa: "",
        tanggal_lahir: "",
        alamat_siswa: "",
        jurusan_siswa: ""
    });
    
    // Ambil data siswa lama dari backend lokal saat halaman pertama kali dimuat
    useEffect(() => {
        axios.get(`http://localhost:5000/siswa/${id}`)
            .then((res) => {
                // Menangani jika response berbentuk array atau objek langsung
                const dataSiswa = Array.isArray(res.data) ? res.data[0] : res.data;
                
                if (dataSiswa) {
                    setForm({
                        kode_siswa: dataSiswa.kode_siswa || "",
                        nama_siswa: dataSiswa.nama_siswa || "",
                        // Ambil 10 karakter pertama (YYYY-MM-DD) agar pas dengan format input type="date"
                        tanggal_lahir: dataSiswa.tanggal_lahir ? dataSiswa.tanggal_lahir.substring(0, 10) : "", 
                        alamat_siswa: dataSiswa.alamat_siswa || "",
                        jurusan_siswa: dataSiswa.jurusan_siswa || ""
                    });
                }
            })
            .catch((err) => {
                console.error("Gagal memuat data siswa:", err);
                alert("Gagal mengambil data siswa dari server!");
            });
    }, [id]);
    
    // Fungsi mencatat perubahan input form
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    
    // Fungsi submit untuk memperbarui data (PUT)
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        
        axios.put(`http://localhost:5000/siswa/${id}`, form)
            .then((res) => {
                alert("Data Siswa Berhasil diperbarui!");
                setIsLoading(false);
                navigate("/data-siswa"); // Redirect kembali ke tabel data siswa
            })
            .catch((err) => {
                setIsLoading(false);
                console.error("Gagal memperbarui data:", err);
                alert("Terjadi kesalahan saat memperbarui data");
            });
    };

    return (
        <>
            <h3 className="mt-4 text-center">Edit Data Siswa</h3>
            <div className="container card mt-3 p-4 bg-dark text-white fw-bold">
                <form className="row g-3" onSubmit={handleSubmit}>
                    
                    {/* KODE SISWA (READ-ONLY) */}
                    <div className="col-md-6">
                        <label className="form-label">Kode Siswa</label>
                        <input type="text" name="kode_siswa" className="form-control bg-secondary text-white" value={form.kode_siswa} disabled />
                    </div>

                    {/* INPUT NAMA SISWA */}
                    <div className="col-md-6">
                        <label htmlFor="inputName" className="form-label">Nama Siswa</label>
                        <input type="text" name="nama_siswa" onChange={handleChange} className="form-control" value={form.nama_siswa} id="inputName" required />
                    </div>

                    {/* INPUT TANGGAL LAHIR */}
                    <div className="col-md-6">
                        <label htmlFor="inputTanggal" className="form-label">Tanggal Lahir</label>
                        <input type="date" name="tanggal_lahir" onChange={handleChange} className="form-control" id="inputTanggal" value={form.tanggal_lahir} required />
                    </div>

                    {/* INPUT JURUSAN */}
                    <div className="col-md-6">
                        <label htmlFor="inputJurusan" className="form-label">Jurusan</label>
                        <input type="text" name="jurusan_siswa" onChange={handleChange} className="form-control" id="inputJurusan" value={form.jurusan_siswa} required />
                    </div>

                    {/* INPUT ALAMAT */}
                    <div className="col-12">
                        <label htmlFor="textareaAlamat" className="form-label">Alamat</label>
                        <textarea className="form-control" name="alamat_siswa" value={form.alamat_siswa} onChange={handleChange} id="textareaAlamat" style={{ height: "100px" }} required></textarea>
                    </div>

                    {/* TOMBOL AKSI */}
                    <div className="col-12 d-flex gap-3 mt-4">
                        <Link className="btn btn-secondary btn-lg" to="/data-siswa">Batal</Link>
                        <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading}>
                            {isLoading ? (
                                <div className="d-flex align-items-center">
                                    <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                                    <span>Sabar woii!!</span>
                                </div>
                            ) : (
                                <span>Simpan Perubahan</span>
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </>
    );
}

export default EditSiswa;