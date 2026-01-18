"use client";

import Link from "next/link";
import { actions } from "@/actions/index";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { type FormState } from "@/validations/auth";
import FormError from "./form-error";

const styles = {
  container: "w-full max-w-md",
  header: "space-y-1",
  title: "text-3xl font-bold text-pink-500",
  content: "space-y-4",
  fieldGroup: "space-y-2",
  footer: "flex flex-col",
  button: "w-full",
  prompt: "mt-4 text-center text-sm",
  link: "ml-2 text-pink-500",
};

const INITIAL_STATE : FormState = {
    success: false, 
    message: undefined,
    data: {
        username: '',
        email: '',
        password: '',
    },
    strapiErrors: null,
    zodErrors: null,
};

export function SignupForm() {
  const [formState, action] = useActionState(actions.auth.registerUserAction, INITIAL_STATE);
  console.log("Form state after action:", formState);
  return (
    <div className={styles.container}>
      <form action={action}>
        <Card>
          <CardHeader className={styles.header}>
            <CardTitle className={styles.title}>Sign Up</CardTitle>
            <CardDescription>
              Enter your details to sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent className={styles.content}>
              <div className={styles.fieldGroup}>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="username"
                defaultValue={formState.data?.username ?? ''}
              />
              <FormError error={formState.zodErrors?.username} />
            </div>
            <div className={styles.fieldGroup}>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                defaultValue={formState.data?.email ?? ''}
              />
              <FormError error={formState.zodErrors?.email} />
            </div>
            <div className={styles.fieldGroup}>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="password"
                defaultValue={formState.data?.password ?? ''}
              />
              <FormError error={formState.zodErrors?.password} />
            </div>
          </CardContent>
          <CardFooter className={styles.footer}>
            <Button className={styles.button}>Sign Up</Button>
            {formState.strapiErrors && (
              <p className="text-red-500 txt-xs italic mt-1 py-2">{formState.strapiErrors.message}</p> 
            )}
          </CardFooter>
        </Card>
        <div className={styles.prompt}>
          Don&apos;t have an account?
          <Link className={styles.link} href="signin">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}