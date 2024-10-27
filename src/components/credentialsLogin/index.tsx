import { InputField } from '@/ui/elements/inputField'
import { BlackRoundedButton } from '@/ui/buttons/blackRoundedButton'
import { signIn } from 'next-auth/react';
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik';
import { credentialsSchema } from '@/lib/zod'
import { withZodSchema } from 'formik-validator-zod'

interface Values {
  [key: string]: string;
  email: string;
  password: string;
}

export const CredentialsLogin = ({ callback }: { callback: () => void}) => {
  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validate={withZodSchema(credentialsSchema)}
        onSubmit={async( values: Values, { setSubmitting }: FormikHelpers<Values>) => {
          setSubmitting(true);
          try {    
            await signIn("credentials", values)
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
            <Field type="password" name="password" placeholder="Password" as={InputField} required/>
            <ErrorMessage name="password" component="div" />
            <div className='text-center'>
              <BlackRoundedButton disabled={isSubmitting}>
                <span>Log in!</span>
              </BlackRoundedButton>
              <span className='text-sm'>By signing in you agree to our terms of service.</span>
            </div>
          </Form>
        )}
      </Formik>
      <p className='mt-8 text-sm text-center' onClick={callback}>Don&#39;t have an account yet? <span className='underline cursor-pointer'>Sign up!</span></p>
    </div>
  )
}