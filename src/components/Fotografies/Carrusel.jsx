import React, { useState, useEffect } from 'react';
import {Autoplay, Virtual} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/autoplay';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/virtual';
import axios from "axios";
import SelectAlojamientos from "../Alojamientos/SelectAlojamientos";
import {Link} from "react-router-dom";

function Carrusel(props) {
    const [fotografias, setFotografias] = useState([]);
    const [alojamientos, setAlojamientos] = useState([])
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

    const omplirOptions1=()=>{
        return alojamientos.map(function(tupla){
            if(tupla.ID == tupla.nombre )
                return <option key={tupla.ID} value={tupla.ID}>{tupla.nombre}</option>;
        });
    }


    useEffect(
        ()=>{
            axios.get('http://www.rampacom.com/ProyectoFinal/public/api/fotografia')
                .then(response=> {
                    console.log(response);
                    setFotografias(response.data.result.data);

                })
                .catch(function (error) {
                    console.log(error);

                })
        }
        ,
        []
    );

    useEffect(
        ()=>{
            axios.get('http://www.rampacom.com/ProyectoFinal/public/api/alojamiento')
                .then(response=> {
                    console.log(response);
                    setAlojamientos(response.data.result.data);

                })
                .catch(function (error) {
                    console.log(error);

                })
        }
        ,
        []
    );
    return (
        <div>
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

                            <Link to={'/alojamiento/'+fotografia.alojamientoId}><h2>Accede</h2></Link>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Carrusel;