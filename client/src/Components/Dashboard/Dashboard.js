import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Container, Row, Col, Card, ProgressBar, Badge, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  JournalText, 
  Clock, 
  Award, 
  GraphUp, 
  PlayCircle, 
  CheckCircle,
  Star,
  Bullseye
} from 'react-bootstrap-icons';
import AuthContext from '../../Contexts/authContext';
import swal from 'sweetalert';

const Dashboard = () => {
  const { api, profile, loading, setLoading } = useContext(AuthContext);
  const [enrollments, setEnrollments] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalCourses: 0,
    completedCourses: 0,
    totalTimeSpent: 0,
    averageRating: 0,
    recentActivity: []
  });

  useEffect(() => {
    if (profile) {
      fetchDashboardData();
    }
  }, [profile, fetchDashboardData]);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const [enrollmentsRes, analyticsRes] = await Promise.all([
        api.get('/enrollment/my-enrollments'),
        api.get('/enrollment/analytics')
      ]);

      setEnrollments(enrollmentsRes.data.enrollments || []);
      setAnalytics(analyticsRes.data.analytics || {});
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      swal('Error', 'Failed to load dashboard data', 'error');
    } finally {
      setLoading(false);
    }
  }, [api, setLoading]);

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'success';
    if (progress >= 60) return 'warning';
    if (progress >= 40) return 'info';
    return 'danger';
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getRecentCourses = () => {
    return enrollments
      .sort((a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed))
      .slice(0, 3);
  };

  const getRecommendedCourses = () => {
    // Simple recommendation based on user's completed courses
    const completedCategories = enrollments
      .filter(e => e.status === 'completed')
      .map(e => e.course?.category)
      .filter(Boolean);

    return enrollments
      .filter(e => e.status === 'active' && !completedCategories.includes(e.course?.category))
      .slice(0, 3);
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      {/* Welcome Section */}
      <Row className="mb-4">
        <Col>
          <div className="bg-gradient-primary text-white p-4 rounded-3 shadow">
            <h1 className="mb-2">Welcome back, {profile?.firstName}!</h1>
            <p className="mb-0 opacity-75">
              Continue your learning journey and track your progress
            </p>
          </div>
        </Col>
      </Row>

      {/* Analytics Cards */}
      <Row className="mb-4">
        <Col lg={3} md={6} className="mb-3">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="text-center">
                              <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                  <JournalText size={24} className="text-primary" />
                </div>
              <h3 className="mb-1">{enrollments.length}</h3>
              <p className="text-muted mb-0">Enrolled Courses</p>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="text-center">
              <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                <CheckCircle size={24} className="text-success" />
              </div>
              <h3 className="mb-1">
                {enrollments.filter(e => e.status === 'completed').length}
              </h3>
              <p className="text-muted mb-0">Completed Courses</p>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="text-center">
              <div className="bg-warning bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                <Clock size={24} className="text-warning" />
              </div>
              <h3 className="mb-1">
                {formatTime(enrollments.reduce((total, e) => total + (e.totalTimeSpent || 0), 0))}
              </h3>
              <p className="text-muted mb-0">Total Time Spent</p>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="text-center">
              <div className="bg-info bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                <Star size={24} className="text-info" />
              </div>
              <h3 className="mb-1">
                {enrollments.length > 0 
                  ? (enrollments.reduce((total, e) => total + (e.rating || 0), 0) / enrollments.filter(e => e.rating).length).toFixed(1)
                  : '0.0'
                }
              </h3>
              <p className="text-muted mb-0">Average Rating</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Main Content */}
      <Row>
        {/* Recent Courses */}
        <Col lg={8} className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <PlayCircle className="me-2" />
                  Continue Learning
                </h5>
                <Link to="/my-courses" className="btn btn-outline-primary btn-sm">
                  View All
                </Link>
              </div>
            </Card.Header>
            <Card.Body>
              {getRecentCourses().length > 0 ? (
                getRecentCourses().map((enrollment) => (
                  <div key={enrollment._id} className="d-flex align-items-center p-3 border rounded mb-3">
                    <div className="flex-shrink-0 me-3">
                      <img 
                        src={enrollment.course?.imageUrl || '/images/default-course.jpg'} 
                        alt={enrollment.course?.name}
                        className="rounded"
                        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                      />
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-1">{enrollment.course?.name}</h6>
                      <div className="d-flex align-items-center mb-2">
                        <ProgressBar 
                          now={enrollment.progress || 0} 
                          variant={getProgressColor(enrollment.progress || 0)}
                          style={{ width: '100px', height: '6px' }}
                          className="me-2"
                        />
                        <small className="text-muted">{enrollment.progress || 0}%</small>
                      </div>
                      <div className="d-flex align-items-center">
                        <Badge bg={enrollment.status === 'completed' ? 'success' : 'primary'} className="me-2">
                          {enrollment.status}
                        </Badge>
                        <small className="text-muted">
                          Last accessed: {new Date(enrollment.lastAccessed).toLocaleDateString()}
                        </small>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <Link 
                        to={`/course/${enrollment.course._id}`} 
                        className="btn btn-primary btn-sm"
                      >
                        Continue
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <Alert variant="info" className="text-center">
                  <JournalText size={24} className="mb-2" />
                  <p className="mb-0">You haven't enrolled in any courses yet.</p>
                  <Link to="/courses" className="btn btn-primary btn-sm mt-2">
                    Browse Courses
                  </Link>
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Sidebar */}
        <Col lg={4}>
          {/* Quick Stats */}
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-white border-0">
              <h6 className="mb-0">
                <GraphUp className="me-2" />
                Learning Stats
              </h6>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>This Week</span>
                <span className="fw-bold">
                  {formatTime(enrollments.reduce((total, e) => total + (e.totalTimeSpent || 0), 0) / 4)}
                </span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Lessons Completed</span>
                <span className="fw-bold">
                  {enrollments.reduce((total, e) => 
                    total + (e.lessonProgress?.filter(lp => lp.completed).length || 0), 0
                  )}
                </span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Streak</span>
                <span className="fw-bold text-success">7 days</span>
              </div>
            </Card.Body>
          </Card>

          {/* Recommended Courses */}
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-white border-0">
              <h6 className="mb-0">
                <Bullseye className="me-2" />
                Recommended
              </h6>
            </Card.Header>
            <Card.Body>
              {getRecommendedCourses().length > 0 ? (
                getRecommendedCourses().map((enrollment) => (
                  <div key={enrollment._id} className="mb-3">
                    <h6 className="mb-1">{enrollment.course?.name}</h6>
                    <p className="text-muted small mb-2">{enrollment.course?.description?.substring(0, 60)}...</p>
                    <Link to={`/course/${enrollment.course._id}`} className="btn btn-outline-primary btn-sm">
                      Resume
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-muted small">No recommendations available.</p>
              )}
            </Card.Body>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0">
              <h6 className="mb-0">
                <Award className="me-2" />
                Quick Actions
              </h6>
            </Card.Header>
            <Card.Body>
              <div className="d-grid gap-2">
                <Link to="/courses" className="btn btn-primary btn-sm">
                  Browse Courses
                </Link>
                <Link to="/certificates" className="btn btn-outline-secondary btn-sm">
                  View Certificates
                </Link>
                <Link to="/profile" className="btn btn-outline-secondary btn-sm">
                  Update Profile
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard; 