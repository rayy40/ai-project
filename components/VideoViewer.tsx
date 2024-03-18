import { getYouTubeVideoId } from "@/helpers/utils";
import React from "react";
import YouTube from "react-youtube";

type Props = {
  url: string;
};

const VideoViewer = ({ url }: Props) => {
  const options = {
    playerVars: {
      rel: 0,
      modestBreanding: 0,
      showInfo: 0,
    },
  };

  return (
    <div className="lg:bg-muted border-b border-b-border py-8 lg:py-0 w-full h-full flex items-center justify-center">
      <YouTube
        loading={"eager"}
        opts={options}
        className="aspect-video max-w-[800px] w-full lg:w-[90%] p-2 border border-muted-foreground"
        iframeClassName="w-full h-full shadow-medium"
        videoId={getYouTubeVideoId(url) ?? ""}
      />
    </div>
  );
};

export default VideoViewer;
