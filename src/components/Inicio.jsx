import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import hombre from '../assets/imagenes/hombre.png';

const Inicio = () => {
    return (
        

        



        <div className="flex mr-20  justify-center py-5  items-center  space-x-0 log:flex-row ssm:flex-col ssm:space-y-0 ">
            <div className="z-20 grid items-center h-full p-6 py-20 md:py-0 md:grid-cols-2">
                <img src={hombre} alt="Avatar" className=" w-auto h-auto" />
                <div className="flex flex-col justify-center max-w-md">
                    <h1 className="mb-5 text-2xl leading-tight text-center md:text-left md:text-4xl md:mb-10 ">Bienestar para tu cuerpo y mente. <br />
                        <TypeAnimation
                            sequence={[
                                'ejercita tu cuerpo',
                                1000,
                                'alimenta tu bienestar',
                                1000,
                                'recuerda cuidarte',
                                1000,
                                'desarrolla hábitos saludables',
                                1000
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                            className="font-bold text-secondary"
                        />
                    </h1>

                    <p className="mx-auto mb-2 text-xl md:text-xl md:mx-0 md:mb-8">
                    Descubre cómo podemos trabajar juntos para alcanzar tus metas de bienestar y disfrutar de una vida más saludable y feliz.
                    </p>

                    <div className="flex items-center space-x-5 justify-center md:justify-start md:gap-10">
                        <a href="/actividades" className="px-3 py-2 my-2 transition-all border-2 cursor-pointer text-md w-fit rounded-xl hover:shadow-xl hover:shadow-white/50">
                            Actividad
                        </a>
                        <a href="/alimentacion" className="px-3 py-2 my-2 transition-all border-2 cursor-pointer text-md w-fit rounded-xl hover:shadow-xl hover:shadow-white/50">
                            Alimentación
                        </a>
                        <a href="/recordatorios" className="px-3 py-2 my-2 transition-all border-2 cursor-pointer text-md w-fit rounded-xl hover:shadow-xl hover:shadow-white/50">
                            Recordatorios
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Inicio;
