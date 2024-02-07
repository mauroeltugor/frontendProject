import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import config from "../../config.json";
import Mapa from "../../js/Mapa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../assets/posts.css";
import PortalLayout from "../../layout/PortalLayout";

const Posts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedPuestos, setSelectedPuestos] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [buttonStates, setButtonStates] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const fetchPosts = async () => {
    const userId = "...";

    try {
      const res = await axios.get(`${config.apiUrl}?userId=${userId}`);
      setPosts(res.data);
      if (res.data.length > 0) {
        setSelectedPuestos(res.data[0].puestos);
      }
    } catch (error) {
      console.error("Error al obtener los mensajes:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleButtonClick = (index) => {
    setButtonStates((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const renderButtons = () => {
    const buttons = [];

    for (let i = 1; i <= selectedPuestos; i++) {
      buttons.push(
        <div key={i}>
          <img
            src="https://png.pngtree.com/png-clipart/20190116/ourlarge/pngtree-blue-car-high-end-car-beautiful-car-imported-car-png-image_405751.jpg"
            alt={`Puesto ${i}`}
            style={{
              width: "100px",
              height: "100px",
              marginBottom: "5px",
              cursor: "pointer",
            }}
          />
          <button
            onClick={() => handleButtonClick(i)}
            style={{ display: "block", margin: "auto" }}
          >
            {buttonStates[i] ? "Ocupado" : "Disponible"}
          </button>
        </div>
      );
    }

    return buttons;
  };

  const handleReservaClick = async (post) => {
    setSelectedPost(post);
    setSelectedPuestos(post.puestos);
    setModalOpen(true); // Abrir el modal al hacer clic en "Reserva"
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleReservation = () => {
    // Aquí iría la lógica para realizar la reserva
    setModalOpen(false); // Cerrar el modal después de la reserva
  };

  return (
    <div className="posts">
      <PortalLayout>
      <Mapa posts={posts} />
      <div className="container">
        <h2>Crear Parqueaderos</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Latitud</th>
              <th>Longitud</th>
              <th>Puestos</th>
              <th>Actualizacion</th>
              <th>Eliminacion</th>
              <th>Reserva</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id}>
                <td> {post.title} </td>
                <td> {post.content} </td>
                <td> {post.latitud} </td>
                <td> {post.longitud} </td>
                <td> {post.puestos} </td>
                <td>
                  <button
                    onClick={() => navigate(`/post/${post._id}`)}
                    className="btn btn-primary"
                  >
                    Actualizar
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(post)}
                    className="btn btn-danger"
                  >
                    Eliminar
                  </button>
                </td>
                <td>
                  <button onClick={() => handleReservaClick(post)}>
                    Puestos
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/Dashboard">
          <button>Regresar</button>
        </Link>
        <button onClick={() => navigate("/post/new")}>
          Nuevo parqueadero
        </button>
      </div>

      {modalOpen && (
        <div className="modal-background">
          <div className="modal">
            <button onClick={() => setModalOpen(false)}>Cerrar</button>
            <h2>Estado de los Puestos:</h2>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {renderButtons()}
            </div>
            <div>
              <h3>Selecciona una fecha y hora:</h3>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
              />
              <button onClick={handleReservation}>
                Seleccionar fecha y hora
              </button>
            </div>
            <Link to="/Reservas">
              <button>Reserva</button>
            </Link>
          </div>
        </div>
      )}
      </PortalLayout>
    </div>
  );
};

export default Posts;
