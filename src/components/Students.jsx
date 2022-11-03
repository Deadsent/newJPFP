import React from "react";
import { Link } from "react-router-dom";
import {SingleStudent} from "./index";
import { useSelector } from "react-redux";
import { selectStudents } from "../store/studentsSlice";

const Students = () => {
  const students = useSelector(selectStudents)

  return (
    <div>
      <ul>
        {students.map((student) => {
          return (
            <li key={student.id}>
              <Link to={`/students/${student.id}`}>
                <SingleStudent student={student} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Students;