import React, { useCallback, useRef } from 'react';
import { useNavigation, ParamListBase, useFocusEffect } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Formik, FormikHelpers, FormikProps, FieldMetaProps } from 'formik';
import { Form, Item, Input, Button, Text, Container, Content, Label } from 'native-base';
import { useDispatch } from 'react-redux';
import { Routes } from '../navigation';
import { signUp } from './redux';

type RegisterFormValues = {
  username: string;
  email: string;
  password: string;
};

type ResetForm = () => void;

const validate = (values: RegisterFormValues) => {
  const errors: Partial<RegisterFormValues> = {};
  if (!values.username) {
    errors.username = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
};

export const RegisterScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();
  const resetFormRef = useRef<ResetForm>(() => null);

  const onSubmit = (values: RegisterFormValues, helpers: FormikHelpers<RegisterFormValues>) => {
    dispatch(signUp(values));
    helpers.setSubmitting(false);
  };

  const handleLinkPress = useCallback(() => {
    navigation.jumpTo(Routes.Login);
  }, [navigation]);

  useFocusEffect(() => {
    return resetFormRef.current;
  });

  return (
    <Container>
      <Content padder>
        <Formik
          initialValues={{ username: '', email: '', password: '' }}
          validateOnMount
          onSubmit={onSubmit}
          validate={validate}
          component={(props) => (
            <RegisterForm {...props} onLinkPress={handleLinkPress} resetFormRef={resetFormRef} />
          )}
        />
      </Content>
    </Container>
  );
};

type RegisterFormProps = FormikProps<RegisterFormValues> & {
  resetFormRef: React.MutableRefObject<ResetForm>;
  onLinkPress: () => void;
};

const Field: React.FC<{
  meta: FieldMetaProps<string>;
  label: string;
  secureTextEntry?: boolean;
  onChange: (v: string) => void;
  onBlur: (e: any) => void;
}> = ({ meta, onChange, onBlur, label, secureTextEntry }) => (
  <Item error={meta.touched && !!meta.error}>
    <Label>{label}</Label>
    <Input
      onChangeText={onChange}
      onBlur={onBlur}
      value={meta.value}
      secureTextEntry={secureTextEntry}
    />
    {meta.touched && !!meta.error ? <Text>{meta.error}</Text> : <Text />}
  </Item>
);

const RegisterForm: React.FC<RegisterFormProps> = ({ resetFormRef, onLinkPress, ...formik }) => {
  resetFormRef.current = formik.resetForm;

  return (
    <>
      <Form>
        <Field
          label="Username"
          meta={formik.getFieldMeta('username')}
          onBlur={formik.handleBlur('username')}
          onChange={formik.handleChange('username')}
        />
        <Field
          label="Email"
          meta={formik.getFieldMeta('email')}
          onBlur={formik.handleBlur('email')}
          onChange={formik.handleChange('email')}
        />
        <Field
          label="Password"
          meta={formik.getFieldMeta('password')}
          onBlur={formik.handleBlur('password')}
          onChange={formik.handleChange('password')}
          secureTextEntry
        />
      </Form>
      <Button
        block
        style={{ marginHorizontal: 15, marginTop: 50 }}
        disabled={!formik.isValid || formik.isSubmitting}
        onPress={formik.handleSubmit}
      >
        <Text>Sign Up</Text>
      </Button>
      <Button block info style={{ marginTop: 10, marginHorizontal: 15 }} onPress={onLinkPress}>
        <Text>Sign In</Text>
      </Button>
    </>
  );
};
