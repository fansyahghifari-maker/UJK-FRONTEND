import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom"; // Kita gunakan Link yang sudah kamu import ini

function Navbar() {
    return (
        <>
            {/* Mengubah warna tema navbar menjadi dark (gelap) biar serasi dengan card aplikasi kamu */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary">
                <div className="container-fluid">
                    {/* FIX: Mengubah <a> menjadi <Link> */}
                    <Link className="navbar-brand fw-bold text-primary" to="/">AF</Link>
                    
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                {/* FIX: Mengubah <a> menjadi <Link> */}
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                {/* FIX: Mengubah <a> menjadi <Link> untuk halaman DATA SISWA */}
                                <Link className="nav-link fw-bold" to="/data-siswa">DATA SISWA</Link>
                            </li>
                            <li className="nav-item">
                                {/* Tambahan: Menu Tambah Siswa biar gampang navigasinya */}
                                <Link className="nav-link" to="/siswa/tambah">TAMBAH DATA</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;