import React, { useState } from "react";
import "./SearchForm.scss";

const SearchForm = () => {
  const [bienSo, setBienSo] = useState(""); // Biển số xe nhập vào
  const [result, setResult] = useState(null); // Kết quả tìm kiếm
  const [error, setError] = useState(""); // Lỗi khi tìm kiếm
  const [loading, setLoading] = useState(false); // Trạng thái loading

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!bienSo) {
      setError("Vui lòng nhập biển số xe!");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(
        `http://localhost:3000/api/bien-so/${bienSo}`
      );
      if (!response.ok) {
        throw new Error("Không tìm thấy biển số!");
      }
      const data = await response.json();
      setResult(data); // Lưu kết quả tìm kiếm
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-form">
      <h2>Tra cứu biển số xe</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={bienSo}
          onChange={(e) => setBienSo(e.target.value)}
          placeholder="Nhập biển số xe"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Đang tìm kiếm..." : "Tìm kiếm"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result">
          <h3>Chi tiết xe</h3>
          <p>
            <strong>Biển số:</strong> {result.bien_so}
          </p>
          <p>
            <strong>Chi tiết:</strong> {result.chi_tiet}
          </p>
          <p>
            <strong>Nguồn:</strong>{" "}
            <a href={result.nguon} target="_blank" rel="noopener noreferrer">
              {result.nguon}
            </a>
          </p>
          {result.hinh_anh && (
            <img
              src={`http://localhost:3000/uploads/${result.hinh_anh}`}
              alt={`Biển số ${result.bien_so}`}
              className="car-image"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SearchForm;
