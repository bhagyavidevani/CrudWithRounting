import { useState } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // For navigation
import Header from '../Component/Header';

function AddBlog() {
  const initialState = {
    fname: '',
    titlename: '',
    DOB: '',
    Time: '',
    describe: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validation function for each field
  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'fname':
        if (!value) {
          error = "* First name is required";
        } else if (value.length < 3) {
          error = "* First name must be at least 3 characters long";
        }
        break;
      case 'titlename':
        if (!value) {
          error = "* Blog title is required";
        }
        break;
      case 'DOB':
        if (!value) {
          error = "* Date of birth is required";
        }
        break;
      case 'Time':
        if (!value) {
          error = "* Time is required";
        }
        break;
      case 'describe':
        if (!value) {
          error = "* Description is required";
        } else if (value.length < 10) {
          error = "* Description must be at least 10 characters long";
        }
        break;
      default:
        break;
    }

    return error;
  };

  // Handle field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image URL change
  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    // Validate image URL
    if (!imageUrl) {
      newErrors.imageUrl = "* Image URL is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Combine form data and image URL into a new entry
    let id = Math.floor(100000 + Math.random() * 100000);
    const newEntry = { ...formData, imageUrl, id };

    // Retrieve existing data from localStorage
    const existingData = JSON.parse(localStorage.getItem('blogData')) || [];

    // Add the new entry to the array
    const updatedData = [...existingData, newEntry];

    // Save the updated array back to localStorage
    localStorage.setItem('blogData', JSON.stringify(updatedData));

    // Reset the form fields
    setFormData(initialState);
    setImageUrl('');

    // Redirect to the display page
    navigate('/');
  };

  return (
    <>
      <Header background="#BF97C5" />
      <div className="addblog position-relative">
        <div className="addblogContent mt-5">
          <h2 className="text-center mb-3 fs-1 fw-bold">Add Blog</h2>
          <Row>
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Row}>
                <Col className="mb-3">
                  <Form.Label className="fw-semibold fs-5">Author Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="fname"
                    placeholder="Author Name"
                    value={formData.fname}
                    onChange={handleChange}
                    onBlur={() => setErrors({ ...errors, fname: validateField('fname', formData.fname) })}
                  />
                  {errors.fname && <i style={{ color: "red" }}>{errors.fname}</i>}
                </Col>

                <Col>
                  <Form.Label className="fw-semibold fs-5">Blog Title:</Form.Label>
                  <Form.Control
                    type="text"
                    name="titlename"
                    placeholder="Blog Title"
                    value={formData.titlename}
                    onChange={handleChange}
                    onBlur={() => setErrors({ ...errors, titlename: validateField('titlename', formData.titlename) })}
                  />
                  {errors.titlename && <i style={{ color: "red" }}>{errors.titlename}</i>}
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Col className="mb-3">
                  <Form.Label className="fw-semibold fs-5">DOB:</Form.Label>
                  <Form.Control
                    type="date"
                    name="DOB"
                    value={formData.DOB}
                    onChange={handleChange}
                    onBlur={() => setErrors({ ...errors, DOB: validateField('DOB', formData.DOB) })}
                  />
                  {errors.DOB && <i style={{ color: "red" }}>{errors.DOB}</i>}
                </Col>

                <Col>
                  <Form.Label className="fw-semibold fs-5">Time:</Form.Label>
                  <Form.Control
                    type="time"
                    name="Time"
                    value={formData.Time}
                    onChange={handleChange}
                    onBlur={() => setErrors({ ...errors, Time: validateField('Time', formData.Time) })}
                  />
                  {errors.Time && <i style={{ color: "red" }}>{errors.Time}</i>}
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
                    value={formData.describe}
                    onChange={handleChange}
                    onBlur={() => 
                      setErrors({ ...errors, describe: validateField('describe', formData.describe) })
                    }
                  />
                  {errors.describe && <i style={{ color: "red" }}>{errors.describe}</i>}
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Col className="mb-3">
                  <Form.Label className="fw-semibold fs-5">Enter Image URL:</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="Paste an image URL"
                    value={imageUrl}
                    onChange={handleImageUrlChange}
                    onBlur={() => setErrors({ ...errors, imageUrl: imageUrl ? '' : '* Image URL is required' })}
                  />
                  {errors.imageUrl && <i style={{ color: "red" }}>{errors.imageUrl}</i>}
                </Col>
              </Form.Group>

              <div className="text-center">
                <Button type="submit" className="mt-3">
                  Submit
                </Button>
              </div>
            </Form>
          </Row>
        </div>
      </div>
    </>
  );
}

export default AddBlog;
