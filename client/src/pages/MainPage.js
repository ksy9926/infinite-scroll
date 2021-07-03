import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function MainPage() {
  const history = useHistory();
  const [clicked, setClicked] = useState("a");
  const [page, setPage] = useState(0);
  const [post, setPost] = useState([]);
  const [search, setSearch] = useState("");

  // 게시물 내용 받아오기
  useEffect(() => {
    console.log("게시물 내용 받아오기");
    async function fetchData() {
      const response = await axios.get(
        `https://recruit-api.yonple.com/recruit/857291/${clicked}-posts?page=${page}`
      );
      setPost(response.data);
    }
    fetchData();
  }, [clicked]);

  //   const infiniteScroll = useCallback(() => {
  //     let scrollHeight = Math.max(
  //       document.documentElement.scrollHeight,
  //       document.body.scrollHeight
  //     );
  //     let scrollTop = Math.max(
  //       document.documentElement.scrollTop,
  //       document.body.scrollTop
  //     );
  //     let clientHeight = document.documentElement.clientHeight;

  //     if (scrollTop + clientHeight > scrollHeight * 0.9) {
  //       setPage(page + 1);
  //       axios
  //         .get(
  //           `https://recruit-api.yonple.com/recruit/857291/a-posts?page=${
  //             page + 1
  //           }`
  //         )
  //         .then((response) => {
  //           console.log("postA, response", [...postA], [...response.data]);
  //           setPostA([...postA, ...response.data]);
  //         });
  //     }
  //   }, [page, postA]);

  //   window.addEventListener("scroll", infiniteScroll, true);
  //   return () => window.addEventListener("scroll", infiniteScroll, true);

  // 검색어 필터(1. 검색어가 없거나 2. 게시물 제목에 검색어가 포함될 경우만 리턴)
  const filtered = [...post].filter((data) => {
    if (search == null) {
      return data;
    } else if (data.title.toLowerCase().includes(search.toLowerCase())) {
      return data;
    }
  });

  // 게시물 목록
  const posts = [...filtered].map((post) => (
    <li
      key={post["id"]}
      onClick={() => {
        history.push({
          pathname: `/${clicked}?id=${post["id"]}`,
          state: { post: post },
        });
      }}
      className="postInnerWrap"
    >
      <h3 className="postTitle">
        <span className="postId">{post["id"]}.</span> {post["title"]}
      </h3>
      <p className="postContent">{post["content"]}</p>
    </li>
  ));

  // 검색어 입력시 검색어 저장
  const onChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="top"></div>
      <section className="wrap">
        <header className="titleWrap">
          <h1 className="title">솔리다리테 개발자 사전 과제</h1>
          <p className="subTitle">게시물을 검색해보세요</p>
        </header>
        <main role="main">
          <article className="searchOuterWrap">
            <label htmlFor="search">
              <div className="searchInnerWrap">
                <i className="fas fa-search" id="icon"></i>
                <input
                  type="text"
                  id="search"
                  name="search"
                  placeholder="검색어를 입력하세요"
                  onChange={onChangeHandler}
                  className="searchInput"
                />
              </div>
            </label>
          </article>
          <article className="buttonPostWrap">
            <section className="buttonWrap">
              <button
                className={clicked === "a" ? "activeButton" : "button"}
                onClick={() => {
                  setClicked("a");
                }}
              >
                A Posts
              </button>
              <button
                className={clicked === "b" ? "activeButton" : "button"}
                onClick={() => {
                  setClicked("b");
                }}
              >
                B Posts
              </button>
            </section>
            <ul className="postOuterWrap">{posts}</ul>
          </article>
        </main>
      </section>
    </>
  );
}

export default MainPage;
