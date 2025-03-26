import React from "react";
import FeedModal from "./FeedModal";
import FeedPhotos from "./FeedPhotos";
import PropTypes from "prop-types";

const Feed = ({ user }) => {
  const [modalPhoto, setModalPhoto] = React.useState(null);
  const [pages, setPages] = React.useState([1]);
  const [infinite, setInfinite] = React.useState(true);
  const [lastPostId, setLastPostId] = React.useState(null);
  const prevLastPostId = React.useRef(lastPostId);

  React.useEffect(() => {
    let wait = false;

    function infiniteScrool() {
      if(infinite && prevLastPostId.current != lastPostId) {
        const scroll = window.scrollY;
        const height = document.body.offsetHeight - window.innerHeight;
        if(scroll > height * 0.75 && !wait) {
          prevLastPostId.current = lastPostId;
          setPages((pages) => [...pages, pages.length + 1]);
          wait = true;
          setTimeout(() => {
            wait = false;
          }, 500)
        }
      }
      
    }

    window.addEventListener("wheel", infiniteScrool);
    window.addEventListener("scroll", infiniteScrool);

    return () => {
      window.removeEventListener("wheel", infiniteScrool);
      window.removeEventListener("scroll", infiniteScrool);
    };
  }, [infinite, lastPostId]);

  return (
    <div>
      {modalPhoto && (
        <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
      )}
      {pages.map((page) => (
        <FeedPhotos
          key={page}
          lastPostId={lastPostId}
          user={user}
          setModalPhoto={setModalPhoto}
          setInfinite={setInfinite}
          setLastPostId={setLastPostId}
        />
      ))}
    </div>
  );
};

Feed.defaultProps = {
  user: 0,
}

Feed.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.string.isRequired, 
    PropTypes.number.isRequired
  ]),
}

export default Feed;
