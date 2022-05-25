import { Player } from "@lottiefiles/react-lottie-player";

export default function Loading() {
  return (
    <div className="loading" style={{ margin: "auto" }}>
      <Player
        autoplay
        speed={1}
        loop
        src="https://assets1.lottiefiles.com/datafiles/bEYvzB8QfV3EM9a/data.json"
        style={{ height: "250px", width: "100%" }}
      ></Player>
    </div>
  );
}
