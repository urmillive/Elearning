import React, { useState, useEffect, useContext, useRef } from 'react';
import { Container, Row, Col, Card, Button, ProgressBar, Badge, Alert, Modal, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  SkipBackward, 
  SkipForward, 
  VolumeUp, 
  VolumeMute,
  Fullscreen,
  Bookmark,
  Chat,
  CheckCircle,
  Clock,
  Star
} from 'react-bootstrap-icons';
import AuthContext from '../../Contexts/authContext';
import swal from 'sweetalert';

const CoursePlayer = () => {
  const { courseId, moduleId, lessonId } = useParams();
  const { api, profile, loading, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentModule, setCurrentModule] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [showDiscussion, setShowDiscussion] = useState(false);
  const [discussions, setDiscussions] = useState([]);
  const [newDiscussion, setNewDiscussion] = useState({ title: '', content: '' });
  
  const videoRef = useRef(null);
  const progressInterval = useRef(null);

  useEffect(() => {
    if (courseId) {
      fetchCourseData();
    }
  }, [courseId]);

  useEffect(() => {
    if (course && moduleId && lessonId) {
      findCurrentLesson();
    }
  }, [course, moduleId, lessonId]);

  useEffect(() => {
    if (currentLesson) {
      startProgressTracking();
    }
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [currentLesson]);

  const fetchCourseData = async () => {
    setLoading(true);
    try {
      const [courseRes, enrollmentRes] = await Promise.all([
        api.get(`/courses/${courseId}`),
        api.get(`/enrollment/course/${courseId}`)
      ]);

      setCourse(courseRes.data.course);
      setEnrollment(enrollmentRes.data.enrollment);
    } catch (error) {
      console.error('Error fetching course data:', error);
      swal('Error', 'Failed to load course data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const findCurrentLesson = () => {
    const module = course.modules.find(m => m._id === moduleId);
    if (module) {
      setCurrentModule(module);
      const lesson = module.lessons.find(l => l._id === lessonId);
      if (lesson) {
        setCurrentLesson(lesson);
        loadLessonProgress(lesson);
      }
    }
  };

  const loadLessonProgress = (lesson) => {
    if (enrollment) {
      const progress = enrollment.lessonProgress.find(
        lp => lp.lesson === lesson._id && lp.module === moduleId
      );
      if (progress) {
        setNotes(progress.notes || '');
        setCurrentTime(progress.timeSpent || 0);
      }
    }
  };

  const startProgressTracking = () => {
    progressInterval.current = setInterval(() => {
      if (videoRef.current && isPlaying) {
        const time = videoRef.current.currentTime;
        setCurrentTime(time);
        updateProgress(time);
      }
    }, 5000); // Update every 5 seconds
  };

  const updateProgress = async (timeSpent) => {
    if (!enrollment || !currentLesson) return;

    try {
      await api.patch(`/enrollment/${enrollment._id}/lesson/${moduleId}/${currentLesson._id}`, {
        timeSpent: timeSpent,
        notes: notes
      });
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const markAsCompleted = async () => {
    if (!enrollment || !currentLesson) return;

    try {
      await api.patch(`/enrollment/${enrollment._id}/lesson/${moduleId}/${currentLesson._id}`, {
        completed: true,
        timeSpent: currentTime
      });

      swal('Success', 'Lesson marked as completed!', 'success');
      navigateToNextLesson();
    } catch (error) {
      console.error('Error marking lesson as completed:', error);
      swal('Error', 'Failed to mark lesson as completed', 'error');
    }
  };

  const navigateToNextLesson = () => {
    if (!course || !currentModule) return;

    const currentModuleIndex = course.modules.findIndex(m => m._id === moduleId);
    const currentLessonIndex = currentModule.lessons.findIndex(l => l._id === lessonId);

    let nextModule = currentModule;
    let nextLesson = null;

    if (currentLessonIndex < currentModule.lessons.length - 1) {
      // Next lesson in same module
      nextLesson = currentModule.lessons[currentLessonIndex + 1];
    } else if (currentModuleIndex < course.modules.length - 1) {
      // First lesson in next module
      nextModule = course.modules[currentModuleIndex + 1];
      nextLesson = nextModule.lessons[0];
    }

    if (nextLesson) {
      navigate(`/course/${courseId}/module/${nextModule._id}/lesson/${nextLesson._id}`);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderVideoPlayer = () => {
    if (!currentLesson) return null;

    return (
      <div className="video-container position-relative">
        <video
          ref={videoRef}
          className="w-100 rounded"
          controls
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onLoadedMetadata={() => setDuration(videoRef.current.duration)}
          onTimeUpdate={() => setCurrentTime(videoRef.current.currentTime)}
        >
          {currentLesson.contentType === 'video' && (
            <source src={currentLesson.content} type="video/mp4" />
          )}
          {currentLesson.contentType === 'uploaded_video' && (
            <source src={`${process.env.REACT_APP_API_URL}${currentLesson.content}`} type="video/mp4" />
          )}
          Your browser does not support the video tag.
        </video>

        {/* Custom Controls Overlay */}
        <div className="video-controls-overlay">
          <div className="progress-container" onClick={handleSeek}>
            <ProgressBar 
              now={(currentTime / duration) * 100} 
              variant="primary"
              style={{ height: '4px', cursor: 'pointer' }}
            />
          </div>
          
          <div className="controls-container d-flex align-items-center justify-content-between p-2">
            <div className="d-flex align-items-center">
              <Button variant="link" onClick={handlePlayPause} className="text-white">
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </Button>
              <span className="text-white ms-2">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            
            <div className="d-flex align-items-center">
              <Button variant="link" onClick={toggleMute} className="text-white">
                {isMuted ? <VolumeMute size={20} /> : <VolumeUp size={20} />}
              </Button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="volume-slider ms-2"
                style={{ width: '80px' }}
              />
              <Button variant="link" onClick={toggleFullscreen} className="text-white ms-2">
                <Fullscreen size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderLessonContent = () => {
    if (!currentLesson) return null;

    switch (currentLesson.contentType) {
      case 'text':
        return (
          <div className="lesson-text-content p-4">
            <div dangerouslySetInnerHTML={{ __html: currentLesson.content }} />
          </div>
        );
      
      case 'external_link':
        return (
          <div className="lesson-external-content p-4">
            <Alert variant="info">
              <h5>External Resource</h5>
              <p>This lesson contains an external resource.</p>
              <Button 
                href={currentLesson.content} 
                target="_blank" 
                rel="noopener noreferrer"
                variant="primary"
              >
                Open Resource
              </Button>
            </Alert>
          </div>
        );
      
      case 'file':
        return (
          <div className="lesson-file-content p-4">
            <Alert variant="info">
              <h5>Downloadable File</h5>
              <p>This lesson contains a downloadable file.</p>
              <Button 
                href={currentLesson.content} 
                download
                variant="primary"
              >
                Download File
              </Button>
            </Alert>
          </div>
        );
      
      default:
        return renderVideoPlayer();
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

  if (!course || !currentLesson) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          <h4>Lesson Not Found</h4>
          <p>The requested lesson could not be found.</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <Row>
        {/* Main Content */}
        <Col lg={8}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-white border-0">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">{currentLesson.title}</h4>
                <div className="d-flex gap-2">
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={() => setShowNotes(!showNotes)}
                  >
                    <Bookmark className="me-1" />
                    Notes
                  </Button>
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    onClick={() => setShowDiscussion(!showDiscussion)}
                  >
                    <Chat className="me-1" />
                    Discussion
                  </Button>
                  <Button 
                    variant="success" 
                    size="sm"
                    onClick={markAsCompleted}
                  >
                    <CheckCircle className="me-1" />
                    Complete
                  </Button>
                </div>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              {renderLessonContent()}
            </Card.Body>
          </Card>

          {/* Lesson Navigation */}
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <Button variant="outline-primary" onClick={() => navigate(-1)}>
                  <SkipBackward className="me-1" />
                  Previous
                </Button>
                <Button variant="primary" onClick={navigateToNextLesson}>
                  Next
                  <SkipForward className="ms-1" />
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Sidebar */}
        <Col lg={4}>
          {/* Course Progress */}
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-white border-0">
              <h6 className="mb-0">Course Progress</h6>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span>Overall Progress</span>
                  <span>{enrollment?.progress || 0}%</span>
                </div>
                <ProgressBar 
                  now={enrollment?.progress || 0} 
                  variant="primary"
                  style={{ height: '8px' }}
                />
              </div>
              <div className="d-flex justify-content-between text-muted small">
                <span>Time Spent: {formatTime(currentTime)}</span>
                <span>Duration: {currentLesson.durationMinutes || 0} min</span>
              </div>
            </Card.Body>
          </Card>

          {/* Course Modules */}
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-white border-0">
              <h6 className="mb-0">Course Modules</h6>
            </Card.Header>
            <Card.Body className="p-0">
              {course.modules.map((module, moduleIndex) => (
                <div key={module._id} className="border-bottom">
                  <div className="p-3">
                    <h6 className="mb-2">{module.name}</h6>
                    {module.lessons.map((lesson, lessonIndex) => (
                      <div 
                        key={lesson._id}
                        className={`d-flex align-items-center p-2 rounded mb-1 cursor-pointer ${
                          lesson._id === lessonId ? 'bg-primary text-white' : 'hover-bg-light'
                        }`}
                        onClick={() => navigate(`/course/${courseId}/module/${module._id}/lesson/${lesson._id}`)}
                      >
                        <div className="me-2">
                          {lesson.isFreePreview && <Star size={12} className="text-warning" />}
                          {lesson._id === lessonId ? <Play size={12} /> : <Clock size={12} />}
                        </div>
                        <span className="small">{lesson.title}</span>
                        {lesson.durationMinutes && (
                          <Badge bg="secondary" className="ms-auto">
                            {lesson.durationMinutes}m
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Notes Modal */}
      <Modal show={showNotes} onHide={() => setShowNotes(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Lesson Notes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Your Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Take notes about this lesson..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNotes(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {
            updateProgress(currentTime);
            setShowNotes(false);
          }}>
            Save Notes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Discussion Modal */}
      <Modal show={showDiscussion} onHide={() => setShowDiscussion(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Lesson Discussion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-4">
            <h6>Start a Discussion</h6>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={newDiscussion.title}
                  onChange={(e) => setNewDiscussion({...newDiscussion, title: e.target.value})}
                  placeholder="Discussion title..."
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={newDiscussion.content}
                  onChange={(e) => setNewDiscussion({...newDiscussion, content: e.target.value})}
                  placeholder="Share your thoughts or ask a question..."
                />
              </Form.Group>
              <Button variant="primary" size="sm">
                Post Discussion
              </Button>
            </Form>
          </div>
          
          <div>
            <h6>Recent Discussions</h6>
            {discussions.length > 0 ? (
              discussions.map(discussion => (
                <div key={discussion._id} className="border rounded p-3 mb-2">
                  <h6>{discussion.title}</h6>
                  <p className="small text-muted mb-1">{discussion.content}</p>
                  <small className="text-muted">
                    By {discussion.author?.firstName} {discussion.author?.lastName} • 
                    {new Date(discussion.createdAt).toLocaleDateString()}
                  </small>
                </div>
              ))
            ) : (
              <p className="text-muted">No discussions yet. Be the first to start one!</p>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default CoursePlayer; 