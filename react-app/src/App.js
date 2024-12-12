// import useEffect from "react";
import Modal from "./components/Modal";
import NavBar from "./components/NavBar";

// import { Container, Row, Col } from "reactstrap";

// import Post from "./components/Post";
// import Header from "./components/Header";
// import SideCard from "./components/SideCard";

function App() {
  // return (
  //   <>
  //     <Header />

  //     <main className="my-5 py-5">
  //       <Container className="px-0">
  //         <Row
  //           g-0
  //           className="pt-2 pt-md-5 w-100 px-4 px-xl-0 position-relative"
  //         >
  //           <Col
  //             xs={{ order: 2 }}
  //             md={{ size: 4, order: 1 }}
  //             tag="aside"
  //             className="pb-5 mb-5 pb-md-0 mb-md-0 mx-auto mx-md-0"
  //           >
  //             <SideCard />
  //           </Col>

  //           <Col
  //             xs={{ order: 1 }}
  //             md={{ size: 7, offset: 1 }}
  //             tag="section"
  //             className="py-5 mb-5 py-md-0 mb-md-0"
  //           >
  //             <Post />
  //           </Col>
  //         </Row>
  //       </Container>
  //     </main>
  //   </>
  // );
  // useEffect(() => {
  //   const modalElement = document.getElementById("formModal");
  //   const modal = new window.bootstrap.Modal(modalElement);
  // }, []);
  // const [modalVisible, setModalVisibility] = useState(false);
  // const toggleModal = () => setModalVisibility(true);
  // $("#formModal").on("show.bs.modal", function (e) {
  //get data-id attribute of the clicked element
  // var bookId = $(e.relatedTarget).data("book-id");
  // //populate the textbox
  // $(e.currentTarget).find('input[name="bookId"]').val(bookId);
  // });
  return (
    <div>
      <NavBar />
      <button type="button" data-bs-toggle="modal" data-bs-target="#formModal">
        Launch modal
      </button>
      {/* {modalVisible && <Modal>Adding new availability</Modal>} */}
      <Modal title={"Adding new availability"} />
    </div>
  );
}

export default App;
