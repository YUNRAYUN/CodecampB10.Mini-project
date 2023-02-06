import axios from "axios";
import cheerio from "cheerio";

export const createMessage = async (prefer) => {
  // 입력된 메시지: "안녕하세요~ https://www.naver.com에 방문해 주세요!"

  // 1 .입력된 메시지에서 http로 시작하는 문장이 있는지 먼저 찾기!(.find() 등의 알고리즘 사용하기)

  // 2. axios.get으로 요청해서 html코드 받아오기 => 스크래핑
  const result = await axios.get(prefer);

  //   console.log(result.data);

  // 3. 스크래핑 결과 (result)에서 OG(오픈그래프) 코드 골라내서 변수에 저장하기
  const qqq = {};
  const $ = cheerio.load(result.data);
  $("meta").each((i, el) => {
    if ($(el).attr("property") && $(el).attr("property").includes("og:")) {
      const key = $(el).attr("property"); // og:title, og:description, ...
      const value = $(el).attr("content"); // 네이버, 네이버 메인에서 ~~~
      qqq[key] = value;
    }
  });
  return qqq;
};
