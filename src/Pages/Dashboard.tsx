import Wrapper from "@/Layout/Wrapper";
import Background from "../Assets/background.png";
import Chat from "@/Layout/Chat";
import Mars from "../Assets/mars.jpg";
import MapWrapper from "@/components/map/marsMap.tsx";
import BaseData from "@/Layout/BaseData";

export default function Dashboard(): JSX.Element {
  return (
    <div
      className="w-screen h-screen flex items-center overflow-hidden justify-center"
      style={{ background: `url(${Background})` }}
    >
      <img src={Mars} alt="Mars" className="right-0 fixed w-1/2 top-0 ml-32" />
      <div className="w-2/3 h-4/5 grid grid-cols-6 grid-rows-10 z-30 gap-4">
        <Wrapper
          className="col-span-4 row-span-6 overflow-hidden"
          animation={true}
          delay={0.2}
        >
          <MapWrapper />
        </Wrapper>
        <Wrapper
          className="col-span-2 row-span-10"
          animation={true}
          delay={0.3}
        >
          <Chat />
        </Wrapper>
        <Wrapper className="col-span-2 row-span-4" animation={true} delay={0.4}>
          <BaseData />
        </Wrapper>
        <Wrapper className="col-span-2 row-span-4" animation={true} delay={0.4}>
          <h1>Jakieś dane</h1>
        </Wrapper>
      </div>
    </div>
  );
}
