import InfinityLoadingIcon from "@/assets/icons/InfinityLoadingIcon";
import Image from "next/image";
interface QuestionAnswerProps {
  prompt: string;
  imgSrc?: string;
}

const QuestionAnswer = ({ prompt, imgSrc }: QuestionAnswerProps) => {
  return (
    <div className="border-b-1 border-black">
      <div className="px-20 py-4 bg-gray-100">
        <p className="text-l ">{prompt}</p>
      </div>
      <div className="px-20 bg-gray-200 flex justify-center">
        {imgSrc ? (
          <Image
            width={100}
            height={100}
            className="h-auto w-auto "
            src={imgSrc}
            alt="output"
            sizes="100%"
          />
        ) : (
          <div className="">
            <InfinityLoadingIcon strokeColor="#1D4ED8" />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionAnswer;
