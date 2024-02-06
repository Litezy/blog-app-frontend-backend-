import React from 'react'
import PageLayout from '../../components/PageLayout'
import BlogForm from './BlogForm'
import Edit from '../../components/utils/Edit';
const EditBlogs = () => {
  return (
    <PageLayout>
       <Edit title={'Edit Blog'}/>
        <BlogForm />
    </PageLayout>
  )
}

export default EditBlogs