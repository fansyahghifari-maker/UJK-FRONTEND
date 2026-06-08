import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Beranda() {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <h1 className="text-center mt-4">SELAMAT DATANG DI ACADEMY FUTSAL</h1>
      <h6 className="text-center text-muted"> Sekarang Anda Adalah Bagian Dari Kami </h6>
      <hr className="border border-danger border-1 opacity-70" />
      
      <div className="d-grid gap-2 col-md-6 mx-auto my-4">
        <Link className="btn btn-primary btn-lg" to="/create-siswa" role="button">
          Daftar Baru (Tambah Siswa)
        </Link>
        <Link className="btn btn-secondary btn-lg" to="/data-siswa" role="button">
          Lihat Data Siswa
        </Link>
      </div>
      
      <hr className="border border-danger border-1 opacity-70" />

      <div className="d-flex justify-content-center m-4">
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            width: "100%",
            maxWidth: "500px",
            height: "250px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "12px",
            cursor: "pointer",
            transition: "transform 0.4s ease, box-shadow 0.4s ease",
            transform: hovered ? "scale(1.03)" : "scale(1)",
            boxShadow: hovered
              ? "0 0 40px rgba(100, 150, 255, 0.6)"
              : "0 4px 15px rgba(0,0,0,0.1)",
            background: "linear-gradient(135deg, #1e1e2f 0%, #0f0f1a 100%)", 
          }}
        >
          <div className="text-center p-4">
            <h2 className="text-white fw-bold mt-2">⚽ACADEMY FUTSAL⚽</h2>
            <p style={{ color: "#aad4ff", fontSize: "1.1rem" }}>
              Jelajahi Lebih Jauh Bersama Kami
            </p>
            <Link
              to="/siswa/tambah"
              className="btn btn-outline-light mt-2"
              style={{ borderRadius: "20px", padding: "6px 20px" }}
            >
              Daftar Sekarang →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Beranda;