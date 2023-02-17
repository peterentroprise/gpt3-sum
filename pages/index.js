import { VideoUploadForm } from "../components/VideoUploadForm";

const Index = () => (
  <div className="h-screen mx-auto max-w-2xl pt-12 px-4">
    <div className="space-y-8">
      <p className="text-4xl font-medium">Retrieve Media Transformation Demo</p>
      <VideoUploadForm />
    </div>
  </div>
);

export default Index;
