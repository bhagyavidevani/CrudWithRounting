// import React from 'react'
import { Navbar,Container} from "react-bootstrap";
import { RiPhoneLine } from "react-icons/ri";

function Header({background}) {
  return (
      <>
         <div className="mainNavbar">
              <div className="header" style={{ backgroundColor: background }}>
                  <Container>
                    <Navbar className="justify-content-between w-100 align-items-center p-0" expand="lg">
                      <Navbar.Brand href="/" className="fs-1 fw-bold">Medium</Navbar.Brand>
                      <nav >
                        <ul className="d-flex justify-content-center m-0">
                          <li><a href="/" className="p-0 fw-semibold fs-5">Home</a></li>


                          <li className="ps-5">
                            <div className="nav-item">
                              <div className="category-hover d-flex align-items-center">
                                <a href="/AddBlog" className="fw-semibold p-0 fs-5">AddBlog</a>
                              </div>
                            </div>
                          </li>
                          
                        </ul>
                      </nav>
                      <div className="phone">
                        <a href="javascript:void(0)" className="fs-5">
                          <RiPhoneLine />
                          +123 (456) (7890)
                        </a>
                      </div>
                    </Navbar>
                 </Container>
              </div>
              <div>
             
          </div>
          </div>
      </>
  )
}

export default Header
