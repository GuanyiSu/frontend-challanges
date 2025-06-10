import { useEffect, useState } from "react";
import "./App.css";

const PAGE_SIZE = 10;
const PAGE_DISPLAY = 5;
const CATAGORIES = ["vehicle", "beauty", "laptops", "groceries", "furniture"];

function App() {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [maxPage, setMaxPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");

  // const getLeftMostPage = () => {
  //   const numPageLeft = Math.floor(PAGE_DISPLAY / 2);
  //   if (page <= numPageLeft) return 1;
  //   return page - numPageLeft;
  // };

  // const getRightMostPage = () => {
  //   const numPageRight = Math.floor(PAGE_DISPLAY / 2);
  //   if (page <= numPageRight) return PAGE_DISPLAY;
  //   if (page >= maxPage - numPageRight) return maxPage;
  //   return page + numPageRight;
  // };

  const handleSearchChange = (e) => {
    setPage(1);
    setSearchText(e.target.value);
  };

  // const leftMostPage = getLeftMostPage();
  // const rightMostPage = getRightMostPage();

  useEffect(() => {
    const baseFetchUrl =
      searchText !== ""
        ? `https://dummyjson.com/products/search?q=${searchText}&`
        : category !== ""
        ? `https://dummyjson.com/products/category/${category}?`
        : "https://dummyjson.com/products?";

    const fetchUrl = `${baseFetchUrl}limit=${PAGE_SIZE}&skip=${
      (page - 1) * PAGE_SIZE
    }`;

    fetch(fetchUrl)
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.products);
        setMaxPage(Math.ceil(res.total / PAGE_SIZE));
      });
  }, [page, searchText, category]);

  return (
    <div className="section">
      <div className="main-container">
        <input
          type="text"
          placeholder="Search"
          className="search-bar"
          value={searchText}
          onChange={(e) => handleSearchChange(e)}
        />
        <div className="category-list">
          {CATAGORIES.map((c) => (
            <button
              className="category-button"
              onClick={() => {
                setPage(1);
                if (c === category) {
                  setCategory("");
                } else {
                  setCategory(c);
                }
              }}
            >
              {c}
            </button>
          ))}
        </div>
        <ul className="product-list">
          {products.map((product, index) => (
            <li className="product-item" key={index}>
              <img className="product-img" src={product.thumbnail} alt="" />
              <div className="product-text">
                <p>{product.title}</p>
                <p>{product.price}</p>
                <p>{product.description}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="pagination-button-group">
          <button
            disabled={page === 1}
            onClick={() => setPage((page) => page - 1)}
          >
            prev
          </button>

          <button
            disabled={page === maxPage}
            onClick={() => setPage((page) => page + 1)}
          >
            next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
