import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Video } from "./Video";
import * as VideoService from "./VideoService";
import { toast } from "react-toastify";

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const Videoform = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  const [video, setVideo] = useState<Video>({
    title: "",
    url: "",
    description: "",
  });

  const handleInputChange = (e: InputChange) => {
    setVideo({ ...video, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!params.id) {
      await VideoService.createVideos(video);
    toast.success("Video creado correctamente");
    }else{
      await VideoService.updateVideo(params.id, video);
      toast.success("Video fue editado correctamente");
    }
    
    navigate("/videos");
  };

  const getVideo = async (id: string) => {
    const res = await VideoService.getVideo(id);
    const { title, description, url } = res.data;
    setVideo({ ...video, title, description, url });
  };

  useEffect(() => {
    if (params.id) getVideo(params.id);
  }, [params.id]);

  return (
    <div className="row">
      <div className="card">
        {!params.id? (
          <h5 className="card-header">Nuevo video</h5>

        ):
        <h5 className="card-header">Editar video</h5>
        
        }
        
        <div className="card-body">
          <h5 className="card-title"></h5>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Complete los items</legend>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Agregue un titulo
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={video.title}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Ingrese un titulo"
                  autoFocus
                />
              </div>
              <div className="mb-3">
                <label htmlFor="url" className="form-label">
                  Agregue la url
                </label>
                <input
                  type="text"
                  id="url"
                  name="url"
                  value={video.url}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Ingrese una url"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Agregue una breve descripcion
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={video.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="form-control"
                  placeholder="Ingrese una breve descripcion"
                />
              </div>
              {params.id ? (
                <button type="submit" className="btn btn-primary">
                  Editar video
                </button>
              ) : (
                <button type="submit" className="btn btn-primary">
                  Crear video
                </button>
              )}
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Videoform;
