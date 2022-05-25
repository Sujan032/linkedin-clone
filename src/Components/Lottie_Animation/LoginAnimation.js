import { Player } from "@lottiefiles/react-lottie-player";

export default function LoginAnimation() {
  return (
    <div className="loginAnimation">
      <Player
        autoplay
        speed={1}
        loop
        src="https://assets2.lottiefiles.com/packages/lf20_yNYxCH.json"
      ></Player>
    </div>
  );
}