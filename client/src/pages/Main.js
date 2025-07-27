import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { 
  PlayCircle, 
  JournalText, 
  Award, 
  People, 
  Star, 
  Clock, 
  GraphUp,
  CheckCircle,
  ArrowRight,
  Rocket,
  Lightbulb,
  CodeSlash
} from 'react-bootstrap-icons';
import AuthContext from '../Contexts/authContext';

const Main = () => {
  const { api } = useContext(AuthContext);
  const [featuredCourses, setFeaturedCourses] = useState([]);

  const fetchFeaturedData = useCallback(async () => {
    try {
      const [coursesRes] = await Promise.all([
        api.get('/courses?featured=true&limit=6')
      ]);
      setFeaturedCourses(coursesRes.data.courses || []);
    } catch (error) {
      console.error('Error fetching featured data:', error);
    }
  }, [api]);

  useEffect(() => {
    fetchFeaturedData();
  }, [fetchFeaturedData]);

  const features = [
    {
      icon: <Rocket size={40} className="text-primary" />,
      title: "Learn at Your Pace",
      description: "Flexible learning schedules that fit your lifestyle and commitments."
    },
    {
      icon: <Lightbulb size={40} className="text-warning" />,
      title: "Expert Instructors",
      description: "Learn from industry professionals with years of real-world experience."
    },
    {
      icon: <CodeSlash size={40} className="text-success" />,
      title: "Hands-on Projects",
      description: "Build real projects and gain practical experience in your field."
    },
    {
      icon: <Award size={40} className="text-info" />,
      title: "Certificates",
      description: "Earn recognized certificates upon course completion."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Frontend Developer",
      content: "The courses here helped me transition from a beginner to a professional developer. The hands-on projects were invaluable!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      role: "Data Scientist",
      content: "Excellent course structure and the instructors are incredibly knowledgeable. Highly recommended for anyone serious about learning.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer",
      content: "The practical approach and real-world examples made learning so much more effective. I've already applied what I learned to my job.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section py-5" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h1 className="display-4 fw-bold mb-4">
                Master New Skills with Expert-Led Courses
              </h1>
              <p className="lead mb-4 opacity-90">
                Join thousands of learners worldwide and advance your career with our comprehensive 
                online courses designed by industry experts.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/courses" className="btn btn-light btn-lg px-4 py-3 fw-bold">
                  <PlayCircle className="me-2" />
                  Start Learning
                </Link>
                <Link to="/blogs" className="btn btn-outline-light btn-lg px-4 py-3">
                  <JournalText className="me-2" />
                  Read Articles
                </Link>
              </div>
            </Col>
            <Col lg={6}>
              <div className="text-center">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop" 
                  alt="Students learning"
                  className="img-fluid rounded-3 shadow-lg"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="text-center">
            <Col md={3} className="mb-4">
              <div className="p-4">
                <People size={48} className="text-primary mb-3" />
                <h3 className="fw-bold mb-2">10,000+</h3>
                <p className="text-muted mb-0">Active Students</p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
                          <div className="p-4">
              <JournalText size={48} className="text-success mb-3" />
              <h3 className="fw-bold mb-2">500+</h3>
              <p className="text-muted mb-0">Expert Courses</p>
            </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="p-4">
                <Award size={48} className="text-warning mb-3" />
                <h3 className="fw-bold mb-2">95%</h3>
                <p className="text-muted mb-0">Completion Rate</p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="p-4">
                <Star size={48} className="text-info mb-3" />
                <h3 className="fw-bold mb-2">4.8/5</h3>
                <p className="text-muted mb-0">Student Rating</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col lg={8} className="mx-auto">
              <h2 className="display-5 fw-bold mb-3">Why Choose Our Platform?</h2>
              <p className="lead text-muted">
                We provide the best learning experience with cutting-edge technology and expert instructors.
              </p>
            </Col>
          </Row>
          <Row>
            {features.map((feature, index) => (
              <Col lg={3} md={6} className="mb-4" key={index}>
                <Card className="h-100 border-0 shadow-sm text-center">
                  <Card.Body className="p-4">
                    <div className="mb-3">
                      {feature.icon}
                    </div>
                    <h5 className="fw-bold mb-3">{feature.title}</h5>
                    <p className="text-muted mb-0">{feature.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Featured Courses Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="text-center mb-5">
            <Col lg={8} className="mx-auto">
              <h2 className="display-5 fw-bold mb-3">Featured Courses</h2>
              <p className="lead text-muted">
                Discover our most popular courses and start your learning journey today.
              </p>
            </Col>
          </Row>
          <Row>
            {featuredCourses.slice(0, 6).map((course) => (
              <Col lg={4} md={6} className="mb-4" key={course._id}>
                <Card className="h-100 border-0 shadow-sm course-card">
                  <div className="position-relative">
                    <img 
                      src={course.imageUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop"} 
                      className="card-img-top"
                      alt={course.name}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <Badge 
                      bg={course.skillLevel === 'Beginner' ? 'success' : course.skillLevel === 'Advanced' ? 'danger' : 'warning'}
                      className="position-absolute top-0 end-0 m-3"
                    >
                      {course.skillLevel}
                    </Badge>
                  </div>
                  <Card.Body className="p-4">
                    <h5 className="fw-bold mb-2">{course.name}</h5>
                    <p className="text-muted mb-3">{course.description?.substring(0, 100)}...</p>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex align-items-center">
                        <Clock size={16} className="text-muted me-1" />
                        <small className="text-muted">{course.duration} hours</small>
                      </div>
                      <div className="d-flex align-items-center">
                        <Star size={16} className="text-warning me-1" />
                        <small className="text-muted">4.8</small>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="h5 fw-bold text-primary mb-0">
                        ${course.price}
                      </span>
                      <Link to={`/courses/${course._id}`} className="btn btn-primary btn-sm">
                        Learn More
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Row className="text-center mt-4">
            <Col>
              <Link to="/courses" className="btn btn-outline-primary btn-lg">
                View All Courses
                <ArrowRight className="ms-2" />
              </Link>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col lg={8} className="mx-auto">
              <h2 className="display-5 fw-bold mb-3">What Our Students Say</h2>
              <p className="lead text-muted">
                Hear from our community of learners who have transformed their careers.
              </p>
            </Col>
          </Row>
          <Row>
            {testimonials.map((testimonial, index) => (
              <Col lg={4} className="mb-4" key={index}>
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center mb-3">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="rounded-circle me-3"
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      />
                      <div>
                        <h6 className="fw-bold mb-0">{testimonial.name}</h6>
                        <small className="text-muted">{testimonial.role}</small>
                      </div>
                    </div>
                    <p className="mb-3">{testimonial.content}</p>
                    <div className="d-flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} className="text-warning" />
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5" style={{
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        color: 'white'
      }}>
        <Container>
          <Row className="text-center">
            <Col lg={8} className="mx-auto">
              <h2 className="display-5 fw-bold mb-4">Ready to Start Your Learning Journey?</h2>
              <p className="lead mb-4 opacity-90">
                Join thousands of students who are already advancing their careers with our courses.
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                <Link to="/register" className="btn btn-light btn-lg px-4 py-3 fw-bold">
                  Get Started Free
                </Link>
                <Link to="/courses" className="btn btn-outline-light btn-lg px-4 py-3">
                  Browse Courses
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Learning Paths Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="text-center mb-5">
            <Col lg={8} className="mx-auto">
              <h2 className="display-5 fw-bold mb-3">Popular Learning Paths</h2>
              <p className="lead text-muted">
                Follow structured learning paths designed by industry experts.
              </p>
            </Col>
          </Row>
          <Row>
            <Col lg={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="text-center mb-4">
                    <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3">
                      <CodeSlash size={32} className="text-primary" />
                    </div>
                  </div>
                  <h4 className="fw-bold text-center mb-3">Web Development</h4>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <CheckCircle className="text-success me-2" />
                      HTML, CSS & JavaScript
                    </li>
                    <li className="mb-2">
                      <CheckCircle className="text-success me-2" />
                      React & Node.js
                    </li>
                    <li className="mb-2">
                      <CheckCircle className="text-success me-2" />
                      Database Design
                    </li>
                    <li className="mb-2">
                      <CheckCircle className="text-success me-2" />
                      Deployment & DevOps
                    </li>
                  </ul>
                  <div className="text-center mt-4">
                    <Link to="/courses?category=web-development" className="btn btn-primary">
                      Start Path
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="text-center mb-4">
                    <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex p-3">
                      <GraphUp size={32} className="text-success" />
                    </div>
                  </div>
                  <h4 className="fw-bold text-center mb-3">Data Science</h4>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <CheckCircle className="text-success me-2" />
                      Python Programming
                    </li>
                    <li className="mb-2">
                      <CheckCircle className="text-success me-2" />
                      Statistics & Mathematics
                    </li>
                    <li className="mb-2">
                      <CheckCircle className="text-success me-2" />
                      Machine Learning
                    </li>
                    <li className="mb-2">
                      <CheckCircle className="text-success me-2" />
                      Data Visualization
                    </li>
                  </ul>
                  <div className="text-center mt-4">
                    <Link to="/courses?category=data-science" className="btn btn-success">
                      Start Path
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="text-center mb-4">
                    <div className="bg-warning bg-opacity-10 rounded-circle d-inline-flex p-3">
                      <Lightbulb size={32} className="text-warning" />
                    </div>
                  </div>
                  <h4 className="fw-bold text-center mb-3">UX/UI Design</h4>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <CheckCircle className="text-success me-2" />
                      Design Principles
                    </li>
                    <li className="mb-2">
                      <CheckCircle className="text-success me-2" />
                      Figma & Sketch
                    </li>
                    <li className="mb-2">
                      <CheckCircle className="text-success me-2" />
                      User Research
                    </li>
                    <li className="mb-2">
                      <CheckCircle className="text-success me-2" />
                      Prototyping
                    </li>
                  </ul>
                  <div className="text-center mt-4">
                    <Link to="/courses?category=ux-ui-design" className="btn btn-warning">
                      Start Path
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Main;
