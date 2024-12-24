import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./AddBienso.scss";

const API_URL = "http://localhost:3000/api/bien-so";

const AddBienso = () => {
  const [bienSo, setBienSo] = useState("");
  const [hinhAnh, setHinhAnh] = useState(null);
  const [chiTiet, setChiTiet] = useState("");
  const [nguon, setNguon] = useState("");
  const [showForm, setShowForm] = useState(false);

  const formRef = useRef(null);

  const handleImageChange = (e) => {
    setHinhAnh(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bienSo || !chiTiet || !nguon || !hinhAnh) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    const formData = new FormData();
    formData.append("bien_so", bienSo);
    formData.append("hinh_anh", hinhAnh);
    formData.append("chi_tiet", chiTiet);
    formData.append("nguon", nguon);

    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(response.data.message);
      setBienSo("");
      setHinhAnh(null);
      setChiTiet("");
      setNguon("");
      setShowForm(false);
    } catch (error) {
      alert("Lỗi khi thêm biển số: " + error.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowForm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="add-bien-so">
      {!showForm ? (
        <button onClick={() => setShowForm(true)} className="them-button">
          Đóng góp dữ liệu
        </button>
      ) : (
        <div className="form-container" onClick={(e) => e.stopPropagation()}>
          <form ref={formRef} onSubmit={handleSubmit} className="bien-so-form">
            <div>
              <label>Biển số</label>
              <input
                type="text"
                value={bienSo}
                onChange={(e) => setBienSo(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Chọn hình ảnh</label>
              <input type="file" onChange={handleImageChange} required />
            </div>
            <div>
              <label>Chi tiết</label>
              <textarea
                value={chiTiet}
                onChange={(e) => setChiTiet(e.target.value)}
              />
            </div>
            <div>
              <label>Nguồn</label>
              <input
                type="text"
                value={nguon}
                onChange={(e) => setNguon(e.target.value)}
              />
            </div>
            <button type="submit">Thêm biển số</button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="cancel-btn"
            >
              Hủy
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddBienso;
