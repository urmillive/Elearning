import React from 'react'
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';

const Main = () =>
{
	return (
		<>
			<Container>
				<Row>
					<Col md={ 12 }>
						<section className="bg-white dark:bg-gray-900">
							<div className="py-6 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
								<h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Teach you in Easy way</h1>
								<p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 decoration-slate-900">We provide simple & smart contexts for your reading, so your learning experience will be smooth.</p>
								<div className="flex flex-col mb-4 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
									<Link to="/learning" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border bg-grey-500 border-gray-500 hover:bg-red-700 hover:text-black hover:fw-bold focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-800 bg-red-500 no-underline">
										Learn Coding
									</Link>
									<Link to="/course" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 no-underline">
										Learn more
										<svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
									</Link>
								</div>
							</div>
						</section>
					</Col>
				</Row>
				<Row>
					<Col md={ 12 }>
						<section className="bg-white dark:bg-gray-900">
							<div className="gap-16 items-center py-4 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
								<div className="grid grid-cols-2 gap-4 mt-8">
									<img className="w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png" alt="office content 1" />
									<img className="mt-4 w-full lg:mt-10 rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png" alt="office content 2" />
								</div>
								<div className=" text-gray-500 sm:text-lg dark:text-gray-400">
									<h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Unlock the power of wisdom with E-learning.</h2>
									<p className="mb-4">Our online platform offers a variety of courses and resources to help you learn coding in a fun and interactive way. Our tutorials and exercises are designed to cater to all levels of experience, from beginners to advanced programmers. Learn the latest technologies and programming languages such as Python, JavaScript, and more.</p>
								</div>
							</div>
						</section>
					</Col>
				</Row>
				<Row>
					<Col md={ 12 }>
						<section className="bg-white dark:bg-gray-900">
							<div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6 text-center">
								<div className="mx-auto max-w-screen-md text-center lg:mb-16 mb-8">
									<h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
										Start Exploring our Educational Content 💻
									</h2>
									<p className="text-gray-500 sm:text-xl dark:text-gray-400">
										With our expert instructors and community support, you'll have everything you need to succeed in coding. Start your coding journey now!
									</p>
								</div>
								<div className="grid gap-8 lg:grid-cols-2">
									<article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
										<div className="flex justify-between items-center mb-5 text-gray-500">
											<span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
												<svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd"></path><path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path></svg>
												Article
											</span>
											<span className="text-sm">10 days ago</span>
										</div>
										<h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Free Blogs</h2>
										<p className="mb-5 font-light text-gray-500 dark:text-gray-400">If you have no money to spend on course and certification you can learn from reading our coding guides.</p>
										<div className="flex justify-between items-center">
											<div className="flex items-center space-x-4">
												<img className="w-7 h-7 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Leos avatar" />
												<span className="font-medium dark:text-white">
													Urmil Rupareliya
												</span>
											</div>
											<Link to="/learning" className="no-underline inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
												Read more
												<svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
											</Link>
										</div>
									</article>
									<article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
										<div className="flex justify-between items-center mb-5 text-gray-500">
											<span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
												<svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
												Video Courses
											</span>
											<span className="text-sm">14 days ago</span>
										</div>
										<h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Paid Courses</h2>
										<p className="mb-5 font-light text-gray-500 dark:text-gray-400">Here we provide solo guided courses where you actually learn how to make projects and experiments with your knowledge.</p>
										<div className="flex justify-between items-center">
											<div className="flex items-center space-x-4">
												<img className="w-7 h-7 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png" alt="Bonnie Green avatar" />
												<span className="font-medium dark:text-white">
													Pritam Prakash
												</span>
											</div>
											<Link to="/learning" className="no-underline inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
												Read more
												<svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
											</Link>
										</div>
									</article>
								</div>
							</div>
						</section>
					</Col>
				</Row>
				<Row>
					<Col md={ 12 }>
						<section className="bg-white dark:bg-gray-900">
							<div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
								<h2 className="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Frequently asked questions</h2>
								<div className="grid pt-8 text-left border-t border-gray-700 md:gap-16 dark:border-gray-700 md:grid-cols-2">
									<div>
										<div className="mb-10">
											<h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
												<svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
												What types of courses do you offer?
											</h3>
											<p className="text-gray-500 dark:text-gray-400">We offer a wide range of coding courses and tutorials, including web development, data science, machine learning, and more. We also have courses for different levels of experience, from complete beginners to advanced programmers.</p>
										</div>
										<div className="mb-10">
											<h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
												<svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
												Do I need any prior coding experience to take your courses?
											</h3>
											<p className="text-gray-500 dark:text-gray-400">Not necessarily. We have courses for all levels of experience, from complete beginners to advanced programmers. So, you can start with the basics and work your way up.</p>
										</div>
										<div className="mb-10">
											<h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
												<svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
												Are your courses taught by industry experts?
											</h3>
											<p className="text-gray-500 dark:text-gray-400">Yes, our courses are designed and taught by industry experts who have years of experience in their respective fields.</p>
										</div>
										<div className="mb-10">
											<h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
												<svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
												Are your courses self-paced or do they have a set schedule?
											</h3>
											<p className="text-gray-500 dark:text-gray-400">Our courses are self-paced, so you can learn at your own pace and on your own schedule.</p>
											<p className="text-gray-500 dark:text-gray-400">Find out more information by <Link to="/about" className="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline">reading about us</Link></p>
										</div>
									</div>
									<div>
										<div className="mb-10">
											<h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
												<svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
												Do you offer any certifications for your courses?
											</h3>
											<p className="text-gray-500 dark:text-gray-400">Yes, we offer certifications for many of our courses, which can be used to demonstrate your skills and knowledge to potential employers.</p>
										</div>
										<div className="mb-10">
											<h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
												<svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
												Is there a community of learners I can interact with?
											</h3>
											<p className="text-gray-500 dark:text-gray-400">Yes, we have a community of learners that you can interact with and get help from. You can also ask questions and share your experience with others</p>
										</div>
										<div className="mb-10">
											<h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
												<svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
												What is the cost of your courses?
											</h3>
											<p className="text-gray-500 dark:text-gray-400">The cost of our courses varies depending on the course. We have both free and paid courses available. You can check the cost of each course on the course page.</p>
										</div>

									</div>
								</div>
							</div>
						</section>
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default Main;

