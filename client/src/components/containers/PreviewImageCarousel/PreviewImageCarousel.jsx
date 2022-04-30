import React from "react"
import Slider from "react-slick"
import styles from "./PreviewImageCarousel.module.css"

const PreviewImageCarousel = ({ product }) => {

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  console.log(product)

  return (
    <div className={styles.imgCarousel}>
        <div>
            <h1>
              {product.title}
            </h1>
        </div>
        <Slider {...settings}>
        {product.images.length > 0 && product.images.map((img, index) => {
            return (
              <div key={index}>
                <img src={img}  alt="" crossOrigin="anonymous"/>
              </div>
            )
        })
        }
        </Slider>
        <div>
          <h1>Description</h1>
            <p>
              {product.description}
            </p>
        </div>
      </div>
  )
}

export default PreviewImageCarousel