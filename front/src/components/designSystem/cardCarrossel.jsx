import { Carousel } from "primereact/carousel";
import useWindowSize from "../../hooks/useWindowSize";

const CardCarrossel = ({ dados }) => {
  const { width } = useWindowSize();
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const responsiveOptions = [
    { breakpoint: "1024px", numVisible: 3, numScroll: 1 },
    { breakpoint: "768px", numVisible: 2, numScroll: 1 },
    { breakpoint: "426px", numVisible: 1, numScroll: 1 },
  ];
  
  const itemTemplate = (item) => {
    return (
      <div
        className="cursor-pointer relative overflow-hidden border-round-xl mx-2 w-full"
        style={{ aspectRatio: "4/3" }}
        onClick={() => {
          setSelectedImage(item);
          setVisibleDialog(true);
        }}
      >
        <img src={item.itemImageSrc} alt={item.title} className="w-full h-full border-round-xl object-cover" />
        <div className="absolute bottom-0 left-0 w-full text-white" style={{ background: "rgba(0, 0, 0, 0.6)", backdropFilter: "blur(2px)", padding: "0.5rem 1rem" }}>
          <h3 className="m-0 text-lg font-bold">{item.title}</h3>
        </div>
      </div>
    );
  };

  return (
    <>
      <Carousel value={dados} numVisible={width >= 1024 ? 3 : width >= 768 ? 2 : 1} numScroll={1} responsiveOptions={responsiveOptions} style={{ width: "100%" }} itemTemplate={itemTemplate} showNavigators={width >= 768} showIndicators circular draggable autoplayInterval={3000}/>
      <CarouselDialog visible={visibleDialog} onClose={() => setVisibleDialog(false)} initialImage={selectedImage} images={selectedImage?.gallery} />
    </>
  );
};

export default CardCarrossel;
