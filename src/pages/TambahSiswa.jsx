import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react"
import { Link } from "react-router-dom";
import axios from "axios"

function FormTambahSiswa() {
    const [isLoading, setIsLoading] = useState(false)
    // mendefinisikan nilai awal state
    const [form, setForm] = useState({
        nama_siswa: "",
        email_siswa: "",
        alamat_siswa: ""
    })
    // fungsi untuk menyimpan inputan dari user ke dalam state
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        axios.post("https://mytechs.my.id/data_siswa_api/apiSiswa.php", form)
            .then((res) => {
                alert("Data Berhasil disimpan")
                setIsLoading(false)
                setForm({
                    nama_siswa: "",
                    email_siswa: "",
                    alamat_siswa: ""
                })
                console.log(res)
            })
    }
    return (
        <>

            <h3>Masukan Data Anda</h3>
            <div className="container card mt-3 bg-dark text-white fw-bold">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="inputName" className="form-label">Name</label>
                        <input type="text" name="nama_siswa" placeholder="Ucup Nasrullah" onChange={handleChange} className="form-control" value={form.nama_siswa} id="inputName" required />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputEmail4" className="form-label">Email</label>
                        <input type="email" name="email_siswa" placeholder="daito@gmail.com" onChange={handleChange} className="form-control" id="inputEmail4" value={form.email_siswa} required />
                    </div>
                    <div>
                        <label>Alamat</label>
                        <textarea className="form-control" name="alamat_siswa" value={form.alamat_siswa} placeholder="jln. agung sedayu" onChange={handleChange} id="floatingTextarea2" style={{ height: "100px" }} required></textarea>
                    </div>
                    <div className="d-flex gap-3 d-md-block ms-1">
                        <Link type="submit" className="btn btn-secondary btn-lg me-3"  value="button" to="/">Back in</Link>
                        <button type="submit" className="btn btn-primary btn-lg"  to="/data-tamu">
                            {isLoading ?

                                <div type="button" disabled>
                                    <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                    <span role="status">sabar woi</span>
                                </div>


                                :
                                <span>simpan</span>
                            }
                        </button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default FormTambahSiswa;