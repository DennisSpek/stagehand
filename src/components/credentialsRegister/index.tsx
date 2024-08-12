import { useState } from 'react'
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik';
import { InputField } from '@/ui/elements/inputField'
import { BlackRoundedButton } from '@/ui/buttons/blackRoundedButton'
import { registerUser } from '@/auth.config'
import { credentialsSchema } from '@/lib/zod'
import { withZodSchema } from 'formik-validator-zod'
import { signIn } from 'next-auth/react';

interface Values {
  email: string;
  password: string;
  name: string;
}

export const CredentialsRegister = ({ callback }: { callback: () => void }) => {

  return (
    <div>
      <p className='text-sm text-center'>Create your account:</p>
      <Formik
        initialValues={{
          email: '',
          password: '',
          name: '',
        }}
        validate={withZodSchema(credentialsSchema)}
        onSubmit={async( values: Values, { setSubmitting }: FormikHelpers<Values>) => {
          setSubmitting(true);
          try {    
            const user = await registerUser(values.email, values.password, values.name)
            
            if(user) {
              signIn("credentials", {email: values.email, password: values.password})
            } else {
              console.log('User not created')
            }
          } catch(error){
            console.log("Error:", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className='gap-4 flex flex-col items-center'>
            <Field id="email" type="email" name="email" placeholder="Your email" as={InputField} required/>
            <ErrorMessage name="email" component="div" />
            <Field type="text" name="name" placeholder="Your name" as={InputField} required/>
            <Field type="password" name="password" placeholder="Password" as={InputField} required/>
            <ErrorMessage name="password" component="div" />
            <div className='text-center'>
              <BlackRoundedButton disabled={isSubmitting}>
                <span>Register account!</span>
              </BlackRoundedButton>
              <span className='text-sm'>By creating your account you agree to our terms of service.</span>
            </div>
          </Form>
        )}
      </Formik>
      <p className='mt-8 text-sm text-center' onClick={callback}>Already have your Stagehand account? <span className='underline cursor-pointer'>Log in!</span></p>
    </div>
  )
}