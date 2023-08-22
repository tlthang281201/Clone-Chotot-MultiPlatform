import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "./../Redux/Actions/ProductActions";
import { Link } from "react-router-dom";
import Loading from "./../components/LoandingError/Loading";
import Message from "./../components/LoandingError/Error";
import "./../css/searchForm.css";
import Footer from "../components/Footer";
import axios from "axios";
import "./../css/header.css";
import { logout } from "../Redux/Actions/UserActions";

const Search1 = () => {
  const cities = ["Đà Nẵng", "Huế", "Quảng Nam", "Quảng Ngãi"];
  const district1 = ["Hải châu", "Thanh khê", "Ngũ hành sơn", "Liên chiểu"];
  const district2 = ["Nam Đông", "Phong Điền", "Phú Lộc", "Phú Vang"];
  const district3 = ["Đại Lộc", "Đông Giang", "Phú Ninh", "Quế Sơn"];
  const wards = ["Hải Châu 1", "Hoà Cường Bắc", "Nam Dương", "Phước Ninh"];
  const prices = [
    "Tất cả",
    "Từ 10 ngàn đến 500 ngàn",
    "Từ 500 ngàn đến 2 triệu",
    "Từ 2 triệu đến 5 triệu",
    "Trên 5 triệu",
  ];

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [price1, setPrice] = useState(0);
  const [priceAscent, setPriceAscent] = useState(true);
  const [city, setCity] = useState("");

  const defaultOptions = {
    significantDigits: 2,
    thousandsSeparator: ",",
    decimalSeparator: ".",
    symbol: "",
  };

  const currencyFormatter = (value, options) => {
    if (typeof value !== "number") value = 0.0;
    options = { ...defaultOptions, ...options };
    value = value.toFixed(options.significantDigits);

    const [currency, decimal] = value.split(".");
    return `${currency.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      options.thousandsSeparator
    )}`;
  };

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/products`);
    let price = parseInt(price1);
    if (price === 0) {
      if (priceAscent === true) {
        setProducts(
          data
            .filter(
              (data) =>
                data.title
                  .toString()
                  .toLowerCase()
                  .includes(search.toString().toLowerCase()) &&
                data.category.includes(category) &&
                data.city.includes(city) &&
                data.isShow === true &&
                data.isAccept === 1 &&
                data.isSold === false
            )
            .sort((a, b) => a.price - b.price)
        );
      } else {
        setProducts(
          data
            .filter(
              (data) =>
                data.title
                  .toString()
                  .toLowerCase()
                  .includes(search.toString().toLowerCase()) &&
                data.category.includes(category) &&
                data.city.includes(city) &&
                data.isShow === true &&
                data.isAccept === 1 &&
                data.isSold === false
            )
            .sort((a, b) => b.price - a.price)
        );
      }
    } else if (price === 1) {
      if (priceAscent === true) {
        setProducts(
          data
            .filter(
              (data) =>
                data.title
                  .toString()
                  .toLowerCase()
                  .includes(search.toString().toLowerCase()) &&
                data.category.includes(category) &&
                data.city.includes(city) &&
                data.price >= 10000 &&
                data.price <= 500000 &&
                data.isShow === true &&
                data.isAccept === 1 &&
                data.isSold === false
            )
            .sort((a, b) => a.price - b.price)
        );
      } else {
        setProducts(
          data
            .filter(
              (data) =>
                data.title
                  .toString()
                  .toLowerCase()
                  .includes(search.toString().toLowerCase()) &&
                data.category.includes(category) &&
                data.city.includes(city) &&
                data.price >= 10000 &&
                data.price <= 500000 &&
                data.isShow === true &&
                data.isAccept === 1 &&
                data.isSold === false
            )
            .sort((a, b) => b.price - a.price)
        );
      }
    } else if (price === 2) {
      if (priceAscent === true) {
        setProducts(
          data
            .filter(
              (data) =>
                data.title
                  .toString()
                  .toLowerCase()
                  .includes(search.toString().toLowerCase()) &&
                data.category.includes(category) &&
                data.city.includes(city) &&
                data.price > 500000 &&
                data.price <= 2000000 &&
                data.isShow === true &&
                data.isAccept === 1 &&
                data.isSold === false
            )
            .sort((a, b) => a.price - b.price)
        );
      } else {
        setProducts(
          data
            .filter(
              (data) =>
                data.title
                  .toString()
                  .toLowerCase()
                  .includes(search.toString().toLowerCase()) &&
                data.category.includes(category) &&
                data.city.includes(city) &&
                data.price > 500000 &&
                data.price <= 2000000 &&
                data.isShow === true &&
                data.isAccept === 1 &&
                data.isSold === false
            )
            .sort((a, b) => b.price - a.price)
        );
      }
    } else if (price === 3) {
      if (priceAscent === true) {
        setProducts(
          data
            .filter(
              (data) =>
                data.title
                  .toString()
                  .toLowerCase()
                  .includes(search.toString().toLowerCase()) &&
                data.category.includes(category) &&
                data.city.includes(city) &&
                data.price > 2000000 &&
                data.price <= 5000000 &&
                data.isShow === true &&
                data.isAccept === 1 &&
                data.isSold === false
            )
            .sort((a, b) => a.price - b.price)
        );
      } else {
        setProducts(
          data
            .filter(
              (data) =>
                data.title
                  .toString()
                  .toLowerCase()
                  .includes(search.toString().toLowerCase()) &&
                data.category.includes(category) &&
                data.city.includes(city) &&
                data.price > 2000000 &&
                data.price <= 5000000 &&
                data.isShow === true &&
                data.isAccept === 1 &&
                data.isSold === false
            )
            .sort((a, b) => b.price - a.price)
        );
      }
    } else {
      if (priceAscent === true) {
        setProducts(
          data
            .filter(
              (data) =>
                data.title
                  .toString()
                  .toLowerCase()
                  .includes(search.toString().toLowerCase()) &&
                data.category.includes(category) &&
                data.city.includes(city) &&
                data.price >= 5000000 &&
                data.isShow === true &&
                data.isAccept === 1 &&
                data.isSold === false
            )
            .sort((a, b) => a.price - b.price)
        );
      } else {
        setProducts(
          data
            .filter(
              (data) =>
                data.title
                  .toString()
                  .toLowerCase()
                  .includes(search.toString().toLowerCase()) &&
                data.category.includes(category) &&
                data.city.includes(city) &&
                data.price >= 5000000 &&
                data.isShow === true &&
                data.isAccept === 1 &&
                data.isSold === false
            )
            .sort((a, b) => b.price - a.price)
        );
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      fetchProducts();
    }
  };

  return (
    <div>
      <div className="Announcement">
        <div
          className="header"
          style={{
            background: "#FFBA00",
            marginTop: "-20px",
            marginBottom: "-10px",
          }}
        >
          <div className="container">
            {/* mobile headr */}

            {/*PC header */}
            <div className="pc-header">
              <div className="row">
                <div className="col-md-3 col-4 d-flex align-items-center">
                  <Link className="navbar-brand" to="/">
                    <img
                      src="https://static.chotot.com/storage/default/transparent_logo.webp"
                      alt="logo"
                    />
                  </Link>
                </div>
                <div
                  className="col-md-6 col-8 d-flex align-items-center"
                  style={{}}
                >
                  <div className="container">
                    <div className="row">
                      <div className="col-12" style={{ marginTop: "12px" }}>
                        <ul className="menu-2-2">
                          <li>
                            <Link
                              to="/"
                              style={{ color: "#000", textDecoration: "none" }}
                            >
                              {" "}
                              Trang chủ{" "}
                            </Link>
                          </li>

                          <li>
                            <Link
                              to="/search1"
                              style={{ color: "#000", textDecoration: "none" }}
                            >
                              {" "}
                              Tin Đăng{" "}
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={userInfo ? "/quan-ly-tin" : "/login"}
                              style={{ color: "#000", textDecoration: "none" }}
                            >
                              {" "}
                              Quản lý tin{" "}
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/contact"
                              style={{ color: "#000", textDecoration: "none" }}
                            >
                              {" "}
                              Liên hệ{" "}
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 d-flex align-items-center justify-content-end Login">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="name-button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i class="fa-solid fa-user"></i>
                    </button>
                    {userInfo ? (
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/profile">
                          Thông tin cá nhân
                        </Link>
                        <Link className="dropdown-item" to="/don-ban">
                          Đơn Bán
                        </Link>
                        <Link className="dropdown-item" to="/don-mua">
                          Đơn Mua
                        </Link>
                        <Link
                          className="dropdown-item"
                          to="#"
                          onClick={logoutHandler}
                        >
                          Đăng xuất
                        </Link>
                      </div>
                    ) : (
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/login">
                          Đăng nhập
                        </Link>
                        <Link className="dropdown-item" to="/register">
                          Đăng ký
                        </Link>
                      </div>
                    )}
                  </div>

                  <div className="post-product">
                    <Link to="/search1">
                      <i
                        class="fa-solid fa-magnifying-glass"
                        style={{ color: "#fff" }}
                      ></i>
                    </Link>
                  </div>
                </div>
                <div className="col-12">
                  <div className="row">
                    <div
                      className="col-md-8  d-flex align-items-center"
                      style={{ position: "relative" }}
                    >
                      <div className="input-group">
                        <div style={{ display: "flex" }}>
                          <input
                            type="search"
                            className="form-control rounded search"
                            placeholder="Search"
                            onChange={(e) => {
                              const key = e.target.value.replace(/  +/g, " ");
                              setSearch(key.replace(/^[ \t]+|[ \t]+$/gm, ""));
                            }}
                            style={{ zIndex: "1" }}
                            onKeyDown={(e) => handleKeyDown(e)}
                          />
                          <button
                            type="submit"
                            className="search-button"
                            onClick={() => fetchProducts()}
                            style={{
                              position: "absolute",
                              bottom: "32%",
                              zIndex: "1000",
                              right: "1%",
                              height: "30px",
                              width: "50px",
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              data-type="monochrome"
                              viewBox="0 0 16 16"
                              width="1em"
                              height="1em"
                              fill="none"
                            >
                              <path
                                fill="currentColor"
                                d="M6.4 0a6.369 6.369 0 00-4.525 1.873A6.425 6.425 0 00.502 3.906v.002A6.383 6.383 0 000 6.398a6.372 6.372 0 001.875 4.524 6.385 6.385 0 008.428.537l-.006.006 4.295 4.293a.827.827 0 001.166-1.166l-4.295-4.295a6.368 6.368 0 00-.537-8.424A6.372 6.372 0 006.4 0zm0 1.615a4.75 4.75 0 013.383 1.4c.44.44.785.95 1.028 1.522h-.002c.249.59.377 1.214.377 1.861 0 .648-.128 1.27-.377 1.862h.002a4.783 4.783 0 01-2.55 2.545c-.59.25-1.213.377-1.86.377a4.761 4.761 0 01-1.864-.377A4.749 4.749 0 013.016 9.78c-.44-.44-.783-.95-1.024-1.521a4.735 4.735 0 01-.377-1.862c0-.647.127-1.272.377-1.863a4.75 4.75 0 011.024-1.52 4.754 4.754 0 013.384-1.4z"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    {userInfo ? (
                      <div className="col-md-4" style={{ display: "flex" }}>
                        <Link to="/user" style={{ display: "flex" }}>
                          <img
                            src={userInfo.avatar}
                            alt="a"
                            style={{ width: "40px", height: "40px" }}
                          />
                          <h6
                            style={{
                              fontSize: "20px",
                              marginTop: "10px",
                              marginLeft: "20px",
                              color: "#000",
                            }}
                          >
                            {userInfo && userInfo.name ? userInfo.name : null}
                          </h6>
                        </Link>
                        <button
                          style={{
                            border: "none",
                            background: "#ff8800",
                            borderRadius: "5px",
                            marginLeft: "80px",
                            paddingLeft: "20px",
                          }}
                        >
                          <center>
                            <Link to="/newproduct" style={{ fontSize: "15px" }}>
                              Đăng Tin
                            </Link>
                          </center>
                        </button>
                      </div>
                    ) : (
                      <div className="col-md-4" style={{ textAlign: "right" }}>
                        <Link to="/login">Đăng nhập</Link>
                        <Link to="/register">Đăng ký</Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>

      <div className="searchForm">
        <div
          className="searchForm-center"
          style={{
            background: "#fff",
          }}
        >
          <select
            id="ddCity"
            onChange={(e) => {
              if (e.target.value === "Tất cả") setCategory("");
              else setCategory(e.target.value);
            }}
          >
            <option value="Tất cả" selected>
              Tất cả
            </option>
            <option value="Đồ điện tử">Đồ điện tử</option>
            <option value="Thời trang, đồ dùng cá nhân">
              Thời trang, đồ dùng cá nhân
            </option>
            <option value="Giải trí thể thao">Giải trí thể thao</option>
          </select>
          <select
            id="ddCity"
            onChange={(e) => {
              if (e.target.value === "Tất cả") setCity("");
              else setCity(e.target.value);
            }}
          >
            <option value="Tất cả">Tất cả</option>
            {cities.map((data, index) => (
              <option
                key={index}
                value={data}
                onChange={(e) => setCity(e.target.value)}
              >
                {data}
              </option>
            ))}
          </select>
          <div className="searchForm-center-1">
            <select
              className="priceForm"
              onChange={(e) => setPrice(e.target.value)}
            >
              {prices.map((data, index) => (
                <option
                  key={index}
                  value={index}
                  onChange={(e) => setPrice(e.target.value)}
                >
                  {data}
                </option>
              ))}
            </select>
            <select
              className="arrangeForm"
              onChange={(e) => setPriceAscent(e.target.value)}
            >
              <option
                value={true}
                onChange={(e) => setPriceAscent(e.target.value)}
              >
                Giá tăng dần
              </option>
              <option
                value={false}
                onChange={(e) => setPriceAscent(e.target.value)}
              >
                Giá giảm dần
              </option>
            </select>
          </div>
          <button
            onClick={() => fetchProducts()}
            style={{ borderRadius: "5px" }}
            className="btn-searchForm"
          >
            Áp dụng
          </button>
        </div>
      </div>

      <div className="container">
        <div
          className="section"
          style={{
            background: "#fff",
            paddingLeft: "70px",
            paddingTop: "50px",
            marginTop: "30px",
          }}
        >
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                {products.length > 0 ? (
                  products.map((product) => (
                    <div
                      className="shop col-lg-4 col-md-6 col-sm-6"
                      key={product._id}
                    >
                      <div className="border-product">
                        <Link
                          to={`/products/${product._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <div
                            className="shopBack"
                            style={{ position: "relative" }}
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              style={{ zIndex: "1" }}
                            />
                          </div>
                        </Link>

                        <div className="shoptext">
                          <p>
                            <Link
                              to={`/products/${product._id}`}
                              style={{
                                textDecoration: "none",
                              }}
                            >
                              <h3
                                style={{
                                  fontWeight: "600",
                                  fontSize: "18px",
                                }}
                              >
                                {product.title}
                              </h3>
                            </Link>
                          </p>
                          <h4
                            style={{
                              fontWeight: "600",
                              fontSize: "15px",
                              marginTop: "-20px",
                            }}
                          >
                            {currencyFormatter(product.price, defaultOptions) +
                              "đ"}
                          </h4>
                          <h5
                            style={{
                              fontWeight: "400",
                              fontSize: "13px",
                              color: "grey",
                              marginTop: "-10px",
                            }}
                          >
                            <img
                              src="https://static.chotot.com/storage/chotot-icons/svg/user.svg"
                              width={16}
                              height={16}
                              alt="a"
                            />{" "}
                            {product.createdAt} - {product.city}
                          </h5>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                    className="col-lg-12"
                    style={{ textAlign: "center", padding: "50px" }}
                  >
                    <h5>Không có tin đăng phù hợp yêu cầu</h5>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Search1;
