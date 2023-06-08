import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <div className="container-fluid py-5">
        <div className="row">
          <div className="col-md-8">
            <p className="display-2 fw-normal">
              ...My<strong>Interview</strong>
            </p>
            <p className="display-2 fw-normal">
              Empeza a cambiar <br></br>tu <strong>futuro</strong> hoy!
            </p>
            <p className="col-md-8 fs-4">
              Sube videos cortos para destacar tus habilidades ante los
              reclutadores. ¡Impulsa tu carrera con nuestra plataforma!
            </p>
            <Link to={"./new-video"}>
              <button className="btn btn-primary btn-lg" type="button">
                Empezar
              </button>
            </Link>
          </div>
          <div className="col-md-4">
            <img src="/logoEntrevista.png" alt="Imagen" className="img-fluid" />
          </div>
        </div>
      </div>

      {/* //aca va lo otro  */}

      <div className="container px-4 py-5" id="custom-cards">
        <p className="pb-2 border-bottom text-center fs-1">
          <strong></strong>
        </p>
        <p className="pb-2 border-bottom text-center fs-1">
          <strong className="enlarge-text">
            Únete a esta gran comunidad en tres simples pasos
          </strong>
        </p>
        <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
          <div className="col">
            <p className="mb-4 display-6 lh-1 fw-bold text-center">
              Selecciona tu video
            </p>
            <Link to="/new-video" className="card-link">
              <div className="card card-cover h-100 overflow-hidden rounded-4 shadow-lg">
                <img
                  src="/onlineVideo.png"
                  alt="Imagen 1"
                  className="card-img-top"
                />
              </div>
            </Link>
          </div>
          <div className="col">
            <p className="mb-4 display-6 lh-1 fw-bold text-center">
              Subilo a YouTube
            </p>
            <Link to="/new-video" className="card-link">
              <div className="card card-cover h-100 overflow-hidden rounded-4 shadow-lg">
                <img
                  src="/GroupVideo.png"
                  alt="Imagen 2"
                  className="card-img-top"
                />
              </div>
            </Link>
          </div>
          <div className="col">
            <p className="mb-4 display-6 lh-1 fw-bold text-center">
              Cargalos en la app
            </p>
            <Link to="/new-video" className="card-link">
              <div className="card card-cover h-100 overflow-hidden rounded-4 shadow-lg">
                <img
                  src="/onlinemedia.png"
                  alt="Imagen 3"
                  className="card-img-top"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <br></br>
      <p className="pb-2 border-bottom text-center fs-1">
        <strong></strong>
      </p>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card border-0 rounded-3 shadow">
              <div className="card-body text-center">
                <h2 className="card-title">¿Quiénes somos?</h2>
                <p className="card-text fs-4">
                  Somos una plataforma en línea para subir videos personales
                  formales que permiten a los reclutadores obtener una primera
                  impresión auténtica sobre nosotros. Ayudamos a destacar
                  habilidades, experiencia y personalidad en el proceso de
                  reclutamiento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
