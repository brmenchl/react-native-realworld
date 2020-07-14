import { useFocusEffect } from "@react-navigation/native";
import { FormikHelpers, Formik, FormikProps, FieldMetaProps } from "formik";
import {
  Content,
  Button,
  Item,
  Input,
  Label,
  Form,
  Text,
  Textarea,
} from "native-base";
import React, { useRef, useCallback } from "react";
import { useSelector } from "react-redux";

import { useThunkDispatch } from "../app/store";
import {
  getUserWithProfile,
  useAuthOnly,
  updateSettings,
  guest,
  signOut,
} from "../auth";

type SettingsFormValues = {
  image: string;
  username: string;
  bio: string;
  email: string;
  password: string;
};

type ResetForm = () => void;

export const SettingsScreen: React.FC = () => {
  const dispatch = useThunkDispatch();
  const resetFormRef = useRef<ResetForm>(() => null);
  const userWithProfile = useSelector(getUserWithProfile);

  useAuthOnly();

  const onSubmit = (
    values: SettingsFormValues,
    helpers: FormikHelpers<SettingsFormValues>
  ) => {
    dispatch(updateSettings(values));
    helpers.setSubmitting(false);
  };

  const handleLogoutPress = useCallback(() => {
    dispatch(signOut);
  }, [dispatch]);

  useFocusEffect(() => {
    return resetFormRef.current;
  });

  return userWithProfile !== guest ? (
    <Content padder>
      <Formik
        initialValues={{
          image: userWithProfile.profile.image,
          username: userWithProfile.user.username,
          bio: userWithProfile.profile.bio,
          email: userWithProfile.user.email,
          password: "",
        }}
        enableReinitialize
        validateOnMount
        onSubmit={onSubmit}
        component={(props) => (
          <SettingsForm
            {...props}
            onLogoutPress={handleLogoutPress}
            resetFormRef={resetFormRef}
          />
        )}
      />
    </Content>
  ) : null;
};

type SettingsFormProps = FormikProps<SettingsFormValues> & {
  resetFormRef: React.MutableRefObject<ResetForm>;
  onLogoutPress: () => void;
};

const Field: React.FC<{
  meta: FieldMetaProps<string>;
  label: string;
  secureTextEntry?: boolean;
  onChange: (v: string) => void;
  onBlur: (e: any) => void;
}> = ({ meta, onChange, onBlur, label, secureTextEntry }) => (
  <Item stackedLabel underline={false}>
    <Label style={{ marginBottom: 5 }}>{label}</Label>
    <Input
      onChangeText={onChange}
      onBlur={onBlur}
      value={meta.value}
      secureTextEntry={secureTextEntry}
    />
  </Item>
);

const SettingsForm: React.FC<SettingsFormProps> = ({
  resetFormRef,
  onLogoutPress,
  ...formik
}) => {
  resetFormRef.current = formik.resetForm;

  return (
    <>
      <Form>
        <Field
          label="URL of profile picture"
          meta={formik.getFieldMeta("image")}
          onBlur={formik.handleBlur("image")}
          onChange={formik.handleChange("image")}
        />
        <Field
          label="Username"
          meta={formik.getFieldMeta("username")}
          onBlur={formik.handleBlur("username")}
          onChange={formik.handleChange("username")}
        />
        <Item stackedLabel underline={false}>
          <Label style={{ marginBottom: 5 }}>Short bio about you</Label>
          <Textarea
            onChangeText={formik.handleChange("bio")}
            onBlur={formik.handleBlur("bio")}
            value={formik.values.bio}
            style={{ width: "100%" }}
            rowSpan={5}
            bordered={false}
            underline={false}
          />
        </Item>
        <Field
          label="Email"
          meta={formik.getFieldMeta("email")}
          onBlur={formik.handleBlur("email")}
          onChange={formik.handleChange("email")}
        />
        <Field
          label="New Password"
          meta={formik.getFieldMeta("password")}
          onBlur={formik.handleBlur("password")}
          onChange={formik.handleChange("password")}
          secureTextEntry
        />
      </Form>
      <Button
        block
        style={{ marginHorizontal: 15, marginTop: 50 }}
        disabled={!formik.isValid || formik.isSubmitting}
        onPress={formik.handleSubmit}
      >
        <Text>Update Settings</Text>
      </Button>
      <Button
        block
        danger
        style={{ marginTop: 10, marginHorizontal: 15 }}
        onPress={onLogoutPress}
      >
        <Text>Or click here to logout.</Text>
      </Button>
    </>
  );
};
