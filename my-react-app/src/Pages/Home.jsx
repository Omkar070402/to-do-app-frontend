import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import '../Styles/Home.css'
import Taskbar from '../Components/Taskbar';


const Home = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    return (
        <div className="container-fluid" id='home'>
            <div className="row">
                <div className="col-md-12">
                    <div className="container mt-5" >

                        <Slider {...settings} className='bg-dark text-light rounded p-5' >
                            <div >
                                <h2 className="text-center">📌 Stay Organized!</h2>
                            </div>
                            <div>
                                <h2 className="text-center">🔥 Set Priorities Wisely</h2>
                            </div>
                            <div>
                                <h2 className="text-center">🚀 Track Your Progress Daily</h2>
                            </div>
                        </Slider>

                    </div>
                </div>
            </div>
            <Taskbar />
        </div>
    )
}

export default Home
