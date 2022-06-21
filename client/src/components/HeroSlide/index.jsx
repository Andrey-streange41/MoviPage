import React, { useEffect, useRef, useState } from "react";
import dbApi from "../../api/tmdbApi";
import config from "../../api/config";
import { category, movieType } from "../../DB/dbForApi";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useHistory } from "react-router-dom";
import Button, { OutlineButton } from "../Button/index";
import "./HeroSlide.scss";
import Modal, {ModalContent} from "../Modal";
import { Link } from "react-router-dom";

const HeroSlide = (props) => {
  SwiperCore.use([Autoplay]);
  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        

        const responce = await dbApi.getMovieList(movieType.popular, {
          params,
        });
        setMovieItems(responce.results.slice(0, 4));
      } catch (error) {
        console.log(error.message);
      }
    };
    getMovies();
  }, []);
  return (
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
      >
        {movieItems.map((item, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <HeroSlideItem
                item={item}
                className={`${isActive ? "active" : ""}`}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {
          movieItems.map((item,index)=><TrailerModal key={index} item={item}/>)
      }
    </div>
  );
};


const HeroSlideItem = (props) => {
  const history = useHistory();
  const item = props.item;
  const background = config.originalimage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );

  const setModalActive = async() =>{
    
      const modal = document.querySelector(`#modal_${item.id}`);
      

    const videos = await dbApi.getVideos(category.movie,item.id);
  
    if(videos.results.length > 0){
      const videoSrc='http://www.youtube.com/embed/' + videos.results[0].key;
      modal.querySelector('.modal__content > iframe').setAttribute('src',videoSrc)
    }else{
      modal.querySelector('.modal__content').innerHTML='No trailers';
    }
    modal.classList.toggle('active');
  }

  return (
    <section
      className={`hero-slide__item ${props.className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <section className="hero-slide__item__content container">
        <article className="hero-slide__item__content__info container">
          <h2 className="title">{item.title}</h2>
          <p className="overview">{item.overview}</p>
          <section className="btns">
            <Link to={"/movie/" + item.id}>
              <Button onclick={() => history.push("/movie/" + item.id)}>
                Watch now
              </Button>
            </Link>
            
            <OutlineButton onClick={setModalActive}>
              Watch trailer
            </OutlineButton>
          </section>
        </article>
        <section className="hero-slide__item__content__poster">
          <img src={config.w500Image(item.poster_path)} alt="poster" />
        </section>
      </section>
    </section>
  );
};

const TrailerModal = (props) =>{
  const item = props.item;
  const iframeRef = useRef(null);
  const onClose = () => iframeRef.current.setAttribute('src','');

  return (<Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
          <iframe ref={iframeRef} width={"100%"} height={"500px"} title={"trailer"}>

          </iframe>
      </ModalContent>
  </Modal>)
}

export default HeroSlide;
