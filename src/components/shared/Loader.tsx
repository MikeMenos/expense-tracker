import { ThreeCircles } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex h-[100%] w-full items-center justify-center">
      <ThreeCircles
        height="100"
        width="100"
        color="#353A8E"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    </div>
  );
};

export default Loader;
