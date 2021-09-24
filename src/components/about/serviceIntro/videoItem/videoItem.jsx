import React from "react";
import styles from "./videoItem.module.css";

const VideoItem = ({ video }) => {
  return (
    <section className={styles.video_item}>
      <img
        src={video.thumbnail_url}
        alt="video_thumbnail"
        className={styles.video_thumbnail}
      />
      <span className={styles.video_desc}>{video.desc}</span>
    </section>
  );
};

export default VideoItem;
