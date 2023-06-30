import React, { useState } from "react";
import { Video } from "./Video";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import * as VideoService from "./VideoService";
import { toast } from "react-toastify";

interface Props {
  video: Video;
  loadVideos: () => void;
}

const VideoItem = ({ video, loadVideos }: Props) => {
  const [loading, setLoading] = useState(true);

  const handleDelete = (id: string) => {
    VideoService.deleteVideo(id);
    toast.error("El video fue borrado correctamente");
    loadVideos();
  };

  const navigate = useNavigate();

  const handlePlayerReady = () => {
    setLoading(false);
  };

  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <div
            className="video-container"
            style={{
              position: "relative",
              paddingBottom: "56.25%",
              height: 0,
            }}
          >
            {loading && (
              <div className="spinner-overlay">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            <ReactPlayer
              className="position-absolute top-0 start-0 w-100 h-100"
              url={video.url}
              style={{ objectFit: "cover" }}
              onReady={handlePlayerReady}
            />
          </div>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{video.title}</h5>
            <p className="card-text">{video.description}</p>
            <p className="card-text">
              <small className="text-body-secondary">{video.createdAt}</small>
            </p>
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-primary"
                onClick={() => {
                  navigate(`/update/${video._id}`);
                }}
              >
                <i className="bi bi-pencil"></i> Editar
              </button>
              <button
                className="btn btn-danger me-2"
                onClick={() => {
                  video._id && handleDelete(video._id);
                  navigate("/videos");
                }}
              >
                <i className="bi bi-trash"></i> Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
