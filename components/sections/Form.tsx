import { memo, useState } from 'react'
import {Formik, Form as FormHelper, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import propTypes from 'prop-types'
import SimpleBlockContent from '../SimpleBlockContent'
import axios from 'axios'

// Validação com Yup
const validationSchema = Yup.object({
  fullName: Yup.string()
    .required('Nome completo é obrigatório')
    .min(3, 'Nome completo deve ter pelo menos 3 caracteres')
    .max(100, 'Nome completo não pode exceder 100 caracteres'),
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  phone: Yup.string()
    .matches(/^\(?\d{2}\)?[\s-]?[\s9]?\d{4}-?\d{4}$/, 'Número de telefone inválido')
    .required('Número de telefone é obrigatório'),
})


const Form = memo((props: any) => {

  const [error, setError] = useState(null)

  async function onSubmit(values: any) {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_SITE_URL}api/datavalidator`, {
      data: {
        email: values.email,
        tel: values.phone,
      },
    })

    setError(res.data.error)
  }
  const {
    incentiveText,
    submit,
    title,
    fields,
  }: {incentiveText: any; submit: string; title: string; fields: [any]} = props
  return (
    <>
      {props && fields.length > 0 && (
        <Formik
          initialValues={{fullName: '', email: '', phone: ''}}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSubmit(values)
          }}
          key={title + "12"}
        >
          {({values, handleChange, handleBlur}) => {
            return (
              <FormHelper id='formLead1' key={title} className="space-y-6 p-8 bg-[#205ac53d] max-sm:w-4/5 rounded-lg shadow-lg max-w-lg mx-auto">
                <h1 className="text-3xl font-bold text-center">{title}</h1>
                {fields &&
                  fields.map((field, index) => (
                    <>
                      <div key={index} className='flex flex-col justify-evenly'>
                        <label
                          htmlFor="fullName"
                          className="block text-sm font-medium text-gray-200"
                        >
                          {field.name}
                        </label>
                        <Field
                          type="text"
                          name="fullName"
                          placeholder={field.name}
                          value={values.fullName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <ErrorMessage
                          name="fullName"
                          component="div"
                          className="text-sm text-red-500 mt-1"
                        />
                        <label htmlFor="email" className="text-sm mt-4 font-medium text-gray-200">
                          {field.email}
                        </label>
                        <Field
                          type="email"
                          name="email"
                          placeholder={field.email}
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-sm text-red-500 mt-1"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-200">
                          {field.phone}
                        </label>
                        <Field
                          type="text"
                          name="phone"
                          placeholder={field.phone}
                          value={values.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="text-sm text-red-500 mt-1"
                        />
                      </div>
                    </>
                  ))}
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {submit}
                </button>
                <p className='text-red-500 font-extrabold'>{error}</p>
                <SimpleBlockContent blocks={incentiveText} />
              </FormHelper>
            )
          }}
        </Formik>
      )}
    </>
  )
})

Form.displayName = "Form"

//@ts-ignore
Form.propTypes = {}

export default Form
