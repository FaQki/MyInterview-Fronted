import React, {useEffect, useState} from 'react'
import {Video} from './Video'
import * as VideoService from './VideoService'
import VideoItem from './VideoItem';

const Videolist = () => {

  const [videos, setvideos] = useState<Video[]>([]);

  const loadVideos = async ()=>{
    const res = await VideoService.getVideos();
    setvideos(res.data);
  }

  useEffect(() => {
  loadVideos();
  }, [])
  

  return (
    <div className='row'>
        {videos.map((video)=>{
        return <VideoItem video={video} key={video._id} loadVideos={loadVideos} />
      })}
    </div>
  );
};

export default Videolist
