import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Card } from "react-bootstrap";
import Header from "../Component/Header";

function ShowBlog() {
  const { id } = useParams(); // Get the 'id' from the URL
  console.log(id)
  const [blog, setBlog] = useState(null); // Initialize with null

  useEffect(() => {
    let data = localStorage.getItem('blogData');
    if (data) {
      const blogs = JSON.parse(data);
      const singleBlog = blogs.find(blog => blog.id === parseInt(id)); // Find the blog by ID
      setBlog(singleBlog || null); // If blog not found, set to null
    }
  }, [id]);

  if (blog === null) {
    return <div className="text-center py-3">Blog not found</div>; // Handle the case where no blog is found
  }

  return (
    <>
      <Header background="#D7BFD1" />
      <div className="showblog">
        <div className="container">
          <h2 className="text-center py-3 fs-1 fw-bold">Singalblog Details</h2>
          <Card style={{ width: '50%',height:"550px" }}className="border-0 d-flex justify-content-center align-items-left p-2">
            <img
              src={blog.imageUrl}
              alt="Blog Image"
              style={{ width: '98%', height: '280px', objectFit: 'cover' }}
              className="rounded m-2"
            />
            <Card.Body>
              <h3 className="fs-2 text-black">{blog.titlename}</h3>
              <p>{blog.describe}</p>
              <p><strong>Author:</strong> {blog.fname}</p>
              <p><strong>DOB:</strong> {blog.DOB}</p>
              <p><strong>Time:</strong> {blog.Time}</p>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}

export default ShowBlog;
