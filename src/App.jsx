import Navbar from "./components/Navbar";
import Beranda from "./pages/Beranda";
import DataSiswa from "./pages/DataSiswa";
import CreateSiswa from "./pages/CreateSiswa";
import { Routes, Route } from "react-router-dom";
import EditSiswa from "./pages/EditSiswa";

function App() {
  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <div className="card bg-dark text-white">
          <div className="card-body">

            <Routes>
              {/* Jalur utama ke halaman Beranda */}
              <Route path="/" element={<Beranda />} />
              
              {/* Jalur ke halaman tabel data */}
              <Route path="/data-siswa" element={<DataSiswa />} />
              
              {/* Jalur tambah data yang disesuaikan dengan tombol Beranda */}
              <Route path="/siswa/tambah" element={<CreateSiswa />} />
              <Route path="/siswa/edit/:id" element={<EditSiswa />} />

            </Routes>

          </div>
        </div>
      </div>
    </>
  );
}

export default App;