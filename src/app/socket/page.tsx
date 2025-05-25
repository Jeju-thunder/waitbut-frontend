
// import SocketComponent from "@/components/SocketComponent";
import QuestionMatchComponent from "@/components/QuestionMatchComponent";


export default function SocketPage() {
  

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>질문 매칭</h1>
      <QuestionMatchComponent />
      {/* <SocketComponent /> */}
    </div>
  );
}
