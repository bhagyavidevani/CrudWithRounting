import { useState, useEffect } from 'react';
import Header from '../Component/Header';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';

function Edit() {
  const { id } = useParams();
  console.log(id);
  
  let navigate = useNavigate(); // Corrected useNavigate() usage
  const initialState = {
    id: '',
    fname: '',
    titlename: '',
    DOB: '',
    Time: '',
    describe: '',
    imageUrl: '' // Ensure image URL is part of the state
  };
  const [inputForm, setInputForm] = useState(initialState);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputForm({
      ...inputForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let getData = JSON.parse(localStorage.getItem('blogData')) || [];
    let updatedData = getData.map((blogData) => {
      if (blogData.id === inputForm.id) {
        return inputForm; // Update the matching blog entry
      }
      return blogData;
    });
    
    localStorage.setItem("blogData", JSON.stringify(updatedData)); // Save the updated data
    navigate('/');
  };

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem('blogData')) || []; //local storage thi badha data avya
    data.map((v)=>{ 
      if(v.id == id){ 
        console.log(v);
        setInputForm(v);
      }
    })
  }, [id]);

  return (
    <>
      <Header background="#BF97C5"/>
      <div className="editblog">
        <div className="addblog position-relative">
          <div className="addblogContent mt-5">
            <h2 className="text-center mb-3 fs-1 fw-bold">Edit Blog</h2>
            <Row>
              <Form onSubmit={handleSubmit}>
                <Form.Group as={Row}>
                  <Col className="mb-3">
                    <Form.Label className="fw-semibold fs-5">Author Name:</Form.Label>
                    <Form.Control
                      type="text"
                      name="fname"
                      placeholder="First Name"
                      value={inputForm.fname}
                      onChange={handleChange}
                    />
                  </Col>

                  <Col>
                    <Form.Label className="fw-semibold fs-5">Blog Title:</Form.Label>
                    <Form.Control
                      type="text"
                      name="titlename"
                      placeholder="Blog Title"
                      value={inputForm.titlename}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Col className="mb-3">
                    <Form.Label className="fw-semibold fs-5">DOB:</Form.Label>
                    <Form.Control
                      type="date"
                      name="DOB"
                      value={inputForm.DOB}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col>
                    <Form.Label className="fw-semibold fs-5">Time:</Form.Label>
                    <Form.Control
                      type="time"
                      name="Time"
                      value={inputForm.Time}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Col>
                    <Form.Label className="fw-semibold fs-5">Describe Box:</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="describe"
                      rows="5"
                      placeholder="Write your description here..."
                      className="mb-3"
                      value={inputForm.describe}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Col className="mb-3">
                    <Form.Label className="fw-semibold fs-5">Enter Image URL:</Form.Label>
                    <Form.Control
                      type="text"
                      name='imageUrl'
                      placeholder="Paste an image URL"
                      value={inputForm.imageUrl}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>

                <div className="text-center">
                  <Button type="updata" className="mt-3">Update</Button>
                </div>
              </Form>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}

export default Edit;
