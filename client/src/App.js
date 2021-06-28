import "./App.css";

function App() {
  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>솔리다리테 개발자 사전 과제</h1>
        <h3>게시물을 검색해보세요</h3>
      </div>

      <label for="search"></label>
      <input
        type="text"
        id="search"
        name="search"
        placeholder="검색어를 입력하세요"
      ></input>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", justifyContent: "left" }}>
          <div>A Posts</div>
          <div>B Posts</div>
        </div>
        <div
          style={{
            width: "80vw",
            height: "500px",
            border: "1px solid red",
            borderRadius: "15px",
          }}
        ></div>
      </div>
    </div>
  );
}

export default App;
