import { useState, useEffect, useRef } from "react";
import Image from 'react-bootstrap/Image'

const EmployeeData = ({ search, sort, setSort, value }) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    console.log("intial employee data render");
    const queryURL = "https://randomuser.me/api/?results=50";
    const fetchEmployees = async () => {
      const response = await fetch(queryURL);
      const payload = await response.json();
      console.log("response data", payload);
      setEmployees(payload.results || []);
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (sort) {
      console.log(`value ${value}`);
      switch (value) {
        case "gender":
          employees.sort((a, b) => {
            if (a.gender < b.gender) return -1;
            if (a.gender > b.gender) return 1;
            return 0;
          });
          break;
        case "name.first":
          employees.sort((a, b) => {
            if (a.name.first < b.name.first) return -1;
            if (a.name.first > b.name.first) return 1;
            return 0;
          });
          break;
        case "name.last":
          employees.sort((a, b) => {
            if (a.name.last < b.name.last) return -1;
            if (a.name.last > b.name.last) return 1;
            return 0;
          });
          break;
        case "location.country":
          employees.sort((a, b) => {
            if (a.location.country < b.location.country) return -1;
            if (a.location.country > b.location.country) return 1;
            return 0;
          });
          break;
        case "email":
          employees.sort((a, b) => {
            if (a.email < b.email) return -1;
            if (a.email > b.email) return 1;
            return 0;
          });
          break;
      }
    }
    setSort(false);
  }, [sort]);

  return (
    <tbody>
      {
        employees
          .filter((employee) => {
            if (employee.location.country.toLowerCase().includes(search.toLowerCase())) {
              return employee;
            }
          })
          .map((employee) => (
            <tr key={employee.login.uuid}>
              <td>
              <Image src={employee.picture.thumbnail} alt="employee" roundedCircle />
              </td>
              <td>{employee.gender}</td>
              <td>{employee.name.first}</td>
              <td>{employee.name.last}</td>
              <td>{employee.location.country}</td>
              <td>{employee.email}</td>
            </tr>
          ))
      }
    </tbody>
  );
};

export default EmployeeData;