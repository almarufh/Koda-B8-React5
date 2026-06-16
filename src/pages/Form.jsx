import { useState, useEffect } from "react";
import * as Yup from "yup";

/**
 * @typedef {Object} FormData
 * @property {string} nama_lengkap
 * @property {string|number} Umur
 * @property {string} jenis_kelamin
 * @property {string} perokok
 * @property {string[]} rokok
 */

/**
 * @typedef {Object} FormErrors
 * @property {string} [nama_lengkap]
 * @property {string} [Umur]
 * @property {string} [jenis_kelamin]
 * @property {string} [perokok]
 * @property {string} [rokok]
 */

const validationSchema = Yup.object().shape({
  nama_lengkap: Yup.string()
    .matches(/^[a-zA-Z\s]{3,}$/, "Minimal 3 huruf, tanpa simbol/angka")
    .required("Nama wajib diisi"),
  Umur: Yup.number()
    .typeError("Umur harus berupa angka")
    .min(17, "Minimal 17 tahun")
    .required("Umur wajib diisi"),
  jenis_kelamin: Yup.string().required("Pilih salah satu"),
  perokok: Yup.string().required("Pilih salah satu"),
  rokok: Yup.array().when("perokok", {
    is: "Perokok",
    then: (schema) => schema.min(1, "Pilih minimal satu jenis rokok"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

/**
 * @returns {JSX.Element}
 */
export default function SurveyForm() {
  const initialData = {
    nama_lengkap: "",
    Umur: "",
    jenis_kelamin: "",
    perokok: "",
    rokok: [],
  };

  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        setErrors({});
        setIsValid(true);
      })
      .catch((err) => {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
        setIsValid(false);
      });
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem("sample") || "[]");
    localStorage.setItem("sample", JSON.stringify([...existing, formData]));
    alert("Data berhasil disimpan!");
    setFormData(initialData);
  };

  const handleReset = () => {
    setFormData(initialData);
  };

  return (
    <div className="bg-[#f0ebf8] min-h-screen p-5 flex flex-col items-center">
      <form onSubmit={handleSubmit} className="w-full max-w-[640px] grid grid-cols-1 gap-3">
        <div className="bg-white rounded-lg border-t-[10px] border-[#673ab7] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.12)]">
          <div className="text-[32px] font-normal text-[#202124]">Form Survey Perokok</div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.12)] flex flex-col gap-2">
          <label className="font-medium">Siapa nama anda?</label>
          <input 
            className="w-1/2 border-b border-[#dadce0] py-2 outline-none focus:border-[#673ab7] bg-transparent"
            value={formData.nama_lengkap}
            onChange={
                (e) => setFormData({
                    ...formData, 
                    nama_lengkap: 
                    e.target.value
                })
            }
          />
          {errors.nama_lengkap && <p className="text-red-500 text-xs">{errors.nama_lengkap}</p>}
        </div>

        <div className="bg-white rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.12)] flex flex-col gap-2">
          <label className="font-medium">Berapa umur anda?</label>
          <input 
            className="w-1/2 border-b border-[#dadce0] py-2 outline-none focus:border-[#673ab7] bg-transparent"
            value={formData.Umur}
            onChange={
                (e) => setFormData({
                    ...formData, Umur: e.target.value
                })
            }
          />
          {errors.Umur && <p className="text-red-500 text-xs">{errors.Umur}</p>}
        </div>

        <div className="bg-white rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.12)] flex flex-col gap-2">
          <label className="font-medium">Apa jenis kelamin anda?</label>
          {["Laki-laki", "Perempuan"].map((p) => (
            <label key={p} className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="jenis_kelamin" 
                value={p} 
                checked={formData.jenis_kelamin === p} 
                onChange={(e) => setFormData({
                    ...formData, 
                    jenis_kelamin: e.target.value
                    })
                } 
                className="accent-[#673ab7]" 
                />
              {p}
            </label>
          ))}
          {errors.jenis_kelamin && <p className="text-red-500 text-xs">{errors.perokok}</p>}
        </div>

        <div className="bg-white rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.12)] flex flex-col gap-2">
          <label className="font-medium">Apakah anda perokok?</label>
          {["Perokok", "Bukan Perokok"].map((p) => (
            <label key={p} className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="perokok" 
                value={p} 
                checked={formData.perokok === p} 
                onChange={(e) => setFormData({
                    ...formData, 
                    perokok: e.target.value
                    })
                } 
                className="accent-[#673ab7]" 
                />
              {p}
            </label>
          ))}
          {errors.perokok && <p className="text-red-500 text-xs">{errors.perokok}</p>}
        </div>

        {formData.perokok === "Perokok" && (
          <div className="bg-white rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.12)] flex flex-col gap-2">
            <label className="font-medium">Jenis rokok:</label>
            {["Gudang Garam", "Lucky Strike", "Marlboro", "Esse"].map((r) => (
              <label key={r} className="flex items-center gap-2 cursor-pointer">
                <input 
                type="checkbox" 
                checked={formData.rokok.includes(r)} 
                onChange={(e) => {
                  const val = e.target.checked ? [...formData.rokok, r] : formData.rokok.filter(i => i !== r);
                  setFormData({...formData, rokok: val});
                }} 
                className="accent-[#673ab7]" />
                {r}
              </label>
            ))}
            {errors.rokok && <p className="text-red-500 text-xs">{errors.rokok}</p>}
          </div>
        )}

        <div className="w-full flex gap-3 mt-4 justify-between">
          <button 
            type="submit"
            className="bg-[#673ab7] text-white px-6 py-2 rounded disabled:bg-gray-400"
          >
            Kirim
          </button>
          <button 
            type="button" 
            className="bg-blue-600 text-white px-6 py-2 rounded"
            onClick={() => window.location.href = "/show"}
          >
            Show Results
          </button>
          <button 
            type="button" 
            onClick={handleReset}
            className="bg-gray-500 text-white px-6 py-2 rounded"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}