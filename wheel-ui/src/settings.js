import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { Formik, Form, Field , useField } from 'formik';
import * as Yup from 'yup';


function GenreAPI() {
  const [genres, setGenres] = useState([]);

  useEffect( () =>{
    axios({
      method:'GET',
      url: 'http://127.0.0.1:8000/api/genre/all/'
    }).then(response => {
      setGenres(response.data)
    })
  },[]);

  return (
        <>
        {genres.map(g => (
          <option key={g.id}> {g.genre}</option>
        ))}
        </>
  );

};

function moreThan(ref: any, msg: any) {
  return Yup.mixed().test({
    name: 'moreThan',
    exclusive: false,
    message: '',
    params: {
      reference: ref.path,
    },
    test: function(value: any) {
      return value > this.resolve(ref);
    },
  });
}

function lessThan(ref: any, msg: any) {
  return Yup.mixed().test({
    name: 'moreThan',
    exclusive: false,
    message: '',
    params: {
      reference: ref.path,
    },
    test: function(value: any) {
      return value < this.resolve(ref);
    },
  });
}

 const MyTextInput = ({ label, ...props }) => {
   // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
   // which we can spread on <input>. We can use field meta to show an error
   // message if the field is invalid and it has been touched (i.e. visited)
   const [field, meta] = useField(props);
   return (
     <>
       <label htmlFor={props.id || props.name}>{label}</label>
       <input className="text-input" {...field} {...props} />
       {meta.touched && meta.error ? (
         <div className="alert alert-danger">{meta.error}</div>
       ) : null}
     </>
   );
 };
 
 const MyCheckbox = ({ children, ...props }) => {
   // React treats radios and checkbox inputs differently other input types, select, and textarea.
   // Formik does this too! When you specify `type` to useField(), it will
   // return the correct bag of props for you -- a `checked` prop will be included
   // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
   const [field, meta] = useField({ ...props, type: 'checkbox' });
   return (
     <div>
       <label className="checkbox-input">
         <input type="checkbox" {...field} {...props} />
         {children}
       </label>
       {meta.touched && meta.error ? (
         <div className="error">{meta.error}</div>
       ) : null}
     </div>
   );
 };
 
 const MySelect = ({ label, ...props }) => {
   const [field, meta] = useField(props);
   return (
     <div>
       <label htmlFor={props.id || props.name}>{label}</label>
       <select {...field} {...props} />
       {meta.touched && meta.error ? (
         <div className="error">{meta.error}</div>
       ) : null}
     </div>
   );
 };
 

 const SettingsForm = (props) => {
    return (
     <>
       <h1>Wheel settings!</h1>
       <Formik
         initialValues={{
           countGames: '3',
           priceMore: '0',
           priceLess: '100000'
         }}
         validationSchema={Yup.object({
           countGames: Yup.number()
             .max(20, 'Must be 20 or less')
             .min(3, 'Must be 3 or more')
             .required('Required'),

           priceMore: Yup.number()
             .min(0, 'Must be 0 characters or more')
             .max(100000, 'Must be 100000 characters or less')
             .required('Required')
             .lessThan(Yup.ref('priceLess')),

           priceLess: Yup.number()
             .min(0, 'Must be 100000 characters or less')
             .max(100000, 'Must be 100000 characters or less')
             .required('Required')
             .moreThan(Yup.ref('priceMore')),
         })}
         onSubmit={values => {
         props.getSettings(values)
       }}
         // onSubmit={(values, { setSubmitting }) => {
         //   setTimeout(() => {
         //     alert(JSON.stringify(values, null, 2));
         //     setSubmitting(false);
         //   }, 400);
         // }}
       >
         <Form>
           <div className ='row p-1'>
             <MyTextInput
               label="Count games"
               name="countGames"
               type="number"
               placeholder="May be from 3 to 20"
             />
           </div>

           <div className ='row p-1'>
             <MyTextInput
               label="Price more"
               name="priceMore"
               type="number"
               placeholder="> than"
             />
            </div>

           <div className ='row p-1'>
           <MyTextInput
             label="Price less"
             name="priceLess"
             type="number"
             placeholder="< than "
           />
           </div>

            <div className ='row p-1'>
              <Field
                component="select"
                id="genre"
                name="genre"
                multiple={true}
              >
              <GenreAPI />
              </Field>
            </div>
           
           <div className ='row p-1'>
            <button className ='btn btn-dark' type="submit">Submit</button> 
           </div>
         </Form>
       </Formik>
     </>
   );
 };

  export default SettingsForm;



