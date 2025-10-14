import React from "react";

interface AnnouncementBarProps {
  message: string;
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ message }) => {
  return (
    <div className="bg-black overflow-hidden text-white font-bold py-2 text-xl">
      <div className="marquee">
        <span className="mx-4">{message}</span>
      </div>
    </div>
  );
};

export default AnnouncementBar;
