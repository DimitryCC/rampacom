import React, {useEffect, useState} from "react";
import axios from "axios";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Virtual} from "swiper";
import {Link, useParams} from "react-router-dom";

function MostrarFoto(props) {
    const URL= 'http://www.rampacom.com/ProyectoFinal/public/api/fotografia/aloja/'+props.IdAlojamiento;
    const [fotografias, setFotografias] = useState([]);
    const slides = Array.from({ length: 1000 }).map(
        (el, index) => `Slide ${index +1}`
    );
    const mystyle = {
        color: "black",
        padding: "10px",
        fontFamily: "Arial",
        objectFit: "cover",
        width: "100%",
        alignItems: 'center',
        textAlign: 'center',
        height: "500px"
    };

    const imgS = {
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        height: '75%'
    }
    useEffect(
        ()=>{
            if (props.IdAlojamiento) {
                axios.get(URL)
                    .then(response=> {
                        setFotografias(response.data.result);
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            }
        }
        ,
        []
    );
    return (
        <div style={{width: "100%", alignItems: "center"}}>
            <Swiper
                modules={[Virtual, Autoplay]}
                spaceBetween={50}
                slidesPerView={3}
                virtual
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false}}
            >
                {fotografias.map((fotografia, index) => (
                    <SwiperSlide key={fotografia.ID} virtualIndex={index}>
                        <div style={mystyle}>
                            <Link to={'/alojamiento/'+fotografia.alojamientoId}><img style={imgS} src={fotografia.ruta}/></Link>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
export default MostrarFoto;