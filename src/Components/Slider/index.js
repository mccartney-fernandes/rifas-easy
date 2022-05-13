import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi' 
import { FiLoader } from 'react-icons/fi'
import { wrap } from "popmotion";

import { geImage } from "../../Models/Images";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export const Slider = () => {

	const getImagesF = async () => {
		const imagesData = await geImage()
		setImagensF(imagesData)
		setLoadImage(false)
	}

	useEffect(() => {
		getImagesF()
	},[])

	const [imagesF, setImagensF] = useState([])
  const [[page, direction], setPage] = useState([0, 0]);
	const [loadImage, setLoadImage] = useState(true)

	

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = wrap(0, imagesF.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <>
		{loadImage ? 
      <>
				<FiLoader className="spinner" color="#fff" size={80} />
			</>
			:
			<>
				<AnimatePresence initial={false} custom={direction}>
					<motion.img
						key={page}
						src={imagesF[imageIndex]}
						custom={direction}
						variants={variants}
						initial="enter"
						animate="center"
						exit="exit"
						transition={{
							x: { type: "spring", stiffness: 300, damping: 30 },
							opacity: { duration: 0.2 }
						}}
						drag="x"
						dragConstraints={{ left: 0, right: 0 }}
						dragElastic={1}
						onDragEnd={(e, { offset, velocity }) => {
							const swipe = swipePower(offset.x, velocity.x);

							if (swipe < -swipeConfidenceThreshold) {
								paginate(1);
							} else if (swipe > swipeConfidenceThreshold) {
								paginate(-1);
							}
						}}
					/>
				</AnimatePresence>
				<div className="next" onClick={() => paginate(1)}>
					<BiChevronRight  color={'#fff'} />
				</div>
				<div className="prev" onClick={() => paginate(-1)}>
					<BiChevronLeft  color={'#fff'} />
				</div>
			</>
		}
    </>
  );
};
