import { useState, useEffect } from "react";

/**
 * @typedef {Object} SurveyData
 * @property {string} nama_lengkap
 * @property {string|number} Umur
 * @property {string} jenis_kelamin
 * @property {string} perokok
 * @property {string[]} rokok
 */

/**
 * @returns {JSX.Element}
 */
export default function SurveyTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const savedData = localStorage.getItem("sample");
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  /**
   * @returns {void}
   */
  const handleDeleteAll = () => {
    if (confirm("Apakah Anda yakin ingin menghapus seluruh data survey?")) {
      localStorage.removeItem("sample");
      setData([]);
      alert("Seluruh data berhasil dihapus!");
    }
  };

  return (
    <div className="bg-[#f4f7f6] min-h-screen py-10 px-5 flex flex-col items-center">
      <h2 className="text-[#333] mb-5 text-2xl font-bold">Data Hasil Survey</h2>

      <table className="w-full max-w-[900px] border-collapse bg-white shadow-[0_4px_6px_rgba(0,0,0,0.1)] rounded-lg overflow-hidden mb-6">
        <thead className="bg-[#673ab7] text-white">
          <tr>
            <th className="p-3 px-4 text-left text-sm uppercase">No.</th>
            <th className="p-3 px-4 text-left text-sm uppercase">Nama</th>
            <th className="p-3 px-4 text-left text-sm uppercase">Umur</th>
            <th className="p-3 px-4 text-left text-sm uppercase">Jenis Kelamin</th>
            <th className="p-3 px-4 text-left text-sm uppercase">Perokok</th>
            <th className="p-3 px-4 text-left text-sm uppercase">Merk Rokok</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index} className="hover:bg-[#f9f9f9] transition-colors border-b border-[#e0e0e0]">
                <td className="p-3 px-4 text-[15px] text-[#444]">{index + 1}</td>
                <td className="p-3 px-4 text-[15px] text-[#444]">{item.nama_lengkap || "-"}</td>
                <td className="p-3 px-4 text-[15px] text-[#444]">{item.Umur || "-"}</td>
                <td className="p-3 px-4 text-[15px] text-[#444]">{item.jenis_kelamin || "-"}</td>
                <td className="p-3 px-4 text-[15px] text-[#444]">{item.perokok || "-"}</td>
                <td className="p-3 px-4 text-[15px] text-[#444]">
                  {Array.isArray(item.rokok) ? item.rokok.join(", ") : (item.rokok || "-")}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="p-6 text-center italic text-[#888]">
                Belum ada data survey tersimpan.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-center items-center gap-4">
        <button 
          onClick={() => window.history.back()} 
          className="bg-[#673ab7] hover:bg-[#5e35b1] text-white py-2.5 px-6 rounded font-medium text-sm transition-colors"
        >
          Kembali ke Form
        </button>
        <button 
          onClick={handleDeleteAll} 
          className="bg-red-600 hover:bg-red-700 text-white py-2.5 px-6 rounded font-medium text-sm transition-colors"
        >
          Hapus Semua Data
        </button>
      </div>
    </div>
  );
}