import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Container, Form, Button, Row, Col, FloatingLabel, Spinner } from 'react-bootstrap';
import AuthContext from '../../Contexts/authContext';
import swal from 'sweetalert';

const CourseForm = () => {
    const { api, loading, setLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const { courseId } = useParams(); // For editing existing course
    const isEditMode = Boolean(courseId);

    const [course, setCourse] = useState({
        name: '',
        description: '',
        duration: '',
        price: '',
        category: '',
        imageUrl: '',
        instructor: '',
        tags: '',
        skillLevel: 'All Levels',
        language: 'English',
        modulesData: [], // Initialize modulesData
    });
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            // Assuming server populates modules when fetching a single course for admin
            // e.g. by using .populate('modules') in the controller if modules are separate documents
            api.get(`/admin/courses/${courseId}`)
                .then(res => {
                    if (res.data && res.data.course) {
                        const fetchedCourse = res.data.course;
                        setCourse({
                            name: fetchedCourse.name || '',
                            description: fetchedCourse.description || '',
                            duration: fetchedCourse.duration?.toString() || '',
                            price: fetchedCourse.price?.toString() || '',
                            category: fetchedCourse.category || '',
                            imageUrl: fetchedCourse.imageUrl || '',
                            instructor: fetchedCourse.instructor || '',
                            tags: Array.isArray(fetchedCourse.tags) ? fetchedCourse.tags.join(', ') : '',
                            skillLevel: fetchedCourse.skillLevel || 'All Levels',
                            language: fetchedCourse.language || 'English',
                            // Initialize modulesData from fetched course, ensuring lessons is an array
                            // and mapping _id to id for client-side keying if needed
                            modulesData: fetchedCourse.modules ?
                                fetchedCourse.modules.map(m => ({
                                    ...m,
                                    id: m._id || `temp_module_${Date.now()}_${Math.random()}`, // Use _id or generate temp
                                    lessons: m.lessons ? m.lessons.map(l => ({...l, id: l._id || `temp_lesson_${Date.now()}_${Math.random()}` })) : []
                                })) :
                                [],
                        });
                    }
                })
                .catch(err => {
                    console.error("Error fetching course details:", err.response || err.message || err);
                    swal("Error", "Could not fetch course details for editing.", "error");
                    navigate('/admin/courses');
                })
                .finally(() => setLoading(false));
        }
    }, [courseId, api, navigate, setLoading, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourse(prevCourse => ({ ...prevCourse, [name]: value }));
        if (formErrors[name]) {
            setFormErrors(prevErrors => ({ ...prevErrors, [name]: null }));
        }
    };

    // --- Module and Lesson Handlers ---
    const handleAddModule = () => {
        setCourse(prevCourse => ({
            ...prevCourse,
            modulesData: [
                ...(prevCourse.modulesData || []), // Ensure modulesData is an array
                {
                    id: `temp_module_${Date.now()}_${Math.random()}`,
                    name: '',
                    description: '',
                    lessons: []
                }
            ]
        }));
    };

    const handleModuleChange = (moduleIndex, field, value) => {
        setCourse(prevCourse => {
            const newModulesData = [...(prevCourse.modulesData || [])];
            newModulesData[moduleIndex] = { ...newModulesData[moduleIndex], [field]: value };
            return { ...prevCourse, modulesData: newModulesData };
        });
    };
    
    const handleRemoveModule = (moduleIndex) => {
        setCourse(prevCourse => ({
            ...prevCourse,
            modulesData: (prevCourse.modulesData || []).filter((_, index) => index !== moduleIndex)
        }));
    };

    const handleAddLesson = (moduleIndex) => {
        setCourse(prevCourse => {
            const newModulesData = [...(prevCourse.modulesData || [])];
            const lessons = newModulesData[moduleIndex].lessons || [];
            newModulesData[moduleIndex].lessons = [
                ...lessons,
                {
                    id: `temp_lesson_${Date.now()}_${Math.random()}`,
                    title: '',
                    contentType: 'text',
                    content: '',
                    durationMinutes: 0,
                    isFreePreview: false
                }
            ];
            return { ...prevCourse, modulesData: newModulesData };
        });
    };

    const handleLessonChange = (moduleIndex, lessonIndex, field, value) => {
        setCourse(prevCourse => {
            const newModulesData = [...(prevCourse.modulesData || [])];
            const newLessons = [...(newModulesData[moduleIndex].lessons || [])];
            newLessons[lessonIndex] = { ...newLessons[lessonIndex], [field]: value };
            newModulesData[moduleIndex].lessons = newLessons;
            return { ...prevCourse, modulesData: newModulesData };
        });
    };

    const handleRemoveLesson = (moduleIndex, lessonIndex) => {
        setCourse(prevCourse => {
            const newModulesData = [...(prevCourse.modulesData || [])];
            newModulesData[moduleIndex].lessons = (newModulesData[moduleIndex].lessons || []).filter((_, index) => index !== lessonIndex);
            return { ...prevCourse, modulesData: newModulesData };
        });
    };
const handleLessonVideoUpload = async (moduleIndex, lessonIndex, event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file); // Field name 'file' as expected by server's Multer

        setLoading(true); // Indicate loading state for upload
        try {
            const res = await api.post('/admin/uploads/video', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (res.status === 201 && res.data.filePath) {
                // Update both content (to filePath) and contentType
                handleLessonChange(moduleIndex, lessonIndex, 'content', res.data.filePath);
                handleLessonChange(moduleIndex, lessonIndex, 'contentType', 'uploaded_video');
                swal("Success", "Video uploaded! Path: " + res.data.filePath, "success");
                event.target.value = null; // Clear the file input
            } else {
                swal("Upload Error", (res.data?.message || "Could not upload video. Unexpected response."), "error");
            }
        } catch (err) {
            console.error("Video upload error:", err.response || err.message || err);
            const errorMsg = err.response?.data?.message || "Video upload failed. Please try again.";
            swal("Upload Error", errorMsg, "error");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setFormErrors({});

        const payload = {
            ...course,
            duration: Number(course.duration) || 0,
            price: Number(course.price) || 0,
            tags: course.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
            modules: (course.modulesData || []).map(m => { // Ensure modulesData is an array
                const modulePayload = { name: m.name, description: m.description, lessons: [] }; // Basic structure
                // If m._id exists and is not temporary, include it for updates
                if (m._id && !String(m.id).startsWith('temp_module_')) {
                    modulePayload._id = m._id;
                }
                // TODO: Prepare lessons similarly if they are part of the payload
                // For now, sending basic module info. Backend needs to handle lesson creation/update.
                modulePayload.lessons = (m.lessons || []).map(l => {
                    const lessonPayload = { title: l.title, contentType: l.contentType, content: l.content, durationMinutes: l.durationMinutes, isFreePreview: l.isFreePreview };
                     if (l._id && !String(l.id).startsWith('temp_lesson_')) {
                        lessonPayload._id = l._id;
                    }
                    return lessonPayload;
                });
                return modulePayload;
            }),
        };
        // Remove empty optional fields so they don't overwrite with empty strings if not provided
        if (!payload.category) delete payload.category;
        if (!payload.imageUrl) delete payload.imageUrl;
        if (!payload.instructor) delete payload.instructor;


        try {
            let response;
            if (isEditMode) {
                response = await api.put(`/admin/courses/${courseId}`, payload);
            } else {
                response = await api.post('/admin/courses', payload);
            }

            if (response.status === 200 || response.status === 201) {
                swal("Success!", `Course ${isEditMode ? 'updated' : 'created'} successfully!`, "success");
                navigate('/admin/courses');
            }
        } catch (error) {
            console.error(`Error ${isEditMode ? 'updating' : 'creating'} course:`, error.response || error.message || error);
            if (error.response && error.response.data) {
                if (error.response.data.data && Array.isArray(error.response.data.data)) {
                    const serverErrors = {};
                    error.response.data.data.forEach(err => {
                        serverErrors[err.param || err.path] = err.msg; // express-validator uses 'param' or 'path'
                    });
                    setFormErrors(serverErrors);
                } else if (error.response.data.message) {
                    setFormErrors({ general: error.response.data.message });
                } else {
                    setFormErrors({ general: "An unexpected error occurred." });
                }
            } else {
                setFormErrors({ general: `Could not ${isEditMode ? 'update' : 'create'} course. Please check connection.` });
            }
            swal("Error", `Failed to ${isEditMode ? 'update' : 'create'} course.`, "error");
        } finally {
            setLoading(false);
        }
    };
    
    if (loading && isEditMode && !course.name) { // Show spinner when loading existing course data
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading course data...</span>
                </Spinner>
            </Container>
        );
    }

    return (
        <div className="dark:bg-slate-900 py-5 flex-grow">
            <Container>
                <Row className="mb-4">
                    <Col>
                        <h2 className="text-slate-900 dark:text-white">{isEditMode ? 'Edit Course' : 'Create New Course'}</h2>
                    </Col>
                </Row>
                <Form onSubmit={handleSubmit}>
                    {formErrors.general && <p className="text-danger text-center mb-3">{formErrors.general}</p>}
                    <Row>
                        <Col md={8} className="mx-auto">
                            <FloatingLabel controlId="courseName" label="Course Name" className="mb-3 dark:text-slate-400">
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="Enter course name"
                                    value={course.name}
                                    onChange={handleChange}
                                    required
                                    isInvalid={!!formErrors.name}
                                    className="dark:bg-slate-800 dark:text-white dark:border-slate-700 focus:dark:border-sky-500"
                                />
                                <Form.Control.Feedback type="invalid">{formErrors.name}</Form.Control.Feedback>
                            </FloatingLabel>

                            <FloatingLabel controlId="courseDescription" label="Course Description" className="mb-3 dark:text-slate-400">
                                <Form.Control
                                    as="textarea"
                                    name="description"
                                    placeholder="Enter course description"
                                    value={course.description}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    isInvalid={!!formErrors.description}
                                    className="dark:bg-slate-800 dark:text-white dark:border-slate-700 focus:dark:border-sky-500"
                                />
                                <Form.Control.Feedback type="invalid">{formErrors.description}</Form.Control.Feedback>
                            </FloatingLabel>

                            <FloatingLabel controlId="courseDuration" label="Duration (e.g., hours, minutes)" className="mb-3 dark:text-slate-400">
                                <Form.Control
                                    type="number"
                                    name="duration"
                                    placeholder="Enter course duration"
                                    value={course.duration}
                                    onChange={handleChange}
                                    required
                                    isInvalid={!!formErrors.duration}
                                    className="dark:bg-slate-800 dark:text-white dark:border-slate-700 focus:dark:border-sky-500"
                                />
                                <Form.Control.Feedback type="invalid">{formErrors.duration}</Form.Control.Feedback>
                            </FloatingLabel>

                            <FloatingLabel controlId="coursePrice" label="Price (e.g., 499)" className="mb-3 dark:text-slate-400">
                                <Form.Control
                                    type="number"
                                    name="price"
                                    placeholder="Enter course price"
                                    value={course.price}
                                    onChange={handleChange}
                                    required
                                    isInvalid={!!formErrors.price}
                                    className="dark:bg-slate-800 dark:text-white dark:border-slate-700 focus:dark:border-sky-500"
                                />
                                <Form.Control.Feedback type="invalid">{formErrors.price}</Form.Control.Feedback>
                            </FloatingLabel>

                            <FloatingLabel controlId="courseCategory" label="Category (e.g., Programming)" className="mb-3 dark:text-slate-400">
                                <Form.Control
                                    type="text"
                                    name="category"
                                    placeholder="Enter course category"
                                    value={course.category}
                                    onChange={handleChange}
                                    isInvalid={!!formErrors.category}
                                    className="dark:bg-slate-800 dark:text-white dark:border-slate-700 focus:dark:border-sky-500"
                                />
                                <Form.Control.Feedback type="invalid">{formErrors.category}</Form.Control.Feedback>
                            </FloatingLabel>

                            <FloatingLabel controlId="courseImageUrl" label="Image URL" className="mb-3 dark:text-slate-400">
                                <Form.Control
                                    type="url"
                                    name="imageUrl"
                                    placeholder="https://example.com/image.jpg"
                                    value={course.imageUrl}
                                    onChange={handleChange}
                                    isInvalid={!!formErrors.imageUrl}
                                    className="dark:bg-slate-800 dark:text-white dark:border-slate-700 focus:dark:border-sky-500"
                                />
                                <Form.Control.Feedback type="invalid">{formErrors.imageUrl}</Form.Control.Feedback>
                            </FloatingLabel>
                            
                            <FloatingLabel controlId="courseInstructor" label="Instructor ID (Optional)" className="mb-3 dark:text-slate-400">
                                <Form.Control
                                    type="text"
                                    name="instructor"
                                    placeholder="Enter Instructor User ID"
                                    value={course.instructor}
                                    onChange={handleChange}
                                    isInvalid={!!formErrors.instructor}
                                    className="dark:bg-slate-800 dark:text-white dark:border-slate-700 focus:dark:border-sky-500"
                                />
                                <Form.Control.Feedback type="invalid">{formErrors.instructor}</Form.Control.Feedback>
                            </FloatingLabel>

                            <FloatingLabel controlId="courseTags" label="Tags (comma-separated, e.g., python, web dev)" className="mb-3 dark:text-slate-400">
                                <Form.Control
                                    type="text"
                                    name="tags"
                                    placeholder="Enter tags"
                                    value={course.tags}
                                    onChange={handleChange}
                                    isInvalid={!!formErrors.tags}
                                    className="dark:bg-slate-800 dark:text-white dark:border-slate-700 focus:dark:border-sky-500"
                                />
                                <Form.Control.Feedback type="invalid">{formErrors.tags}</Form.Control.Feedback>
                            </FloatingLabel>

                            <Form.Group controlId="courseSkillLevel" className="mb-3">
                                <Form.Label className="dark:text-slate-300">Skill Level</Form.Label>
                                <Form.Select
                                    name="skillLevel"
                                    value={course.skillLevel}
                                    onChange={handleChange}
                                    isInvalid={!!formErrors.skillLevel}
                                    className="dark:bg-slate-800 dark:text-white dark:border-slate-700 focus:dark:border-sky-500"
                                >
                                    <option value="All Levels">All Levels</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">{formErrors.skillLevel}</Form.Control.Feedback>
                            </Form.Group>

                            <FloatingLabel controlId="courseLanguage" label="Language (e.g., English)" className="mb-3 dark:text-slate-400">
                                <Form.Control
                                    type="text"
                                    name="language"
                                    placeholder="Enter course language"
                                    value={course.language}
                                    onChange={handleChange}
                                    isInvalid={!!formErrors.language}
                                    className="dark:bg-slate-800 dark:text-white dark:border-slate-700 focus:dark:border-sky-500"
                                />
                                <Form.Control.Feedback type="invalid">{formErrors.language}</Form.Control.Feedback>
                            </FloatingLabel>

                            {/* --- Modules & Lessons Section --- */}
                            <div className="my-4 p-3 border rounded dark:border-slate-700">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h5 className="dark:text-white mb-0">Modules & Lessons</h5>
                                    <Button variant="outline-success" size="sm" onClick={handleAddModule} className="dark:text-green-400 dark:border-green-400 hover:dark:bg-green-400 hover:dark:text-slate-900">
                                        Add Module
                                    </Button>
                                </div>

                                {(course.modulesData || []).map((module, moduleIndex) => ( // Ensure modulesData is an array
                                    <div key={module.id || moduleIndex} className="mb-3 p-3 border rounded dark:border-slate-600 bg-slate-50 dark:bg-slate-800">
                                        <Row className="align-items-center mb-2">
                                            <Col>
                                                <FloatingLabel controlId={`moduleName-${moduleIndex}`} label={`Module ${moduleIndex + 1} Name`} className="dark:text-slate-400">
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Module Name"
                                                        name="name" // Ensure name attribute is set for targeted updates
                                                        value={module.name || ''}
                                                        onChange={(e) => handleModuleChange(moduleIndex, 'name', e.target.value)}
                                                        className="dark:bg-slate-700 dark:text-white dark:border-slate-600"
                                                    />
                                                </FloatingLabel>
                                            </Col>
                                            <Col xs="auto">
                                                <Button variant="outline-danger" size="sm" onClick={() => handleRemoveModule(moduleIndex)} className="dark:text-red-400 dark:border-red-400 hover:dark:bg-red-400 hover:dark:text-slate-900">
                                                    Remove Module
                                                </Button>
                                            </Col>
                                        </Row>
                                        <FloatingLabel controlId={`moduleDescription-${moduleIndex}`} label="Module Description (Optional)" className="mb-3 dark:text-slate-400">
                                            <Form.Control
                                                as="textarea"
                                                rows={2}
                                                name="description" // Ensure name attribute is set
                                                placeholder="Module Description"
                                                value={module.description || ''}
                                                onChange={(e) => handleModuleChange(moduleIndex, 'description', e.target.value)}
                                                className="dark:bg-slate-700 dark:text-white dark:border-slate-600"
                                            />
                                        </FloatingLabel>
                                        
                                        {/* --- Lessons Section for this Module --- */}
                                        <div className="mt-3 pt-3 border-top dark:border-slate-700">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <h6 className="dark:text-slate-300 mb-0">Lessons</h6>
                                                <Button variant="outline-primary" size="sm" onClick={() => handleAddLesson(moduleIndex)}  className="dark:text-sky-400 dark:border-sky-400 hover:dark:bg-sky-400 hover:dark:text-slate-900">
                                                    Add Lesson
                                                </Button>
                                            </div>

                                            {(module.lessons || []).map((lesson, lessonIndex) => (
                                                <div key={lesson.id || lessonIndex} className="mb-3 p-2 border rounded dark:border-slate-700 bg-white dark:bg-slate-700">
                                                    <Row className="align-items-center mb-2">
                                                        <Col>
                                                            <FloatingLabel controlId={`lessonTitle-${moduleIndex}-${lessonIndex}`} label={`Lesson ${lessonIndex + 1} Title`} className="dark:text-slate-400">
                                                                <Form.Control
                                                                    type="text"
                                                                    name="title"
                                                                    placeholder="Lesson Title"
                                                                    value={lesson.title || ''}
                                                                    onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'title', e.target.value)}
                                                                    className="dark:bg-slate-600 dark:text-white dark:border-slate-500"
                                                                />
                                                            </FloatingLabel>
                                                        </Col>
                                                        <Col xs="auto">
                                                            <Button variant="outline-danger" size="sm" onClick={() => handleRemoveLesson(moduleIndex, lessonIndex)} className="dark:text-red-400 dark:border-red-400 hover:dark:bg-red-400 hover:dark:text-slate-900">
                                                                Remove Lesson
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                    <Form.Group controlId={`lessonContentType-${moduleIndex}-${lessonIndex}`} className="mb-2">
                                                        <Form.Label className="dark:text-slate-400 text-sm">Content Type</Form.Label>
                                                        <Form.Select
                                                            name="contentType"
                                                            value={lesson.contentType || 'text'}
                                                            onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'contentType', e.target.value)}
                                                            className="dark:bg-slate-600 dark:text-white dark:border-slate-500"
                                                        >
                                                            <option value="text">Text</option>
                                                            <option value="video">Video URL (e.g., YouTube)</option>
                                                            <option value="uploaded_video">Uploaded Video</option>
                                                            <option value="external_link">External Link</option>
                                                            <option value="file">File URL</option>
                                                            <option value="quiz">Quiz (JSON)</option>
                                                        </Form.Select>
                                                    </Form.Group>

                                                    {lesson.contentType === 'uploaded_video' ? (
                                                        <Form.Group controlId={`lessonVideoUpload-${moduleIndex}-${lessonIndex}`} className="mb-2">
                                                            <Form.Label className="dark:text-slate-400 text-sm">Upload Video File</Form.Label>
                                                            <Form.Control
                                                                type="file"
                                                                accept="video/*"
                                                                onChange={(e) => handleLessonVideoUpload(moduleIndex, lessonIndex, e)}
                                                                className="dark:bg-slate-600 dark:text-white dark:border-slate-500"
                                                            />
                                                            {lesson.content && <small className="d-block mt-1 dark:text-slate-400">Current video: {lesson.content}</small>}
                                                        </Form.Group>
                                                    ) : (
                                                        <FloatingLabel controlId={`lessonContent-${moduleIndex}-${lessonIndex}`} label={lesson.contentType === 'video' || lesson.contentType === 'file' || lesson.contentType === 'external_link' ? 'URL' : 'Content / JSON'} className="mb-2 dark:text-slate-400">
                                                            <Form.Control
                                                                as="textarea"
                                                                rows={3}
                                                                name="content"
                                                                placeholder={lesson.contentType === 'video' || lesson.contentType === 'file' || lesson.contentType === 'external_link' ? 'Enter URL' : 'Enter text content or JSON for quiz'}
                                                                value={lesson.content || ''}
                                                                onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'content', e.target.value)}
                                                                className="dark:bg-slate-600 dark:text-white dark:border-slate-500"
                                                            />
                                                        </FloatingLabel>
                                                    )}
                                                    <Row>
                                                        <Col md={6}>
                                                            <FloatingLabel controlId={`lessonDuration-${moduleIndex}-${lessonIndex}`} label="Duration (minutes)" className="mb-2 dark:text-slate-400">
                                                                <Form.Control
                                                                    type="number"
                                                                    name="durationMinutes"
                                                                    placeholder="Minutes"
                                                                    value={lesson.durationMinutes || ''} // Keep as string for input, convert in handler
                                                                    onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'durationMinutes', e.target.value)}
                                                                    className="dark:bg-slate-600 dark:text-white dark:border-slate-500"
                                                                />
                                                            </FloatingLabel>
                                                        </Col>
                                                        <Col md={6} className="d-flex align-items-center pt-3"> {/* Added pt-3 for alignment */}
                                                            <Form.Check
                                                                type="checkbox"
                                                                id={`lessonFreePreview-${moduleIndex}-${lessonIndex}`}
                                                                name="isFreePreview"
                                                                label="Free Preview"
                                                                checked={lesson.isFreePreview || false}
                                                                onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'isFreePreview', e.target.checked)}
                                                                className="dark:text-slate-400"
                                                            />
                                                        </Col>
                                                    </Row>
                                                </div>
                                            ))}
                                            {(module.lessons || []).length === 0 && <p className="text-center text-sm dark:text-slate-500">No lessons added to this module yet.</p>}
                                        </div>
                                        {/* --- End Lessons Section --- */}
                                    </div>
                                ))}
                                {(course.modulesData || []).length === 0 && <p className="text-center dark:text-slate-500">No modules added yet. Click "Add Module" to start.</p>}
                            </div>
                            {/* --- End Modules & Lessons Section --- */}

                            <div className="d-flex justify-content-end mt-4">
                                <Button variant="secondary" as={Link} to="/admin/courses" className="me-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:border-slate-500">
                                    Cancel
                                </Button>
                                <Button type="submit" variant="primary" disabled={loading} className="bg-blue-500 hover:bg-blue-600 text-white">
                                    {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : (isEditMode ? 'Update Course' : 'Create Course')}
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    );
};

export default CourseForm;