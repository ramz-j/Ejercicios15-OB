import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { LEVELS } from '../../../models/levels.enum';

const taskSchema = Yup.object().shape(
  {
    name: Yup.string()
      .required('Name is requerid'),
    description: Yup.string()
      .required('Description is required'),
    priority: Yup.string()
      .oneOf([LEVELS.NORMAL, LEVELS.URGENT, LEVELS.BLOCKING])
      .required('Priority is required')
  }  
)

const TaskFormik = ({add}) => {

  const initialValues = {
    name: '',
    description: '',
    priority: LEVELS.NORMAL
  }

  return (
    <div>
      <Formik 
        initialValues={initialValues}
        validationSchema={taskSchema}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            add(values);
            actions.resetForm({});
            actions.setSubmitting(false);
          }, 500);
        }}
      >

      {({values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur}) => (
            <Form>
              <Field 
                id="name"
                type="text"
                name="name"
                placeholder="Task Name" />
              {/* Name Errors */}
              {
                errors.name && touched.name && 
                  (
                    <ErrorMessage 
                      name="name"
                      component='div'>
                    </ErrorMessage>
                  )
              }

              <Field 
                id="description"
                type="text"
                name="description"
                placeholder="Task Description" />
              {/* Description Errors */}
              {
                errors.description && touched.description && 
                  (
                    <ErrorMessage 
                      name="description"
                      component='div'>
                    </ErrorMessage>
                  )
              }

              <Field as="select" name="level">
                <option value={LEVELS.NORMAL}>Normal</option>
                <option value={LEVELS.URGENT}>Urgent</option>
                <option value={LEVELS.BLOCKING}>Blocking</option>
              </Field>

              <button type='submit'>Register Account</button>                         
              
            </Form>
          )
      }  
      </Formik>
    </div>
  )
}

export default TaskFormik