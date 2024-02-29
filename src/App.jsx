import React, { useEffect, useState } from "react";
import Header from "./components/header/Header";
import Search from "./components/search/Search";
import AddProducts from "./components/addproducts/AddProducts";
import CardBody from "./components/cards/CardBody";
import Button from "./components/button/Button";

import "./App.css";

const App = () => {
  const [items, setItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [addedItems, setAddedItems] = useState([]);
  const [showAddProducts, setShowAddProducts] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((data) => setItems(data));

    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => setCategories(json));
  }, []);

  function changingSearchData(e) {
    setSearchValue(e.target.value);
  }

  function fetchProductsByCategory(category) {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => setItems(data));
  }

  const itemsFilter = items.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  function addItem(item) {
    item.addNumber = 1;
    setAddedItems([...addedItems, item]);
  }

  function removeItem(item) {
    const newItems = addedItems.filter(
      (addedItem) => addedItem.id !== item.id
    );
    setAddedItems(newItems);
  }

  return (
    <div>
      <div className="body__container">
        <div className="nav">
          <Header />
          <div className="nav-right">
            <Search
              products={items}
              value={searchValue}
              onChangeData={changingSearchData}
            />
            <Button
              num={addedItems.length}
              click={setShowAddProducts}
            />
            <div>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => fetchProductsByCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {showAddProducts && (
          <AddProducts
            click={setShowAddProducts}
            items={addedItems}
            removeItem={removeItem}
            setAddedItems={setAddedItems}
          />
        )}
        <CardBody
          products={itemsFilter}
          addItem={addItem}
          removeItem={removeItem}
          addedItems={addedItems}
        />
      </div>
    </div>
  );
};

export default App;
