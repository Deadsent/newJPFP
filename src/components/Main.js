import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentsAsync } from "../store/studentsSlice";

import {Campus, Header, Home, Students, SingleStudentPage, SingleCampusPage} from './index'

const Main = () => {
  const dispatch = useDispatch()

  const [campuses, setCampuses] = useState([]);

  const fetchCampuses = async () => {
    const { data } = await axios.get("/api/campuses");
    setCampuses(data);
  };

  console.log(dispatch(fetchStudentsAsync()))

  useEffect(() => {
    fetchCampuses();
    dispatch(fetchStudentsAsync())
  }, [dispatch]);

  return (
    <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            path="/campuses"
            element={<Campus campuses={campuses} setCampuses={setCampuses} />}
          />
          <Route
            path="/campuses/:id"
            element={<SingleCampusPage campuses={campuses} />}
          />
          <Route
            path="/students/:id"
            element={<SingleStudentPage />}
          />
          <Route
            path="/students"
            element={<Students />}
          />
        </Routes>
    </div>
  );
};

export default Main