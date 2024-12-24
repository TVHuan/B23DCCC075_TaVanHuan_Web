import React, { useEffect, useState } from "react";
import "./AccidentCarList.scss";

const ITEMS_PER_PAGE = 8;

const AccidentCarList = ({ reload }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCar, setSelectedCar] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAccidentCars = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/bien-so");
        if (!response.ok) {
          throw new Error("Không thể tải danh sách xe tai nạn!");
        }
        const data = await response.json();

        // Xử lý dữ liệu để loại bỏ phần /uploads/ thừa
        const processedData = data.map((car) => {
          if (car.hinh_anh.startsWith("/uploads/")) {
            car.hinh_anh = car.hinh_anh.replace("/uploads/", "");
          }
          return car;
        });

        console.log(processedData); // Kiểm tra dữ liệu đã xử lý
        setCars(processedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAccidentCars();
  }, [reload]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSelectCar = (car) => {
    setSelectedCar(car);
  };

  const handleCloseModal = () => {
    setSelectedCar(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.trim()); // Loại bỏ khoảng trắng ở hai đầu
  };

  const handleSearch = () => {
    // Nếu từ khóa tìm kiếm có khoảng trắng, bỏ qua
    setSearchTerm(searchTerm.trim());
  };

  const filteredCars = cars.filter((car) =>
    car.bien_so.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCars = filteredCars.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredCars.length / ITEMS_PER_PAGE);

  if (loading) {
    return <p>Đang tải danh sách...</p>;
  }

  if (error) {
    return <p className="error">Lỗi: {error}</p>;
  }

  return (
    <div className="accident-car-list">
      <h2>Tra cứu</h2>

      {/* Phần tìm kiếm */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Nhập biển số VD: 88A12345"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="search-button" onClick={handleSearch}>
          Tra cứu
        </button>
      </div>

      <div className="car-grid">
        {currentCars.length === 0 ? (
          <p>Không có dữ liệu.</p>
        ) : (
          currentCars.map((car) => (
            <div
              className="car-item"
              key={car.id}
              onClick={() => handleSelectCar(car)}
            >
              <img
                src={`http://localhost:3000/uploads/${car.hinh_anh}`}
                alt={`Biển số ${car.bien_so}`}
                className="car-image"
              />
              <div className="car-info">
                <p>
                  <strong>Biển số:</strong> {car.bien_so}
                </p>
                <p>
                  <strong>Chi tiết:</strong> {car.chi_tiet}
                </p>
                <p>
                  <strong>Nguồn:</strong>{" "}
                  <a href={car.nguon} target="_blank" rel="noopener noreferrer">
                    {car.nguon}
                  </a>
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Modal hiển thị chi tiết */}
      {selectedCar && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={handleCloseModal} className="close-button">
              Quay lại
            </button>
            <h2>Chi tiết xe</h2>
            <img
              src={`http://localhost:3000/uploads/${selectedCar.hinh_anh}`}
              alt={`Biển số ${selectedCar.bien_so}`}
              className="car-image"
            />
            <div className="car-info">
              <p>
                <strong>Biển số:</strong> {selectedCar.bien_so}
              </p>
              <p>
                <strong>Chi tiết:</strong> {selectedCar.chi_tiet}
              </p>
              <p>
                <strong>Nguồn:</strong>{" "}
                <a
                  href={selectedCar.nguon}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {selectedCar.nguon}
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccidentCarList;
