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
        {name: '너구리', src: p01},
        {name: '육개장사발면', src: p02},
        {name: '팔도비빔면', src: p03},
        {name: '불닭볶음면', src: p04},
        {name: '신라면', src: p05},
        {name: '신라면블랙', src: p06},
        {name: '안성탕면', src: p07},
        {name: '왕뚜껑', src: p08},
        {name: '까르보불닭컵라면', src: p09},
        {name: '진라면매운맛', src: p10},
        {name: '진라면순한맛', src: p11},
        {name: '진짬뽕', src: p12},
        {name: '짜파게티', src: p13},
        {name: '짜파게티범벅', src: p14},
        {name: '참깨라면', src: p15},
        {name: '튀김우동', src: p16},
    ]

    const [game, setGame] = useState([]);
    const [round, setRound] = useState(0);
    const [nextGame, setNextGame] = useState([]);


    useEffect(() => {
        setGame(candidate.map(c => {
            return {name: c.name, src: c.src, order: Math.random()}
        }).sort((l, r) =>{
            return l.order - r.order; //오름차순 정렬
        }));
    }, []);

    useEffect( () => {
        if(game.length > 1  && round + 1 > game.length / 2){//라운드 모두 끝났을 때
            setGame(nextGame);
            setNextGame([]);
            setRound(0);
        }
    }, [round]);//round가 바뀔 때마다 실행
    
    if( game.lenth === 1){
        return <div>
            <p>라면 월드컵 우승</p>
            <img src={game[0].src} /><p>{game[0].name}</p>
        </div>
    }
    if( game.length === 0 || round + 1 > game.length / 2) return <p>로딩중입니다</p>;
  return (
    <div>
      <p>이상형 월드컵 {round + 1} / {game.length / 2} <b>{game.length === 2 ? "결승" : game.length + "강"}</b></p>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <img src={game[round * 2].src} onClick={() => {
            setNextGame((prev) => prev.concat(game[round * 2]));
            setRound((round)=> round + 1);
            }}/>
        <img src={game[round * 2 + 1].src} onClick={()=> {
            setNextGame((prev) => prev.concat(game[round * 2 + 1]));
            setRound((round) => round + 1);
        }}/>
      </div>
    </div>
  );
}

export default Worldcup;
