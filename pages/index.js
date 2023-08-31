import { ImagePrediction } from "../components/ImagePrediction";


const Index = () => {

  return (
    <div className="h-screen mx-auto max-w-8xl px-4">
      <div className=" divide-y-8 divide-gray-200">
        <p className="text-4xl font-medium py-8">
          Retrieve Colab Demo
        </p>
        <ImagePrediction />
       
      </div>
    </div>
  );
};

export default Index;
