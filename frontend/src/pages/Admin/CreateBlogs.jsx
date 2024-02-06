import React from 'react'
import PageLayout from '../../components/PageLayout'
import BlogForm from './BlogForm';
import Edit from '../../components/utils/Edit';

const CreateBlogs = () => {
  return (
    <PageLayout>
      <Edit title={'Create New Blog'} />
      <BlogForm />
    </PageLayout>
  )
}

export default CreateBlogs