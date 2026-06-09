import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom" // Mengurangi import 'Navigate' yang tidak terpakai

function DataSiswa() {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])
    const navigate = useNavigate() // Memperbaiki penulisan variabel (huruf kecil 'n')

    const getData = () => {
        setIsLoading(true)
        axios.get('http://localhost:5000/siswa')
            .then((response) => {
                console.log('response', response.data)
                setIsLoading(false)
                // LANGSUNG SET DATA karena res.json(hasil) dari Express sudah otomatis Array
                setData(response.data)
            })
            .catch((err) => {
                setIsLoading(false)
                console.error(err)
            })
    }

    useEffect(() => {
        getData()
    }, [])

    const handleEdit = (id) => {
        navigate(`/siswa/edit/${id}`) // Menggunakan 'navigate' huruf kecil
    }

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("yakin nih di hapus?")
        if (confirmDelete) {
            axios.delete(`http://localhost:5000/siswa/${id}`)
                .then((res) => {
                    alert("Data Berhasil di hapus")
                    console.log(res)
                    getData() // Refresh data setelah berhasil dihapus
                })
                .catch((err) => {
                    console.error("Gagal menghapus:", err)
                })
        }
    }

    return (
        <>
            <h4 className="mt-4 text-center">Data Siswa</h4>
            <div className="container card mt-4 p-3 ">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Kode Siswa</th>
                            <th scope="col">Nama Siswa</th>
                            <th scope="col">Tgl Lahir</th>
                            <th scope="col">Alamat Siswa</th>
                            <th scope="col">Jurusan Siswa</th>
                            <th scope="col">Aksi</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="6" align="center"> {/* Diubah ke 6 sesuai jumlah kolom */}
                                    <div className="py-3">
                                        <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                                        <span role="status">sabar cill...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : (    
                            data.map((item) => (
                                <tr key={item.kode_siswa}>
                                    <td>{item.kode_siswa}</td>
                                    <td>{item.nama_siswa}</td>
                                    <td className="text-nowrap">{item.tanggal_lahir ? item.tanggal_lahir.split('T')[0]:""}</td> 
                                    <td>{item.alamat_siswa}</td>  {/* FIX: Posisi ditukar agar pas dengan header */}
                                    <td>{item.jurusan_siswa}</td>
                                    <td>
                                        {/* FIX: Menggunakan item.kode_siswa */}
                                        <button className="btn btn-warning btn-sm me-2 mb-2" onClick={() => handleEdit(item.kode_siswa)}>
                                            <i className="bi bi-pencil me-1"></i>Edit
                                        </button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.kode_siswa)}>
                                            <i className="bi bi-trash me-1"></i>Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default DataSiswa