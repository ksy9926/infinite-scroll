import React, { useState, useEffect, useRef, useCallback } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function MainPage() {
  const history = useHistory();
  const [clicked, setClicked] = useState("a");
  const [now, setNow] = useState("a");
  const [page, setPage] = useState(-1);
  const [post, setPost] = useState([]);
  const [search, setSearch] = useState(sessionStorage.getItem("search"));
  const intersect = useRef(null);

  // 무한스크롤 기본값 설정(intersection observer)
  const options = {
    root: null,
    rootMargin: "20px",
    threshold: 1.0,
  };

  // 무한스크롤 콜백함수(페이지 추가)
  const handleObserver = useCallback(async (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((page) => page + 1);
    }
  }, []);

  // 무한스크롤(마지막값이 뷰포트에 들어온 경우 콜백함수 호출)
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, options);
    if (intersect.current) {
      observer.observe(intersect.current);
    }
    return () => observer.disconnect();
  }, [handleObserver]);

  // 게시물 내용 받아오기
  useEffect(() => {
    async function fetchData() {
      if (now === clicked) {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/${clicked}-posts?page=${page}`
        );
        setPost([...post, ...response.data]);
      } else {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/${clicked}-posts?page=${page}`
        );
        setPost(response.data);
        setNow(clicked);
      }
    }
    fetchData();
  }, [page, clicked]);

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
    sessionStorage.setItem("search", e.target.value);
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
                  value={search ? search : ""}
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
                onClick={
                  clicked === "b"
                    ? () => {
                        setClicked("a");
                        setPage(0);
                        sessionStorage.setItem("clicked", "a");
                      }
                    : null
                }
              >
                A Posts
              </button>
              <button
                className={clicked === "b" ? "activeButton" : "button"}
                onClick={
                  clicked === "a"
                    ? () => {
                        setClicked("b");
                        setPage(0);
                        sessionStorage.setItem("clicked", "b");
                      }
                    : null
                }
              >
                B Posts
              </button>
            </section>
            <ul className="postOuterWrap">
              {posts}
              <div ref={intersect}></div>
            </ul>
          </article>
        </main>
      </section>
    </>
  );
}

export default MainPage;
