import React from 'react'

const AdminFooter = () =>
{
    return (
        <>
            <div className='h-100 mt-5'>
                <footer className="fixed-bottom d-flex flex-column mt-auto py-2 dark:bg-gray-800 bg-gray-400 ">
                    <div className="container">
                        <div className="align-items-center justify-content-between medium">
                            <div className="text-stone-900 dark:text-slate-400">Copyright &copy; Fox Valley 2023</div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default AdminFooter
