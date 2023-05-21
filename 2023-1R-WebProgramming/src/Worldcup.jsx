import { useEffect, useState } from "react";
import p01 from "./assets/너구리.jpg";
import p02 from "./assets/육개장사발면.jpg";
import p03 from "./assets/팔도비빔면.jpg";
import p04 from "./assets/불닭볶음면.jpg";
import p05 from "./assets/신라면.jpg";
import p06 from "./assets/신라면블랙.jpg";
import p07 from "./assets/안성탕면.jpg";
import p08 from "./assets/왕뚜껑.jpg";
import p09 from "./assets/까르보불닭컵라면.jpg";
import p10 from "./assets/진라면매운맛.jpg";
import p11 from "./assets/진라면순한맛.jpg";
import p12 from "./assets/진짬뽕.jpg";
import p13 from "./assets/짜파게티.jpg";
import p14 from "./assets/짜파게티범벅.jpg";
import p15 from "./assets/참깨라면.jpg";
import p16 from "./assets/튀김우동.jpg";

function Worldcup() {
  const candidate = [
    { name: "너구리", src: p01 },
    { name: "육개장사발면", src: p02 },
    { name: "팔도비빔면", src: p03 },
    { name: "불닭볶음면", src: p04 },
    { name: "신라면", src: p05 },
    { name: "신라면블랙", src: p06 },
    { name: "안성탕면", src: p07 },
    { name: "왕뚜껑", src: p08 },
    { name: "까르보불닭컵라면", src: p09 },
    { name: "진라면매운맛", src: p10 },
    { name: "진라면순한맛", src: p11 },
    { name: "진짬뽕", src: p12 },
    { name: "짜파게티", src: p13 },
    { name: "짜파게티범벅", src: p14 },
    { name: "참깨라면", src: p15 },
    { name: "튀김우동", src: p16 },
  ];

  const [game, setGame] = useState([]);
  const [round, setRound] = useState(0);
  const [nextGame, setNextGame] = useState([]);
  const [stat, setStat] = useState({
    너구리: 0,
    육개장사발면: 0,
    팔도비빔면: 0,
    불닭볶음면: 0,
    신라면: 0,
    신라면블랙: 0,
    안성탕면: 0,
    왕뚜껑: 0,
    까르보불닭컵라면: 0,
    진라면매운맛: 0,
    진라면순한맛: 0,
    진짬뽕: 0,
    짜파게티: 0,
    짜파게티범벅: 0,
    참깨라면: 0,
    튀김우동: 0,
  });

  const [selectedImage, setSelectedImage] = useState(null); //클릭된 이미지 저장

  const selectImage = (image) => {
    setSelectedImage(image);
    setTimeout(() => {
      setNextGame((prev) => prev.concat(image));
      setRound((round) => round + 1);
      setSelectedImage(null);
    }, 3000);
  };

  // 처음 Worldcup 컴포넌트가 단 한 번 실행하는 함수
  useEffect(() => {
    const 문자열 = localStorage.getItem("월드컵");
    if (문자열 != null) {
      setStat(JSON.parse(문자열));
    }

    setGame(
      candidate
        .map((c) => {
          return { name: c.name, src: c.src, order: Math.random() };
        })
        .sort((l, r) => {
          return l.order - r.order; //오름차순 정렬
        })
    );
  }, []);

  useEffect(() => {
    if (game.length > 1 && round + 1 > game.length / 2) {
      //라운드 모두 끝났을 때
      setGame(nextGame);
      setNextGame([]);
      setRound(0);
    }
  }, [round]); //round가 바뀔 때마다 실행

  useEffect(() => {
    console.log(stat);
  }, [stat]);

  // 우승 화면
  if (game.length === 1) {
    localStorage.setItem("월드컵", JSON.stringify(stat));
    return (
      <div style={styles.container}>
        <p style={styles.title}>라면 월드컵 우승</p>
        <div style={styles.winnerContainer}>
          <div style={styles.contentbox}>
            <img src={game[0].src} style={styles.image} />
          </div>
          <p style={styles.imageName}>{game[0].name}</p>
          <p style={{marginTop:"0px",marginBottom:"30px",}}>{stat[game[0].name]}번 승리</p>
          <table style={styles.winnerTable}>
            <caption>승리 횟수 순위</caption>
            {Object.keys(stat)
              .sort((l, r) => stat[r] - stat[l])
              .map((name) => {
                return (
                  <tr key={name} style={styles.winnerTableTr}>
                    <td>{name}</td>
                    <td>{stat[name]}</td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    );
  }

  if (game.length === 0 || round + 1 > game.length / 2)
    return <p>로딩중입니다</p>;
  const left = round * 2,
    right = round * 2 + 1;

  const leftFunction = () => {
    setStat({
      ...stat,
      [game[left].name]: stat[game[left].name] + 1,
    });
    // setStat((prevStat) => {
    //   prevStat[ game[left].name ] = prevStat[ game[left].name] + 1;
    //   return prevStat;
    //   }
    // );
    selectImage(game[left]);
  };

  const rightFunction = () => {
    setStat({
      ...stat,
      [game[right].name]: stat[game[right].name] + 1,
    });
    selectImage(game[right]);
  };

  return (
    <div style={styles.container}>
      {/* <p>이상형 월드컵 {round + 1} / {game.length / 2} <b>{game.length === 2 ? "결승" : game.length + "강"}</b></p> */}
      <p style={styles.title}>
        라면 월드컵{" "}
        {game.length === 2 ? <b>결승전</b> : round + 1 + "/" + game.length / 2}
        {game.length !== 2 ? <b>강</b> : ""}
      </p>
      <div style={styles.contentbox}>
        {selectedImage ? (
          <img src={selectedImage.src} style={styles.image} />
        ) : (
          <>
            <img
              src={game[left].src}
              style={styles.image}
              onClick={leftFunction}
            />
            <img
              src={game[right].src}
              style={styles.image}
              onClick={rightFunction}
            />
          </>
        )}
      </div>
      <div style={styles.textContent}>
        {selectedImage ? (
          <p style={styles.imageName}>{selectedImage.name}</p>
        ) : (
          <>
            <p style={styles.imageName}>{game[left].name}</p>
            <p style={styles.imageName}>{game[right].name}</p>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100vw",
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    alignItem: "center",
    backgroundColor: "white",
    fontFamily: "Noto Sans KR",
  },
  title: {
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "white",
    width: "100%",
    textAlign: "center",
    margin: "0px 0px 30px 0px",
    fontSize: "30px",
  },
  contentbox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    margin: "0px auto",
    maxHeight: "90%",
  },
  image: {
    width: "50%",
    transition: "all 3s ease-in-out",
  },
  textContent: {
    position: "absolute",
    top: "70%",
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
  },
  imageName: {
    color: "white",
    fontSize: "20px",
    fontWeight: "bold",
    textShadow: "-2px 0px black, 0px 2px black, 2px 0px black, 0px -2px black",
  },
  winnerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  winnerTable: {
    width: "50vw",
    borderCollapse: "collapse",
  },
  winnerTableTr: {
    borderTop: "1px solid lightgray",
    borderBottom: "1px solid lightgray",
    height: "5vh",
  }
};

export default Worldcup;
