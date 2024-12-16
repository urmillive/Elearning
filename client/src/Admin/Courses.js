import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
const AdminCourses = () =>
{
  return (
    <>

      <Container className='my-5'>
        <Row>
          <Col md={ 4 }>
            <div className='flex flex-auto'>
              <div className="mx-3 my-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                </div>
                <div className="d-flex mx-3 mb-2 gap-2">
                  <button href="#" class="font-medium rounded bg-blue-500 px-5 py-2 text-white no-underline hover:underline">Edit Course</button>
                  <button href="#" class="font-medium rounded bg-red-500 px-5 py-2 text-white no-underline hover:underline">Delete Course</button>
                </div>
              </div>
            </div>
          </Col>
          <Col md={ 4 }>
            <div className='flex flex-auto'>
              <div className="mx-3 my-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                </div>
                <div className="d-flex mx-3 mb-2 gap-2">
                  <button href="#" class="font-medium rounded bg-blue-500 px-5 py-2 text-white no-underline hover:underline">Edit Course</button>
                  <button href="#" class="font-medium rounded bg-red-500 px-5 py-2 text-white no-underline hover:underline">Delete Course</button>
                </div>
              </div>
            </div>
          </Col>
          <Col md={ 4 }>
            <div className='flex flex-auto'>
              <div className="mx-3 my-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                </div>
                <div className="d-flex mx-3 mb-2 gap-2">
                  <button href="#" class="font-medium rounded bg-blue-500 px-5 py-2 text-white no-underline hover:underline text-nowrap">Edit Course</button>
                  <button href="#" class="font-medium rounded bg-red-500 px-5 py-2 text-white no-underline hover:underline text-nowrap">Delete Course</button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default AdminCourses
