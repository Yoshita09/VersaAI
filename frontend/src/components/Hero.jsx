import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const YOUTUBE_VIDEO_ID = "xeudleOk9xQ";

const loadYouTubeApi = () =>
  new Promise((resolve) => {
    if (window.YT && window.YT.Player) return resolve(window.YT);
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.id = "yt-api-script";
    document.body.appendChild(script);

    window.onYouTubeIframeAPIReady = () => {
      resolve(window.YT);
    };
  });

const Hero = () => {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);
  const playerRef = useRef(null);
  const containerRef = useRef(null);

 
  useEffect(() => {
    if (!showVideo) return;

    let mounted = true;

    (async () => {
      const YT = await loadYouTubeApi();
      if (!mounted) return;

      playerRef.current = new YT.Player(containerRef.current, {
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 1,
          controls: 1,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: (event) => {
            try {
              event.target.setPlaybackRate(1.5); // Speed set to 1.5x
              event.target.playVideo();
            } catch (e) {}
          },
        },
      });
    })();

    return () => {
      mounted = false;
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [showVideo]);


  useEffect(() => {
    const handle = (e) => {
      if (e.key === "Escape") setShowVideo(false);
    };
    if (showVideo) window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [showVideo]);

  return (
    <div
      className="px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full 
      justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen"
    >
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2]">
          Create amazing content <br /> with
          <span className="text-primary"> AI tools</span>
        </h1>
        <p className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600">
          Transform your content creation with our suite of premium AI tools.
          Write articles, generate images, and enhance your workflow.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs">
        <button
          onClick={() => navigate("/ai")}
          className="bg-primary text-white px-10 py-3 rounded-lg hover:scale-102 active:scale-95 transition cursor-pointer"
        >
          Start creating now
        </button>
        <button
          onClick={() => setShowVideo(true)}
          className="bg-white px-10 py-3 rounded-lg border border-gray-300 hover:scale-102 active:scale-95 transition cursor-pointer"
        >
          Watch demo
        </button>
      </div>

      <div className="flex items-center gap-4 mt-8 mx-auto text-gray-600">
        <img src={assets.user_group} alt="users" className="h-8" />
        Trusted by 10k+ people
      </div>

      {showVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
        >
          <div className="bg-white p-4 rounded-xl max-w-3xl w-full relative">
            <button
              className="absolute top-2 right-2 text-xl"
              onClick={() => setShowVideo(false)}
            >
              ✖
            </button>

            {/* YouTube Player container */}
            <div
              ref={containerRef}
              className="w-full h-[56.25vw] max-h-[560px] rounded-lg overflow-hidden"
              style={{ aspectRatio: "16/9" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
