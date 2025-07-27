import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { Container, Row, Col, Card, Button, Badge, Alert, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { 
  Award, 
  Download, 
  Share, 
  CheckCircle, 
  Clock,
  Star
} from 'react-bootstrap-icons';
import AuthContext from '../../Contexts/authContext';
import swal from 'sweetalert';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const CertificateGenerator = () => {
  const { courseId } = useParams();
  const { api, profile, loading, setLoading } = useContext(AuthContext);
  const [certificate, setCertificate] = useState(null);
  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  
  const certificateRef = useRef(null);

  useEffect(() => {
    if (courseId) {
      fetchCertificateData();
    }
  }, [courseId, fetchCertificateData]);

  const fetchCertificateData = useCallback(async () => {
    setLoading(true);
    try {
      const [certificateRes, courseRes, enrollmentRes] = await Promise.all([
        api.get(`/certificate/course/${courseId}`),
        api.get(`/courses/${courseId}`),
        api.get(`/enrollment/course/${courseId}`)
      ]);

      setCertificate(certificateRes.data.certificate);
      setCourse(courseRes.data.course);
      setEnrollment(enrollmentRes.data.enrollment);
    } catch (error) {
      console.error('Error fetching certificate data:', error);
      swal('Error', 'Failed to load certificate data', 'error');
    } finally {
      setLoading(false);
    }
  }, [api, courseId, setLoading]);

  const generateCertificate = async () => {
    if (!enrollment || enrollment.status !== 'completed') {
      swal('Error', 'Course must be completed to generate certificate', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(`/certificate/generate`, {
        courseId: courseId,
        enrollmentId: enrollment._id
      });

      setCertificate(response.data.certificate);
      swal('Success', 'Certificate generated successfully!', 'success');
    } catch (error) {
      console.error('Error generating certificate:', error);
      swal('Error', 'Failed to generate certificate', 'error');
    } finally {
      setLoading(false);
    }
  };

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`certificate-${course?.name}-${profile?.firstName}-${profile?.lastName}.pdf`);
    } catch (error) {
      console.error('Error downloading certificate:', error);
      swal('Error', 'Failed to download certificate', 'error');
    }
  };

  const shareCertificate = () => {
    if (navigator.share) {
      navigator.share({
        title: `Certificate of Completion - ${course?.name}`,
        text: `I just completed ${course?.name} and earned a certificate!`,
        url: window.location.href
      });
    } else {
      setShowShareModal(true);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      swal('Success', 'Copied to clipboard!', 'success');
    });
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+':
      case 'A':
      case 'A-':
        return 'success';
      case 'B+':
      case 'B':
      case 'B-':
        return 'primary';
      case 'C+':
      case 'C':
      case 'C-':
        return 'warning';
      default:
        return 'danger';
    }
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

  if (!enrollment) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          <h4>Enrollment Required</h4>
          <p>You need to be enrolled in this course to view certificates.</p>
        </Alert>
      </Container>
    );
  }

  if (enrollment.status !== 'completed') {
    return (
      <Container className="py-5">
        <Alert variant="info">
          <h4>Course Not Completed</h4>
          <p>You need to complete the course to generate a certificate.</p>
          <div className="mt-3">
            <div className="d-flex justify-content-between mb-2">
              <span>Progress</span>
              <span>{enrollment.progress || 0}%</span>
            </div>
            <div className="progress">
              <div 
                className="progress-bar" 
                style={{ width: `${enrollment.progress || 0}%` }}
              ></div>
            </div>
          </div>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="mb-3">
              <Award className="text-primary me-2" />
              Certificate of Completion
            </h1>
            <p className="text-muted">
              Congratulations on completing {course?.name}!
            </p>
          </div>

          {/* Certificate Actions */}
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">Certificate Status</h5>
                  <p className="text-muted mb-0">
                    {certificate ? 'Certificate generated' : 'Ready to generate'}
                  </p>
                </div>
                <div className="d-flex gap-2">
                  {!certificate ? (
                    <Button variant="primary" onClick={generateCertificate}>
                      <Award className="me-2" />
                      Generate Certificate
                    </Button>
                  ) : (
                    <>
                      <Button variant="outline-primary" onClick={downloadCertificate}>
                        <Download className="me-2" />
                        Download PDF
                      </Button>
                      <Button variant="outline-secondary" onClick={shareCertificate}>
                        <Share className="me-2" />
                        Share
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Certificate Display */}
          {certificate && (
            <Card className="border-0 shadow-sm mb-4">
              <Card.Body className="p-0">
                <div 
                  ref={certificateRef}
                  className="certificate-container"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '40px',
                    borderRadius: '12px',
                    color: 'white',
                    textAlign: 'center',
                    minHeight: '600px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Background Pattern */}
                  <div 
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                      pointerEvents: 'none'
                    }}
                  />

                  {/* Certificate Content */}
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    {/* Header */}
                    <div className="mb-4">
                      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        Certificate of Completion
                      </h1>
                      <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
                        This is to certify that
                      </p>
                    </div>

                    {/* Student Name */}
                    <div className="mb-4">
                      <h2 style={{ 
                        fontSize: '2rem', 
                        fontWeight: 'bold',
                        borderBottom: '2px solid rgba(255,255,255,0.3)',
                        paddingBottom: '1rem',
                        display: 'inline-block'
                      }}>
                        {profile?.firstName} {profile?.lastName}
                      </h2>
                    </div>

                    {/* Course Details */}
                    <div className="mb-4">
                      <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                        has successfully completed the course
                      </p>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                        {course?.name}
                      </h3>
                      <p style={{ fontSize: '1rem', opacity: 0.9 }}>
                        {course?.description}
                      </p>
                    </div>

                    {/* Course Stats */}
                    <div className="row justify-content-center mb-4">
                      <div className="col-md-4">
                        <div className="text-center">
                          <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                            <Clock className="me-2" />
                            Duration
                          </h4>
                          <p style={{ fontSize: '1rem', opacity: 0.9 }}>
                            {enrollment.totalTimeSpent} minutes
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="text-center">
                          <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                            <Star className="me-2" />
                            Grade
                          </h4>
                          <Badge 
                            bg={getGradeColor(certificate.grade)}
                            style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}
                          >
                            {certificate.grade}
                          </Badge>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="text-center">
                          <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                            <CheckCircle className="me-2" />
                            Score
                          </h4>
                          <p style={{ fontSize: '1rem', opacity: 0.9 }}>
                            {certificate.score}%
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Completion Date */}
                    <div className="mb-4">
                      <p style={{ fontSize: '1rem', opacity: 0.9 }}>
                        Completed on {new Date(certificate.completedAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Certificate ID */}
                    <div className="mb-4">
                      <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                        Certificate ID: {certificate.certificateId}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="row justify-content-between align-items-end">
                      <div className="col-4 text-start">
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.3)', paddingTop: '1rem' }}>
                          <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Instructor</p>
                          <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                            {course?.instructor?.firstName} {course?.instructor?.lastName}
                          </p>
                        </div>
                      </div>
                      <div className="col-4 text-center">
                        <div style={{ 
                          border: '2px solid rgba(255,255,255,0.3)', 
                          borderRadius: '50%',
                          width: '80px',
                          height: '80px',
                          margin: '0 auto',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Award size={40} />
                        </div>
                      </div>
                      <div className="col-4 text-end">
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.3)', paddingTop: '1rem' }}>
                          <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Issued Date</p>
                          <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                            {new Date(certificate.issuedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          )}

          {/* Certificate Details */}
          {certificate && (
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white border-0">
                <h5 className="mb-0">Certificate Details</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <strong>Certificate ID:</strong>
                      <div className="d-flex align-items-center mt-1">
                        <code className="me-2">{certificate.certificateId}</code>
                        <Button 
                          variant="outline-secondary" 
                          size="sm"
                          onClick={() => copyToClipboard(certificate.certificateId)}
                        >
                          Copy
                        </Button>
                      </div>
                    </div>
                    <div className="mb-3">
                      <strong>Verification Code:</strong>
                      <div className="d-flex align-items-center mt-1">
                        <code className="me-2">{certificate.verificationCode}</code>
                        <Button 
                          variant="outline-secondary" 
                          size="sm"
                          onClick={() => copyToClipboard(certificate.verificationCode)}
                        >
                          Copy
                        </Button>
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <strong>Issued:</strong> {new Date(certificate.issuedAt).toLocaleDateString()}
                    </div>
                    <div className="mb-3">
                      <strong>Expires:</strong> {new Date(certificate.expiresAt).toLocaleDateString()}
                    </div>
                    <div className="mb-3">
                      <strong>Status:</strong> 
                      <Badge bg={certificate.verified ? 'success' : 'warning'} className="ms-2">
                        {certificate.verified ? 'Verified' : 'Pending Verification'}
                      </Badge>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      {/* Share Modal */}
      <Modal show={showShareModal} onHide={() => setShowShareModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Share Certificate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Certificate URL</label>
            <div className="input-group">
              <input 
                type="text" 
                className="form-control" 
                value={window.location.href}
                readOnly
              />
              <Button 
                variant="outline-secondary"
                onClick={() => copyToClipboard(window.location.href)}
              >
                Copy
              </Button>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Verification Code</label>
            <div className="input-group">
              <input 
                type="text" 
                className="form-control" 
                value={certificate?.verificationCode || ''}
                readOnly
              />
              <Button 
                variant="outline-secondary"
                onClick={() => copyToClipboard(certificate?.verificationCode || '')}
              >
                Copy
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default CertificateGenerator; 