import { useEffect, useState } from "react";
import Header from "../Component/Header";
import { useNavigate } from "react-router";
import { Card, Button, Col, Row } from "react-bootstrap";
import {FaArrowDown, FaArrowUp, FaEdit,  FaEye, FaSearch, FaTrash } from "react-icons/fa";

function CrudWithRouting() {  // Changed name from Rounting to Routing

  const [blogData, setBlogData] = useState([]);
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState("");

  const handelAsc=()=>{
    let allBlog=JSON.parse(localStorage.getItem('blogData'));
    let updateData=allBlog.sort((a,b)=>{
      return a.DOB.localeCompare(b.DOB)
    })
    setBlogData(updateData)
  }

  const handelDesc=()=>{
    let allBlog=JSON.parse(localStorage.getItem("blogData"));
    let updateData=allBlog.sort((a,b)=>{
      return b.DOB.localeCompare(a.DOB)
    })
    setBlogData(updateData)
  }
  const handelSearch=()=>{
    let allBlogs=JSON.parse(localStorage.getItem('blogData'));
    console.log(allBlogs)
    let updataSearch=allBlogs.filter((blog)=>{
      return(
        blog.fname.toLowerCase().includes(searchVal.toLowerCase())
      );
    });
   setBlogData(updataSearch)
   console.log(updataSearch)
   setSearchVal("")
  }

  useEffect(() => {
    let data = localStorage.getItem('blogData');
    if (data) {
      setBlogData(JSON.parse(data));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const goToSinglePage = (id) => {
    // Ensure the route is correctly named
    navigate(`/ShowBlog/${id}`);
    // console.log(id);
 };
   const handelDelete =(id)=>{
    let updateData =blogData.filter((blog)=>blog.id != id);
    localStorage.setItem("blogData", JSON.stringify(updateData));
    setBlogData(updateData);
   }

   const handelEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const isNoCards = blogData.length === 0;
  return (
    <>
      <Header background="#BF97C5" />
      <div className={`banner ${isNoCards ? "no-cards" : ""}`}>
      <div className="d-flex justify-content-center pt-3">
          <input type="text" value={searchVal} onChange={(e)=>setSearchVal(e.target.value)}className="rounded-0"/>
          
          <Button onClick={handelSearch} className="rounded-0">
            <FaSearch />
          </Button>&nbsp;&nbsp;&nbsp;&nbsp;
          <Button onClick={handelAsc}>
            <FaArrowUp />
          </Button>&nbsp;&nbsp;&nbsp;&nbsp;
          <Button onClick={handelDesc}>
            <FaArrowDown />
          </Button>{" "}
        </div>
        <div className="blog-display">
          <h2 className="text-center py-3 fs-1 fw-bold">Blogs</h2>
          <div className="container d-flex">
           <Row>
           {blogData.map((v) => {
              return (
                <Col key={v.id} className="ms-2 mt-3 mb-3">
                  <Card style={{ width: '18rem' }} className="card border-0 p-2">
                    <img
                      src={v.imageUrl}
                      alt="Blog Image"
                      style={{ width: '260px', height: '260px', objectFit: 'cover' }} 
                      className="rounded m-1"
                    />
                    <Card.Body>
                      <p className="fs-3 fw-bold text-black mb-0">{v.titlename}</p>
                      <p className="my-2">{v.describe}</p>
                      <p className="mb-0 text-black fw-bold"><strong>Name:</strong> {v.fname}</p>
                      <p className="mb-0 text-black" style={{ fontSize: "15px" }}>{v.DOB}</p>
                      <p className="text-black" style={{ fontSize: "13px" }}>{v.Time}</p>
                      <Button onClick={() => goToSinglePage(v.id)}><FaEye /></Button>
                      <Button className="mx-4" onClick={() => handelEdit(v.id)}><FaEdit/></Button>
                      <Button onClick={() => handelDelete(v.id)}><FaTrash/></Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
           </Row>
          </div>
        </div>
      </div>
    </>
  );
}

export default CrudWithRouting;
