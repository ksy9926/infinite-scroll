import React from "react";
import { useHistory, useLocation } from "react-router-dom";

function DetailPage() {
  const history = useHistory();
  const location = useLocation();

  const post = location.state.post;

  return (
    <>
      <div className="top"></div>
      <section className="detailWrap">
        <article className="detailPostWrap">
          <header>
            <h2 className="detailTitle">{post["title"]}</h2>
          </header>
          <div>
            <p>{post["content"]}</p>
          </div>
        </article>
        <footer>
          <button
            onClick={() => {
              history.goBack();
            }}
            className="detailButton"
          >
            뒤로가기
          </button>
        </footer>
      </section>
    </>
  );
}

export default DetailPage;
