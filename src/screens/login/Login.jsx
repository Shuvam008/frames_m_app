import React from 'react'
import { Button, Image, TextInput, View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import styles from './Login.style';
import { FormikProvider , useFormik } from 'formik';
import { Member_login, Member_resetlogin } from '../../redux/actions/loginActions';
import { useDispatch, useSelector } from 'react-redux';
import Field from '../../components/common/TextInputField/Field';

function Login({navigation}) {
    const dispatch = useDispatch();
    const Login = useSelector((state) => state.Login);
    const { data, isInProgress } = Login;

    const formik = useFormik({
      initialValues: {
        user_name: '',
        user_password: ''
      },
      onSubmit: (values) => {
        console.log("Submitting form with values: ", values);
        const payload = values;
        dispatch(Member_login(payload)); // Uncomment and replace with your actual dispatch function
      },
    });

      React.useEffect(()=>{
    if (Login.data && Object.keys(Login.data).length > 0) {
        console.log("Form submitted successfully >>>", Login.data);
        console.log("second print >>>");
        // Navigate to the '/assets' page
        if (!Login.isError && !Login.isInProgress) {
          const onlyAdmin = Login.data.user_group
          if(onlyAdmin < 2){
            // enqueueSnackbar('Login with Admin or Sub-admin credentials!', { variant: 'error' });
            console.log('Login with Location or Vendor credentials!')
          }else{
            //  navigation.reset({
            //     index: 0,
            //     routes: [{ name: 'Home', params: { user: data } }],
            // });
            navigation.navigate('AppStack', { user: data })
          }
          // return () => {
          //   dispatch(Member_resetlogin({}));
          // }
        }
    }else if(Login.isError){
    //    enqueueSnackbar('Login Failed!', { variant: 'error' });
        console.log("Login failed")
    }
    // }
  },[Login])

    if (isInProgress) {
        return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
        );
    }

    return (
      <View style={styles.container}>
        <View style={styles.flagContainer}>
            <Image style={{width: '100%', height: 300}} source={require('../../assets/images/flag.jpg')} />
        </View>
        <View>
          <View style={styles.imageContainer}>
            <Image style={{width: 150, height: 150}} source={require('../../assets/images/pngegg.png')} />
          </View>
        
          <View >
            <FormikProvider value={formik}>
              <View>
                <View style={styles.loginContainer}>
                  <View style={{ overflow: 'hidden' }}>
                    {Object.entries(formik.initialValues).map(([key]) => (
                      <View key={key} style={{ padding: 1,alignItems:'center'}}>
                        <Field
                          name={key}
                          placeholder={key === 'user_name' ? 'User' : 'Password'}
                          value={formik.values[key]}
                          onChangeText={formik.handleChange(key)}
                          secureTextEntry={key === 'user_password'}
                        />
                      </View>
                    ))}
                  </View>
                  <View style={{ textAlign: 'center' ,alignItems:'center'}}>
                    <TouchableOpacity
                      onPress={formik.handleSubmit}
                      // disabled={!formik.isValid}
                      style={[styles.button,{backgroundColor: 'rgb(255 143 1)',}]}
                    >
                      <Text style={styles.buttonText}>Log in</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </FormikProvider>
          </View>
        </View>
        
      </View>
    );
}

export default Login;
