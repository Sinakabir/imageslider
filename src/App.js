import SliderImage from "./Components/SliderImage";

function App() {
  return (
    <div>
      <SliderImage
        url={"https://picsum.photos/v2/list"}
        page={"1"}
        limit={"10"}
      />
    </div>
  );
}

export default App;
