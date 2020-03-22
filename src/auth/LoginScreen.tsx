import React, { useCallback, useRef } from 'react';
import { useNavigation, ParamListBase, useFocusEffect } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Formik, FormikHelpers, FormikProps, FieldMetaProps } from 'formik';
import { Form, Item, Input, Button, Text, Content, Label } from 'native-base';
import { useDispatch } from 'react-redux';
import { Routes } from '../navigation';
import { signIn } from './redux';

type LoginFormValues = {
  email: string;
  password: string;
};

type ResetForm = () => void;

const validate = (values: LoginFormValues) => {
  const errors: Partial<LoginFormValues> = {};
  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
};

export const LoginScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();
  const resetFormRef = useRef<ResetForm>(() => null);

  const onSubmit = (values: LoginFormValues, helpers: FormikHelpers<LoginFormValues>) => {
    dispatch(signIn(values));
    helpers.setSubmitting(false);
  };

  const handleLinkPress = useCallback(() => {
    navigation.jumpTo(Routes.Register);
  }, [navigation]);

  useFocusEffect(() => {
    return resetFormRef.current;
  });

  return (
    <Content padder>
      <Formik
        initialValues={{ email: '', password: '' }}
        validateOnMount
        onSubmit={onSubmit}
        validate={validate}
        component={(props) => (
          <LoginForm {...props} onLinkPress={handleLinkPress} resetFormRef={resetFormRef} />
        )}
      />
    </Content>
  );
};

type LoginFormProps = FormikProps<LoginFormValues> & {
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

const LoginForm: React.FC<LoginFormProps> = ({ resetFormRef, onLinkPress, ...formik }) => {
  resetFormRef.current = formik.resetForm;

  return (
    <>
      <Form>
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
        <Text>Sign In</Text>
      </Button>
      <Button block info style={{ marginTop: 10, marginHorizontal: 15 }} onPress={onLinkPress}>
        <Text>Sign Up</Text>
      </Button>
    </>
  );
};
