import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Scaner from "./Scaner";
import Warehouse from "./Warehouse";
import SendItem from "./SendItem";
import Request from "./Request";
import ItemList from "./ItemList";
import ShareStock from "./ShareStock";
import Login from "./Login";
import Test from "./Test";

function Yash() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/test" element={<Test />} />
        {/* <Route path="Scaner" element={<Scaner />} />
        <Route path="Warehouse" element={<Warehouse />} />
        <Route path="SendItem" element={<SendItem />} />
        <Route path="Request" element={<Request />} />
        <Route path="ItemList" element={<ItemList />} />
        <Route path="ShareStock" element={<ShareStock />} /> */}
      </Routes>
    </Router>
  );
}

export default Yash;
