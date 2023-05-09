import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0)
  const [row, setRow] = useState([]);

  useEffect(() => {
    console.log("mount or update");

    return () =>{
      console.log('unmount');
    };
  });

  useEffect(() => {
    console.log("mount only");
    fetch(
      "http://openapi.seoul.go.kr:8088/487272476f69303738306f4e777649/json/RealtimeCityAir/1/25"
    ).then(function (res2) {
      res2.json().then(function (res3) {
        setRow(res3.RealtimeCityAir.row);
      });
    }
    )
  }, []);

  useEffect(() => {
    console.log("update only");
  }, [row]);


  // if (row.length === 0) {
  //   fetch(
  //     "http://openapi.seoul.go.kr:8088/487272476f69303738306f4e777649/json/RealtimeCityAir/1/25"
  //   ).then(function (res2) {
  //     res2.json().then(function (res3) {
  //       setRow(res3.RealtimeCityAir.row);
  //     });
  //   });
  // }

  const fetchData = () => {
    fetch(
      "http://openapi.seoul.go.kr:8088/487272476f69303738306f4e777649/json/RealtimeCityAir/1/25"
    ).then(function (res2) {
      res2.json().then(function (res3) {
        setRow(res3.RealtimeCityAir.row);
      });
    });
  };

  console.log(row);

  //받아온 json을 jsx로 변환해줘야함

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Hello World!</h1>
      <button onClick={fetchData}>미세먼지 정보 불러오기</button>

      {row.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>PM10</th>
              <th>O3</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {row.map((obj, index) => {
              return (
                <tr key={index}>
                  <td>{obj.MSRSTE_NM}</td>
                  <td>{obj.PM10}</td>
                  <td>{obj.O3}</td>
                  <td>{obj.IDEX_NM}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 14)}>
          count is {count}
        </button>
        <button onClick={()=>setCount((count) => 0)}>
          tangjin
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div> */}
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
